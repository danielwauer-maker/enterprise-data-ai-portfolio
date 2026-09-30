#!/usr/bin/env python3
from __future__ import annotations

import json
from pathlib import Path
from datetime import date, datetime
import yaml

ROOT = Path(__file__).resolve().parents[1]

WEIGHTS = {
    "requirements": 10,
    "architecture": 10,
    "implementation": 35,
    "automated_tests": 15,
    "runtime_acceptance": 15,
    "documentation_evidence": 10,
    "merge_release_closeout": 5,
}


def load_yaml(path: Path):
    with path.open("r", encoding="utf-8") as f:
        return yaml.safe_load(f)


def as_date(value):
    if value is None:
        return None
    if isinstance(value, datetime):
        return value.date()
    if isinstance(value, date):
        return value
    return date.fromisoformat(str(value))


def category_readiness(items):
    if not items:
        return 0.0
    done = sum(1 for item in items if item.get("status") == "done")
    return done / len(items) * 100.0


def sprint_readiness(sprint_id, readiness_data):
    sprint = readiness_data.get("sprints", {}).get(sprint_id, {})
    categories = sprint.get("categories", {})
    weighted = 0.0
    breakdown = {}
    for key, weight in WEIGHTS.items():
        pct = category_readiness(categories.get(key, []))
        breakdown[key] = round(pct, 2)
        weighted += pct / 100.0 * weight
    return round(weighted, 2), breakdown


def main():
    program = load_yaml(ROOT / "data" / "high-end-program-v2.yaml")
    readiness = load_yaml(ROOT / "data" / "sprint-readiness-v2.yaml")
    effort = load_yaml(ROOT / "data" / "effort-log.yaml")

    sprint_rows = []
    total_planned = 0.0
    total_actual = 0.0

    effort_by_sprint = {}
    for entry in effort.get("effort_log", {}).get("entries", []):
        sprint_id = entry.get("sprint_id")
        if not sprint_id:
            continue
        effort_by_sprint.setdefault(sprint_id, 0.0)
        effort_by_sprint[sprint_id] += float(entry.get("human_minutes", 0)) / 60.0

    for sprint in program["sprints"]:
        sid = sprint["id"]
        planned = float(sprint.get("planned_hours", 0))
        actual = effort_by_sprint.get(sid, 0.0)
        readiness_pct, breakdown = sprint_readiness(sid, readiness)
        state = readiness.get("sprints", {}).get(sid, {}).get("status", sprint.get("status", "PLANNED"))

        row = {
            "id": sid,
            "title": sprint["title"],
            "start": as_date(sprint["start"]).isoformat(),
            "end": as_date(sprint["end"]).isoformat(),
            "planned_hours": planned,
            "actual_hours": round(actual, 2),
            "remaining_hours": round(max(0.0, planned - actual), 2),
            "track": sprint.get("track"),
            "status": state,
            "depends_on": sprint.get("depends_on", []),
            "objective": sprint.get("objective", ""),
            "result": sprint.get("result", ""),
            "readiness_pct": readiness_pct,
            "readiness_breakdown": breakdown,
            "blocker_count": sum(
                1
                for items in readiness.get("sprints", {}).get(sid, {}).get("categories", {}).values()
                for item in items
                if item.get("status") == "blocked"
            ),
        }
        sprint_rows.append(row)
        total_planned += planned
        total_actual += actual

    weighted_program = sum(row["readiness_pct"] * row["planned_hours"] for row in sprint_rows)
    program_readiness = weighted_program / total_planned if total_planned else 0.0

    current = next((row for row in sprint_rows if row["status"] == "IN_PROGRESS"), None)
    if current is None:
        current = next((row for row in sprint_rows if row["status"] == "READY"), None)

    output = {
        "schema_version": 2,
        "program": {
            **program["program"],
            "program_completion_pct": round(program_readiness, 2),
            "planned_hours": round(total_planned, 2),
            "actual_hours": round(total_actual, 2),
            "remaining_hours": round(max(0.0, total_planned - total_actual), 2),
            "current_sprint_id": current["id"] if current else None,
        },
        "readiness_model": readiness["readiness_method"],
        "sprints": sprint_rows,
    }

    out_path = ROOT / "control-center" / "program.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
