import { LanguageToggle } from "../components/language-toggle";
import { ThemeToggle } from "../components/theme-toggle";
import { loadPortfolioData } from "../lib/portfolio-data";
import { loadHighEndControlCenter } from "../lib/high-end-control-center";

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

function highEndStatusClasses(status: string): string {
  if (status === "DONE") return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  if (status === "IN_PROGRESS") return "border-cyan-400/25 bg-cyan-400/10 text-cyan-100";
  if (status === "BLOCKED") return "border-rose-400/25 bg-rose-400/10 text-rose-100";
  if (status === "READY") return "border-indigo-400/25 bg-indigo-400/10 text-indigo-100";
  return "border-slate-400/15 bg-slate-400/5 text-slate-400";
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
  const highEnd = loadHighEndControlCenter();
  const currentSprint = highEnd.sprints.find((sprint) => sprint.id === highEnd.program.current_sprint_id) ?? highEnd.sprints[0];
  const activeSprints = highEnd.sprints.filter((sprint) => sprint.status === "IN_PROGRESS");
  const completedSprints = highEnd.sprints.filter((sprint) => sprint.status === "DONE");
  const auditedBlockers = highEnd.sprints.reduce((sum, sprint) => sum + sprint.blocker_count, 0);
  const bcsentinelCoreSprints = highEnd.sprints.filter((sprint) => ["S01","S02","S03","S04","S05","S06"].includes(sprint.id));
  const bcsentinelScope = bcsentinelCoreSprints.length
    ? bcsentinelCoreSprints.reduce((sum, sprint) => sum + sprint.scope_readiness_pct, 0) / bcsentinelCoreSprints.length
    : 0;
  const eoipSprint = highEnd.sprints.find((sprint) => sprint.id === "S08");
  const aiSprints = highEnd.sprints.filter((sprint) => ["S12","S13","S14","S15","S16"].includes(sprint.id));
  const aiScope = aiSprints.length
    ? aiSprints.reduce((sum, sprint) => sum + sprint.scope_readiness_pct, 0) / aiSprints.length
    : 0;
  const efficiency = metrics.delivery_efficiency;
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
          <a className="transition hover:text-white" href="#program">
            <span className="lang-en">Program</span>
            <span className="lang-de">Programm</span>
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
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="eyebrow">
                <span className="lang-en">Live High-End Program</span>
                <span className="lang-de">Live High-End-Programm</span>
              </div>
              <div className="mt-2 text-lg font-medium text-white">
                {currentSprint.id} — {currentSprint.title}
              </div>
            </div>
            <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${highEndStatusClasses(currentSprint.status)}`}>
              {currentSprint.status}
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-5">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <span className="lang-en">Program complete</span>
                <span className="lang-de">Programmfortschritt</span>
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">{formatPct(highEnd.program.program_completion_pct)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <span className="lang-en">Current sprint</span>
                <span className="lang-de">Aktueller Sprint</span>
              </div>
              <div className="mt-2 text-3xl font-semibold text-cyan-200">{formatPct(currentSprint.scope_readiness_pct)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <span className="lang-en">Sprints done</span>
                <span className="lang-de">Sprints fertig</span>
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">{completedSprints.length}/20</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
                <span className="lang-en">Audited blockers</span>
                <span className="lang-de">Auditierte Blocker</span>
              </div>
              <div className="mt-2 text-3xl font-semibold text-white">{auditedBlockers}</div>
            </div>
          </div>

          <div className="mt-8 border-t hairline pt-5">
            <div className="flex items-center justify-between gap-4 text-xs text-slate-500">
              <span>
                <span className="lang-en">Current sprint scope</span>
                <span className="lang-de">Aktueller Sprint-Scope</span>
              </span>
              <span>{currentSprint.detail_done_count}/{currentSprint.detail_total_count} <span className="lang-en">details done</span><span className="lang-de">Details fertig</span></span>
            </div>
            <div className="progress-track mt-3">
              <div className="progress-fill" style={{ width: `${currentSprint.scope_readiness_pct}%` }} />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-slate-400">
                <span className="lang-en">Target</span>
                <span className="lang-de">Ziel</span>
              </span>
              <span className="font-medium text-white"><LocalizedDate value={String(highEnd.program.target_date)} /></span>
            </div>
          </div>
        </div>
      </section>

      <section id="program" className="shell py-14 md:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">
              <span className="lang-en">Program at a glance</span>
              <span className="lang-de">Programm auf einen Blick</span>
            </div>
            <h2 className="section-title mt-3">
              <span className="lang-en">One portfolio. One delivery truth.</span>
              <span className="lang-de">Ein Portfolio. Eine Delivery-Wahrheit.</span>
            </h2>
            <p className="section-copy">
              <span className="lang-en">The public portfolio and delivery control center now use the same structured GitHub data: program progress, BCSentinel readiness, EOIP, AI roadmap, sprint detail and evidence.</span>
              <span className="lang-de">Portfolio und Delivery Control Center nutzen dieselben strukturierten GitHub-Daten: Programmfortschritt, BCSentinel-Readiness, EOIP, AI-Roadmap, Sprintdetails und Evidence.</span>
            </p>
          </div>
          <div className="rounded-2xl border hairline bg-white/[0.025] px-5 py-4 text-sm">
            <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
              <span className="lang-en">Active delivery</span>
              <span className="lang-de">Aktive Delivery</span>
            </div>
            <div className="mt-1 font-semibold text-white">{activeSprints.length} <span className="lang-en">active sprints</span><span className="lang-de">aktive Sprints</span></div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            ["Program", highEnd.program.program_completion_pct, "S00–S19"],
            ["BCSentinel Core", bcsentinelScope, "S01–S06"],
            ["EOIP / Data", eoipSprint?.scope_readiness_pct ?? 0, "S08"],
            ["AI Platform", aiScope, "S12–S16"],
          ].map(([label, value, scope]) => (
            <article key={String(label)} className="panel p-5 md:p-6">
              <div className="text-xs uppercase tracking-[0.14em] text-slate-500">{label}</div>
              <div className="metric-value mt-3">{formatPct(Number(value))}</div>
              <div className="mt-2 text-xs text-slate-500">{scope}</div>
            </article>
          ))}
          <article className="panel p-5 md:p-6">
            <div className="text-xs uppercase tracking-[0.14em] text-slate-500">
              <span className="lang-en">Capacity baseline</span>
              <span className="lang-de">Kapazitäts-Baseline</span>
            </div>
            <div className="metric-value mt-3">{highEnd.program.planned_hours_per_week} h</div>
            <div className="mt-2 text-xs text-slate-500">
              <span className="lang-en">per week · measured</span>
              <span className="lang-de">pro Woche · gemessen</span>
            </div>
          </article>
        </div>

        <article className="panel mt-5 p-6 md:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="eyebrow">
                <span className="lang-en">Now building</span>
                <span className="lang-de">Aktuell in Arbeit</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">{currentSprint.id} — {currentSprint.title}</h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{currentSprint.objective}</p>
            </div>
            <div className="text-left lg:text-right">
              <div className="text-4xl font-semibold tracking-[-0.04em] text-cyan-200">{formatPct(currentSprint.scope_readiness_pct)}</div>
              <div className="mt-1 text-xs text-slate-500">
                <span className="lang-en">scope readiness</span>
                <span className="lang-de">Scope-Readiness</span>
              </div>
            </div>
          </div>
          <div className="progress-track mt-6">
            <div className="progress-fill" style={{ width: `${currentSprint.scope_readiness_pct}%` }} />
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {currentSprint.detail_items.slice(0, 6).map((item) => (
              <div key={item.id} className="rounded-2xl border hairline bg-white/[0.025] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-200">{item.id}</div>
                    <div className="mt-1 text-sm font-medium text-slate-200">{item.title}</div>
                  </div>
                  <span className={`rounded-full border px-2 py-1 text-[10px] font-semibold ${item.status === "done" || item.status === "verified" ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-200" : item.status === "in_progress" ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-100" : item.status === "blocked" ? "border-rose-400/20 bg-rose-400/10 text-rose-100" : "border-slate-400/15 bg-white/[0.025] text-slate-400"}`}>
                    {item.status.replaceAll("_", " ").toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`./control-center/${currentSprint.id}/`} className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              <span className="lang-en">Open full sprint detail</span>
              <span className="lang-de">Vollständige Sprintdetails</span>
            </a>
            <a href="#roadmap" className="rounded-xl border hairline bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07]">
              <span className="lang-en">See full roadmap</span>
              <span className="lang-de">Gesamte Roadmap</span>
            </a>
          </div>
        </article>
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
                  {efficiency.baseline_delivery_window_elapsed_days} <Localized i18n={i18n} path="units.days" />
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
                  {efficiency.forecast_delivery_window_elapsed_days} <Localized i18n={i18n} path="units.days" />
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
                  {efficiency.forecast_schedule_compression_days} <Localized i18n={i18n} path="units.days" />
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
                    <>
                      {efficiency.actual_delivery_window_elapsed_days}{" "}
                      <Localized i18n={i18n} path="units.days" />
                    </>
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
                  {efficiency.human_effort.planned_portfolio_hours} <Localized i18n={i18n} path="units.hours" />
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  {efficiency.human_effort.planned_mandatory_hours} <Localized i18n={i18n} path="units.hours" />{" "}<Localized i18n={i18n} path="delivery.mandatory_scope" />
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
                    <>
                      {efficiency.human_effort.observed_hours}{" "}
                      <Localized i18n={i18n} path="units.hours" />
                    </>
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
                  <LocalizedCurrency value={efficiency.cost_model.planned_mandatory_cost_eur} />{" "}<Localized i18n={i18n} path="delivery.mandatory_scope" />
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
                <Localized i18n={i18n} path={`project_cards.${project.id}.summary`} />
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
        <div className="eyebrow">
          <span className="lang-en">High-End roadmap</span>
          <span className="lang-de">High-End-Roadmap</span>
        </div>
        <h2 className="section-title mt-3">
          <span className="lang-en">S00–S19 from Core to Professional Beta.</span>
          <span className="lang-de">S00–S19 von Core bis Professional Beta.</span>
        </h2>
        <p className="section-copy">
          <span className="lang-en">Every sprint shows evidence-backed scope readiness. Existing verified work is credited; in-progress work remains visible but receives no completion credit.</span>
          <span className="lang-de">Jeder Sprint zeigt evidenzbasierte Scope-Readiness. Bereits verifizierte Arbeit wird angerechnet; laufende Arbeit bleibt sichtbar, erhält aber noch keinen Completion-Credit.</span>
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {highEnd.sprints.map((sprint) => (
            <a
              key={sprint.id}
              href={`./control-center/${sprint.id}/`}
              className={`rounded-2xl border p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/25 ${sprint.id === currentSprint.id ? "border-cyan-300/30 bg-cyan-300/[0.055]" : sprint.status === "DONE" ? "border-emerald-300/15 bg-emerald-300/[0.04]" : "hairline bg-white/[0.02]"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs font-bold text-cyan-200">{sprint.id}</div>
                <span className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${highEndStatusClasses(sprint.status)}`}>{sprint.status}</span>
              </div>
              <div className="mt-3 min-h-12 text-sm font-semibold leading-6 text-white">{sprint.title}</div>
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <div className="text-2xl font-semibold tracking-[-0.04em] text-white">{formatPct(sprint.scope_readiness_pct)}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                    <span className="lang-en">scope readiness</span>
                    <span className="lang-de">Scope-Readiness</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">{sprint.detail_done_count}/{sprint.detail_total_count}</div>
              </div>
              <div className="progress-track mt-3">
                <div className="progress-fill" style={{ width: `${sprint.scope_readiness_pct}%` }} />
              </div>
            </a>
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
