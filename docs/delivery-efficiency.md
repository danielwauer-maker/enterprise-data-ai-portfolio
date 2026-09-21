# AI-Assisted Delivery Efficiency

## Why this exists

The portfolio does not only show **what** was built. It also measures **how delivery performance changed** while using an AI-assisted engineering workflow.

The objective is credible evidence, not an inflated productivity claim.

## Three separate measures

### 1. Schedule compression

This is the strongest objective measure.

The baseline remains frozen:

- portfolio start: 22 September 2026
- application-ready target: 28 February 2027
- elapsed baseline delivery window: derived automatically from the roadmap

When M11 is complete, the actual delivery window is calculated from the same start date to the actual milestone completion date.

Until then, the website may show a **forecast delivery window**, but it must be labelled forecast.

### 2. Human effort

Calendar acceleration is not the same thing as labor-hour savings.

Human effort is therefore tracked independently in `data/effort-log.yaml`.

Important rule:

> Git commits, pull-request timestamps and AI execution time are not treated as human labor hours.

If no effort entry exists, effort is unknown — not zero.

### 3. Modeled capacity / cost value

A euro value is only generated when three inputs exist:

1. a documented conventional benchmark in human hours;
2. observed AI-assisted human effort;
3. a stated loaded hourly employer-cost assumption.

The calculation is then:

```text
capacity hours saved
= benchmark human hours
- actual human effort hours

modeled capacity value
= capacity hours saved
× loaded hourly employer cost
```

This is reported as a **scenario**, not as realized savings.

## Website presentation

The portfolio website should eventually present:

- Baseline delivery window
- Actual delivery window
- Forecast delivery window while work is ongoing
- Days compressed versus baseline
- Percentage schedule compression
- Human effort when enough data exists
- Modeled capacity value only when assumptions are defensible
- A visible methodology / assumptions link

## Evidence hierarchy

**Measured**
- frozen baseline dates
- actual work-package completion dates
- final Application Ready date
- explicit effort log entries

**Derived**
- elapsed delivery days
- schedule compression
- weighted delivery velocity

**Scenario**
- conventional benchmark effort
- loaded employer cost
- modeled capacity value

The UI must visually distinguish these categories.
