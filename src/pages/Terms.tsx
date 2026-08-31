export default function Terms() {
  return (
    <article className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-500">Effective date: August 31, 2026</p>
      <div className="mt-6 space-y-5 text-slate-600 dark:text-slate-400">
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">1. The service</h2>
          <p className="mt-1">
            FlowCook is a free information service providing AI automation workflow recipes.
            Every recipe goes through a verification run before publishing, but results may vary
            depending on your environment.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">2. Your responsibility</h2>
          <p className="mt-1">
            Setting up external services required by a recipe (API keys, accounts, etc.) and any
            consequences (costs, data loss, etc.) are your responsibility. Please review each
            recipe's prerequisites and cautions before running it.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">3. Intellectual property</h2>
          <p className="mt-1">
            Recipe content belongs to its original author. Where a source link is listed, the
            original text's license applies. Commercial redistribution is prohibited.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-slate-800 dark:text-slate-200">4. Changes to the service</h2>
          <p className="mt-1">The operator may change or discontinue the service without prior notice.</p>
        </section>
      </div>
    </article>
  )
}
