#!/usr/bin/env python3
from __future__ import annotations

import argparse
import base64
import json
import re
import urllib.request
from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[1]
DETAILS = ROOT / "data" / "sprint-details-v2.yaml"
MAPPING = ROOT / "data" / "integrations" / "bcsentinel-readiness-map.yaml"


def load_json_source(*, source_file: str | None, source_url: str) -> dict:
    if source_file:
        return json.loads(Path(source_file).read_text(encoding="utf-8"))

    request = urllib.request.Request(
        source_url,
        headers={
            "User-Agent": "enterprise-data-ai-portfolio-readiness-sync",
            "Accept": "application/vnd.github.raw+json",
        },
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        body = response.read().decode("utf-8")

    payload = json.loads(body)
    if isinstance(payload, dict) and "content" in payload and payload.get("encoding") == "base64":
        decoded = base64.b64decode(payload["content"]).decode("utf-8")
        return json.loads(decoded)
    return payload


def validate_canonical_state(state: dict, source: dict) -> None:
    if source.get("role") != "product_authority":
        raise SystemExit("BCSentinel canonical source must have role product_authority")
    if source.get("branch") != "main":
        raise SystemExit("BCSentinel canonical product authority must come from main")
    if source.get("path") != "release/current-product-state.json":
        raise SystemExit("Unexpected BCSentinel canonical state path")
    if state.get("product") != "BCSentinel":
        raise SystemExit("Unexpected canonical product")

    repositories = state.get("repositories", {})
    core = repositories.get("core", {})
    if core.get("repository") != source.get("repository"):
        raise SystemExit("Canonical BCSentinel core repository mismatch")
    if not core.get("main_sha"):
        raise SystemExit("Canonical BCSentinel technical baseline is missing")

    extension = state.get("extension", {})
    if not extension.get("verified_artifact_version"):
        raise SystemExit("Canonical BCSentinel Extension version is missing")

    # Planning percentages are explicitly estimates. They are never imported into
    # portfolio readiness; only evidence-backed detail statuses are synchronized.
    estimates = state.get("planning_estimates", {})
    if estimates and "note" not in estimates:
        raise SystemExit("Canonical planning estimates must remain explicitly non-authoritative")


def validate_dev_evidence(evidence: dict, source: dict) -> None:
    if source.get("role") != "dev_integration_evidence":
        raise SystemExit("BCSentinel DEV evidence source has an unexpected role")
    if evidence.get("source_repository") != source.get("repository"):
        raise SystemExit("Unexpected BCSentinel DEV evidence repository")
    if evidence.get("source_branch") != source.get("branch"):
        raise SystemExit("Unexpected BCSentinel DEV evidence branch")
    if not isinstance(evidence.get("facts"), dict):
        raise SystemExit("BCSentinel DEV evidence facts are missing")


def canonical_context(state: dict) -> str:
    repositories = state["repositories"]
    core_sha = str(repositories["core"]["main_sha"])
    frontend_sha = str(repositories.get("frontend", {}).get("main_sha") or "unknown")
    product_system_sha = str(repositories.get("product_system", {}).get("main_sha") or "unknown")
    extension_version = str(state["extension"]["verified_artifact_version"])
    return (
        f"canonical main baseline {core_sha[:12]}; "
        f"Extension {extension_version}; "
        f"frontend {frontend_sha[:12]}; "
        f"product-system {product_system_sha[:12]}"
    )


def replace_detail_line(text: str, target_id: str, status: str, evidence: str) -> str:
    lines = text.splitlines()
    matches = [i for i, line in enumerate(lines) if f"{{id: {target_id}," in line]
    if len(matches) != 1:
        raise SystemExit(f"Expected exactly one detail item {target_id}, found {len(matches)}")

    index = matches[0]
    line = lines[index]
    line, status_count = re.subn(r"status: [^,}]+", f"status: {status}", line, count=1)
    if status_count != 1:
        raise SystemExit(f"Could not update status for {target_id}")

    escaped = json.dumps(evidence, ensure_ascii=False)
    line, evidence_count = re.subn(r'evidence: "(?:[^"\\]|\\.)*"', f"evidence: {escaped}", line, count=1)
    if evidence_count != 1:
        raise SystemExit(f"Could not update evidence for {target_id}")

    lines[index] = line
    suffix = "\n" if text.endswith("\n") else ""
    return "\n".join(lines) + suffix


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--canonical-file")
    parser.add_argument("--canonical-url")
    parser.add_argument("--dev-evidence-file")
    parser.add_argument("--dev-evidence-url")
    # Backward-compatible aliases for local callers of the previous single-source sync.
    parser.add_argument("--source-file")
    parser.add_argument("--source-url")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    mapping = yaml.safe_load(MAPPING.read_text(encoding="utf-8"))
    if mapping.get("schema_version") != 2:
        raise SystemExit("Unsupported BCSentinel readiness mapping schema")

    sources = mapping["sources"]
    canonical_source = sources["canonical_state"]
    dev_source = sources["dev_evidence"]

    canonical = load_json_source(
        source_file=args.canonical_file,
        source_url=args.canonical_url or canonical_source["url"],
    )
    dev_evidence = load_json_source(
        source_file=args.dev_evidence_file or args.source_file,
        source_url=args.dev_evidence_url or args.source_url or dev_source["url"],
    )

    validate_canonical_state(canonical, canonical_source)
    validate_dev_evidence(dev_evidence, dev_source)

    facts = dev_evidence["facts"]
    authority = canonical_context(canonical)
    dev_branch = dev_source["branch"]
    text = DETAILS.read_text(encoding="utf-8")

    for rule in mapping.get("rules", []):
        fact_name = rule["fact"]
        if fact_name not in facts:
            raise SystemExit(f"Mapped BCSentinel fact is missing: {fact_name}")
        fact = facts[fact_name]
        complete = bool(fact.get("complete"))
        source_evidence = str(fact.get("evidence") or fact_name)
        state_text = "verified" if complete else "incomplete"
        evidence = (
            f"BCSentinel {state_text} DEV evidence ({dev_branch}): {source_evidence}; "
            f"authority: {authority}."
        )
        for target in rule.get("targets", []):
            status = target["true_status"] if complete else target["false_status"]
            text = replace_detail_line(text, target["id"], status, evidence)

    current = DETAILS.read_text(encoding="utf-8")
    if args.check:
        if current != text:
            raise SystemExit("BCSentinel readiness mapping would change sprint-details-v2.yaml")
        return

    if current != text:
        DETAILS.write_text(text, encoding="utf-8")


if __name__ == "__main__":
    main()
