export default function Privacy() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-slate-500">Effective date: August 31, 2026</p>
      <div className="mt-6 space-y-5 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">1. Information we collect</h2>
          <p className="mt-1">
            FlowCook is a free service with no account system. We do not store personal information on our servers.
            Convenience features such as step progress and theme preference are stored only in your
            browser (localStorage) and are never sent anywhere.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">2. Access logs</h2>
          <p className="mt-1">
            We may collect anonymous usage statistics (page views, etc.) to improve the service.
            We do not use cookie-based tracking or any personally identifiable information.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">3. Third-party sharing</h2>
          <p className="mt-1">We do not share collected information with third parties.</p>
        </section>
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">4. Contact</h2>
          <p className="mt-1">For privacy-related inquiries, please contact the site operator.</p>
        </section>
      </div>
    </article>
  )
}
