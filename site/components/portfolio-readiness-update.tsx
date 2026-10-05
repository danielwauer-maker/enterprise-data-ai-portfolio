import fs from "node:fs";
import path from "node:path";

function findRoot(): string {
  let current = process.cwd();
  while (true) {
    if (fs.existsSync(path.join(current, "control-center", "program.json"))) return current;
    const parent = path.dirname(current);
    if (parent === current) throw new Error("Could not locate portfolio root");
    current = parent;
  }
}

function pct(value: number): string {
  return `${value.toFixed(1).replace(".0", "")}%`;
}

export function PortfolioReadinessUpdate() {
  const root = findRoot();
  const program = JSON.parse(fs.readFileSync(path.join(root, "control-center", "program.json"), "utf8"));
  const design = JSON.parse(fs.readFileSync(path.join(root, "data", "bcsentinel-design-readiness.json"), "utf8"));

  const coreIds = new Set(["S01", "S02", "S03", "S04", "S05", "S06"]);
  const core = program.sprints.filter((sprint: any) => coreIds.has(sprint.id));
  const coreReadiness = core.reduce((sum: number, sprint: any) => sum + Number(sprint.scope_readiness_pct || 0), 0) / core.length;
  const finalDesigns = design.design_scope.filter((item: any) => item.status === "final").length;
  const designReadiness = design.design_scope.length ? (finalDesigns / design.design_scope.length) * 100 : 0;
  const avgDesignScore = design.design_scope.reduce((sum: number, item: any) => sum + Number(item.score || 0), 0) / design.design_scope.length;
  const prUrl = `https://github.com/${design.source_of_truth.repository}/pull/${design.source_of_truth.pull_request}`;

  return (
    <section className="shell py-10 md:py-14" aria-label="Latest BCSentinel readiness">
      <div className="panel overflow-hidden">
        <div className="grid gap-px bg-white/[0.06] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="bg-[#0b1728] p-6 md:p-8">
            <div className="eyebrow">BCSentinel Go-Live Readiness · 05 Oct 2026</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-white md:text-3xl">Engineering truth and design readiness — separated, not blended.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
              Core readiness continues to come from evidence-backed sprint data. The new Go-Live design system is tracked independently: final target designs exist for all customer-facing areas, while implementation and real-tenant acceptance remain explicit follow-up work.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border hairline bg-white/[0.03] p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Program</div>
                <div className="mt-2 text-2xl font-semibold text-white">{pct(program.program.program_completion_pct)}</div>
              </div>
              <div className="rounded-2xl border hairline bg-white/[0.03] p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Core engineering</div>
                <div className="mt-2 text-2xl font-semibold text-cyan-200">{pct(coreReadiness)}</div>
              </div>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.07] p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-emerald-300/70">Design spec</div>
                <div className="mt-2 text-2xl font-semibold text-emerald-200">{pct(designReadiness)}</div>
                <div className="mt-1 text-[10px] text-emerald-300/60">Ø {avgDesignScore.toFixed(2)}/10</div>
              </div>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
                <div className="text-[10px] uppercase tracking-[0.14em] text-amber-300/70">Manual pilot gates</div>
                <div className="mt-2 text-2xl font-semibold text-amber-200">{design.manual_pilot_gates.length}</div>
                <div className="mt-1 text-[10px] text-amber-300/60">still open</div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              <a href={prUrl} target="_blank" rel="noreferrer" className="font-semibold text-cyan-200 hover:text-cyan-100">BCSentinel design PR #{design.source_of_truth.pull_request} →</a>
              <a href="./control-center/" className="font-semibold text-slate-300 hover:text-white">Control Center →</a>
            </div>
          </div>

          <div className="bg-[#0b1728] p-6 md:p-8">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Latest developments</div>
            <div className="mt-5 space-y-3">
              {design.latest_developments.map((item: string, index: number) => (
                <div key={item} className="flex gap-3 rounded-xl border hairline bg-white/[0.025] p-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-300/10 text-[10px] font-bold text-cyan-200">{index + 1}</span>
                  <span className="text-xs leading-5 text-slate-400">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-4 text-xs leading-5 text-amber-100/75">
              Design completion is not counted as runtime acceptance. S04/S05 manual visual, provider, recovery and pilot-soak gates remain open until real evidence exists.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
