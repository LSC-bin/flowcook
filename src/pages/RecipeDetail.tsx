import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CodeBlock from '../components/CodeBlock'
import RecipeCard from '../components/RecipeCard'
import {
  IconCheck,
  IconClock,
  IconFacebook,
  IconLink,
  IconWrench,
  IconX,
} from '../components/Icons'
import { RECIPES } from '../data/recipes'
import { DIFFICULTY_COLOR, DIFFICULTY_LABEL } from '../types'

export default function RecipeDetail() {
  const { slug } = useParams()
  const recipe = RECIPES.find((r) => r.slug === slug)

  const storageKey = `flowcook-progress-${slug}`
  const [done, setDone] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    } catch {
      return []
    }
  })
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(done))
  }, [done, storageKey])

  if (!recipe) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium">Recipe not found.</p>
        <Link to="/explore" className="mt-4 inline-block text-primary hover:underline">
          Browse recipes →
        </Link>
      </div>
    )
  }

  const progress = Math.round((done.length / recipe.steps.length) * 100)
  const toggle = (i: number) => setDone((d) => (d.includes(i) ? d.filter((x) => x !== i) : [...d, i]))
  const scrollTo = (i: number) =>
    document.getElementById(`step-${i}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const related = RECIPES.filter((r) => r.slug !== recipe.slug)
    .map((r) => ({
      r,
      score:
        (r.category === recipe.category ? 2 : 0) +
        r.tags.filter((t) => recipe.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.r)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 1500)
    } catch {
      // clipboard unsupported — ignore
    }
  }
  const shareX = () =>
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(recipe.title)}&url=${encodeURIComponent(window.location.href)}`,
      '_blank',
    )
  const shareFb = () =>
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
      '_blank',
    )

  const shareButtons = (
    <div className="flex gap-2">
      <button
        onClick={copyLink}
        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <IconLink /> {copiedLink ? 'Copied' : 'Copy link'}
      </button>
      <button
        onClick={shareX}
        aria-label="Share on X"
        className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <IconX />
      </button>
      <button
        onClick={shareFb}
        aria-label="Share on Facebook"
        className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <IconFacebook />
      </button>
    </div>
  )

  return (
    <div>
      {/* breadcrumb */}
      <nav className="mb-6 text-sm text-slate-500 dark:text-slate-400" aria-label="breadcrumb">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-1.5">/</span>
        <Link to={`/explore?category=${encodeURIComponent(recipe.category)}`} className="hover:text-primary">
          {recipe.category}
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700 dark:text-slate-300">{recipe.title}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-10">
        <article className="max-w-3xl">
          <header>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className={`rounded px-1.5 py-0.5 text-white ${DIFFICULTY_COLOR[recipe.difficulty]}`}>
                {DIFFICULTY_LABEL[recipe.difficulty]}
              </span>
              <span className="flex items-center gap-1">
                <IconClock /> ~{recipe.estimatedMinutes} min
              </span>
              {recipe.verified && (
                <span className="flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <IconCheck className="h-3 w-3" /> Tested by the author
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight">{recipe.title}</h1>
            <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">{recipe.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recipe.tags.map((t) => (
                <Link
                  key={t}
                  to={`/explore?q=${encodeURIComponent(t)}`}
                  className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs text-blue-700 hover:bg-blue-100 dark:bg-blue-950 dark:text-blue-300"
                >
                  #{t}
                </Link>
              ))}
            </div>
            <div className="mt-4 lg:hidden">{shareButtons}</div>
          </header>

          {/* prerequisites */}
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 font-bold">
              <span className="text-primary"><IconWrench /></span> What you need
            </h2>
            <ul className="mt-3 space-y-2">
              {recipe.tools.map((tool) => (
                <li key={tool.name} className="flex items-center gap-2 text-sm">
                  <span className={`h-2 w-2 rounded-full ${tool.required ? 'bg-red-400' : 'bg-slate-300'}`} />
                  {tool.url ? (
                    <a href={tool.url} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                      {tool.name}
                    </a>
                  ) : (
                    <span>{tool.name}</span>
                  )}
                  <span className="text-slate-400">{tool.required ? 'required' : 'optional'}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* step-by-step guide */}
          <section className="mt-8 space-y-6">
            {recipe.steps.map((step, i) => (
              <div key={i} id={`step-${i}`} className="flex scroll-mt-20 gap-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => toggle(i)}
                    aria-label={done.includes(i) ? `Mark step ${i + 1} as not done` : `Mark step ${i + 1} as done`}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition ${
                      done.includes(i)
                        ? 'border-primary bg-primary text-white'
                        : 'border-slate-300 text-slate-400 hover:border-primary dark:border-slate-600'
                    }`}
                  >
                    {done.includes(i) ? <IconCheck /> : i + 1}
                  </button>
                  {i < recipe.steps.length - 1 && (
                    <div className={`mt-1 w-0.5 flex-1 ${done.includes(i) ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-800'}`} />
                  )}
                </div>
                <div className="flex-1 pb-2">
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-1 whitespace-pre-line text-slate-600 dark:text-slate-400">{step.content}</p>
                  {step.code && <CodeBlock language={step.code.language} code={step.code.content} />}
                </div>
              </div>
            ))}
          </section>

          {recipe.sourceUrl && (
            <p className="mt-8 text-sm text-slate-500">
              Original source:{' '}
              <a href={recipe.sourceUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline">
                {recipe.sourceUrl}
              </a>
            </p>
          )}
          <p className="mt-2 text-sm text-slate-500">
            By {recipe.author} · Last updated: {recipe.updatedAt}
          </p>
        </article>

        {/* desktop sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-20 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-1 flex justify-between text-sm text-slate-500">
                <span className="font-bold text-slate-700 dark:text-slate-300">Progress</span>
                <span>{progress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
              </div>
              <ul className="mt-4 space-y-1">
                {recipe.steps.map((s, i) => (
                  <li key={i}>
                    <button
                      onClick={() => scrollTo(i)}
                      className={`w-full rounded px-2 py-1 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800 ${
                        done.includes(i) ? 'text-slate-400 line-through' : ''
                      }`}
                    >
                      {i + 1}. {s.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-400">Share</h3>
              {shareButtons}
            </div>
          </div>
        </aside>
      </div>

      {/* related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-xl font-bold">You might also like</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
