import { LanguageToggle } from "../components/language-toggle";
import { ThemeToggle } from "../components/theme-toggle";
import { loadPortfolioData } from "../lib/portfolio-data";

export const dynamic = "force-static";

type I18n = {
  en: Record<string, any>;
  de: Record<string, any>;
};

function lookup(source: Record<string, any>, path: string): string {
  const value = path.split(".").reduce<any>((current, key) => current?.[key], source);
  return value == null ? path : String(value);
}

function interpolate(value: string, vars: Record<string, string | number> = {}): string {
  return Object.entries(vars).reduce(
    (text, [key, replacement]) => text.replaceAll(`{${key}}`, String(replacement)),
    value,
  );
}

function Localized({
  i18n,
  path,
  vars,
}: {
  i18n: I18n;
  path: string;
  vars?: Record<string, string | number>;
}) {
  const en = interpolate(lookup(i18n.en, path), vars);
  const de = interpolate(lookup(i18n.de, path), vars);
  return (
    <>
      <span className="lang-en">{en}</span>
      <span className="lang-de">{de}</span>
    </>
  );
}

function LocalizedDate({ value }: { value: string }) {
  const date = new Date(`${value}T00:00:00Z`);
  const en = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  const de = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
  return (
    <>
      <span className="lang-en">{en}</span>
      <span className="lang-de">{de}</span>
    </>
  );
}

function LocalizedCurrency({ value }: { value: number }) {
  return (
    <>
      <span className="lang-en">
        {new Intl.NumberFormat("en-GB", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(value)}
      </span>
      <span className="lang-de">
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
          maximumFractionDigits: 0,
        }).format(value)}
      </span>
    </>
  );
}

