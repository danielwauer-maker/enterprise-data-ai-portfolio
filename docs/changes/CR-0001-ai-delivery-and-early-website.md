# CR-0001 — Start Portfolio Website Early and Add AI-Assisted Delivery Efficiency

**Date:** 2026-09-22  
**Status:** Approved  
**Baseline affected:** No baseline dates or weights changed.

## Decision

Start WEB-01 earlier than the original baseline and introduce an AI-Assisted Delivery Efficiency measurement layer.

The original WEB-01 baseline remains:

- planned start: 2027-01-15
- planned end: 2027-01-24

Actual execution may start on 2026-09-22. This creates useful plan-vs-actual evidence without rewriting history.

## Rationale

The portfolio now has enough real structured data, metrics and technical project evidence to build the website against live sources rather than mock data.

Starting a thin vertical slice now provides three benefits:

1. the portfolio becomes visible while projects are still being delivered;
2. the website architecture is validated early against the source-of-truth model;
3. delivery acceleration can be visualized from the beginning rather than reconstructed at the end.

## New cross-cutting capability

AI-Assisted Delivery Efficiency will measure:

- frozen baseline delivery window
- actual final delivery window
- forecast delivery window while incomplete
- schedule compression days and percentage
- observed human effort when explicitly tracked
- modeled capacity/cost scenarios when benchmark evidence exists

## Guardrails

- No baseline start/end dates are rewritten.
- Website work must not block EOIP critical-path delivery.
- No labor-hour savings are inferred from calendar days.
- No employer cost-savings claim is presented as realized without evidence.
- Website metrics are generated from canonical GitHub data.

## Implementation

Canonical sources:

- `data/delivery-efficiency.yaml`
- `data/effort-log.yaml`
- `data/website.yaml`

WEB-01 becomes `in_progress` with an actual start of 2026-09-22 while retaining its original planned dates.
