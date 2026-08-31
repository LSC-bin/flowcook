import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { IconMoon, IconPot, IconSun } from './Icons'

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('flowcook-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="rounded-lg p-2 text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {dark ? <IconSun /> : <IconMoon />}
    </button>
  )
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-[#0F172A]/80">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="text-primary">
              <IconPot />
            </span>
            <span>FlowCook</span>
          </Link>
          <nav className="ml-auto flex items-center gap-1">
            <Link
              to="/explore"
              className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Explore
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 text-sm sm:grid-cols-3">
          <div>
            <p className="mb-3 flex items-center gap-2 font-bold">
              <span className="text-primary">
                <IconPot />
              </span>
              FlowCook
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              Automation recipes that just work when you follow them.
              <br />
              Everything is tested on a real setup first. Free, no account needed.
            </p>
          </div>
          <div>
            <p className="mb-3 font-bold">Categories</p>
            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400">
              {['Productivity', 'Data', 'Development'].map((c) => (
                <li key={c}>
                  <Link to={`/explore?category=${encodeURIComponent(c)}`} className="hover:text-primary">
                    {c}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/explore" className="hover:text-primary">
                  All recipes →
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-bold">Legal</p>
            <ul className="space-y-1.5 text-slate-500 dark:text-slate-400">
              <li>
                <Link to="/legal/privacy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/legal/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href={`${import.meta.env.BASE_URL}feed.xml`} className="hover:text-primary">
                  RSS Feed
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">© 2026 FlowCook</p>
      </footer>
    </div>
  )
}
