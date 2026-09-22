#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
import math
import statistics
from datetime import date, datetime, timedelta
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]


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


def round2(value):
    return None if value is None else round(float(value), 2)


def planned_weight(packages, as_of, mandatory_only=False):
    total = 0.0
    for wp in packages:
        if mandatory_only and not wp.get("mandatory", False):
            continue
        weight = float(wp["weight"])
        start = as_date(wp["start"])
        end = as_date(wp["end"])
        if as_of < start:
            credit = 0.0
        elif as_of >= end:
            credit = 1.0
        elif end == start:
            credit = 1.0
        else:
            credit = (as_of - start).days / (end - start).days
        total += weight * max(0.0, min(1.0, credit))
    return total


def completed_weight(packages, mandatory_only=False):
    return sum(
        float(wp["weight"])
        for wp in packages
        if wp.get("status") == "done"
        and (not mandatory_only or wp.get("mandatory", False))
    )


def planned_readiness_pct(packages, as_of, denominator):
    return planned_weight(packages, as_of, mandatory_only=True) / denominator * 100.0


def find_schedule_equivalent_date(packages, actual_pct, baseline_start, target_date, denominator):
    current = baseline_start
    while current <= target_date:
        if planned_readiness_pct(packages, current, denominator) >= actual_pct - 1e-9:
            return current
        current += timedelta(days=1)
    return target_date


def milestone_metrics(roadmap, packages_by_id, config, as_of):
    results = []
    on_time = 0
    considered = 0
    overdue_incomplete = 0

    for milestone in roadmap.get("milestones", []):
        mid = milestone["id"]
        target = as_date(milestone["target"])
        required = config.get("milestone_completion", {}).get(mid, [])
        required_wps = [packages_by_id[x] for x in required if x in packages_by_id]
        complete = bool(required) and len(required_wps) == len(required) and all(
            wp.get("status") == "done" for wp in required_wps
        )
        actual_completion = None
        if complete:
            ends = [as_date(wp.get("actual_end")) for wp in required_wps]
            if all(ends):
                actual_completion = max(ends)

        is_considered = complete or target <= as_of
        if is_considered:
            considered += 1
            if complete and actual_completion and actual_completion <= target:
                on_time += 1
            elif not complete and target < as_of:
                overdue_incomplete += 1

        results.append(
            {
                "id": mid,
                "name": milestone["name"],
                "target": target.isoformat(),
                "complete": complete,
                "actual_completion": actual_completion.isoformat() if actual_completion else None,
                "on_time": bool(complete and actual_completion and actual_completion <= target),
            }
        )

    reliability = None if considered == 0 else on_time / considered * 100.0
    return {
        "reliability_pct": round2(reliability),
        "considered_count": considered,
        "on_time_count": on_time,
        "overdue_incomplete_count": overdue_incomplete,
        "items": results,
    }


