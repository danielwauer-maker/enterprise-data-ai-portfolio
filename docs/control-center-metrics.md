# Portfolio Control Center Metrics

**Work package:** FND-05  
**Version:** 1.0

## Principle

Portfolio metrics are calculated from canonical structured data. Progress percentages are never manually estimated.

Inputs:

- `data/roadmap.yaml` — baseline, work packages, weights, dates, status, dependencies and critical path
- `data/control-center.yaml` — calculation configuration and milestone completion mapping
- `data/risks.yaml` — structured risk register

Generated outputs:

- `data/metrics.json`
- `STATUS.md`

## 1. Portfolio Scope Progress

```
completed portfolio weight / portfolio scope denominator
```

All work packages are included, including optional ProcureGuard scope.

## 2. Application Readiness Progress

```
completed mandatory weight / application readiness denominator
```

Only mandatory work packages are included. ProcureGuard does not reduce Application Readiness.

## 3. Planned Progress

Planned progress is a weighted baseline curve.

For each work package:

- before planned start: 0%
- on/after planned end: 100%
- between start and end: linear interpolation across calendar days

The portfolio planned curve sums the weighted planned credit of all work packages.

Application-readiness planned progress uses mandatory packages only.

## 4. Actual Progress

Actual earned credit is deliberately binary:

- `done`: 100% of work-package weight
- every other status: 0%

Large packages must be decomposed if meaningful partial credit is required. Subjective values such as "80% done" are prohibited.

## 5. Schedule Variance

```
actual application readiness % - planned application readiness %
```

Positive means ahead of the baseline curve; negative means behind.

## 6. Schedule Performance Index

```
actual application readiness % / planned application readiness %
```

The index is omitted when planned progress is zero.

This is a portfolio delivery indicator, not formal earned-value cost accounting.

## 7. Schedule Equivalent Date

The system finds the earliest date on the baseline curve at which planned Application Readiness is at least equal to today's actual Application Readiness.

```
schedule delta days = schedule equivalent date - snapshot date
```

- positive: days ahead
- negative: days behind

This gives a human-readable "days ahead / behind plan" measure.

## 8. Forecast Completion Date

Two forecast modes are used.

### Early-stage fallback

Until both thresholds are reached:

- minimum elapsed days
- minimum completed mandatory weight

the forecast uses schedule-equivalent projection:

```
forecast completion = baseline application-ready date - schedule delta days
```

Confidence is low.

### Velocity forecast

After sufficient history exists:

```
daily mandatory velocity = mandatory completed weight / elapsed portfolio days
remaining days = remaining mandatory weight / daily mandatory velocity
forecast completion = snapshot date + remaining days
```

Confidence increases as delivery history grows.

This intentionally favors a simple explainable forecast over a complex model with false precision.

## 9. Schedule Buffer

```
baseline application-ready date - forecast completion date
```

Positive means forecast buffer remains. Negative means the forecast exceeds the target.

## 10. Throughput

Rolling throughput uses work packages with an `actual_end` inside the configured window.

Reported as:

- completed work-package count
- completed weighted points

## 11. Cycle Time

For completed packages with `actual_start` and `actual_end`:

```
cycle time calendar days = actual_end - actual_start + 1
```

The metric reports average and median calendar-day cycle time.

## 12. Milestone Reliability

Milestone completion is defined in `data/control-center.yaml` by required work-package IDs.

A milestone is complete when every required package is `done`.

Its actual completion date is the latest `actual_end` among its required packages.

Reliability:

```
on-time completed milestones / milestones that are completed or already due
```

When no milestone is yet complete or due, reliability is reported as null rather than inventing a score.

## 13. Blockers and Risks

Blockers are work packages with status `blocked`.

Critical risks are open entries in `data/risks.yaml` with severity `critical`.

## 14. Critical Path Visibility

The output lists:

- total critical-path packages
- completed critical-path packages
- remaining critical-path packages
- blocked critical-path packages
- first unresolved critical-path package

## Snapshot model

`data/control-center.yaml` contains the explicit snapshot date for committed metrics. This makes committed metrics reproducible.

The future website may calculate the same formulas at build time using the build date, but must use the same calculation contract.
