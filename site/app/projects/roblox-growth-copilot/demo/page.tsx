"use client";

import { useMemo, useState } from "react";

type View = "priorities" | "investigation" | "experiment" | "brief" | "connect";

const nav: Array<{ id: View; label: string }> = [
  { id: "priorities", label: "Today's Priorities" },
  { id: "investigation", label: "Investigation" },
  { id: "experiment", label: "Experiment Copilot" },
  { id: "brief", label: "Weekly Brief" },
  { id: "connect", label: "Connect Roblox" },
];

function Stat({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-xs text-slate-400">{delta}</div>
    </div>
  );
}

export default function DemoPage() {
  const [view, setView] = useState<View>("priorities");
  const title = useMemo(() => nav.find((item) => item.id === view)?.label ?? "", [view]);

  return (
    <main className="min-h-screen bg-[#07101f] text-slate-100">
      <div className="grid min-h-screen lg:grid-cols-[250px_1fr]">
        <aside className="border-b border-white/10 bg-[#091425] p-5 lg:border-b-0 lg:border-r">
          <a href="/projects/roblox-growth-copilot" className="text-xs text-cyan-300 hover:text-cyan-200">← Portfolio project</a>
          <div className="mt-7">
            <div className="text-lg font-semibold text-white">Growth Copilot</div>
            <div className="mt-1 text-xs text-slate-500">Validation MVP · simulated data</div>
          </div>
          <nav className="mt-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id)}
                className={`rounded-xl px-3 py-2.5 text-left text-sm transition ${view === item.id ? "bg-cyan-300 text-slate-950" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
            <div className="text-[10px] uppercase tracking-[0.14em] text-slate-500">Experience</div>
            <div className="mt-2 text-sm font-semibold text-white">Pixel Factory Tycoon</div>
            <div className="mt-1 text-xs text-emerald-300">● Analytics connected</div>
          </div>
        </aside>

        <section className="p-5 md:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.18em] text-cyan-300">AI Product Analyst</div>
                <h1 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-white">{title}</h1>
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-slate-400">Last refresh · 08:30 UTC</div>
            </div>

            {view === "priorities" && (
              <div className="mt-8">
                <div className="grid gap-4 md:grid-cols-4">
                  <Stat label="DAU" value="18,420" delta="+12.1% vs 7d" />
                  <Stat label="D1 retention" value="14.8%" delta="-2.4pp vs 7d" />
                  <Stat label="D7 retention" value="5.9%" delta="+0.7pp vs 7d" />
                  <Stat label="ARPDAU" value="R$2.14" delta="+8.0% vs 7d" />
                </div>

                <div className="mt-8 grid gap-5">
                  <article className="rounded-3xl border border-rose-400/20 bg-rose-400/[0.06] p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-200">#1 · High impact</div>
                      <div className="rounded-full bg-rose-300/10 px-3 py-1 text-xs text-rose-200">Confidence 91%</div>
                    </div>
                    <h2 className="mt-4 text-2xl font-semibold text-white">Mobile onboarding is hurting retention</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">Mobile D1 retention is 8.7% versus 17.9% on desktop. The largest divergence appears at Tutorial Step 3, where mobile churn increased from 42% to 67% after the last update.</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <button onClick={() => setView("investigation")} className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-slate-950">View evidence</button>
                      <button onClick={() => setView("experiment")} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-medium text-white">Build experiment</button>
                    </div>
                  </article>

                  <div className="grid gap-5 md:grid-cols-2">
                    <article className="rounded-3xl border border-amber-300/20 bg-amber-300/[0.05] p-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-200">#2 · Acquisition</div>
                      <h3 className="mt-3 text-xl font-semibold text-white">Don't scale ad spend yet</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">Paid traffic is up 28%, but new-player retention remains below the historical baseline. Fix onboarding before increasing acquisition spend.</p>
                    </article>
                    <article className="rounded-3xl border border-emerald-300/20 bg-emerald-300/[0.05] p-6">
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">#3 · Monetization</div>
                      <h3 className="mt-3 text-xl font-semibold text-white">Move Starter Pack to Session 2</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">Returning users convert 3.4× better than first-session users. Test delaying the offer until the second session.</p>
                    </article>
                  </div>
                </div>
              </div>
            )}

            {view === "investigation" && (
              <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-xs uppercase tracking-[0.16em] text-cyan-300">Evidence bundle · MOB-RET-003</div>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Mobile onboarding divergence</h2>
                  <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                    {[
                      ["D1 retention", "8.7%", "17.9%"],
                      ["Tutorial completion", "41%", "73%"],
                      ["Average session", "5:14", "9:48"],
                      ["Payer conversion", "0.8%", "1.9%"],
                    ].map(([metric, mobile, desktop], index) => (
                      <div key={metric} className={`grid grid-cols-[1.4fr_1fr_1fr] gap-3 px-4 py-3 text-sm ${index ? "border-t border-white/10" : ""}`}>
                        <div className="text-slate-400">{metric}</div><div className="font-semibold text-rose-200">{mobile}</div><div className="font-semibold text-white">{desktop}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="text-xs uppercase tracking-[0.16em] text-slate-500">Grounded analysis</div>
                  <h3 className="mt-3 text-xl font-semibold text-white">Most likely issue</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-300">The strongest supported explanation is onboarding friction on mobile, concentrated at Tutorial Step 3. This is correlation, not proof of causation.</p>
                  <div className="mt-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4 text-sm leading-6 text-cyan-100">Recommended next action: test a shorter Step 3 for new mobile users before changing acquisition or pricing.</div>
                  <button onClick={() => setView("experiment")} className="mt-5 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950">Create experiment proposal</button>
                </div>
              </div>
            )}

            {view === "experiment" && (
              <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-cyan-300">Draft experiment · EXP-014</div>
                <h2 className="mt-3 text-2xl font-semibold text-white">Shorten mobile Tutorial Step 3</h2>
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {[
                    ["Hypothesis", "Reducing the number of required actions in Step 3 will improve tutorial completion and D1 retention for new mobile players."],
                    ["Audience", "New mobile players only"],
                    ["Control", "Current Step 3 · 5 required actions"],
                    ["Variant A", "Reduced Step 3 · 3 required actions"],
                    ["Primary KPI", "D1 retention"],
                    ["Guardrails", "Session length · ARPDAU · payer conversion"],
                  ].map(([label, copy]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-slate-950/40 p-5">
                      <div className="text-[11px] uppercase tracking-[0.14em] text-slate-500">{label}</div>
                      <div className="mt-2 text-sm leading-6 text-slate-200">{copy}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.05] p-4 text-sm text-amber-100">Recommendation: do not decide from early uplift. Run until the configured sample and stability gates are met.</div>
              </div>
            )}

            {view === "brief" && (
              <div className="mt-8 max-w-4xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-cyan-300">Weekly Growth Brief · 12 Oct 2026</div>
                <h2 className="mt-3 text-3xl font-semibold text-white">Game health 72 → 77</h2>
                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  <Stat label="D1 retention" value="+4.1%" delta="week over week" />
                  <Stat label="Revenue/player" value="+7.8%" delta="week over week" />
                  <Stat label="Tutorial completion" value="+9.4%" delta="mobile cohort" />
                </div>
                <div className="mt-7 rounded-2xl border border-white/10 bg-slate-950/35 p-5">
                  <div className="text-xs uppercase tracking-[0.14em] text-slate-500">Biggest opportunity next week</div>
                  <div className="mt-2 text-xl font-semibold text-white">Starter Pack conversion for returning users</div>
                  <p className="mt-3 text-sm leading-7 text-slate-400">Session-2 users show materially stronger purchase intent. Prepare a controlled placement test before changing price.</p>
                </div>
              </div>
            )}

            {view === "connect" && (
              <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                <div className="text-xs uppercase tracking-[0.16em] text-cyan-300">Onboarding</div>
                <h2 className="mt-3 text-3xl font-semibold text-white">Connect your Roblox Experience</h2>
                <p className="mt-4 text-sm leading-7 text-slate-400">The production version will use least-privilege authorization. This validation screen demonstrates the intended trust and onboarding flow only.</p>
                <div className="mt-7 grid gap-4">
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
                    <div className="text-sm font-semibold text-white">1. Authorize analytics access</div>
                    <div className="mt-1 text-xs text-slate-500">Read-only analytics scope · no game publishing permissions</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
                    <div className="text-sm font-semibold text-white">2. Select an Experience</div>
                    <div className="mt-1 text-xs text-slate-500">Choose the game the copilot should analyze</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
                    <div className="text-sm font-semibold text-white">3. Receive your first Health Check</div>
                    <div className="mt-1 text-xs text-slate-500">Baselines, segment gaps and initial priorities</div>
                  </div>
                </div>
                <button onClick={() => setView("priorities")} className="mt-6 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950">Use demo experience</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
