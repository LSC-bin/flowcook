import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { RECIPES } from '../data/recipes'
import { CATEGORIES, DIFFICULTY_LABEL } from '../types'
import type { Difficulty } from '../types'

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced']

export default function Explore() {
  const [params, setParams] = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const difficulty = params.get('difficulty') ?? ''

  const results = useMemo(() => {
    const lower = q.trim().toLowerCase()
    return RECIPES.filter((r) => {
      const matchCategory = !category || r.category === category
      const matchDifficulty = !difficulty || r.difficulty === difficulty
      const matchQuery =
        !lower ||
        r.title.toLowerCase().includes(lower) ||
        r.description.toLowerCase().includes(lower) ||
        r.tags.some((t) => t.toLowerCase().includes(lower)) ||
        r.tools.some((t) => t.name.toLowerCase().includes(lower))
      return matchCategory && matchDifficulty && matchQuery
    })
  }, [q, category, difficulty])

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const filters = (
    <div className="space-y-6">
      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-400">Category</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => update('category', '')}
              className={`w-full rounded-lg px-3 py-1.5 text-left text-sm ${!category ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              All
            </button>
          </li>
          {CATEGORIES.map((c) => (
            <li key={c}>
              <button
                onClick={() => update('category', c)}
                className={`w-full rounded-lg px-3 py-1.5 text-left text-sm ${category === c ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {c}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-bold text-slate-500 dark:text-slate-400">Difficulty</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={() => update('difficulty', '')}
              className={`w-full rounded-lg px-3 py-1.5 text-left text-sm ${!difficulty ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              All
            </button>
          </li>
          {DIFFICULTIES.map((d) => (
            <li key={d}>
              <button
                onClick={() => update('difficulty', d)}
                className={`w-full rounded-lg px-3 py-1.5 text-left text-sm ${difficulty === d ? 'bg-primary text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}
              >
                {DIFFICULTY_LABEL[d]}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  return (
    <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
      {/* desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-20">{filters}</div>
      </aside>

      <div>
        <h1 className="text-2xl font-bold">Explore recipes</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Everything is free, and I run each recipe myself before publishing it.
        </p>

        <div className="mt-5 flex items-center gap-3">
          <input
            type="search"
            value={q}
            onChange={(e) => update('q', e.target.value)}
            placeholder="Search…"
            className="w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
          />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm lg:hidden dark:border-slate-700"
          >
            {mobileOpen ? 'Hide filters' : 'Filters'}
          </button>
        </div>

        {/* mobile filters */}
        {mobileOpen && (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 lg:hidden dark:border-slate-800 dark:bg-slate-900">
            {filters}
          </div>
        )}

        {results.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg font-medium">No recipes match these filters yet.</p>
            <p className="mt-2 text-slate-500">Try a different keyword or filter.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
