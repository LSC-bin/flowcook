import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-2xl font-bold">Page not found</h1>
      <p className="mt-2 text-slate-500">The address you requested does not exist or may have moved.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link to="/" className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary-dark">
          Home
        </Link>
        <Link to="/explore" className="rounded-lg bg-slate-100 px-4 py-2 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
          Explore recipes
        </Link>
      </div>
    </div>
  )
}
