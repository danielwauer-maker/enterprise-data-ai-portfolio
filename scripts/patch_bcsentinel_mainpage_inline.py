from pathlib import Path

path = Path("site/app/page.tsx")
text = path.read_text(encoding="utf-8")

old = 'import { loadHighEndControlCenter } from "../lib/high-end-control-center";\n'
new = '''import { BCSentinelCoreSprints } from "../components/bcsentinel-core-sprints";\nimport {\n  loadBCSentinelCoreGoLivePlan,\n  loadBCSentinelPrePilotClosurePlan,\n  loadHighEndControlCenter,\n} from "../lib/high-end-control-center";\n'''
assert old in text, "loader import anchor missing"
text = text.replace(old, new, 1)

old = '  const highEnd = loadHighEndControlCenter();\n'
new = '''  const highEnd = loadHighEndControlCenter();\n  const coreGoLive = loadBCSentinelCoreGoLivePlan();\n  const prePilotClosure = loadBCSentinelPrePilotClosurePlan();\n'''
assert old in text, "highEnd loader anchor missing"
text = text.replace(old, new, 1)

old = '''  const bcsentinelCoreIds = ["S01", "S02", "S03", "S04", "S05", "S06"];\n  const bcsentinelCoreSprints = bcsentinelCoreIds.map((id) => sprintById[id]).filter(Boolean);\n'''
new = '''  const bcsentinelCoreIds = ["S01", "S02", "S03", "S04", "S05", "S06"];\n  const bcsentinelCoreSprints = bcsentinelCoreIds.map((id) => sprintById[id]).filter(Boolean);\n  const bcsentinelCoreDeliveryIds = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"];\n  const bcsentinelCoreDeliverySprints = bcsentinelCoreDeliveryIds.map((id) => sprintById[id]).filter(Boolean);\n'''
assert old in text, "core sprint anchor missing"
text = text.replace(old, new, 1)

old = '''    {\n      id: "core",\n      en: "Core Commercialization",\n      de: "Core-Kommerzialisierung",\n      copyEn: "From product hardening to pilot-ready BCSentinel Core.",\n      copyDe: "Vom Product-Hardening bis zum pilotfähigen BCSentinel Core.",\n      sprints: highEnd.sprints.filter((sprint) => Number(sprint.id.slice(1)) <= 7),\n    },\n'''
assert old in text, "roadmap core phase anchor missing"
text = text.replace(old, "", 1)

old = '''            <a href={`./control-center/${currentSprint.id}/`} className="rounded-xl border hairline bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07]">\n              <Dual en="Current sprint details" de="Aktueller Sprint im Detail" />\n            </a>\n'''
new = '''            <a href="#building" className="rounded-xl border hairline bg-white/[0.035] px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.07]">\n              <Dual en="BCSentinel Core sprints" de="BCSentinel-Core-Sprints" />\n            </a>\n'''
assert old in text, "hero sprint detail link anchor missing"
text = text.replace(old, new, 1)

old = '''            <div className="mt-7 flex flex-wrap gap-3 border-t hairline pt-6">\n              {bcsentinelProject?.repository && (\n                <a href={`https://github.com/${bcsentinelProject.repository}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100">\n                  GitHub →\n                </a>\n              )}\n              <a href="./control-center/S01/" className="text-sm font-semibold text-slate-300 transition hover:text-white">\n                <Dual en="Engineering readiness →" de="Engineering-Readiness →" />\n              </a>\n            </div>\n'''
new = '''            <BCSentinelCoreSprints\n              coreEngineering={bcsentinelCoreDeliverySprints}\n              goLive={coreGoLive}\n              prePilot={prePilotClosure}\n            />\n            {bcsentinelProject?.repository && (\n              <div className="mt-6 border-t hairline pt-5">\n                <a href={`https://github.com/${bcsentinelProject.repository}`} target="_blank" rel="noreferrer" className="text-sm font-semibold text-cyan-200 transition hover:text-cyan-100">\n                  GitHub Source of Truth →\n                </a>\n              </div>\n            )}\n'''
assert old in text, "BCSentinel footer links anchor missing"
text = text.replace(old, new, 1)

old = '''                    <a key={sprint.id} href={`./control-center/${sprint.id}/`} className="rounded-2xl border hairline bg-white/[0.02] p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.04]">\n'''
new = '''                    <div key={sprint.id} className="rounded-2xl border hairline bg-white/[0.02] p-4">\n'''
assert old in text, "roadmap sprint link opening anchor missing"
text = text.replace(old, new, 1)

old = '''                    </a>\n                  );\n                })}\n'''
new = '''                    </div>\n                  );\n                })}\n'''
assert old in text, "roadmap sprint link closing anchor missing"
text = text.replace(old, new, 1)

path.write_text(text, encoding="utf-8")
print("BCSentinel inline sprint mainpage patch applied")
