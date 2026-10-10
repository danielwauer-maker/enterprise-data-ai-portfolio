import type {
  BCSentinelPrePilotClosurePlan,
  CoreGoLivePlan,
  SprintRow,
} from "../lib/high-end-control-center";

function Dual({ en, de }: { en: string; de: string }) {
  return (
    <>
      <span className="lang-en">{en}</span>
      <span className="lang-de">{de}</span>
    </>
  );
}

function formatPct(value: number): string {
  return `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;
}

function statusClasses(status: string): string {
  if (status === "DONE") return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  if (status === "IN_PROGRESS") return "border-cyan-400/25 bg-cyan-400/10 text-cyan-100";
  return "border-amber-300/20 bg-amber-300/10 text-amber-100";
}

function statusLabel(status: string) {
  if (status === "DONE") return <Dual en="Done" de="Fertig" />;
  if (status === "IN_PROGRESS") return <Dual en="In progress" de="In Arbeit" />;
  return <Dual en="Planned" de="Geplant" />;
}

const manualAcceptanceIds = new Set(["E3", "E4", "E5", "E6", "E7", "E8", "F1"]);

export function BCSentinelCoreSprints({
  coreEngineering,
  goLive,
  prePilot,
}: {
  coreEngineering: SprintRow[];
  goLive: CoreGoLivePlan;
  prePilot: BCSentinelPrePilotClosurePlan;
}) {
  const goLivePhases = goLive.phases.map((phase) => ({
    ...phase,
    sprints: goLive.sprints.filter((sprint) => sprint.phase === phase.id),
  }));

  return (
    <div className="mt-8 border-t hairline pt-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="eyebrow">
            <Dual en="BCSentinel Core delivery" de="BCSentinel-Core-Delivery" />
          </div>
          <h4 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-white">
            <Dual en="Complete sprint history on one page" de="Komplette Sprint-Historie auf einer Seite" />
          </h4>
          <p className="mt-2 max-w-3xl text-xs leading-6 text-slate-500">
            <Dual
              en="No duplicate portfolio KPIs: Core engineering, Go-Live and Pre-Pilot closure are rendered directly from their structured GitHub sources."
              de="Keine doppelt gepflegten Portfolio-KPIs: Core Engineering, Go-Live und Pre-Pilot Closure werden direkt aus den strukturierten GitHub-Quellen gerendert."
            />
          </p>
        </div>
        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] px-4 py-3 text-right">
          <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
            <Dual en="Official Go-Live readiness" de="Offizielle Go-Live-Readiness" />
          </div>
          <div className="mt-1 text-2xl font-semibold text-cyan-200">
            {formatPct(goLive.readiness.current_go_live_readiness_pct)}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <details className="group rounded-2xl border hairline bg-white/[0.018]" open>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:content-none">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">S01–S07</div>
              <div className="mt-1 text-base font-semibold text-white">
                <Dual en="Core Engineering & Commercialization" de="Core Engineering & Kommerzialisierung" />
              </div>
            </div>
            <div className="text-xs text-slate-500">
              {coreEngineering.filter((sprint) => sprint.status === "DONE").length}/{coreEngineering.length} <Dual en="done" de="fertig" />
            </div>
          </summary>
          <div className="border-t hairline p-4 sm:p-5">
            <div className="grid gap-3 md:grid-cols-2">
              {coreEngineering.map((sprint) => (
                <article key={sprint.id} className="rounded-xl border hairline bg-black/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-cyan-200">{sprint.id}</span>
                    <span className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${statusClasses(sprint.status)}`}>
                      {statusLabel(sprint.status)}
                    </span>
                  </div>
                  <div className="mt-3 text-sm font-semibold leading-5 text-white">{sprint.title}</div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{sprint.objective}</p>
                  <div className="mt-4 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                    <span><Dual en="Scope readiness" de="Scope-Readiness" /></span>
                    <span className="font-semibold text-slate-300">{formatPct(sprint.scope_readiness_pct)}</span>
                  </div>
                  <div className="progress-track mt-2">
                    <div className="progress-fill" style={{ width: `${sprint.scope_readiness_pct}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </details>

        <details className="group rounded-2xl border hairline bg-white/[0.018]" open>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:content-none">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">A1–F1</div>
              <div className="mt-1 text-base font-semibold text-white">
                <Dual en="Controlled Pilot Go-Live Program" de="Controlled-Pilot-Go-Live-Programm" />
              </div>
            </div>
            <div className="text-right text-xs text-slate-500">
              <div>{goLive.sprints.filter((sprint) => sprint.status === "DONE").length}/{goLive.sprints.length} <Dual en="done" de="fertig" /></div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-amber-200">
                <Dual en="Manual acceptance visible" de="Manuelle Abnahme sichtbar" />
              </div>
            </div>
          </summary>
          <div className="border-t hairline p-4 sm:p-5">
            <div className="grid gap-4">
              {goLivePhases.map((phase) => (
                <section key={phase.id} className="rounded-xl border hairline bg-black/10 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-xs font-bold text-cyan-200">Phase {phase.id}</span>
                      <div className="mt-1 text-sm font-semibold text-white">
                        <Dual en={phase.title_en} de={phase.title_de} />
                      </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                      {phase.sprints.filter((sprint) => sprint.status === "DONE").length}/{phase.sprints.length} <Dual en="done" de="fertig" />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2">
                    {phase.sprints.map((sprint) => {
                      const manual = manualAcceptanceIds.has(sprint.id);
                      return (
                        <div key={sprint.id} className="rounded-xl border border-white/[0.06] bg-white/[0.018] p-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-xs font-bold text-cyan-200">{sprint.id}</span>
                                {manual && (
                                  <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-amber-100">
                                    <Dual en="Manual acceptance" de="Manuelle Abnahme" />
                                  </span>
                                )}
                              </div>
                              <div className="mt-2 text-sm font-semibold text-white">
                                <Dual en={sprint.title_en} de={sprint.title_de} />
                              </div>
                            </div>
                            <span className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${statusClasses(sprint.status)}`}>
                              {statusLabel(sprint.status)}
                            </span>
                          </div>
                          <p className="mt-2 text-xs leading-5 text-slate-500">
                            <Dual en={sprint.objective_en} de={sprint.objective_de} />
                          </p>
                          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                            <span>{sprint.priority}</span>
                            <span>
                              <Dual en="Readiness after PASS" de="Readiness nach PASS" />{" "}
                              <strong className="text-slate-300">{formatPct(sprint.readiness_after_pass_pct)}</strong>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </details>

        <details className="group rounded-2xl border hairline bg-white/[0.018]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:content-none">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">X0.1–X8</div>
              <div className="mt-1 text-base font-semibold text-white">
                <Dual en="Pre-Pilot Closure" de="Pre-Pilot Closure" />
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-emerald-200">{formatPct(prePilot.closure_readiness_pct)}</div>
              <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500">
                {prePilot.done_count}/{prePilot.total_count} <Dual en="done" de="fertig" />
              </div>
            </div>
          </summary>
          <div className="border-t hairline p-4 sm:p-5">
            <div className="grid gap-2 md:grid-cols-2">
              {prePilot.sprints.map((sprint) => (
                <article key={sprint.id} className="rounded-xl border border-white/[0.06] bg-black/10 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-cyan-200">{sprint.id}</span>
                    <span className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${statusClasses(sprint.status)}`}>
                      {statusLabel(sprint.status)}
                    </span>
                  </div>
                  <div className="mt-2 text-sm font-semibold leading-5 text-white">
                    <Dual en={sprint.title_en} de={sprint.title_de} />
                  </div>
                  <p className="mt-2 text-xs leading-5 text-slate-500">{sprint.evidence}</p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-slate-500">
                    <span><Dual en="Closure progress" de="Closure-Fortschritt" /></span>
                    <span className="font-semibold text-slate-300">{formatPct(sprint.progress_pct)}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
