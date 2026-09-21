# Baseline Roadmap v1.0

**Baseline established:** 22 September 2026  
**Target:** Application Ready by 28 February 2027  
**Planning source:** `data/roadmap.yaml`

## Baseline rules

This baseline is the reference against which future schedule performance is measured. Historical dates are not silently rewritten when work slips or scope changes. Material changes require a documented baseline-change decision.

### Measurement

- Work is measured through predefined weighted work packages.
- A work package contributes its weight only when its acceptance criteria are met and status is `done`.
- Planned progress is derived from baseline dates and weights.
- Actual progress is derived from completed weights.
- Schedule variance is Actual Progress minus Planned Progress.
- Forecast uses remaining mandatory weight, recent delivery throughput, known dependencies and critical-path constraints.

### Application-readiness denominator

The total portfolio plan contains 100 weighted points. ProcureGuard MVP carries 5 optional points. Mandatory application scope therefore contains 95 weighted points and is normalized separately to 100% Application Readiness.

## Baseline phase gates

### Gate 1 — Foundation / 30 Sep 2026

Required:
- Portfolio Master Specification v1.0
- Baseline Roadmap v1.0
- central GitHub repository
- structured portfolio data model
- Control Center metric baseline

### Gate 2 — EOIP Data Foundation / 31 Oct 2026

Required:
- NordWerk source/domain model
- reproducible synthetic ERP data
- SQL raw/staging layer
- dimensional star schema
- documented grains and relationships

### Gate 3 — EOIP Analytics Core / 30 Nov 2026

Required:
- KPI dictionary / DAX foundation
- Executive Overview
- Sales & Margin Intelligence
- Inventory Intelligence

### Gate 4 — EOIP V1 / 31 Dec 2026

Required:
- traceable business-impact cases
- QA
- documentation
- demo/screenshots
- release-quality repository

### Gate 5 — Advanced Analytics / 31 Jan 2027

Required:
- InventoryIQ V1 by 24 Jan
- BCSentinel Portfolio Readiness by 31 Jan

### Gate 6 — Feature Completion / 14 Feb 2027

Required:
- MarginGuard V1 by 10 Feb
- website content integration substantially complete
- no new non-essential features after 14 Feb

Optional:
- ProcureGuard MVP

### Gate 7 — Hardening / 21 Feb 2027

Required:
- website deployed and responsive
- demos and links verified
- project narratives consistent
- documentation and screenshots current

### Gate 8 — Application Ready / 28 Feb 2027

Required:
- mandatory project portfolio complete
- website production-ready
- CV / LinkedIn / GitHub aligned
- interview stories prepared
- final readiness review passes

## Baseline change policy

A material change records:
- date
- change
- reason
- benefit
- effort
- schedule impact
- affected dependencies
- decision: approved / post-V1 / rejected / simplified

The baseline history remains visible so that delivery discipline itself becomes part of the portfolio evidence.