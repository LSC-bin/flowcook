#!/usr/bin/env node
/**
 * FlowCook prerender + SEO injector.
 *
 * Usage: SITE_URL=https://your.domain node scripts/prerender.mjs
 *
 * Steps:
 *  1. Reads route list + recipe metadata from src/data/recipes.ts (native TS import).
 *  2. Starts `vite preview` on the built dist/.
 *  3. Dumps fully-rendered HTML for every route via headless Chromium (--dump-dom).
 *  4. Injects per-page <title>, meta description, canonical, OG/Twitter tags,
 *     and JSON-LD (HowTo) structured data for recipe pages.
 *  5. Writes per-route index.html files + sitemap.xml + robots.txt + 404.html.
 */
import { execFile, spawn } from 'node:child_process'
import { mkdir, readFile, writeFile, cp } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')
const SITE_URL = (process.env.SITE_URL || '').replace(/\/$/, '')
// BASE_PATH mirrors vite's base (e.g. '/flowcook' for a GitHub Pages project site).
const BASE = (process.env.BASE_PATH || '/').replace(/\/+$/, '')
if (!SITE_URL) {
  console.error('ERROR: set SITE_URL, e.g. SITE_URL=https://flowcook.pages.dev node scripts/prerender.mjs')
  process.exit(1)
}

const CHROME =
  process.env.CHROME_BIN ||
  path.join(os.homedir(), '.cache/ms-playwright/chromium-1234/chrome-linux64/chrome')
if (!existsSync(CHROME)) {
  console.error(`ERROR: chromium not found at ${CHROME} (set CHROME_BIN)`)
  process.exit(1)
}

// ---- recipe data (type-stripped import, Node >= 23.6) ----
const { RECIPES } = await import(path.join(ROOT, 'src/data/recipes.ts'))

const STATIC_META = {
  '/': {
    title: 'FlowCook — You installed an AI agent. Now what?',
    description:
      'Automation recipes that just work when you follow them. Every recipe is tested on a real setup before publishing. Free, no account needed.',
  },
  '/explore': {
    title: 'Explore Recipes — FlowCook',
    description:
      'Browse tested AI automation recipes by category and difficulty: news briefings, sync jobs, monitoring, and more.',
  },
  '/legal/privacy': {
    title: 'Privacy Policy — FlowCook',
    description: 'FlowCook privacy policy. No accounts, no tracking beyond basic analytics.',
  },
  '/legal/terms': {
    title: 'Terms of Use — FlowCook',
    description: 'FlowCook terms of use. Recipes are provided as-is; use them at your own discretion.',
  },
}

const routes = [
  ...Object.keys(STATIC_META),
  ...RECIPES.map((r) => `/recipe/${r.slug}`),
]

function metaFor(route) {
  if (STATIC_META[route]) return STATIC_META[route]
  const slug = route.split('/').pop()
  const r = RECIPES.find((x) => x.slug === slug)
  if (!r) throw new Error(`no recipe for route ${route}`)
  return {
    title: `${r.title} — FlowCook`,
    description: r.description,
    recipe: r,
  }
}

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function jsonLdFor(r, url) {
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: r.title,
    description: r.description,
    url,
    totalTime: `PT${r.estimatedMinutes}M`,
    step: r.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.content,
    })),
  }
  return JSON.stringify(howTo)
}

function injectSeo(html, route) {
  const { title, description, recipe } = metaFor(route)
  const url = SITE_URL + BASE + route
  const tags = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${recipe ? 'article' : 'website'}" />`,
    `<meta property="og:site_name" content="FlowCook" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
  ]
  if (recipe) {
    tags.push(
      `<meta property="article:published_time" content="${recipe.createdAt}" />`,
      `<meta property="article:modified_time" content="${recipe.updatedAt}" />`,
    )
  }
  const block = tags.join('\n    ')
  const ld = recipe ? `\n    <script type="application/ld+json">${jsonLdFor(recipe, url)}</script>` : ''

  // Replace the existing <title> and meta description, then inject the rest.
  let out = html.replace(/<title>[\s\S]*?<\/title>/, block + ld)
  out = out.replace(/<meta name="description"[^>]*>\s*/g, '')
  return out
}

function dumpDom(url) {
  return new Promise((resolve, reject) => {
    execFile(
      CHROME,
      [
        '--headless=new',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--virtual-time-budget=8000',
        `--dump-dom`,
        url,
      ],
      { maxBuffer: 20 * 1024 * 1024, timeout: 60_000 },
      (err, stdout) => (err ? reject(err) : resolve(stdout)),
    )
  })
}

// ---- static preview server ----
const port = 4173
const preview = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort'], {
  cwd: ROOT,
  stdio: 'ignore',
})
async function waitForServer() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}${BASE}/`)
      if (res.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 500))
  }
  throw new Error('vite preview did not start')
}

try {
  await waitForServer()
  let ok = 0
  for (const route of routes) {
    const html = await dumpDom(`http://127.0.0.1:${port}${BASE}${route}`)
    if (!html.includes('<div id="root">')) {
      throw new Error(`unexpected dump for ${route}`)
    }
    const out = injectSeo(html, route)
    const dir = path.join(DIST, route === '/' ? '' : route)
    await mkdir(dir, { recursive: true })
    await writeFile(path.join(dir, 'index.html'), out)
    ok++
    console.log(`prerendered ${route}`)
  }

  // 404.html for GitHub Pages: same shell, client router renders NotFound.
  await cp(path.join(DIST, 'index.html'), path.join(DIST, '404.html'))

  // sitemap.xml
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes.map((route) => {
    const slug = route.startsWith('/recipe/') ? route.split('/').pop() : null
    const r = slug ? RECIPES.find((x) => x.slug === slug) : null
    const lastmod = r ? r.updatedAt : today
    const priority = route === '/' ? '1.0' : route.startsWith('/recipe/') ? '0.8' : '0.5'
    return `  <url>\n    <loc>${SITE_URL}${BASE}${route}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
  })
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap)

  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}${BASE}/sitemap.xml\n`
  await writeFile(path.join(DIST, 'robots.txt'), robots)

  console.log(`\nDone: ${ok} routes prerendered, sitemap + robots written.`)
} finally {
  preview.kill()
}
