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


def load_source(*, source_file: str | None, source_url: str) -> dict:
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
    parser.add_argument("--source-file")
    parser.add_argument("--source-url")
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    mapping = yaml.safe_load(MAPPING.read_text(encoding="utf-8"))
    source_url = args.source_url or mapping["source"]["evidence_url"]
    source = load_source(source_file=args.source_file, source_url=source_url)

    if source.get("source_repository") != mapping["source"]["repository"]:
        raise SystemExit("Unexpected BCSentinel source repository")
    if source.get("source_branch") != mapping["source"]["branch"]:
        raise SystemExit("Unexpected BCSentinel source branch")

    facts = source.get("facts", {})
    text = DETAILS.read_text(encoding="utf-8")

    for rule in mapping.get("rules", []):
        fact_name = rule["fact"]
        if fact_name not in facts:
            raise SystemExit(f"Mapped BCSentinel fact is missing: {fact_name}")
        fact = facts[fact_name]
        complete = bool(fact.get("complete"))
        source_evidence = str(fact.get("evidence") or fact_name)
        evidence = (
            f"BCSentinel automated evidence: {source_evidence}"
            if complete
            else f"BCSentinel evidence currently incomplete: {source_evidence}"
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
