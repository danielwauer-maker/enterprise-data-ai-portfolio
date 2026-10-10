#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "site" / "out"
CONTROL_CENTER = OUT / "control-center" / "index.html"
PREPILOT = OUT / "control-center" / "prepilot" / "index.html"
EXPECTED_HREF = 'href="/enterprise-data-ai-portfolio/control-center/prepilot/"'

if not CONTROL_CENTER.exists():
    raise SystemExit(f"Missing exported Control Center page: {CONTROL_CENTER}")
if not PREPILOT.exists():
    raise SystemExit(f"Missing exported Pre-Pilot page: {PREPILOT}")

html = CONTROL_CENTER.read_text(encoding="utf-8")
if EXPECTED_HREF not in html:
    raise SystemExit(
        "BCSentinel X-sprint link is not GitHub-Pages basePath-safe; "
        f"expected {EXPECTED_HREF}"
    )

print("Portfolio route validation: PASS")
print("BCSentinel X-sprint button resolves to exported Pre-Pilot page.")
