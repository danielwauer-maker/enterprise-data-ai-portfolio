from __future__ import annotations

import importlib.util
from pathlib import Path

import pytest
import yaml

ROOT = Path(__file__).resolve().parents[1]
MAPPING = ROOT / "data" / "integrations" / "bcsentinel-readiness-map.yaml"
SYNC = ROOT / "scripts" / "sync_bcsentinel_readiness.py"

spec = importlib.util.spec_from_file_location("sync_bcsentinel_readiness", SYNC)
assert spec and spec.loader
sync = importlib.util.module_from_spec(spec)
spec.loader.exec_module(sync)


def load_mapping() -> dict:
    return yaml.safe_load(MAPPING.read_text(encoding="utf-8"))


def test_mapping_separates_canonical_authority_from_dev_evidence() -> None:
    mapping = load_mapping()
    assert mapping["schema_version"] == 2

    canonical = mapping["sources"]["canonical_state"]
    assert canonical["role"] == "product_authority"
    assert canonical["repository"] == "danielwauer-maker/bcsentinel"
    assert canonical["branch"] == "main"
    assert canonical["path"] == "release/current-product-state.json"
    assert "ref=main" in canonical["url"]

    dev = mapping["sources"]["dev_evidence"]
    assert dev["role"] == "dev_integration_evidence"
    assert dev["repository"] == "danielwauer-maker/bcsentinel"
    assert dev["branch"] == "staging"
    assert dev["path"] == "quality/portfolio-readiness-evidence.json"
    assert "ref=staging" in dev["url"]

    assert canonical["url"] != dev["url"]


def test_mapping_targets_exist_and_are_unique() -> None:
    mapping = load_mapping()
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


def test_canonical_state_validation_accepts_main_authority() -> None:
    source = load_mapping()["sources"]["canonical_state"]
    state = {
        "product": "BCSentinel",
        "repositories": {
            "core": {"repository": "danielwauer-maker/bcsentinel", "main_sha": "abc123"},
            "frontend": {"main_sha": "front123"},
            "product_system": {"main_sha": "product123"},
        },
        "extension": {"verified_artifact_version": "1.0.2.25"},
        "planning_estimates": {"note": "estimates only", "controlled_pilot_pct": 90},
    }

    sync.validate_canonical_state(state, source)
    context = sync.canonical_context(state)
    assert "abc123" in context
    assert "Extension 1.0.2.25" in context
    assert "front123" in context
    assert "product123" in context


def test_dev_evidence_is_evidence_not_product_authority() -> None:
    source = load_mapping()["sources"]["dev_evidence"]
    evidence = {
        "source_repository": "danielwauer-maker/bcsentinel",
        "source_branch": "staging",
        "facts": {"example": {"complete": True, "evidence": "green"}},
    }
    sync.validate_dev_evidence(evidence, source)

    wrong = dict(evidence)
    wrong["source_branch"] = "main"
    with pytest.raises(SystemExit):
        sync.validate_dev_evidence(wrong, source)


def test_canonical_authority_fails_closed_if_not_main() -> None:
    source = dict(load_mapping()["sources"]["canonical_state"])
    source["branch"] = "staging"
    state = {
        "product": "BCSentinel",
        "repositories": {
            "core": {"repository": "danielwauer-maker/bcsentinel", "main_sha": "abc123"}
        },
        "extension": {"verified_artifact_version": "1.0.2.25"},
    }
    with pytest.raises(SystemExit):
        sync.validate_canonical_state(state, source)
