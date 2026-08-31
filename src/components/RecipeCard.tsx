import { Link } from 'react-router-dom'
import type { Recipe } from '../types'
import { DIFFICULTY_COLOR, DIFFICULTY_LABEL } from '../types'
import { IconClock } from './Icons'

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      to={`/recipe/${recipe.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      <div className={`h-1.5 w-full ${DIFFICULTY_COLOR[recipe.difficulty]}`} aria-hidden />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{recipe.category}</span>
          <span className={`rounded px-1.5 py-0.5 text-white ${DIFFICULTY_COLOR[recipe.difficulty]}`}>
            {DIFFICULTY_LABEL[recipe.difficulty]}
          </span>
          <span className="ml-auto flex items-center gap-1">
            <IconClock /> ~{recipe.estimatedMinutes} min
          </span>
        </div>
        <h3 className="font-semibold leading-snug group-hover:text-primary dark:group-hover:text-blue-400">
          {recipe.title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm text-slate-600 dark:text-slate-400">{recipe.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {recipe.tags.slice(0, 3).map((t) => (
            <span key={t} className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
