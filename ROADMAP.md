# Enterprise Data & AI Portfolio 2027 — Portfolio Roadmap

**Baseline:** v1.0  
**Baseline date:** 22 September 2026  
**Application-ready target:** 28 February 2027  
**Feature freeze:** 14 February 2027

> `data/roadmap.yaml` is the canonical roadmap source. This document is the human-readable portfolio view and should later be generated from the structured data rather than maintained independently.

## Delivery sequence

| Phase | Period | Main outcome |
|---|---|---|
| Foundation | 22–30 Sep 2026 | Master specification, repository, structured portfolio data, Control Center baseline |
| EOIP specification & data foundation | Oct 2026 | NordWerk source model, reproducible ERP data, SQL staging, star schema |
| EOIP analytics | Nov 2026 | KPI layer, Power BI, Sales & Margin, Inventory, executive reporting |
| EOIP release | Dec 2026 | Business cases, QA, documentation and EOIP V1 release |
| Advanced analytics | Jan 2027 | InventoryIQ V1 and BCSentinel portfolio readiness |
| Portfolio completion | 1–14 Feb 2027 | MarginGuard V1, optional ProcureGuard MVP, website content integration |
| Hardening | 15–21 Feb 2027 | Deployment, responsive QA, consistency, broken-link and demo checks |
| Application packaging | 22–28 Feb 2027 | CV, LinkedIn, GitHub profile, interview stories and final readiness review |

## Major milestones

| ID | Milestone | Target | Mandatory |
|---|---|---:|---|
| M01 | Portfolio Baseline Established | 30 Sep 2026 | Yes |
| M02 | EOIP Architecture & Data Specification | 11 Oct 2026 | Yes |
| M03 | EOIP Data Foundation Complete | 31 Oct 2026 | Yes |
| M04 | EOIP Analytics Core Complete | 30 Nov 2026 | Yes |
| M05 | EOIP V1 Released | 31 Dec 2026 | Yes |
| M06 | InventoryIQ V1 Released | 24 Jan 2027 | Yes |
| M07 | BCSentinel Portfolio Ready | 31 Jan 2027 | Yes |
| M08 | MarginGuard V1 Released | 10 Feb 2027 | Yes |
| M09 | Feature Freeze | 14 Feb 2027 | Yes |
| M10 | Portfolio Hardening Complete | 21 Feb 2027 | Yes |
| M11 | Application Ready | 28 Feb 2027 | Yes |

## Portfolio weighting

| Workstream | Portfolio weight | Application mandatory |
|---|---:|---|
| Portfolio Foundation & Control Center | 10% | Yes |
| EOIP | 35% | Yes |
| BCSentinel Portfolio Readiness | 10% | Yes |
| InventoryIQ | 12% | Yes |
| MarginGuard | 10% | Yes |
| ProcureGuard MVP | 5% | No |
| Portfolio Website | 8% | Yes |
| Career / Application Packaging | 5% | Yes |
| Certifications | 5% | Yes |
| **Total** | **100%** | **95 weighted points mandatory** |

## Progress model

Two related metrics are kept deliberately separate:

- **Portfolio Scope Progress** = completed weighted work / 100.
- **Application Readiness Progress** = completed mandatory weighted work / 95, normalized to 100%.

This means ProcureGuard can remain unfinished without falsely blocking application readiness. It still remains visible as planned portfolio scope.

Only work packages with status `done` receive completion credit. If a package becomes too large for this binary rule, it must be decomposed into smaller objective packages rather than given a subjective partial percentage.

## Critical path

Foundation → EOIP specification → NordWerk data foundation → SQL staging → star schema → KPI layer → EOIP analytics/business cases → EOIP V1 → InventoryIQ → MarginGuard → Website integration → Portfolio hardening → Application package.

BCSentinel's **product roadmap** is not on the critical path. Only its defined portfolio-readiness package is mandatory.

ProcureGuard is not on the mandatory critical path and is the first significant scope to defer if forecast risk increases.

## Scope control

Every new item above roughly one focused working day must document:

1. portfolio value,
2. target role strengthened,
3. effort,
4. impact on the 28 February forecast,
5. whether it is genuinely required for V1.

The structured work-package plan, exact dependencies and dates are maintained in [`data/roadmap.yaml`](data/roadmap.yaml).