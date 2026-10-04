from __future__ import annotations

from pathlib import Path
import yaml

ROOT = Path(__file__).resolve().parents[1]
MAPPING = ROOT / "data" / "integrations" / "bcsentinel-readiness-map.yaml"


def test_mapping_targets_exist_and_are_unique() -> None:
    mapping = yaml.safe_load(MAPPING.read_text(encoding="utf-8"))
    details = (ROOT / "data" / "sprint-details-v2.yaml").read_text(encoding="utf-8")

    facts = [rule["fact"] for rule in mapping["rules"]]
    assert len(facts) == len(set(facts))

    targets = [
        target["id"]
        for rule in mapping["rules"]
        for target in rule.get("targets", [])
    ]
    assert len(targets) == len(set(targets))
    for target in targets:
        assert details.count(f"{{id: {target},") == 1
