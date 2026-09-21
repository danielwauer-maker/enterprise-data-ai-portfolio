# Structured Portfolio Data Model

**Work package:** FND-04  
**Version:** 1.0  
**Canonical repository:** `enterprise-data-ai-portfolio`

## Purpose

The portfolio uses structured repository data as the technical source of truth. Presentation layers such as README sections, STATUS.md, roadmap views and the future website should consume or be generated from these sources rather than maintain independent copies of important portfolio facts.

## Ownership boundaries

| Data | Canonical source |
|---|---|
| Portfolio identity and positioning | `data/portfolio.yaml` |
| Baseline dates, work packages, status, weights, dependencies and milestones | `data/roadmap.yaml` |
| Stable project metadata | `data/projects/*.yaml` |
| Shared NordWerk company facts | `data/companies/nordwerk.yaml` |
| Certification metadata and credential evidence | `data/certifications.yaml` |
| Business-impact categories, evidence levels and rules | `data/business-impact.yaml` |
| Calculated portfolio metrics | generated output, not manually maintained |
| Project-specific business case results | future `data/business-cases/*.yaml` |

## Project schema

The formal validation contract is `schemas/project.schema.json`. YAML project files can be validated against this JSON Schema because YAML maps to the same data model.

Every file under `data/projects/` follows the same conceptual shape:

- identity
- portfolio
- positioning
- business
- solution
- technology
- dependencies
- links
- evidence
- source_of_truth

### Important rule

Project files **do not own delivery status, progress percentages or baseline dates**. Those values are derived from `data/roadmap.yaml` via the project's `workstream_id` and work packages.

This prevents contradictory values such as a project being marked "80% complete" in one file and "in progress" elsewhere.

## Company references

EOIP, InventoryIQ, MarginGuard and ProcureGuard reference `nordwerk-distribution`. They must not duplicate NordWerk's employee count, revenue, customer count or other shared profile values.

BCSentinel is a real independent product and therefore has no NordWerk company reference.

## Business impact

Project files list which impact categories are relevant, but actual financial values are not embedded as marketing metadata.

Future business-case records will reference the global definitions in `data/business-impact.yaml` and must include calculation lineage, assumptions, affected population and limitations.

## Certifications

Certification delivery status and schedule are owned by `data/roadmap.yaml`. `data/certifications.yaml` owns credential identity, portfolio-story role and evidence such as completed date or credential URL.

## Website contract

The future portfolio website should read these structured files at build time. The data model is intentionally presentation-neutral: it contains facts and semantics, not page layouts or UI-specific styling.

## Change rule

When a fact already has a canonical owner, update that owner rather than copying the value into another file. Generated presentation files may repeat values only as generated output.
