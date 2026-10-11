const sprints = [
  ["R0", "Product foundation", "IN PROGRESS"],
  ["R1", "Validation experience", "PLANNED"],
  ["R2", "SaaS foundation", "PLANNED"],
  ["R3", "Roblox data connection", "PLANNED"],
  ["R4", "Decision Engine v1", "PLANNED"],
  ["R5", "AI Product Analyst", "PLANNED"],
  ["R6", "Experiment Copilot", "PLANNED"],
  ["R7", "Pilot readiness", "PLANNED"],
  ["R8", "Commercial readiness", "PLANNED"],
  ["R9", "Security & privacy", "PLANNED"],
  ["R10", "Reliability", "PLANNED"],
  ["R11", "Go-Live", "PLANNED"],
  ["R12", "Portfolio closure", "PLANNED"],
] as const;

const screens = [
  "Landing / Early Access",
  "Connect Roblox",
  "Today's Priorities",
  "Investigation / Evidence",
  "Experiment Copilot",
  "Weekly Growth Brief",
];

export default function RobloxGrowthCopilotPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <a href="/" className="text-sm text-cyan-300 hover:text-cyan-200">← Enterprise Data & AI Portfolio</a>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-start">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">New SaaS / Validation</div>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.055em] text-white md:text-7xl">Roblox Growth Copilot</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-400">
              An AI Product & Growth Analyst for Roblox studios. Instead of duplicating Roblox Analytics, the product identifies what needs attention, shows the evidence and proposes the next experiment.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["Roblox Open Cloud", "Product Analytics", "Decision Intelligence", "FastAPI", "PostgreSQL", "AI Agents", "Experimentation"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs text-slate-300">{item}</span>
              ))}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
            <div className="text-xs uppercase tracking-[0.18em] text-slate-500">Current status</div>
            <div className="mt-3 text-3xl font-semibold text-cyan-200">Sprint R0</div>
            <div className="mt-2 text-sm text-slate-400">Product foundation · started 12 Oct 2026</div>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[8%] rounded-full bg-cyan-300" /></div>
            <div className="mt-3 flex justify-between text-xs text-slate-500"><span>1 / 13 sprints active</span><span>Validation</span></div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            ["Validation", "20%", "Product thesis + market research complete"],
            ["Product", "10%", "V1 surfaces and JTBD defined"],
            ["Engineering", "0%", "Implementation starts after validation shell"],
            ["Commercial", "5%", "Pricing hypothesis only"],
          ].map(([label, value, copy]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
              <div className="mt-3 text-3xl font-semibold text-white">{value}</div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Product thesis</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">Roblox tells you what happened. The copilot tells you what to do next.</h2>
          <p className="mt-5 text-base leading-8 text-slate-400">The core product is a decision layer above existing analytics: metric changes are validated, compared against baselines and segments, converted into evidence bundles and only then explained by AI.</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Detect", "Find the highest-impact retention, onboarding, monetization or acquisition issue."],
            ["02", "Explain", "Show the affected metric, segment, baseline and confidence before generating advice."],
            ["03", "Act", "Turn the finding into a concrete product action and structured experiment proposal."],
          ].map(([id, title, copy]) => (
            <article key={id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="text-xs font-semibold text-cyan-300">{id}</div>
              <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Validation MVP</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">Six screens to validate the whole workflow.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {screens.map((screen, index) => (
            <div key={screen} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="text-xs text-slate-500">0{index + 1}</div>
              <div className="mt-2 font-semibold text-white">{screen}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Architecture</div>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">Thin analytics layer. Strong decision layer.</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-7">
          {["Roblox Analytics", "Query Adapter", "PostgreSQL", "Decision Engine", "Evidence Bundle", "AI Analyst", "Actions / Experiments"].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4 text-center text-sm text-slate-300">
              <div className="text-[10px] uppercase tracking-[0.14em] text-slate-600">{String(index + 1).padStart(2, "0")}</div>
              <div className="mt-2">{item}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14 md:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Delivery</div>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-white">Sprint path to paid Go-Live</h2>
          </div>
          <div className="text-sm text-slate-500">Validation → Pilot → Commercial → Go-Live</div>
        </div>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white/10">
          {sprints.map(([id, title, status], index) => (
            <div key={id} className={`grid grid-cols-[70px_1fr_auto] gap-4 px-5 py-4 ${index ? "border-t border-white/10" : ""}`}>
              <div className="font-mono text-sm text-cyan-300">{id}</div>
              <div className="text-sm font-medium text-slate-200">{title}</div>
              <div className={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide ${status === "IN PROGRESS" ? "bg-cyan-300/15 text-cyan-200" : "bg-white/5 text-slate-500"}`}>{status}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
