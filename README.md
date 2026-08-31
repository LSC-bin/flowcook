# FlowCook — AI Workflow Recipe Platform

"You installed an AI agent. Now what?" — a free collection of automation recipes that just work when you follow them.

## Run

```bash
npm install
npm run dev      # dev server (default :5173)
npm run build    # production build (dist/)
npm run preview  # preview the build
```

## Structure

- `src/types.ts` — recipe standard format (title/category/difficulty/tools/steps/files/tags)
- `src/data/recipes.ts` — recipe data (currently a static array; swappable for Supabase later)
- `src/pages/` — Home(/), Explore(/explore), RecipeDetail(/recipe/:slug), legal pages, 404
- `src/components/` — RecipeCard, CodeBlock (copy button), Layout (dark mode), Icons (SVG)

## Monetization-ready design (not implemented yet)

- All recipes are free for now; payment fields (e.g. `price_cents`) can be added to the Recipe type later
- The data layer lives in one file (`src/data/recipes.ts`), so swapping to Supabase/API later only touches that file
- Auth / purchases / dashboard routes will be added at the monetization stage

## Deploy

- Static site: `npm run build` → deploy `dist/` to Cloudflare Pages
- `_redirects` included for SPA routing
