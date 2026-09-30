import { notFound } from "next/navigation";
import { LanguageToggle } from "../../../components/language-toggle";
import { ThemeToggle } from "../../../components/theme-toggle";
import { loadHighEndControlCenter } from "../../../lib/high-end-control-center";

export const dynamic = "force-static";
export const dynamicParams = false;

const labels: Record<string, { en: string; de: string }> = {
  requirements: { en: "Requirements", de: "Anforderungen" },
  architecture: { en: "Architecture", de: "Architektur" },
  implementation: { en: "Implementation", de: "Umsetzung" },
  automated_tests: { en: "Automated tests", de: "Automatisierte Tests" },
  runtime_acceptance: { en: "Runtime acceptance", de: "Runtime-Abnahme" },
  documentation_evidence: { en: "Documentation / evidence", de: "Dokumentation / Evidence" },
  merge_release_closeout: { en: "Merge / release / closeout", de: "Merge / Release / Abschluss" },
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

function detailStatusClass(status: string) {
  if (status === "done" || status === "verified") return "border-emerald-400/30 bg-emerald-400/10 text-emerald-200";
  if (status === "in_progress") return "border-cyan-400/30 bg-cyan-400/10 text-cyan-100";
  if (status === "blocked") return "border-rose-400/30 bg-rose-400/10 text-rose-100";
  return "border-slate-400/15 bg-white/[0.025] text-slate-300";
}

export function generateStaticParams() {
  return loadHighEndControlCenter().sprints.map((sprint) => ({ sprint: sprint.id }));
}

export default async function SprintDetailPage({
  params,
}: {
  params: Promise<{ sprint: string }>;
}) {
  const { sprint: sprintId } = await params;
  const data = loadHighEndControlCenter();
  const sprint = data.sprints.find((item) => item.id === sprintId);
  if (!sprint) notFound();

  return (
    <main>
      <header className="shell flex min-h-20 flex-wrap items-center justify-between gap-3 border-b hairline py-3 sm:flex-nowrap">
        <a href="../" className="flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border hairline bg-white/[0.03] text-xs text-cyan-200">
            {sprint.id}
          </span>
          <span><Dual en="Sprint Detail" de="Sprint-Detail" /></span>
        </a>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <a href="../" className="rounded-full border hairline bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-200">
            <Dual en="All sprints" de="Alle Sprints" />
          </a>
        </div>
      </header>

      <section className="shell py-14 md:py-20">
        <div className="eyebrow">{sprint.track}</div>
        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="text-sm font-semibold text-cyan-200">{sprint.id}</div>
            <h1 className="mt-2 max-w-5xl text-4xl font-semibold tracking-[-0.045em] text-white md:text-6xl">
              {sprint.title}
            </h1>
            <p className="mt-5 text-sm text-slate-400">{sprint.start} → {sprint.end}</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-semibold tracking-[-0.04em] text-cyan-200">{pct(sprint.scope_readiness_pct)}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500">
              <Dual en="Scope readiness" de="Scope-Readiness" />
            </div>
          </div>
        </div>

        <div className="progress-track mt-8">
          <div className="progress-fill" style={{ width: `${sprint.scope_readiness_pct}%` }} />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="panel p-6">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Objective" de="Ziel" /></div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{sprint.objective}</p>
          </article>
          <article className="panel p-6">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Expected result" de="Erwartetes Ergebnis" /></div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{sprint.result}</p>
          </article>
          <article className="panel p-6">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Dependencies" de="Abhängigkeiten" /></div>
            <p className="mt-4 text-sm leading-7 text-slate-300">{sprint.depends_on.length ? sprint.depends_on.join(", ") : "—"}</p>
          </article>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Status" de="Status" /></div>
            <div className="mt-2 text-xl font-semibold text-white">{sprint.status}</div>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Planned effort" de="Planaufwand" /></div>
            <div className="mt-2 text-xl font-semibold text-white">{sprint.planned_hours} h</div>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Actual effort" de="Ist-Aufwand" /></div>
            <div className="mt-2 text-xl font-semibold text-white">{sprint.actual_hours} h</div>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Delivery gates" de="Delivery-Gates" /></div>
            <div className="mt-2 text-xl font-semibold text-white">{pct(sprint.delivery_gate_readiness_pct)}</div>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Details done" de="Details fertig" /></div>
            <div className="mt-2 text-xl font-semibold text-white">{sprint.detail_done_count}/{sprint.detail_total_count}</div>
          </article>
          <article className="panel p-5">
            <div className="text-xs text-slate-400"><Dual en="Blockers" de="Blocker" /></div>
            <div className="mt-2 text-xl font-semibold text-white">{sprint.blocker_count}</div>
          </article>
        </div>
      </section>

      <section className="shell pb-10">
        <div className="eyebrow"><Dual en="Scope details" de="Scope-Details" /></div>
        <h2 className="section-title mt-3"><Dual en="Features, sub-sprints and gates" de="Features, Untersprints und Gates" /></h2>
        <p className="section-copy">
          <Dual
            en="These evidence-backed items determine the sprint's scope readiness. In-progress work is visible but receives no completion credit until it is done or verified."
            de="Diese evidenzbasierten Punkte bestimmen die Scope-Readiness des Sprints. Laufende Arbeit ist sichtbar, erhält aber erst nach Done/Verified Completion-Credit."
          />
        </p>

        <div className="mt-7 grid gap-3 lg:grid-cols-2">
          {sprint.detail_items.map((item) => (
            <article key={item.id} className="panel p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-cyan-200">{item.id}</div>
                  <h3 className="mt-2 text-base font-semibold text-white">{item.title}</h3>
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold ${detailStatusClass(item.status)}`}>
                  {item.status.replaceAll("_", " ").toUpperCase()}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-400">
                <span><Dual en="Weight" de="Gewicht" />: {item.weight}%</span>
                <span><Dual en="Evidence" de="Evidence" />: {item.evidence}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell pb-20">
        <div className="eyebrow"><Dual en="Readiness model" de="Readiness-Modell" /></div>
        <h2 className="section-title mt-3"><Dual en="Delivery gates" de="Delivery-Gates" /></h2>
        <p className="section-copy">
          <Dual
            en="These gates describe the formal sprint delivery process. Scope readiness above may already be high because verified work existed before the High-End sprint was scheduled."
            de="Diese Gates beschreiben den formalen Sprint-Delivery-Prozess. Die Scope-Readiness oben kann bereits hoch sein, weil verifizierte Arbeit schon vor der High-End-Sprintplanung vorhanden war."
          />
        </p>
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(sprint.readiness_breakdown).map(([key, value]) => (
            <article key={key} className="panel p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm font-medium text-slate-200">
                  <Dual en={labels[key]?.en ?? key} de={labels[key]?.de ?? key} />
                </div>
                <div className="font-semibold text-cyan-200">{pct(value)}</div>
              </div>
              <div className="progress-track mt-4">
                <div className="progress-fill" style={{ width: `${value}%` }} />
              </div>
            </article>
          ))}
        </div>

        <article className="panel mt-8 p-6 md:p-8">
          <div className="eyebrow"><Dual en="Working rule" de="Arbeitsregel" /></div>
          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-400">
            <Dual
              en="Before implementation starts, this sprint receives a Sprint Brief with scope, learning units, tests, risks and Definition of Done. The detail page then becomes the live status view for the sprint."
              de="Vor Beginn der Implementierung erhält dieser Sprint einen Sprint Brief mit Scope, Lerneinheiten, Tests, Risiken und Definition of Done. Diese Detailseite wird danach zur Live-Statusansicht des Sprints."
            />
          </p>
        </article>
      </section>
    </main>
  );
}
