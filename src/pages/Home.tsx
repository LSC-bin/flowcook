import { Link, useNavigate } from 'react-router-dom'
import RecipeCard from '../components/RecipeCard'
import { IconArrow, IconSearch } from '../components/Icons'
import { RECIPES } from '../data/recipes'
import { CATEGORIES } from '../types'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div>
      {/* hero */}
      <section className="py-12 text-center md:py-20">
        <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
          Free · No account needed · Everything tested for real
        </p>
        <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
          You installed an AI agent. <span className="highlight">Now what?</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
          Every recipe here was actually run on my own setup.
          Follow the steps and it works. If it breaks, I fix it.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-lg gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            const q = new FormData(e.currentTarget).get('q')?.toString().trim() ?? ''
            navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
          }}
        >
          <div className="relative w-full">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <IconSearch />
            </span>
            <input
              name="q"
              type="search"
              placeholder="Search recipes (e.g. news briefing, sync)"
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
          >
            Search
          </button>
        </form>
      </section>

      {/* categories */}
      <section className="py-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              to={`/explore?category=${encodeURIComponent(c)}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-5 text-center font-medium transition hover:border-primary hover:text-primary dark:border-slate-800 dark:bg-slate-900"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      {/* latest recipes */}
      <section className="py-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Recently added</h2>
          <Link to="/explore" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Browse all <IconArrow />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {RECIPES.map((r) => (
            <RecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

      {/* about the author */}
      <section className="mx-auto max-w-2xl py-10">
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-lg font-bold">Who writes these recipes</h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400">
            I installed an agent once and left it untouched for days — I simply did not know what to make it do.
            This site is where I collect the automations I actually use, one by one.
            Community submissions may come later, but for now everything here is something I verified myself.
          </p>
        </div>
      </section>
    </div>
  )
}
