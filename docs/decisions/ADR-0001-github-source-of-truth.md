# ADR-0001 — GitHub as Technical Source of Truth

**Status:** Accepted  
**Date:** 2026-09-22

## Decision

GitHub is the technical source of truth for the Enterprise Data & AI Portfolio 2027.

Important portfolio metrics, project metadata, roadmap dates, certification data and project status shall be maintained in structured repository data rather than independently in multiple presentation layers.

## Consequences

- `data/*.yaml` / `data/*.json` hold canonical structured data.
- Markdown status and roadmap views should progressively become generated artifacts.
- The portfolio website consumes the same structured data.
- GitHub Issues / Milestones / Project may represent execution state, but duplicated manually maintained KPI values are avoided.
- Baseline changes remain traceable in Git history and decision records.
