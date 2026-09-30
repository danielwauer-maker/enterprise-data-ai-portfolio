import { LanguageToggle } from "../components/language-toggle";
import { ThemeToggle } from "../components/theme-toggle";
import { loadPortfolioData } from "../lib/portfolio-data";
import { loadHighEndControlCenter } from "../lib/high-end-control-center";

export const dynamic = "force-static";

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

function deliveryLabel(sprintId: string, currentId: string, status: string) {
  if (status === "DONE") return { en: "Done", de: "Fertig", tone: "done" };
  if (sprintId === currentId) return { en: "Current", de: "Aktuell", tone: "current" };
  return { en: "Upcoming", de: "Kommend", tone: "upcoming" };
}

function deliveryClasses(tone: string): string {
  if (tone === "done") return "border-emerald-400/25 bg-emerald-400/10 text-emerald-200";
  if (tone === "current") return "border-cyan-400/25 bg-cyan-400/10 text-cyan-100";
  return "border-slate-400/15 bg-white/[0.025] text-slate-400";
}

export default function Home() {
  const { portfolio, projects } = loadPortfolioData();
  const highEnd = loadHighEndControlCenter();
  const currentSprint =
    highEnd.sprints.find((sprint) => sprint.id === highEnd.program.current_sprint_id) ??
    highEnd.sprints[0];

  const sprintById = Object.fromEntries(highEnd.sprints.map((sprint) => [sprint.id, sprint]));
  const bcsentinelCoreIds = ["S01", "S02", "S03", "S04", "S05", "S06"];
  const bcsentinelCoreSprints = bcsentinelCoreIds.map((id) => sprintById[id]).filter(Boolean);
  const bcsentinelScope =
    bcsentinelCoreSprints.reduce((sum, sprint) => sum + sprint.scope_readiness_pct, 0) /
    bcsentinelCoreSprints.length;

  const eoipSprint = sprintById.S08;
  const bcsentinelProject = projects.find((project) => project.id === "bcsentinel");
  const eoipProject = projects.find((project) => project.id === "eoip");

  const findDetail = (id: string) =>
    highEnd.sprints.flatMap((sprint) => sprint.detail_items).find((item) => item.id === id);

  const evidenceItems = [
    findDetail("S01-D01"),
    findDetail("S01-D02"),
    findDetail("S03-D03"),
    findDetail("S04-D03"),
    findDetail("S06-D02"),
    findDetail("S06-D03"),
  ].filter(Boolean);

  const capabilities = [
    { id: "S09", en: "Inventory Intelligence", de: "Inventory Intelligence" },
    { id: "S10", en: "Margin & Customer Intelligence", de: "Margin- & Customer-Intelligence" },
    { id: "S11", en: "Procurement Intelligence", de: "Procurement Intelligence" },
  ].map((capability) => ({ ...capability, sprint: sprintById[capability.id] }));

  const phases = [
    {
      id: "core",
      en: "Core Commercialization",
      de: "Core-Kommerzialisierung",
      copyEn: "From product hardening to pilot-ready BCSentinel Core.",
      copyDe: "Vom Product-Hardening bis zum pilotfähigen BCSentinel Core.",
      sprints: highEnd.sprints.filter((sprint) => Number(sprint.id.slice(1)) <= 7),
    },
    {
      id: "intelligence",
      en: "Decision Intelligence",
      de: "Decision Intelligence",
      copyEn: "EOIP becomes reusable inventory, margin, customer and procurement intelligence.",
      copyDe: "EOIP wird zu wiederverwendbarer Inventory-, Margin-, Customer- und Procurement-Intelligence.",
      sprints: highEnd.sprints.filter((sprint) => ["S08", "S09", "S10", "S11"].includes(sprint.id)),
    },
    {
      id: "ai",
      en: "AI Platform",
      de: "AI-Plattform",
      copyEn: "Grounded Copilot, evaluation, agents, observability and controlled actions.",
      copyDe: "Grounded Copilot, Evaluation, Agents, Observability und kontrollierte Aktionen.",
      sprints: highEnd.sprints.filter((sprint) => ["S12", "S13", "S14", "S15", "S16"].includes(sprint.id)),
    },
    {
      id: "enterprise",
      en: "Enterprise Platform",
      de: "Enterprise-Plattform",
      copyEn: "Multi-company, cloud, scale and the BCSentinel Professional Beta.",
      copyDe: "Multi-Company, Cloud, Scale und die BCSentinel Professional Beta.",
      sprints: highEnd.sprints.filter((sprint) => ["S17", "S18", "S19"].includes(sprint.id)),
    },
  ];

  const architecture = [
    ["01", "Business Central", "Business Central"],
    ["02", "BCSentinel Core", "BCSentinel Core"],
    ["03", "Data & Semantic Layer", "Data- & Semantic-Layer"],
    ["04", "Decision Intelligence", "Decision Intelligence"],
    ["05", "AI Copilot & Agents", "AI Copilot & Agents"],
    ["06", "Policy & Human Approval", "Policy & Human Approval"],
    ["07", "Audited BC Actions", "Auditierte BC-Aktionen"],
  ];

  const repoUrl = `https://github.com/${portfolio.owner}/${portfolio.repository}`;

  return (
    <main>
      <header className="shell flex min-h-20 flex-wrap items-center justify-between gap-3 border-b hairline py-3 sm:flex-nowrap">
        <a href="#top" className="flex items-center gap-3 text-sm font-semibold tracking-wide">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border hairline bg-white/[0.03] text-xs text-cyan-200">
            DA
          </span>
          <span className="hidden sm:inline">Enterprise Data & AI Portfolio</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm text-slate-400 md:flex">
          <a className="transition hover:text-white" href="#building"><Dual en="Building" de="Projekte" /></a>
          <a className="transition hover:text-white" href="#evidence"><Dual en="Evidence" de="Evidence" /></a>
          <a className="transition hover:text-white" href="#delivery"><Dual en="AI Delivery" de="AI Delivery" /></a>
          <a className="transition hover:text-white" href="#roadmap"><Dual en="Roadmap" de="Roadmap" /></a>
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
            GitHub
          </a>
        </div>
      </header>

      <section id="top" className="shell grid gap-10 py-16 md:py-24 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
        <div>
          <div className="eyebrow">
            <Dual en="Enterprise Data & AI Engineering" de="Enterprise Data & AI Engineering" />
          </div>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-white md:text-7xl">
            <Dual en="From Business Central data to" de="Von Business-Central-Daten zu" />{" "}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
              <Dual en="Decision Intelligence." de="Decision Intelligence." />
            </span>
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
            <Dual
              en="A production-oriented portfolio centered on BCSentinel: Business Central product engineering, enterprise analytics, explainable recommendations and a controlled path toward AI copilots, agents and audited ERP actions."
              de="Ein produktionsorientiertes Portfolio rund um BCSentinel: Business-Central-Product-Engineering, Enterprise Analytics, erklärbare Empfehlungen und ein kontrollierter Weg zu AI Copilots, Agents und auditierten ERP-Aktionen."
            />
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {["Data & AI Solutions Engineer", "Analytics / Data Platform Engineer", "Business Central & Decision Intelligence"].map((role) => (
              <span key={role} className="rounded-full border hairline bg-white/[0.025] px-3 py-1.5 text-xs text-slate-300">
                {role}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#building" className="rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200">
              <Dual en="Explore the platform" de="Plattform ansehen" />
            </a>
            <a href={`./control-center/${currentSprint.id}/`} className="rounded-xl border hairline bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07]">
              <Dual en="Current sprint details" de="Aktueller Sprint im Detail" />
            </a>
          </div>
        </div>

        <div className="panel p-6 md:p-7">
          <div className="eyebrow"><Dual en="Live program" de="Live-Programm" /></div>
          <div className="mt-6 grid grid-cols-2 gap-5">
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Program" de="Programm" /></div>
              <div className="mt-2 text-3xl font-semibold text-white">{formatPct(highEnd.program.program_completion_pct)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Current sprint" de="Aktueller Sprint" /></div>
              <div className="mt-2 text-3xl font-semibold text-cyan-200">{formatPct(currentSprint.scope_readiness_pct)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">BCSentinel Core</div>
              <div className="mt-2 text-3xl font-semibold text-white">{formatPct(bcsentinelScope)}</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.16em] text-slate-500">EOIP / Data</div>
              <div className="mt-2 text-3xl font-semibold text-white">{formatPct(eoipSprint?.scope_readiness_pct ?? 0)}</div>
            </div>
          </div>

          <div className="mt-8 border-t hairline pt-5">
            <div className="text-xs uppercase tracking-[0.16em] text-slate-500">
              <Dual en="Now building" de="Aktuell in Arbeit" />
            </div>
            <div className="mt-2 text-base font-semibold text-white">{currentSprint.id} — {currentSprint.title}</div>
            <div className="progress-track mt-4">
              <div className="progress-fill" style={{ width: `${currentSprint.scope_readiness_pct}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 text-xs text-slate-500">
              <span>{currentSprint.detail_done_count}/{currentSprint.detail_total_count} <Dual en="details done" de="Details fertig" /></span>
              <span><Dual en="Target" de="Ziel" /> <LocalizedDate value={String(highEnd.program.target_date)} /></span>
            </div>
          </div>
        </div>
      </section>

      <section id="building" className="shell py-14 md:py-20">
        <div className="eyebrow"><Dual en="What I'm building" de="Was ich baue" /></div>
        <h2 className="section-title mt-3"><Dual en="One platform story, two core engineering assets." de="Eine Plattform-Story, zwei zentrale Engineering-Assets." /></h2>
        <p className="section-copy">
          <Dual
            en="BCSentinel is the commercial product. EOIP is the controlled data and analytics R&D foundation. Inventory, margin, customer and procurement intelligence become capabilities of the platform rather than separate products."
            de="BCSentinel ist das kommerzielle Produkt. EOIP ist die kontrollierte Data-&-Analytics-R&D-Grundlage. Inventory-, Margin-, Customer- und Procurement-Intelligence werden Plattform-Capabilities statt separater Produkte."
          />
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="panel p-7 md:p-9">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="eyebrow">Flagship Product</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">BCSentinel</h3>
                <p className="mt-2 text-sm text-slate-500">{bcsentinelProject?.fullName ?? "Business Central Data & AI Platform"}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-semibold tracking-[-0.04em] text-cyan-200">{formatPct(bcsentinelScope)}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.14em] text-slate-500"><Dual en="Core readiness" de="Core-Readiness" /></div>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-400">
              <Dual
                en="A SaaS-oriented Business Central platform for data health, findings, executive reporting, monitoring and controlled remediation — evolving toward reusable decision intelligence and AI-assisted operations."
                de="Eine SaaS-orientierte Business-Central-Plattform für Data Health, Findings, Executive Reporting, Monitoring und kontrollierte Remediation – mit Ausbau zu wiederverwendbarer Decision Intelligence und AI-gestützten Operations."
              />
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(bcsentinelProject?.technologies ?? ["AL", "FastAPI", "PostgreSQL", "GitHub Actions"]).map((technology) => (
                <span key={technology} className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400">{technology}</span>
              ))}
            </div>
            <div className="mt-7 flex flex-wrap gap-3 border-t hairline pt-6">
              {bcsentinelProject?.repository && (
                <a href={`https://github.com/${bcsentinelProject.repository}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100">
                  GitHub →
                </a>
              )}
              <a href="./control-center/S01/" className="text-sm font-semibold text-slate-300 transition hover:text-white">
                <Dual en="Engineering readiness →" de="Engineering-Readiness →" />
              </a>
            </div>
          </article>

          <article className="panel p-7 md:p-9">
            <div className="eyebrow">Data & Analytics R&D</div>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold tracking-[-0.035em] text-white">EOIP</h3>
                <p className="mt-2 text-sm text-slate-500">{eoipProject?.fullName ?? "Enterprise Operational Intelligence Platform"}</p>
              </div>
              <div className="text-3xl font-semibold text-white">{formatPct(eoipSprint?.scope_readiness_pct ?? 0)}</div>
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-400">
              <Dual
                en="Synthetic ERP data, PostgreSQL, dimensional modeling, KPI semantics and Power BI — used to develop reusable enterprise intelligence before product integration."
                de="Synthetische ERP-Daten, PostgreSQL, dimensionales Modell, KPI-Semantik und Power BI – als Entwicklungsumgebung für wiederverwendbare Enterprise Intelligence vor der Produktintegration."
              />
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {(eoipProject?.technologies ?? ["Python", "PostgreSQL", "Power BI"]).map((technology) => (
                <span key={technology} className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-xs text-slate-400">{technology}</span>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {capabilities.map((capability) => (
            <article key={capability.id} className="rounded-2xl border hairline bg-white/[0.02] p-5">
              <div className="text-xs font-semibold text-cyan-200">{capability.id}</div>
              <h3 className="mt-3 text-base font-semibold text-white"><Dual en={capability.en} de={capability.de} /></h3>
              <div className="mt-4 flex items-end justify-between gap-4">
                <div className="text-2xl font-semibold text-white">{formatPct(capability.sprint?.scope_readiness_pct ?? 0)}</div>
                <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500"><Dual en="inherited scope" de="vorhandener Scope" /></div>
              </div>
              <div className="progress-track mt-3">
                <div className="progress-fill" style={{ width: `${capability.sprint?.scope_readiness_pct ?? 0}%` }} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="evidence" className="shell py-14 md:py-20">
        <div className="eyebrow"><Dual en="Engineering evidence" de="Engineering Evidence" /></div>
        <h2 className="section-title mt-3"><Dual en="Built as engineering, not as a demo." de="Als Engineering gebaut, nicht als Demo." /></h2>
        <p className="section-copy">
          <Dual
            en="The portfolio prioritizes runtime evidence, least privilege, data migrations, backup/restore, tenant boundaries and release traceability — not only screenshots and feature lists."
            de="Das Portfolio priorisiert Runtime-Evidence, Least Privilege, Datenmigrationen, Backup/Restore, Tenant-Grenzen und Release-Traceability – nicht nur Screenshots und Featurelisten."
          />
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {evidenceItems.map((item) => (
            <article key={item!.id} className="panel p-6">
              <div className="flex items-start justify-between gap-3">
                <div className="text-xs font-semibold text-cyan-200">{item!.id}</div>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-200">
                  VERIFIED
                </span>
              </div>
              <h3 className="mt-4 text-base font-semibold leading-6 text-white">{item!.title}</h3>
              <p className="mt-3 text-xs leading-6 text-slate-500">{item!.evidence}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="delivery" className="shell py-14 md:py-20">
        <div className="panel overflow-hidden">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b hairline p-7 md:p-10 lg:border-b-0 lg:border-r">
              <div className="eyebrow"><Dual en="AI-assisted engineering" de="AI-assisted Engineering" /></div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                <Dual en="Measure the acceleration, keep the verification." de="Beschleunigung messen, Verifikation behalten." />
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400 md:text-base">
                <Dual
                  en="AI is used to accelerate planning, implementation, testing and documentation. It does not replace runtime acceptance or human release decisions."
                  de="AI beschleunigt Planung, Implementierung, Tests und Dokumentation. Sie ersetzt weder Runtime-Abnahme noch menschliche Release-Entscheidungen."
                />
              </p>
              <div className="mt-7 rounded-2xl border hairline bg-black/10 p-5 text-sm leading-7 text-slate-400">
                <Dual
                  en="Measured effort starts with the High-End v2 baseline. Historical effort remains a separate reconstructed estimate and is never inferred from commit timestamps."
                  de="Gemessener Aufwand startet mit der High-End-v2-Baseline. Historischer Aufwand bleibt eine separate rekonstruierte Schätzung und wird niemals aus Commit-Zeitstempeln abgeleitet."
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-px bg-white/[0.06]">
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Program capacity" de="Programmkapazität" /></div>
                <div className="mt-3 text-3xl font-semibold text-white">{highEnd.program.planned_hours} h</div>
                <div className="mt-2 text-xs text-slate-500">{highEnd.program.planned_hours_per_week} h / <Dual en="week" de="Woche" /></div>
              </div>
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Measured effort" de="Gemessener Aufwand" /></div>
                <div className="mt-3 text-3xl font-semibold text-white">{highEnd.program.actual_hours} h</div>
                <div className="mt-2 text-xs text-slate-500"><Dual en="High-End v2 tracking active" de="High-End-v2-Tracking aktiv" /></div>
              </div>
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Method" de="Methode" /></div>
                <div className="mt-3 text-xl font-semibold text-white"><Dual en="Benchmark vs actual" de="Benchmark vs. Ist" /></div>
                <div className="mt-2 text-xs leading-5 text-slate-500"><Dual en="Effort compression only after evidence-backed completion." de="Effort Compression erst nach evidenzbasiertem Abschluss." /></div>
              </div>
              <div className="bg-[#0b1728] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-slate-500"><Dual en="Quality gate" de="Qualitäts-Gate" /></div>
                <div className="mt-3 text-xl font-semibold text-white"><Dual en="Tests + runtime + human" de="Tests + Runtime + Human" /></div>
                <div className="mt-2 text-xs leading-5 text-slate-500"><Dual en="No AI-speed claim without verification." de="Kein AI-Speed-Claim ohne Verifikation." /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20">
        <div className="eyebrow"><Dual en="Target architecture" de="Zielarchitektur" /></div>
        <h2 className="section-title mt-3"><Dual en="From ERP evidence to controlled action." de="Von ERP-Evidence zu kontrollierter Aktion." /></h2>
        <p className="section-copy">
          <Dual
            en="Critical business facts stay deterministic. AI explains, orchestrates and assists on top of trusted data, policies and human approval."
            de="Kritische Business-Fakten bleiben deterministisch. AI erklärt, orchestriert und unterstützt auf Basis vertrauenswürdiger Daten, Policies und Human Approval."
          />
        </p>

        <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
          {architecture.map(([number, en, de], index) => (
            <div key={number} className="relative">
              <div className="panel h-full p-5">
                <div className="text-xs font-semibold text-cyan-200">{number}</div>
                <div className="mt-4 text-sm font-semibold text-white"><Dual en={en} de={de} /></div>
              </div>
              {index < architecture.length - 1 && (
                <div className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 text-slate-600 xl:block">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="roadmap" className="shell py-14 md:py-20">
        <div className="eyebrow"><Dual en="High-End roadmap" de="High-End-Roadmap" /></div>
        <h2 className="section-title mt-3"><Dual en="Core → Intelligence → AI → Enterprise." de="Core → Intelligence → AI → Enterprise." /></h2>
        <p className="section-copy">
          <Dual
            en="Only one sprint is the current delivery focus. Future sprints can already show scope readiness when verified work from earlier development satisfies part of their target."
            de="Nur ein Sprint ist der aktuelle Delivery-Fokus. Zukünftige Sprints können bereits Scope-Readiness zeigen, wenn verifizierte frühere Arbeit Teile ihres Zielumfangs erfüllt."
          />
        </p>

        <div className="mt-8 grid gap-5 xl:grid-cols-2">
          {phases.map((phase) => (
            <article key={phase.id} className="panel p-6 md:p-7">
              <div className="eyebrow"><Dual en={phase.en} de={phase.de} /></div>
              <p className="mt-3 text-sm leading-7 text-slate-400"><Dual en={phase.copyEn} de={phase.copyDe} /></p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {phase.sprints.map((sprint) => {
                  const label = deliveryLabel(sprint.id, currentSprint.id, sprint.status);
                  return (
                    <a key={sprint.id} href={`./control-center/${sprint.id}/`} className="rounded-2xl border hairline bg-white/[0.02] p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.04]">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-xs font-bold text-cyan-200">{sprint.id}</span>
                        <span className={`rounded-full border px-2 py-1 text-[9px] font-semibold ${deliveryClasses(label.tone)}`}>
                          <Dual en={label.en} de={label.de} />
                        </span>
                      </div>
                      <div className="mt-3 min-h-10 text-sm font-semibold leading-5 text-white">{sprint.title}</div>
                      <div className="mt-4 flex items-end justify-between gap-3">
                        <div className="text-xl font-semibold text-white">{formatPct(sprint.scope_readiness_pct)}</div>
                        <div className="text-[10px] uppercase tracking-[0.12em] text-slate-500"><Dual en="scope" de="Scope" /></div>
                      </div>
                      <div className="progress-track mt-3">
                        <div className="progress-fill" style={{ width: `${sprint.scope_readiness_pct}%` }} />
                      </div>
                    </a>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="shell mt-10 border-t hairline py-10 text-xs text-slate-600">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <span><Dual en="GitHub structured data is the technical source of truth." de="GitHub-Strukturdaten sind die technische Source of Truth." /></span>
          <span><Dual en="High-End v2 target" de="High-End-v2-Ziel" /> · <LocalizedDate value={String(highEnd.program.target_date)} /></span>
        </div>
      </footer>
    </main>
  );
}
