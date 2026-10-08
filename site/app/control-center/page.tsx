import { LanguageToggle } from "../../components/language-toggle";
import { ThemeToggle } from "../../components/theme-toggle";
import {
  loadBCSentinelCoreGoLivePlan,
  loadBCSentinelDesignReadiness,
  loadHighEndControlCenter,
} from "../../lib/high-end-control-center";

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
  const corePlan = loadBCSentinelCoreGoLivePlan();
  const designReadiness = loadBCSentinelDesignReadiness();
  const p = data.program;
  const current = data.sprints.find((s) => s.id === p.current_sprint_id) ?? data.sprints[0];
  const pagesBelowTarget = designReadiness.design_scope.filter(
    (page) => Number(page.readiness_pct ?? 0) < Number(page.target_pct ?? designReadiness.summary.target_min_page_readiness_pct),
  );

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
                en="S00–S19 evidence-backed program delivery plus the detailed BCSentinel Core Pilot Go-Live closure plan from Product Truth through runtime acceptance."
                de="Evidenzbasierte S00–S19-Programmdelivery plus der detaillierte BCSentinel-Core-Pilot-Go-Live-Plan von Product Truth bis zur Runtime-Abnahme."
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
              <div className="eyebrow"><Dual en="Current program sprint" de="Aktueller Programmsprint" /></div>
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
        <div className="eyebrow"><Dual en="BCSentinel Core · Pilot Go-Live Closure" de="BCSentinel Core · Pilot-Go-Live-Abschluss" /></div>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="section-title"><Dual en="A1–F1: from product truth to controlled pilot launch" de="A1–F1: von Product Truth bis zum kontrollierten Pilot-Start" /></h2>
            <p className="section-copy">
              <Dual
                en="This detailed closure plan does not replace S00–S19. It decomposes the remaining BCSentinel Core work without double-counting it in program completion."
                de="Dieser detaillierte Abschlussplan ersetzt S00–S19 nicht. Er zerlegt die verbleibende BCSentinel-Core-Arbeit, ohne sie im Programmfortschritt doppelt zu zählen."
              />
            </p>
          </div>
          <span className="w-fit rounded-full border border-indigo-400/30 bg-indigo-400/10 px-4 py-2 text-xs font-semibold text-indigo-100">
            <Dual en="Next: A1 Authority Freeze" de="Als Nächstes: A1 Authority Freeze" />
          </span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Pilot Go-Live readiness" de="Pilot-Go-Live-Readiness" /></div>
            <div className="mt-2 text-3xl font-semibold text-cyan-200">{pct(corePlan.readiness.current_go_live_readiness_pct)}</div>
            <div className="mt-3 progress-track"><div className="progress-fill" style={{ width: `${corePlan.readiness.current_go_live_readiness_pct}%` }} /></div>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Evidence-backed Core scope" de="Evidenzbasierter Core-Scope" /></div>
            <div className="mt-2 text-3xl font-semibold text-white">{pct(corePlan.readiness.core_scope_readiness_pct)}</div>
            <p className="mt-2 text-xs leading-5 text-slate-500"><Dual en="Existing S01–S06 weighted scope" de="Bestehender gewichteter S01–S06-Scope" /></p>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Design templates" de="Design-Vorlagen" /></div>
            <div className="mt-2 text-3xl font-semibold text-white">{pct(designReadiness.summary.design_template_readiness_pct)}</div>
            <p className="mt-2 text-xs leading-5 text-slate-500"><Dual en="All templates incl. missing flows" de="Gesamt inkl. fehlender Flows" /></p>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Core product design" de="Kernprodukt-Design" /></div>
            <div className="mt-2 text-3xl font-semibold text-white">{pct(designReadiness.summary.core_product_design_readiness_pct)}</div>
            <p className="mt-2 text-xs leading-5 text-slate-500"><Dual en="Existing visible SaaS core" de="Bestehender sichtbarer SaaS-Kern" /></p>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Pages below target" de="Pages unter Ziel" /></div>
            <div className="mt-2 text-3xl font-semibold text-white">{pagesBelowTarget.length}</div>
            <p className="mt-2 text-xs leading-5 text-slate-500"><Dual en={`Target >=${designReadiness.summary.target_min_page_readiness_pct}%`} de={`Ziel >=${designReadiness.summary.target_min_page_readiness_pct}%`} /></p>
          </article>
        </div>

        <article className="panel mt-5 p-5 md:p-6">
          <div className="text-sm leading-7 text-slate-400">
            <Dual en={corePlan.readiness.note_en} de={corePlan.readiness.note_de} />
          </div>
        </article>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {corePlan.phases.map((phase) => {
            const phaseSprints = corePlan.sprints.filter((sprint) => sprint.phase === phase.id);
            return (
              <details key={phase.id} className="panel p-5" open={phase.id === "A"}>
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-cyan-200">PHASE {phase.id}</div>
                      <h3 className="mt-2 text-lg font-semibold text-white"><Dual en={phase.title_en} de={phase.title_de} /></h3>
                    </div>
                    <span className="rounded-full border hairline bg-white/[0.03] px-3 py-1 text-[10px] text-slate-400">{phaseSprints.length} sprints</span>
                  </div>
                </summary>
                <div className="mt-5 space-y-3 border-t hairline pt-4">
                  {phaseSprints.map((sprint) => (
                    <div key={sprint.id} className="rounded-2xl border hairline bg-white/[0.02] p-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-cyan-200">{sprint.id}</span>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${statusClass(sprint.status)}`}>{sprint.status}</span>
                          <span className="text-[10px] font-semibold text-slate-500">{sprint.priority}</span>
                        </div>
                        <span className="text-xs font-semibold text-slate-200"><Dual en="After PASS" de="Nach PASS" /> {pct(sprint.readiness_after_pass_pct)}</span>
                      </div>
                      <div className="mt-3 text-sm font-semibold text-white"><Dual en={sprint.title_en} de={sprint.title_de} /></div>
                      <p className="mt-2 text-xs leading-6 text-slate-400"><Dual en={sprint.objective_en} de={sprint.objective_de} /></p>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      </section>

      <section className="shell py-10">
        <div className="eyebrow"><Dual en="Design readiness · 08 Oct 2026" de="Design-Readiness · 08.10.2026" /></div>
        <h2 className="section-title mt-3"><Dual en="Pages requiring closure before Figma/Codex freeze" de="Pages, die vor Figma/Codex-Freeze noch geschlossen werden müssen" /></h2>
        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {pagesBelowTarget.map((page) => (
            <article key={String(page.id)} className="panel p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold text-white">{String(page.title)}</h3>
                <span className="text-lg font-semibold text-cyan-200">{pct(Number(page.readiness_pct))}</span>
              </div>
              <p className="mt-3 text-xs leading-6 text-slate-400">{String(page.required_fix)}</p>
              <div className="mt-4 text-[10px] uppercase tracking-[0.14em] text-slate-500"><Dual en="Target" de="Ziel" /> {pct(Number(page.target_pct))}</div>
            </article>
          ))}
        </div>
        <article className="panel mt-5 p-5">
          <div className="text-xs font-semibold text-slate-200"><Dual en="Missing design packages" de="Noch fehlende Designpakete" /></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {designReadiness.missing_design_scope.map((item) => (
              <span key={String(item.id)} className="rounded-full border hairline bg-white/[0.025] px-3 py-1.5 text-xs text-slate-300">
                {String(item.title)} · {String(item.priority)}
              </span>
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
            <div className="text-xs text-slate-400">08 Oct 2026</div>
            <h3 className="mt-3 text-lg font-semibold text-white"><Dual en="Core Pilot closure plan active" de="Core-Pilot-Abschlussplan aktiv" /></h3>
            <p className="mt-3 text-sm leading-7 text-slate-400">
              <Dual en="Product truth, >=98% design closure, remediation, notifications, implementation and runtime evidence are now tracked as one A1–F1 closure sequence." de="Product Truth, >=98% Design-Abschluss, Remediation, Notifications, Umsetzung und Runtime-Evidence werden jetzt als eine A1–F1-Abschlusssequenz verfolgt." />
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
          <h2 className="mt-3 text-2xl font-semibold text-white"><Dual en="Readiness is evidence-based where evidence exists" de="Readiness ist evidenzbasiert, wo Evidence vorliegt" /></h2>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
            <Dual
              en="S00–S19 program completion and core scope readiness remain evidence-backed. The 61% Pilot Go-Live readiness is an explicitly labelled planning baseline that includes newly identified product, design, implementation and manual runtime work. It must not be confused with evidence-backed completion."
              de="S00–S19-Programmfortschritt und Core-Scope-Readiness bleiben evidenzbasiert. Die 61% Pilot-Go-Live-Readiness ist ausdrücklich als Planungsbaseline gekennzeichnet und berücksichtigt neu identifizierte Produkt-, Design-, Implementierungs- und manuelle Runtime-Arbeit. Sie darf nicht mit evidenzbasierter Completion verwechselt werden."
            />
          </p>
        </article>
      </section>
    </main>
  );
}
