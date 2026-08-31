import { useState } from 'react'

export default function CodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // clipboard unsupported — ignore
    }
  }

  return (
    <div className="relative my-3 overflow-hidden rounded-lg">
      <div className="flex items-center justify-between bg-slate-800 px-4 py-1.5 text-xs text-slate-400">
        <span className="font-mono uppercase">{language}</span>
        <button onClick={copy} className="rounded px-2 py-0.5 hover:bg-slate-700 hover:text-white">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto bg-[#1E293B] p-4 text-sm leading-relaxed text-slate-100">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  )
}
