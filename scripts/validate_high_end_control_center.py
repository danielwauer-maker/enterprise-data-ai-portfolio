#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[1]

EXPECTED_SPRINT_IDS = [f"S{i:02d}" for i in range(20)]
EXPECTED_TOTAL_HOURS = 780
EXPECTED_WEIGHT_TOTAL = 100


def load_yaml(path):
    with Path(path).open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def main():
    program = load_yaml(ROOT / "data" / "high-end-program-v2.yaml")
    readiness = load_yaml(ROOT / "data" / "sprint-readiness-v2.yaml")

    sprints = program["sprints"]
    ids = [s["id"] for s in sprints]
    assert ids == EXPECTED_SPRINT_IDS, f"Sprint IDs must be S00-S19 in order; got {ids}"

    assert len(set(ids)) == 20, "Sprint IDs must be unique"

    total_hours = sum(float(s["planned_hours"]) for s in sprints)
    assert total_hours == EXPECTED_TOTAL_HOURS, f"Expected {EXPECTED_TOTAL_HOURS} planned hours, got {total_hours}"

    weights = readiness["readiness_method"]["category_weights"]
    assert sum(float(v) for v in weights.values()) == EXPECTED_WEIGHT_TOTAL, "Readiness weights must total 100"

    seen = set()
    for sprint in sprints:
        for dep in sprint.get("depends_on", []):
            assert dep in seen, f"{sprint['id']} depends on unknown/future sprint {dep}"
        seen.add(sprint["id"])

    for sid in EXPECTED_SPRINT_IDS:
        assert sid in readiness["sprints"], f"Missing readiness record for {sid}"

    required_files = [
        ROOT / "PORTFOLIO_BIBLE.md",
        ROOT / "docs" / "CROSS_REPO_AUTHORITY_V2.md",
        ROOT / "control-center" / "index.html",
        ROOT / "control-center" / "styles.css",
        ROOT / "control-center" / "app.js",
        ROOT / "control-center" / "program.json",
    ]
    for path in required_files:
        assert path.exists(), f"Missing required Control Center file: {path.relative_to(ROOT)}"

    snapshot = json.loads((ROOT / "control-center" / "program.json").read_text(encoding="utf-8"))
    assert [s["id"] for s in snapshot["sprints"]] == EXPECTED_SPRINT_IDS, "Generated snapshot sprint IDs drifted"
    assert float(snapshot["program"]["planned_hours"]) == EXPECTED_TOTAL_HOURS, "Generated snapshot total hours drifted"

    print("High-End v2 Control Center contracts: PASS")


if __name__ == "__main__":
    main()
