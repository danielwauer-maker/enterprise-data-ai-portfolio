import { LanguageToggle } from "../../../components/language-toggle";
import { ThemeToggle } from "../../../components/theme-toggle";
import {
  loadBCSentinelCoreGoLivePlan,
  loadBCSentinelPrePilotClosurePlan,
} from "../../../lib/high-end-control-center";

export const dynamic = "force-static";

function Dual({ en, de }: { en: string; de: string }) {
  return (
    <>
      <span className="lang-en">{en}</span>
      <span className="lang-de">{de}</span>
    </>
  );
}

function pct(value: number) {
  return `${Number(value ?? 0).toFixed(Number(value ?? 0) % 1 === 0 ? 0 : 1)}%`;
}

function statusClass(status: string) {
  if (status === "DONE") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  if (status === "IN_PROGRESS") return "border-cyan-400/30 bg-cyan-400/10 text-cyan-100";
  if (status === "BLOCKED") return "border-rose-400/30 bg-rose-400/10 text-rose-100";
  return "border-slate-400/15 bg-white/[0.025] text-slate-300";
}

export default function BCSentinelPrePilotClosurePage() {
  const closure = loadBCSentinelPrePilotClosurePlan();
  const corePlan = loadBCSentinelCoreGoLivePlan();
  const active = closure.sprints.filter((sprint) => sprint.status === "IN_PROGRESS");

  return (
    <main>
      <header className="shell flex min-h-20 flex-wrap items-center justify-between gap-3 border-b hairline py-3 sm:flex-nowrap">
        <a href="../" className="flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border hairline bg-white/[0.03] text-xs text-cyan-200">X</span>
          <span>BCSentinel Pre-Pilot Closure</span>
        </a>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a href="../" className="rounded-full border hairline bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200">
            <Dual en="Control Center" de="Control Center" />
          </a>
        </div>
      </header>

      <section className="shell py-14 md:py-20">
        <div className="eyebrow"><Dual en="BCSentinel · Controlled Pilot" de="BCSentinel · Controlled Pilot" /></div>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">
              <Dual en="Pre-Pilot Product & Operations Closure" de="Pre-Pilot Product- & Operations-Abschluss" />
            </h1>
            <p className="mt-5 max-w-4xl text-base leading-8 text-slate-400">
              <Dual
                en="X0.1–X8 track the newly added product, commercial, operational, visual and DEV-acceptance work. This readiness is derived separately and never inflates the official Go-Live KPI before runtime acceptance."
                de="X0.1–X8 bilden die neu hinzugekommenen Produkt-, Commercial-, Operations-, Visual- und DEV-Abnahmearbeiten ab. Diese Readiness wird separat abgeleitet und erhöht die offizielle Go-Live-Kennzahl vor der Runtime-Abnahme nicht künstlich."
              />
            </p>
          </div>
          <span className="w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-100">
            {active.length} <Dual en="active closure sprints" de="aktive Closure-Sprints" />
          </span>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Official Go-Live readiness" de="Offizielle Go-Live-Readiness" /></div>
            <div className="mt-2 text-3xl font-semibold text-white">{pct(corePlan.readiness.current_go_live_readiness_pct)}</div>
            <p className="mt-2 text-xs leading-5 text-slate-500"><Dual en="Acceptance KPI · unchanged by X-work" de="Acceptance-KPI · unverändert durch X-Arbeit" /></p>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Pre-Pilot closure readiness" de="Pre-Pilot-Closure-Readiness" /></div>
            <div className="mt-2 text-3xl font-semibold text-cyan-200">{pct(closure.closure_readiness_pct)}</div>
            <div className="mt-3 progress-track"><div className="progress-fill" style={{ width: `${closure.closure_readiness_pct}%` }} /></div>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Closure sprints done" de="Closure-Sprints fertig" /></div>
            <div className="mt-2 text-3xl font-semibold text-white">{closure.done_count}/{closure.total_count}</div>
            <p className="mt-2 text-xs leading-5 text-slate-500"><Dual en="Derived from sprint statuses" de="Aus Sprint-Status abgeleitet" /></p>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="DEV acceptance host" de="DEV-Abnahmeumgebung" /></div>
            <div className="mt-2 text-lg font-semibold text-white">dev.bcsentinel.com</div>
            <p className="mt-2 text-xs leading-5 text-slate-500"><Dual en="DEV → RC → PROD" de="DEV → RC → PROD" /></p>
          </article>
        </div>

        <article className="panel mt-5 p-5 md:p-6">
          <p className="text-sm leading-7 text-slate-400">
            <Dual
              en="GitHub remains the technical source of truth. The closure percentage on this page is calculated from the X-sprint progress values; the official 97.5% Go-Live readiness remains sourced only from the central Core Go-Live plan until E3–E8/F1 evidence changes it."
              de="GitHub bleibt die technische Source of Truth. Die Closure-Prozentzahl auf dieser Seite wird aus den X-Sprint-Fortschritten berechnet; die offizielle Go-Live-Readiness von 97,5 % stammt weiterhin ausschließlich aus dem zentralen Core-Go-Live-Plan, bis Evidence aus E3–E8/F1 sie verändert."
            />
          </p>
        </article>
      </section>

      <section className="shell pb-20">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {closure.sprints.map((sprint) => (
            <article key={sprint.id} className={`panel p-5 ${sprint.status === "IN_PROGRESS" ? "ring-1 ring-cyan-300/30" : ""}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-cyan-200">{sprint.id}</span>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusClass(sprint.status)}`}>{sprint.status}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold leading-6 text-white"><Dual en={sprint.title_en} de={sprint.title_de} /></h2>
              <div className="progress-track mt-5"><div className="progress-fill" style={{ width: `${sprint.progress_pct}%` }} /></div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200"><Dual en="Technical closure" de="Technischer Abschluss" /></span>
                <span className="font-semibold text-cyan-200">{pct(sprint.progress_pct)}</span>
              </div>
              <p className="mt-4 border-t hairline pt-4 text-xs leading-6 text-slate-400">{sprint.evidence}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