def render_status(metrics):
    progress = metrics["progress"]
    schedule = metrics["schedule"]
    milestones = metrics["milestones"]
    risks = metrics["risks"]
    cp = metrics["critical_path"]
    efficiency = metrics["delivery_efficiency"]

    milestone_text = "No milestone yet due"
    if milestones["items"]:
        first_open = next((m for m in milestones["items"] if not m["complete"]), None)
        if first_open:
            milestone_text = f'{first_open["id"]} — {first_open["name"]}'

    delta = schedule["schedule_delta_days"]
    if delta > 0:
        delta_text = f"{delta} days ahead"
    elif delta < 0:
        delta_text = f"{abs(delta)} days behind"
    else:
        delta_text = "on baseline"

    return f"""# Portfolio Status

**As of:** {metrics["as_of"]}  
**Baseline:** {metrics["baseline_id"]}  
**Application-ready target:** {schedule["target_date"]}

> Generated from canonical structured data by `scripts/generate_metrics.py`. Do not edit calculated values manually.

## Progress

- Portfolio Scope Progress: **{progress["portfolio_scope_pct"]:.2f}%**
- Application Readiness: **{progress["application_readiness_pct"]:.2f}%**
- Planned Application Readiness: **{progress["planned_application_readiness_pct"]:.2f}%**
- Schedule Variance: **{schedule["variance_percentage_points"]:+.2f} percentage points**
- Schedule Position: **{delta_text}**

## Forecast

- Forecast Completion Date: **{schedule["forecast_completion_date"]}**
- Forecast Method: **{schedule["forecast_method"]}**
- Forecast Confidence: **{schedule["forecast_confidence"]}**
- Schedule Buffer: **{schedule["schedule_buffer_days"]:+d} days**

## Delivery

- Rolling Throughput: **{metrics["throughput"]["completed_packages"]} packages / {metrics["throughput"]["completed_weight"]:.2f} weighted points**
- Average Cycle Time: **{metrics["cycle_time"]["average_days"] if metrics["cycle_time"]["average_days"] is not None else "n/a"} days**
- Milestone Reliability: **{str(milestones["reliability_pct"]) + "%" if milestones["reliability_pct"] is not None else "n/a"}**
- Current Milestone: **{milestone_text}**

## AI-Assisted Delivery Efficiency

- Baseline Delivery Window: **{efficiency["baseline_delivery_window_elapsed_days"]} elapsed calendar days**
- Forecast Delivery Window: **{efficiency["forecast_delivery_window_elapsed_days"]} elapsed calendar days**
- Forecast Schedule Compression: **{efficiency["forecast_schedule_compression_days"]:+d} days / {efficiency["forecast_schedule_compression_pct"]:+.2f}%**
- Actual Delivery Window: **{str(efficiency["actual_delivery_window_elapsed_days"]) + " elapsed calendar days" if efficiency["actual_delivery_window_elapsed_days"] is not None else "pending — M11 not complete"}**
- Planned Human Effort: **{efficiency["human_effort"]["planned_portfolio_hours"]:.0f} h portfolio / {efficiency["human_effort"]["planned_mandatory_hours"]:.0f} h mandatory**
- Observed Human Effort: **{str(efficiency["human_effort"]["observed_hours"]) + " h" if efficiency["human_effort"]["observed_hours"] is not None else "not yet tracked"}**
- Planned Capacity Cost: **EUR {efficiency["cost_model"]["planned_portfolio_cost_eur"]:.0f} portfolio / EUR {efficiency["cost_model"]["planned_mandatory_cost_eur"]:.0f} mandatory**
- Observed Capacity Cost: **{("EUR " + str(efficiency["cost_model"]["observed_cost_eur"])) if efficiency["cost_model"]["observed_cost_eur"] is not None else "not yet tracked"}**
- Cost Scenario: **{efficiency["cost_model"]["status"]}**

## Risk & Critical Path

- Active Blockers: **{metrics["blockers"]["count"]}**
- Active Critical Risks: **{risks["critical_open_count"]}**
- Critical Path Completed: **{cp["completed_count"]}/{cp["total_count"]}**
- First Unresolved Critical Package: **{cp["first_unresolved"] or "none"}**

## Source of truth

- `data/roadmap.yaml`
- `data/control-center.yaml`
- `data/delivery-efficiency.yaml`
- `data/effort-plan.yaml`
- `data/effort-log.yaml`
- `data/risks.yaml`
- generated `data/metrics.json`
"""


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--as-of", help="Override configured snapshot date (YYYY-MM-DD)")
    parser.add_argument("--check", action="store_true", help="Fail if generated outputs differ from committed files")
    args = parser.parse_args()

    roadmap = load_yaml(ROOT / "data" / "roadmap.yaml")
    control = load_yaml(ROOT / "data" / "control-center.yaml")["control_center"]
    risks_data = load_yaml(ROOT / "data" / "risks.yaml")
    delivery_efficiency_config = load_yaml(ROOT / "data" / "delivery-efficiency.yaml")["delivery_efficiency"]
    effort_data = load_yaml(ROOT / "data" / "effort-log.yaml")["effort_log"]
    effort_plan = load_yaml(ROOT / "data" / "effort-plan.yaml")["effort_plan"]

    as_of = as_date(args.as_of or control["snapshot_date"])
    baseline = roadmap["baseline"]
    progress_model = roadmap["progress_model"]
    packages = roadmap["work_packages"]
    packages_by_id = {wp["id"]: wp for wp in packages}

    scope_den = float(progress_model["portfolio_scope_denominator"])
    app_den = float(progress_model["application_readiness_denominator"])

    actual_scope_weight = completed_weight(packages, mandatory_only=False)
    actual_mandatory_weight = completed_weight(packages, mandatory_only=True)
    planned_scope_weight = planned_weight(packages, as_of, mandatory_only=False)
    planned_mandatory_weight = planned_weight(packages, as_of, mandatory_only=True)

    actual_scope_pct = actual_scope_weight / scope_den * 100.0
    actual_app_pct = actual_mandatory_weight / app_den * 100.0
    planned_scope_pct = planned_scope_weight / scope_den * 100.0
    planned_app_pct = planned_mandatory_weight / app_den * 100.0

    baseline_start = as_date(baseline["start_date"])
    target_date = as_date(baseline["application_ready_date"])
    equivalent_date = find_schedule_equivalent_date(
        packages, actual_app_pct, baseline_start, target_date, app_den
    )
    schedule_delta_days = (equivalent_date - as_of).days

    elapsed_days = max(1, (as_of - baseline_start).days + 1)
    min_days = int(control["forecast"]["minimum_elapsed_days_for_velocity"])
    min_weight = float(control["forecast"]["minimum_mandatory_completed_weight_for_velocity"])

    if actual_app_pct >= 100.0:
        completed_dates = [
            as_date(wp.get("actual_end"))
            for wp in packages
            if wp.get("mandatory") and wp.get("status") == "done" and wp.get("actual_end")
        ]
        forecast_date = max(completed_dates) if completed_dates else as_of
        forecast_method = "actual_completion"
        forecast_confidence = "high"
    elif elapsed_days >= min_days and actual_mandatory_weight >= min_weight:
        daily_velocity = actual_mandatory_weight / elapsed_days
        remaining_weight = max(0.0, app_den - actual_mandatory_weight)
        remaining_days = math.ceil(remaining_weight / daily_velocity) if daily_velocity > 0 else 10**6
        forecast_date = as_of + timedelta(days=remaining_days)
        forecast_method = "mandatory_weight_velocity"
        forecast_confidence = "medium" if actual_mandatory_weight < app_den * 0.5 else "high"
    else:
        forecast_date = target_date - timedelta(days=schedule_delta_days)
        if forecast_date < as_of:
            forecast_date = as_of
        forecast_method = control["forecast"]["default_method_before_maturity"]
        forecast_confidence = "low"

    buffer_days = (target_date - forecast_date).days

    window_days = int(control["throughput_window_days"])
    window_start = as_of - timedelta(days=window_days - 1)
    recent_done = [
        wp for wp in packages
        if wp.get("status") == "done"
        and wp.get("actual_end")
        and window_start <= as_date(wp["actual_end"]) <= as_of
    ]

    cycle_times = []
    for wp in packages:
        if wp.get("status") == "done" and wp.get("actual_start") and wp.get("actual_end"):
            days = (as_date(wp["actual_end"]) - as_date(wp["actual_start"])).days + 1
            cycle_times.append(days)

    blockers = [wp["id"] for wp in packages if wp.get("status") == "blocked"]
    risk_rows = risks_data.get("risks", [])
    critical_risks = [
        r["id"] for r in risk_rows
        if r.get("status") == "open" and r.get("severity") == "critical"
    ]

    critical_ids = roadmap.get("critical_path", [])
    critical_done = [wid for wid in critical_ids if packages_by_id.get(wid, {}).get("status") == "done"]
    critical_blocked = [wid for wid in critical_ids if packages_by_id.get(wid, {}).get("status") == "blocked"]
    first_unresolved = next(
        (wid for wid in critical_ids if packages_by_id.get(wid, {}).get("status") != "done"),
        None,
    )

    milestones = milestone_metrics(roadmap, packages_by_id, control, as_of)

    spi = None if planned_app_pct <= 0 else actual_app_pct / planned_app_pct

    baseline_delivery_window_days = (target_date - baseline_start).days
    forecast_delivery_window_days = max(0, (forecast_date - baseline_start).days)
    forecast_compression_days = baseline_delivery_window_days - forecast_delivery_window_days
    forecast_compression_pct = (
        forecast_compression_days / baseline_delivery_window_days * 100.0
        if baseline_delivery_window_days > 0
        else None
    )

    application_milestone = next(
        (m for m in milestones["items"] if m["id"] == "M11"),
        None,
    )
    actual_completion_date = (
        as_date(application_milestone["actual_completion"])
        if application_milestone and application_milestone["complete"]
        else None
    )
    actual_delivery_window_days = (
        (actual_completion_date - baseline_start).days
        if actual_completion_date
        else None
    )
    actual_compression_days = (
        baseline_delivery_window_days - actual_delivery_window_days
        if actual_delivery_window_days is not None
        else None
    )
    actual_compression_pct = (
        actual_compression_days / baseline_delivery_window_days * 100.0
        if actual_compression_days is not None and baseline_delivery_window_days > 0
        else None
    )

    effort_entries = effort_data.get("entries", [])
    human_minutes = [
        float(entry["human_minutes"])
        for entry in effort_entries
        if entry.get("human_minutes") is not None
    ]
    observed_human_effort_hours = (
        sum(human_minutes) / 60.0 if human_minutes else None
    )

    effort_workstreams = effort_plan.get("workstreams", [])
    planned_portfolio_hours = sum(
        float(row["planned_human_hours"]) for row in effort_workstreams
    )
    planned_mandatory_hours = sum(
        float(row["planned_human_hours"])
        for row in effort_workstreams
        if row.get("mandatory", False)
    )
    loaded_hourly_rate_eur = float(
        effort_plan["cost_assumption"]["loaded_hourly_rate_eur"]
    )
    planned_portfolio_cost_eur = planned_portfolio_hours * loaded_hourly_rate_eur
    planned_mandatory_cost_eur = planned_mandatory_hours * loaded_hourly_rate_eur
    observed_human_effort_cost_eur = (
        observed_human_effort_hours * loaded_hourly_rate_eur
        if observed_human_effort_hours is not None
        else None
    )

    effort_comparison_final = actual_app_pct >= 100.0 and observed_human_effort_hours is not None
    capacity_hours_saved = (
        planned_mandatory_hours - observed_human_effort_hours
        if effort_comparison_final
        else None
    )
    modeled_capacity_value_eur = (
        capacity_hours_saved * loaded_hourly_rate_eur
        if capacity_hours_saved is not None
        else None
    )
    modeled_efficiency_pct = (
        capacity_hours_saved / planned_mandatory_hours * 100.0
        if capacity_hours_saved is not None and planned_mandatory_hours > 0
        else None
    )
    cost_model_status = (
        "final_scenario_available"
        if effort_comparison_final
        else "planned_benchmark_ready_actual_effort_pending"
        if observed_human_effort_hours is None
        else "actual_effort_tracking_in_progress"
    )

    metrics = {
        "schema_version": 1,
        "as_of": as_of.isoformat(),
        "baseline_id": baseline["id"],
        "progress": {
            "portfolio_scope_completed_weight": round2(actual_scope_weight),
            "portfolio_scope_pct": round2(actual_scope_pct),
            "application_readiness_completed_weight": round2(actual_mandatory_weight),
            "application_readiness_pct": round2(actual_app_pct),
            "planned_portfolio_weight": round2(planned_scope_weight),
            "planned_portfolio_pct": round2(planned_scope_pct),
            "planned_application_weight": round2(planned_mandatory_weight),
            "planned_application_readiness_pct": round2(planned_app_pct),
        },
        "schedule": {
            "variance_percentage_points": round2(actual_app_pct - planned_app_pct),
            "performance_index": round2(spi),
            "schedule_equivalent_date": equivalent_date.isoformat(),
            "schedule_delta_days": schedule_delta_days,
            "forecast_completion_date": forecast_date.isoformat(),
            "forecast_method": forecast_method,
            "forecast_confidence": forecast_confidence,
            "target_date": target_date.isoformat(),
            "schedule_buffer_days": buffer_days,
        },
        "delivery_efficiency": {
            "baseline_start_date": baseline_start.isoformat(),
            "baseline_target_date": target_date.isoformat(),
            "baseline_delivery_window_elapsed_days": baseline_delivery_window_days,
            "current_elapsed_days": max(0, (as_of - baseline_start).days),
            "forecast_completion_date": forecast_date.isoformat(),
            "forecast_delivery_window_elapsed_days": forecast_delivery_window_days,
            "forecast_schedule_compression_days": forecast_compression_days,
            "forecast_schedule_compression_pct": round2(forecast_compression_pct),
            "actual_completion_date": actual_completion_date.isoformat() if actual_completion_date else None,
            "actual_delivery_window_elapsed_days": actual_delivery_window_days,
            "actual_schedule_compression_days": actual_compression_days,
            "actual_schedule_compression_pct": round2(actual_compression_pct),
            "human_effort": {
                "entries_count": len(effort_entries),
                "observed_hours": round2(observed_human_effort_hours),
                "planned_portfolio_hours": round2(planned_portfolio_hours),
                "planned_mandatory_hours": round2(planned_mandatory_hours),
                "benchmark_id": effort_plan["id"],
                "benchmark_evidence_level": effort_plan["benchmark"]["evidence_level"],
            },
            "cost_model": {
                "status": cost_model_status,
                "loaded_hourly_rate_eur": round2(loaded_hourly_rate_eur),
                "rate_evidence_level": effort_plan["cost_assumption"]["evidence_level"],
                "planned_portfolio_cost_eur": round2(planned_portfolio_cost_eur),
                "planned_mandatory_cost_eur": round2(planned_mandatory_cost_eur),
                "observed_cost_eur": round2(observed_human_effort_cost_eur),
                "capacity_hours_saved": round2(capacity_hours_saved),
                "modeled_capacity_value_eur": round2(modeled_capacity_value_eur),
                "modeled_efficiency_pct": round2(modeled_efficiency_pct),
                "comparison_final": effort_comparison_final,
            },
        },
        "throughput": {
            "window_days": window_days,
            "completed_packages": len(recent_done),
            "completed_weight": round2(sum(float(wp["weight"]) for wp in recent_done)),
        },
        "cycle_time": {
            "sample_size": len(cycle_times),
            "average_days": round2(statistics.mean(cycle_times)) if cycle_times else None,
            "median_days": round2(statistics.median(cycle_times)) if cycle_times else None,
        },
        "milestones": milestones,
        "blockers": {
            "count": len(blockers),
            "work_package_ids": blockers,
        },
        "risks": {
            "critical_open_count": len(critical_risks),
            "critical_open_ids": critical_risks,
            "open_count": sum(1 for r in risk_rows if r.get("status") == "open"),
        },
        "critical_path": {
            "total_count": len(critical_ids),
            "completed_count": len(critical_done),
            "remaining_count": len(critical_ids) - len(critical_done),
            "blocked_count": len(critical_blocked),
            "blocked_ids": critical_blocked,
            "first_unresolved": first_unresolved,
        },
    }

    metrics_text = json.dumps(metrics, indent=2, ensure_ascii=False) + "\n"
    status_text = render_status(metrics)

    metrics_path = ROOT / "data" / "metrics.json"
    status_path = ROOT / "STATUS.md"

    if args.check:
        expected_metrics_text = metrics_path.read_text(encoding="utf-8") if metrics_path.exists() else ""
        expected_status = status_path.read_text(encoding="utf-8") if status_path.exists() else ""

        try:
            expected_metrics = json.loads(expected_metrics_text) if expected_metrics_text else None
        except json.JSONDecodeError as exc:
            raise SystemExit(f"Committed data/metrics.json is invalid JSON: {exc}") from exc

        generated_metrics = json.loads(metrics_text)
        metrics_match = expected_metrics == generated_metrics
        status_match = expected_status == status_text

        if not metrics_match or not status_match:
            stale = []
            if not metrics_match:
                stale.append("data/metrics.json")
            if not status_match:
                stale.append("STATUS.md")
            raise SystemExit(
                "Generated Control Center outputs are out of date: " + ", ".join(stale)
            )
        return

    metrics_path.write_text(metrics_text, encoding="utf-8")
    status_path.write_text(status_text, encoding="utf-8")


if __name__ == "__main__":
    main()
