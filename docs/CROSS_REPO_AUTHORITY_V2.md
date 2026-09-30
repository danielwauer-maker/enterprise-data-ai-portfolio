# Cross-Repository Program Authority — High-End v2

**Program:** enterprise-data-ai-high-end-v2  
**Effective baseline:** 2026-10-01  
**Status:** Draft for S00 alignment

## Purpose

This contract prevents repository-local roadmaps, design tooling, or implementation documentation from overriding the High-End program plan.

## Authority domains

| Domain | Source of truth |
|---|---|
| Overall portfolio strategy | `enterprise-data-ai-portfolio/PORTFOLIO_BIBLE.md` |
| Program scope, sprint order, dates, capacity and dependencies | `enterprise-data-ai-portfolio/data/high-end-program-v2.yaml` |
| BCSentinel product model, terminology, entitlements and target UX contracts | `bcsentinel-product-system` |
| Implemented and tested runtime truth | `bcsentinel` with evidence |
| Design rendering / Figma output | `bcsentinel-figma-builder` as derived tooling |
| EOIP implementation truth | `eoip` |
| Program delivery metrics | `enterprise-data-ai-portfolio` Control Center data |

## Conflict rules

1. Program priority conflicts are resolved by the Portfolio Bible and active sprint data.
2. BCSentinel product-definition conflicts are resolved by the Product System.
3. Runtime capability claims are resolved by verified Core Product evidence.
4. The Figma Builder may not define independent pricing, packaging, entitlement, product-roadmap, or program-roadmap truth.
5. Repository-local roadmaps remain valid only inside their stated authority domain.
6. A local roadmap item does not become active work merely because it is listed; it must be scheduled by the High-End program or explicitly approved as an exception.
7. No repository may rewrite historical program baselines to improve schedule or AI-efficiency metrics.

## Current program sequence

The active High-End program uses S00–S19 from the structured v2 roadmap. BCSentinel Product System work such as ARCH-02/ARCH-03 is mapped into the relevant program sprint rather than run as an independent competing roadmap.

## Change control

Cross-repository changes must identify:

- active program sprint;
- affected authority domain;
- normative source;
- implementation repositories;
- tests/evidence required;
- whether the change alters scope, dates, or planned effort.

Changes to program scope, sprint order, dates, or capacity start in `enterprise-data-ai-portfolio`.

Changes to BCSentinel product semantics start in `bcsentinel-product-system`.

Changes to runtime behavior are implemented and evidenced in `bcsentinel`.

Changes to derived Figma output must reference the Product System contract they render.
