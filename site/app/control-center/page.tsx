import { LanguageToggle } from "../../components/language-toggle";
import { ThemeToggle } from "../../components/theme-toggle";
import { loadHighEndControlCenter } from "../../lib/high-end-control-center";

export const dynamic = "force-static";

const categoryLabels: Record<string, { en: string; de: string }> = {
  requirements: { en: "Requirements", de: "Anforderungen" },
  architecture: { en: "Architecture", de: "Architektur" },
  implementation: { en: "Implementation", de: "Umsetzung" },
  automated_tests: { en: "Automated tests", de: "Automatisierte Tests" },
  runtime_acceptance: { en: "Runtime acceptance", de: "Runtime-Abnahme" },
  documentation_evidence: { en: "Docs / evidence", de: "Doku / Evidence" },
  merge_release_closeout: { en: "Closeout", de: "Abschluss" },
};

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
  if (status === "READY") return "border-indigo-400/30 bg-indigo-400/10 text-indigo-100";
  return "border-slate-400/15 bg-white/[0.025] text-slate-300";
}

export default function ControlCenterPage() {
  const data = loadHighEndControlCenter();
  const p = data.program;
  const current = data.sprints.find((s) => s.id === p.current_sprint_id) ?? data.sprints[0];

  return (
    <main>
      <header className="shell flex min-h-20 flex-wrap items-center justify-between gap-3 border-b hairline py-3 sm:flex-nowrap">
        <a href="../" className="flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border hairline bg-white/[0.03] text-xs text-cyan-200">
            CC
          </span>
          <span>Control Center v2</span>
        </a>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a href="../" className="rounded-full border hairline bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200">
            <Dual en="Portfolio" de="Portfolio" />
          </a>
        </div>
      </header>

      <section className="shell py-14 md:py-20">
        <div className="eyebrow"><Dual en="Enterprise Data & AI High-End Program" de="Enterprise Data & AI High-End-Programm" /></div>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="max-w-5xl text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">
              <Dual en="Delivery Control Center" de="Delivery Control Center" />
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-400">
              <Dual
                en="S00–S19, sprint readiness, planned vs. actual effort, dependencies and the complete journey from BCSentinel Core to Professional Beta."
                de="S00–S19, Sprint-Readiness, Plan-vs.-Ist-Aufwand, Abhängigkeiten und die komplette Reise von BCSentinel Core bis zur Professional Beta."
              />
            </p>
          </div>
          <span className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold ${statusClass(String(p.status))}`}>
            {String(p.status)}
          </span>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {[
            [<Dual key="a" en="Program completion" de="Programmfortschritt" />, pct(p.program_completion_pct)],
            [<Dual key="b" en="Planned effort" de="Geplanter Aufwand" />, `${p.planned_hours} h`],
            [<Dual key="c" en="Actual effort" de="Ist-Aufwand" />, `${p.actual_hours} h`],
            [<Dual key="d" en="Remaining" de="Verbleibend" />, `${p.remaining_hours} h`],
            [<Dual key="e" en="Target" de="Ziel" />, "30 Jun 2027"],
          ].map(([label, value], index) => (
            <article key={index} className="panel p-5">
              <div className="text-xs text-slate-400">{label}</div>
              <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{value}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell pb-10">
        <article className="panel p-6 md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="eyebrow"><Dual en="Current sprint" de="Aktueller Sprint" /></div>
              <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">{current.id} — {current.title}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-400">{current.objective}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-semibold tracking-[-0.04em] text-cyan-200">{pct(current.scope_readiness_pct)}</div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">
                <Dual en="Scope readiness" de="Scope-Readiness" />
              </div>
            </div>
          </div>
          <div className="progress-track mt-6">
            <div className="progress-fill" style={{ width: `${current.readiness_pct}%` }} />
          </div>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-400">
            <span>{current.start} → {current.end}</span>
            <span><Dual en="Plan" de="Plan" /> {current.planned_hours} h</span>
            <span><Dual en="Actual" de="Ist" /> {current.actual_hours} h</span>
            <span><Dual en="Track" de="Track" />: {current.track}</span>
            <span><Dual en="Details done" de="Details fertig" />: {current.detail_done_count}/{current.detail_total_count}</span>
            <span><Dual en="Delivery gates" de="Delivery-Gates" />: {pct(current.delivery_gate_readiness_pct)}</span>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {Object.entries(current.readiness_breakdown).map(([key, value]) => (
              <div key={key} className="rounded-2xl border hairline bg-white/[0.025] p-4">
                <div className="text-[11px] text-slate-400">
                  <Dual en={categoryLabels[key]?.en ?? key} de={categoryLabels[key]?.de ?? key} />
                </div>
                <div className="mt-1 text-xl font-semibold text-white">{pct(value)}</div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="shell py-10">
        <div className="eyebrow"><Dual en="Roadmap" de="Roadmap" /></div>
        <h2 className="section-title mt-3"><Dual en="Sprint plan S00–S19" de="Sprintplan S00–S19" /></h2>
        <p className="section-copy">
          <Dual
            en="Every sprint has a fixed outcome, budget, dependency chain and objective readiness score."
            de="Jeder Sprint besitzt ein festes Ergebnis, Budget, eine Abhängigkeitskette und eine objektiv berechnete Readiness."
          />
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.sprints.map((sprint) => (
            <article key={sprint.id} className={`panel p-5 ${sprint.status === "IN_PROGRESS" ? "ring-1 ring-cyan-300/30" : ""}`}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-cyan-200">{sprint.id}</span>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${statusClass(sprint.status)}`}>{sprint.status}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold leading-6 text-white">{sprint.title}</h3>
              <div className="mt-2 text-xs text-slate-400">{sprint.start} → {sprint.end}</div>
              <div className="progress-track mt-5">
                <div className="progress-fill" style={{ width: `${sprint.readiness_pct}%` }} />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200"><Dual en="Scope readiness" de="Scope-Readiness" /> {pct(sprint.scope_readiness_pct)}</span>
                <span className="text-slate-400">{sprint.actual_hours} / {sprint.planned_hours} h</span>
              </div>
              <div className="mt-4 border-t hairline pt-4 text-xs leading-6 text-slate-400">
                <div><Dual en="Track" de="Track" />: {sprint.track}</div>
                <div><Dual en="Details" de="Details" />: {sprint.detail_done_count}/{sprint.detail_total_count} <Dual en="done" de="fertig" /></div>
                <div><Dual en="Delivery gates" de="Delivery-Gates" />: {pct(sprint.delivery_gate_readiness_pct)}</div>
                <div><Dual en="Depends on" de="Abhängig von" />: {sprint.depends_on.length ? sprint.depends_on.join(", ") : "—"}</div>
              </div>
              <a href={`./${sprint.id}/`} className="mt-4 inline-flex text-xs font-semibold text-cyan-200 transition hover:text-cyan-100">
                <Dual en="Open sprint detail →" de="Sprint-Detail öffnen →" />
              </a>
              <details className="mt-4 border-t hairline pt-3 text-sm">
                <summary className="cursor-pointer font-medium text-slate-200"><Dual en="Sprint objective" de="Sprintziel" /></summary>
                <p className="mt-3 leading-7 text-slate-400">{sprint.objective}</p>
                <div className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200">
                  <Dual en="Expected result" de="Erwartetes Ergebnis" />
                </div>
                <p className="mt-2 leading-7 text-slate-400">{sprint.result}</p>
              </details>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-10">
        <div className="eyebrow"><Dual en="Timeline" de="Timeline" /></div>
        <h2 className="section-title mt-3"><Dual en="History · Current · Roadmap" de="Historie · Aktuell · Roadmap" /></h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="panel border-t-2 border-t-slate-500 p-6">
            <div className="text-xs text-slate-400">Jun–Sep 2026</div>
            <h3 className="mt-3 text-lg font-semibold text-white"><Dual en="Historical foundation" de="Historische Basis" /></h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              <Dual en="BCSentinel product development, runtime hardening, EOIP foundation and Portfolio Baseline v1." de="BCSentinel-Produktentwicklung, Runtime-Hardening, EOIP-Grundlage und Portfolio-Baseline v1." />
            </p>
          </article>
          <article className="panel border-t-2 border-t-cyan-300 p-6">
            <div className="text-xs text-slate-400">01 Oct 2026</div>
            <h3 className="mt-3 text-lg font-semibold text-white">High-End Baseline v2</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              <Dual en="Measured 20 h/week delivery begins with sprint, effort and AI-assisted engineering metrics." de="Die gemessene 20-h/Woche-Delivery startet mit Sprint-, Aufwand- und AI-assisted-Engineering-Metriken." />
            </p>
          </article>
          <article className="panel border-t-2 border-t-emerald-300 p-6">
            <div className="text-xs text-slate-400">30 Jun 2027</div>
            <h3 className="mt-3 text-lg font-semibold text-white">BCSentinel Professional Beta</h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              <Dual en="Core, Decision Intelligence, AI Copilot, controlled agents/actions and enterprise engineering evidence." de="Core, Decision Intelligence, AI Copilot, kontrollierte Agents/Aktionen und Enterprise-Engineering-Evidence." />
            </p>
          </article>
        </div>
      </section>

      <section className="shell py-10 pb-20">
        <article className="panel p-6 md:p-8">
          <div className="eyebrow"><Dual en="Methodology" de="Methodik" /></div>
          <h2 className="mt-3 text-2xl font-semibold text-white"><Dual en="Readiness is evidence-based" de="Readiness basiert auf Evidence" /></h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
            <Dual
              en="Readiness is calculated from explicit checklist items. Work in progress receives no completion credit. Historical effort is never fabricated from commit timestamps."
              de="Readiness wird aus expliziten Checklistenpunkten berechnet. Laufende Arbeit erhält noch keinen Completion-Credit. Historischer Aufwand wird niemals aus Commit-Zeitstempeln erfunden."
            />
          </p>
        </article>
      </section>
    </main>
  );
}
