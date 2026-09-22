import { loadPortfolioData } from "../lib/portfolio-data";

export const dynamic = "force-static";

function formatPct(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 2)}%`;
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00Z`));
}

function statusClasses(status: string): string {
  if (status === "Complete") {
    return "border-emerald-400/20 bg-emerald-400/10 text-emerald-200";
  }
  if (status === "Active") {
    return "border-cyan-400/20 bg-cyan-400/10 text-cyan-100";
  }
  if (status === "Ready") {
    return "border-indigo-400/20 bg-indigo-400/10 text-indigo-100";
  }
  return "border-slate-400/15 bg-slate-400/5 text-slate-300";
}

export default function Home() {
  const { portfolio, roadmap, metrics, projects, eoip } = loadPortfolioData();
  const efficiency = metrics.delivery_efficiency;
  const milestones = metrics.milestones.items as Array<Record<string, any>>;
  const architecture = (eoip.architecture?.flow ?? []) as Array<Record<string, any>>;
  const repoUrl = `https://github.com/${portfolio.owner}/${portfolio.repository}`;

  return (
    <main>
      <header className="shell flex min-h-20 items-center justify-between border-b hairline">
        <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border hairline bg-white/[0.03] text-xs text-cyan-200">
            DA
          </span>
          <span className="hidden sm:inline">Enterprise Data & AI Portfolio</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <a className="transition hover:text-white" href="#control-center">Control Center</a>
          <a className="transition hover:text-white" href="#delivery-efficiency">Delivery</a>
          <a className="transition hover:text-white" href="#projects">Projects</a>
          <a className="transition hover:text-white" href="#roadmap">Roadmap</a>
        </nav>

        <a
          href={repoUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border hairline bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]"
        >
          View GitHub
        </a>
      </header>

      <section id="top" className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <div className="eyebrow">Enterprise analytics · engineering · decision intelligence</div>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white md:text-7xl">
            Building enterprise data products from
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              {" "}ERP signals to business decisions.
            </span>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
            A business-first portfolio connecting ERP process knowledge, data engineering,
            analytics engineering, Power BI and measurable business impact — delivered with
            an AI-assisted engineering workflow and transparent delivery metrics.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {(portfolio.positioning as string[]).slice(0, 5).map((role) => (
              <span
                key={role}
                className="rounded-full border hairline bg-white/[0.025] px-3 py-1.5 text-xs text-slate-300"
              >
                {role}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Explore projects
            </a>
            <a
              href="#delivery-efficiency"
              className="rounded-xl border hairline bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07]"
            >
              See delivery efficiency
            </a>
          </div>
        </div>

        <div className="panel p-6 md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">Live portfolio state</div>
              <div className="mt-2 text-lg font-medium text-white">Control Center Snapshot</div>
            </div>
            <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1 text-xs text-emerald-200">
              <span className="status-dot mr-2" />
              On track
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Readiness</div>
              <div className="mt-2 text-3xl font-semibold text-white">
                {formatPct(metrics.progress.application_readiness_pct)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Scope done</div>
              <div className="mt-2 text-3xl font-semibold text-white">
                {formatPct(metrics.progress.portfolio_scope_pct)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Ahead of baseline</div>
              <div className="mt-2 text-3xl font-semibold text-cyan-200">
                {metrics.schedule.schedule_delta_days}d
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Blockers</div>
              <div className="mt-2 text-3xl font-semibold text-white">{metrics.blockers.count}</div>
            </div>
          </div>

          <div className="mt-8 border-t hairline pt-5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Application readiness</span>
              <span>{formatDate(metrics.schedule.target_date)}</span>
            </div>
            <div className="progress-track mt-3">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, metrics.progress.application_readiness_pct)}%` }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-400">Forecast</span>
              <span className="font-medium text-white">
                {formatDate(metrics.schedule.forecast_completion_date)}
                <span className="ml-2 text-xs font-normal text-amber-200">
                  {metrics.schedule.forecast_confidence} confidence
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="control-center" className="shell py-14 md:py-20">
        <div className="eyebrow">Portfolio Control Center</div>
        <h2 className="section-title mt-3">Delivery is measured, not estimated.</h2>
        <p className="section-copy">
          Progress is earned from completed weighted work packages. Plan, actuals, forecast,
          milestones, risks and critical path all originate from the same structured GitHub data.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Portfolio scope", formatPct(metrics.progress.portfolio_scope_pct), "Completed weighted portfolio scope"],
            ["Application readiness", formatPct(metrics.progress.application_readiness_pct), "Mandatory scope normalized to 100%"],
            ["Planned readiness", formatPct(metrics.progress.planned_application_readiness_pct), "Baseline curve at current snapshot"],
            ["Milestone reliability", formatPct(metrics.milestones.reliability_pct ?? 0), `${metrics.milestones.on_time_count}/${metrics.milestones.considered_count} considered milestones on time`],
          ].map(([label, value, copy]) => (
            <article key={label} className="panel p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
              <div className="metric-value mt-3">{value}</div>
              <p className="mt-3 text-sm leading-6 text-slate-400">{copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="panel p-6">
            <div className="text-sm font-medium text-white">Schedule position</div>
            <div className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-cyan-200">
              +{metrics.schedule.schedule_delta_days} days
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Ahead of the frozen baseline curve. Current schedule performance index: {metrics.schedule.performance_index}.
            </p>
          </article>
          <article className="panel p-6">
            <div className="text-sm font-medium text-white">Critical path</div>
            <div className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white">
              {metrics.critical_path.completed_count}/{metrics.critical_path.total_count}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              First unresolved package: <span className="text-slate-200">{metrics.critical_path.first_unresolved}</span>.
            </p>
          </article>
          <article className="panel p-6">
            <div className="text-sm font-medium text-white">Risk posture</div>
            <div className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white">
              {metrics.risks.critical_open_count}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              Open critical risks, with {metrics.blockers.count} active delivery blockers.
            </p>
          </article>
        </div>
      </section>

      <section id="delivery-efficiency" className="shell py-14 md:py-20">
        <div className="panel overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b hairline p-7 md:p-10 lg:border-b-0 lg:border-r">
              <div className="eyebrow">AI-Assisted Delivery Efficiency</div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                Faster delivery, with the methodology visible.
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base">
                Schedule acceleration is measured against the frozen baseline. Human effort is
                tracked separately, and any future cost value remains a transparent scenario until
                benchmark effort and employer-cost assumptions are documented.
              </p>

              <div className="mt-8 rounded-2xl border hairline bg-black/10 p-5 text-sm leading-7 text-slate-400">
                <div className="font-medium text-slate-200">Evidence rule</div>
                Calendar days are never multiplied by eight and presented as labor savings.
                Modeled employer value will only appear when effort and benchmark evidence exist.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
              {[
                ["Baseline window", `${efficiency.baseline_delivery_window_elapsed_days} days`, `${formatDate(efficiency.baseline_start_date)} → ${formatDate(efficiency.baseline_target_date)}`],
                ["Forecast window", `${efficiency.forecast_delivery_window_elapsed_days} days`, `Forecast to ${formatDate(efficiency.forecast_completion_date)}`],
                ["Forecast compression", `${efficiency.forecast_schedule_compression_days} days`, `${formatPct(efficiency.forecast_schedule_compression_pct)} shorter than baseline`],
                ["Actual window", efficiency.actual_delivery_window_elapsed_days === null ? "Pending" : `${efficiency.actual_delivery_window_elapsed_days} days`, efficiency.actual_completion_date ? `Completed ${formatDate(efficiency.actual_completion_date)}` : "Final when M11 is complete"],
              ].map(([label, value, copy]) => (
                <div key={label} className="bg-[#0b1728] p-6 md:p-8">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">{label}</div>
                  <div className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white md:text-4xl">
                    {value}
                  </div>
                  <div className="mt-3 text-xs leading-5 text-slate-500">{copy}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="shell py-14 md:py-20">
        <div className="eyebrow">Featured work</div>
        <h2 className="section-title mt-3">One portfolio, several enterprise decision problems.</h2>
        <p className="section-copy">
          The flagship projects share a consistent business-first story while proving different
          engineering and analytical capabilities.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="panel p-6 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold tracking-[-0.025em] text-white">{project.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{project.fullName}</div>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs ${statusClasses(project.status)}`}>
                  {project.status}
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-400">{project.summary}</p>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Workstream progress</span>
                  <span>{formatPct(project.progressPct)}</span>
                </div>
                <div className="progress-track mt-2">
                  <div className="progress-fill" style={{ width: `${Math.min(100, project.progressPct)}%` }} />
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.technologies.map((technology) => (
                  <span key={technology} className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400">
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between border-t hairline pt-5 text-xs">
                <span className="text-slate-500">{project.environment.replaceAll("_", " ")}</span>
                {project.repository ? (
                  <a
                    href={`https://github.com/${project.repository}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-cyan-200 transition hover:text-cyan-100"
                  >
                    Repository ↗
                  </a>
                ) : (
                  <span className="text-slate-600">Repository follows</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="eyebrow">EOIP architecture</div>
        <h2 className="section-title mt-3">Operational data to decision support.</h2>
        <p className="section-copy">
          EOIP is deliberately layered: source data stays operational, staging normalizes semantics,
          the dimensional model governs analytical grain, and reporting sits on top of a traceable foundation.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {architecture.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="panel h-full p-5">
                <div className="text-xs font-semibold text-cyan-200">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-4 text-sm font-semibold text-white">{step.label}</div>
                <p className="mt-2 text-xs leading-5 text-slate-500">{step.description}</p>
              </div>
              {index < architecture.length - 1 && (
                <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-slate-600 xl:block">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="shell py-14 md:py-20">
        <div className="eyebrow">Roadmap & milestones</div>
        <h2 className="section-title mt-3">Baseline stays frozen. Actual delivery stays visible.</h2>
        <p className="section-copy">
          Milestone targets come from the original roadmap. Completion dates come from actual work-package
          delivery, preserving an auditable plan-vs-actual history.
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {milestones.map((milestone) => (
            <article
              key={milestone.id}
              className={`rounded-2xl border p-5 ${
                milestone.complete
                  ? "border-emerald-300/15 bg-emerald-300/[0.045]"
                  : "hairline bg-white/[0.02]"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500">{milestone.id}</div>
                  <div className="mt-2 text-sm font-medium text-white">{milestone.name}</div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] ${
                    milestone.complete
                      ? "bg-emerald-300/10 text-emerald-200"
                      : "bg-white/[0.04] text-slate-500"
                  }`}
                >
                  {milestone.complete ? "Complete" : "Planned"}
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between border-t hairline pt-4 text-xs">
                <span className="text-slate-500">Target {formatDate(milestone.target)}</span>
                <span className={milestone.actual_completion ? "text-emerald-200" : "text-slate-600"}>
                  {milestone.actual_completion
                    ? `Actual ${formatDate(milestone.actual_completion)}`
                    : "Actual pending"}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="shell mt-10 border-t hairline py-10 text-xs text-slate-600">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <span>Enterprise Data & AI Portfolio 2027 · GitHub is the technical source of truth.</span>
          <span>Snapshot {formatDate(metrics.as_of)}</span>
        </div>
      </footer>
    </main>
  );
}