function formatPct(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 2)}%`;
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
  const { portfolio, metrics, projects, eoip, i18n } = loadPortfolioData();
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
          <a className="transition hover:text-white" href="#control-center">
            <Localized i18n={i18n} path="nav.control_center" />
          </a>
          <a className="transition hover:text-white" href="#delivery-efficiency">
            <Localized i18n={i18n} path="nav.delivery" />
          </a>
          <a className="transition hover:text-white" href="#projects">
            <Localized i18n={i18n} path="nav.projects" />
          </a>
          <a className="transition hover:text-white" href="#roadmap">
            <Localized i18n={i18n} path="nav.roadmap" />
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a
            href={repoUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border hairline bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200 transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.06]"
          >
            <Localized i18n={i18n} path="nav.github" />
          </a>
        </div>
      </header>

      <section id="top" className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <div className="eyebrow">
            <Localized i18n={i18n} path="hero.eyebrow" />
          </div>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white md:text-7xl">
            <Localized i18n={i18n} path="hero.title_prefix" />
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              {" "}
              <Localized i18n={i18n} path="hero.title_accent" />
            </span>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
            <Localized i18n={i18n} path="hero.copy" />
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
              <Localized i18n={i18n} path="hero.explore_projects" />
            </a>
            <a
              href="#delivery-efficiency"
              className="rounded-xl border hairline bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07]"
            >
              <Localized i18n={i18n} path="hero.see_delivery" />
            </a>
          </div>
        </div>

        <div className="panel p-6 md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">
                <Localized i18n={i18n} path="live.eyebrow" />
              </div>
              <div className="mt-2 text-lg font-medium text-white">
                <Localized i18n={i18n} path="live.title" />
              </div>
            </div>
            <span className="rounded-full border border-emerald-300/15 bg-emerald-300/[0.08] px-3 py-1 text-xs text-emerald-200">
              <span className="status-dot mr-2" />
              <Localized i18n={i18n} path="live.on_track" />
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <Localized i18n={i18n} path="live.readiness" />
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">
                {formatPct(metrics.progress.application_readiness_pct)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <Localized i18n={i18n} path="live.scope_done" />
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">
                {formatPct(metrics.progress.portfolio_scope_pct)}
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <Localized i18n={i18n} path="live.ahead_baseline" />
              </div>
              <div className="mt-2 text-3xl font-semibold text-cyan-200">
                {metrics.schedule.schedule_delta_days}d
              </div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <Localized i18n={i18n} path="live.blockers" />
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">{metrics.blockers.count}</div>
            </div>
          </div>

          <div className="mt-8 border-t hairline pt-5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span><Localized i18n={i18n} path="live.application_readiness" /></span>
              <span><LocalizedDate value={metrics.schedule.target_date} /></span>
            </div>
            <div className="progress-track mt-3">
              <div
                className="progress-fill"
                style={{ width: `${Math.min(100, metrics.progress.application_readiness_pct)}%` }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-slate-400"><Localized i18n={i18n} path="live.forecast" /></span>
              <span className="font-medium text-white">
                <LocalizedDate value={metrics.schedule.forecast_completion_date} />
                <span className="ml-2 text-xs font-normal text-amber-200">
                  {metrics.schedule.forecast_confidence} <Localized i18n={i18n} path="live.confidence" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section id="control-center" className="shell py-14 md:py-20">
        <div className="eyebrow"><Localized i18n={i18n} path="control.eyebrow" /></div>
        <h2 className="section-title mt-3"><Localized i18n={i18n} path="control.title" /></h2>
        <p className="section-copy"><Localized i18n={i18n} path="control.copy" /></p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["control.portfolio_scope", formatPct(metrics.progress.portfolio_scope_pct), "control.portfolio_scope_copy"],
            ["control.app_readiness", formatPct(metrics.progress.application_readiness_pct), "control.app_readiness_copy"],
            ["control.planned_readiness", formatPct(metrics.progress.planned_application_readiness_pct), "control.planned_readiness_copy"],
          ].map(([label, value, copy]) => (
            <article key={label} className="panel p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <Localized i18n={i18n} path={label} />
              </div>
              <div className="metric-value mt-3">{value}</div>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                <Localized i18n={i18n} path={copy} />
              </p>
            </article>
          ))}
          <article className="panel p-5 md:p-6">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <Localized i18n={i18n} path="control.milestone_reliability" />
            </div>
            <div className="metric-value mt-3">{formatPct(metrics.milestones.reliability_pct ?? 0)}</div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              {metrics.milestones.on_time_count}/{metrics.milestones.considered_count}{" "}
              <Localized i18n={i18n} path="control.considered_on_time" />
            </p>
          </article>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <article className="panel p-6">
            <div className="text-sm font-medium text-white">
              <Localized i18n={i18n} path="control.schedule_position" />
            </div>
            <div className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-cyan-200">
              +{metrics.schedule.schedule_delta_days} days
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              <Localized i18n={i18n} path="control.ahead_text" />{" "}
              <Localized i18n={i18n} path="control.spi" />: {metrics.schedule.performance_index}.
            </p>
          </article>
          <article className="panel p-6">
            <div className="text-sm font-medium text-white">
              <Localized i18n={i18n} path="control.critical_path" />
            </div>
            <div className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white">
              {metrics.critical_path.completed_count}/{metrics.critical_path.total_count}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              <Localized i18n={i18n} path="control.first_unresolved" />:{" "}
              <span className="text-slate-200">{metrics.critical_path.first_unresolved}</span>.
            </p>
          </article>
          <article className="panel p-6">
            <div className="text-sm font-medium text-white">
              <Localized i18n={i18n} path="control.risk_posture" />
            </div>
            <div className="mt-5 text-4xl font-semibold tracking-[-0.045em] text-white">
              {metrics.risks.critical_open_count}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              <Localized i18n={i18n} path="control.critical_risks_copy" />, {metrics.blockers.count}{" "}
              <Localized i18n={i18n} path="control.active_blockers_copy" />.
            </p>
          </article>
        </div>
      </section>

      <section id="delivery-efficiency" className="shell py-14 md:py-20">
        <div className="panel overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b hairline p-7 md:p-10 lg:border-b-0 lg:border-r">
              <div className="eyebrow"><Localized i18n={i18n} path="delivery.eyebrow" /></div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                <Localized i18n={i18n} path="delivery.title" />
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base">
                <Localized i18n={i18n} path="delivery.copy" />
              </p>

              <div className="mt-8 rounded-2xl border hairline bg-black/10 p-5 text-sm leading-7 text-slate-400">
                <div className="font-medium text-slate-200">
                  <Localized i18n={i18n} path="delivery.evidence_rule" />
                </div>
                <Localized i18n={i18n} path="delivery.evidence_copy" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.baseline_window" />
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white md:text-4xl">
                  {efficiency.baseline_delivery_window_elapsed_days} days
                </div>
                <div className="mt-3 text-xs leading-5 text-slate-500">
                  <LocalizedDate value={efficiency.baseline_start_date} /> → <LocalizedDate value={efficiency.baseline_target_date} />
                </div>
              </div>
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.forecast_window" />
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white md:text-4xl">
                  {efficiency.forecast_delivery_window_elapsed_days} days
                </div>
                <div className="mt-3 text-xs leading-5 text-slate-500">
                  <Localized i18n={i18n} path="delivery.forecast_to" />{" "}
                  <LocalizedDate value={efficiency.forecast_completion_date} />
                </div>
              </div>
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.forecast_compression" />
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white md:text-4xl">
                  {efficiency.forecast_schedule_compression_days} days
                </div>
                <div className="mt-3 text-xs leading-5 text-slate-500">
                  {formatPct(efficiency.forecast_schedule_compression_pct)}{" "}
                  <Localized i18n={i18n} path="delivery.shorter_baseline" />
                </div>
              </div>
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.actual_window" />
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-white md:text-4xl">
                  {efficiency.actual_delivery_window_elapsed_days === null ? (
                    <Localized i18n={i18n} path="delivery.pending" />
                  ) : (
                    `${efficiency.actual_delivery_window_elapsed_days} days`
                  )}
                </div>
                <div className="mt-3 text-xs leading-5 text-slate-500">
                  {efficiency.actual_completion_date ? (
                    <LocalizedDate value={efficiency.actual_completion_date} />
                  ) : (
                    <Localized i18n={i18n} path="delivery.final_m11" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t hairline p-7 md:p-10">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <div className="eyebrow"><Localized i18n={i18n} path="delivery.effort_title" /></div>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                  <Localized i18n={i18n} path="delivery.planned_model" /> ·{" "}
                  <Localized i18n={i18n} path="delivery.scenario_label" />
                </p>
              </div>
              <div className="text-xs text-slate-500">
                <Localized i18n={i18n} path="delivery.cost_rate_note" />:{" "}
                {efficiency.cost_model.loaded_hourly_rate_eur} €/h
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <article className="rounded-2xl border hairline bg-white/[0.02] p-5">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.planned_hours" />
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {efficiency.human_effort.planned_portfolio_hours} h
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {efficiency.human_effort.planned_mandatory_hours} h mandatory / Pflichtumfang
                </div>
              </article>

              <article className="rounded-2xl border hairline bg-white/[0.02] p-5">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.actual_hours" />
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {efficiency.human_effort.observed_hours == null ? (
                    <Localized i18n={i18n} path="delivery.actual_pending" />
                  ) : (
                    `${efficiency.human_effort.observed_hours} h`
                  )}
                </div>
              </article>

              <article className="rounded-2xl border hairline bg-white/[0.02] p-5">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.planned_cost" />
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  <LocalizedCurrency value={efficiency.cost_model.planned_portfolio_cost_eur} />
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  <LocalizedCurrency value={efficiency.cost_model.planned_mandatory_cost_eur} /> mandatory / Pflichtumfang
                </div>
              </article>

              <article className="rounded-2xl border hairline bg-white/[0.02] p-5">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.actual_cost" />
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {efficiency.cost_model.observed_cost_eur == null ? (
                    <Localized i18n={i18n} path="delivery.actual_pending" />
                  ) : (
                    <LocalizedCurrency value={efficiency.cost_model.observed_cost_eur} />
                  )}
                </div>
              </article>

              <article className="rounded-2xl border hairline bg-white/[0.02] p-5">
                <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
                  <Localized i18n={i18n} path="delivery.modeled_savings" />
                </div>
                <div className="mt-3 text-2xl font-semibold text-white">
                  {efficiency.cost_model.modeled_capacity_value_eur == null ? (
                    <Localized i18n={i18n} path="delivery.savings_pending" />
                  ) : (
                    <LocalizedCurrency value={efficiency.cost_model.modeled_capacity_value_eur} />
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="shell py-14 md:py-20">
        <div className="eyebrow"><Localized i18n={i18n} path="projects.eyebrow" /></div>
        <h2 className="section-title mt-3"><Localized i18n={i18n} path="projects.title" /></h2>
        <p className="section-copy"><Localized i18n={i18n} path="projects.copy" /></p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} className="panel p-6 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xl font-semibold tracking-[-0.025em] text-white">{project.name}</div>
                  <div className="mt-1 text-sm text-slate-500">{project.fullName}</div>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs ${statusClasses(project.status)}`}>
                  <Localized i18n={i18n} path={`statuses.${project.status}`} />
                </span>
              </div>

              <p className="mt-5 text-sm leading-7 text-slate-400">
                <Localized i18n={i18n} path={`projects.${project.id}.summary`} />
              </p>

              <div className="mt-6">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span><Localized i18n={i18n} path="projects.workstream_progress" /></span>
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
                <span className="text-slate-500">
                  <Localized i18n={i18n} path={`environments.${project.environment}`} />
                </span>
                {project.repository ? (
                  <a
                    href={`https://github.com/${project.repository}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-cyan-200 transition hover:text-cyan-100"
                  >
                    <Localized i18n={i18n} path="projects.repository" />
                  </a>
                ) : (
                  <span className="text-slate-600"><Localized i18n={i18n} path="projects.repository_follows" /></span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="eyebrow"><Localized i18n={i18n} path="architecture.eyebrow" /></div>
        <h2 className="section-title mt-3"><Localized i18n={i18n} path="architecture.title" /></h2>
        <p className="section-copy"><Localized i18n={i18n} path="architecture.copy" /></p>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {architecture.map((step, index) => (
            <div key={step.id} className="relative">
              <div className="panel h-full p-5">
                <div className="text-xs font-semibold text-cyan-200">{String(index + 1).padStart(2, "0")}</div>
                <div className="mt-4 text-sm font-semibold text-white">
                  <Localized i18n={i18n} path={`architecture_steps.${step.id}.label`} />
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-500">
                  <Localized i18n={i18n} path={`architecture_steps.${step.id}.description`} />
                </p>
              </div>
              {index < architecture.length - 1 && (
                <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-slate-600 xl:block">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="shell py-14 md:py-20">
        <div className="eyebrow"><Localized i18n={i18n} path="roadmap.eyebrow" /></div>
        <h2 className="section-title mt-3"><Localized i18n={i18n} path="roadmap.title" /></h2>
        <p className="section-copy"><Localized i18n={i18n} path="roadmap.copy" /></p>

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
                  <div className="mt-2 text-sm font-medium text-white">
                    <Localized i18n={i18n} path={`milestones.${milestone.id}`} />
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] ${
                    milestone.complete
                      ? "bg-emerald-300/10 text-emerald-200"
                      : "bg-white/[0.04] text-slate-500"
                  }`}
                >
                  <Localized i18n={i18n} path={milestone.complete ? "roadmap.complete" : "roadmap.planned"} />
                </span>
              </div>
              <div className="mt-5 flex items-center justify-between border-t hairline pt-4 text-xs">
                <span className="text-slate-500">
                  <Localized i18n={i18n} path="roadmap.target" /> <LocalizedDate value={milestone.target} />
                </span>
                <span className={milestone.actual_completion ? "text-emerald-200" : "text-slate-600"}>
                  {milestone.actual_completion ? (
                    <>
                      <Localized i18n={i18n} path="roadmap.actual" />{" "}
                      <LocalizedDate value={milestone.actual_completion} />
                    </>
                  ) : (
                    <Localized i18n={i18n} path="roadmap.pending" />
                  )}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="shell mt-10 border-t hairline py-10 text-xs text-slate-600">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <span><Localized i18n={i18n} path="footer.source" /></span>
          <span><Localized i18n={i18n} path="footer.snapshot" /> <LocalizedDate value={metrics.as_of} /></span>
        </div>
      </footer>
    </main>
  );
}
