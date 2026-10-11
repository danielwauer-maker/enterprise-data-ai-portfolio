# Roblox Growth Copilot — Sprint Plan to Go-Live

Start: 2026-10-12
Target: validation MVP in week 1; functional pilot in weeks 2–3; paid-ready SaaS V1 in weeks 4–6.

## Readiness model
Each sprint has an explicit exit gate. Go-Live readiness requires all P0 gates complete and no open critical security/data-integrity defect.

| Sprint | Scope | Exit gate | Status |
|---|---|---|---|
| R0 | Product foundation | Product thesis, ICP, JTBD, scope, architecture, validation gates and portfolio tracking established | IN PROGRESS |
| R1 | Validation experience | Landing page, Early Access CTA, Connect Roblox mock, Today's Priorities, Investigation, Experiment Copilot and Weekly Brief designed/clickable | PLANNED |
| R2 | SaaS foundation | Next.js app shell, FastAPI API, PostgreSQL, config, health checks, test harness and CI baseline | PLANNED |
| R3 | Roblox data connection | Least-privilege connection, analytics query adapter, normalized metric model, fixture data and ingestion tests | PLANNED |
| R4 | Decision Engine v1 | Baselines, segment comparisons, impact/confidence scoring, deterministic evidence bundles and recommendation contracts | PLANNED |
| R5 | AI Product Analyst | Grounded explanation layer, Top-3 priorities, evidence citations, safe fallbacks and hallucination tests | PLANNED |
| R6 | Experiment Copilot | Hypothesis, control/variant suggestions, primary KPI, guardrails, audience and runtime guidance | PLANNED |
| R7 | Pilot readiness | Authentication, one/multiple experiences, onboarding, daily refresh, weekly brief, telemetry and pilot feedback loop | PLANNED |
| R8 | Commercial readiness | Pricing entitlements, Stripe integration, subscription states, limits, billing UX and cancellation flows | PLANNED |
| R9 | Security & privacy | OAuth/key handling, least privilege, secrets, retention policy, audit logging, privacy/terms baseline | PLANNED |
| R10 | Reliability | Error handling, retries, observability, backups, rate-limit handling, cost controls and performance tests | PLANNED |
| R11 | Go-Live | Final QA, docs, demo dataset, production deploy, release notes, support path and launch checklist | PLANNED |
| R12 | Portfolio closure | Case study, architecture evidence, screenshots, pilot outcomes, development-time tracking and final readiness narrative | PLANNED |

## Sprint R0 — Product foundation
### Deliverables
- Product Master
- Competitive thesis and differentiation
- V1 / non-goal boundary
- Architecture baseline
- Sprint plan
- Portfolio project entry and live project page
- New product repository scaffold prepared

### Exit gate
All product decisions required to start R1 can be made without reopening fundamental scope.

## Sprint R1 — Validation experience
### Screens
1. Landing / Early Access
2. Connect Roblox
3. Today's Priorities
4. Investigation / Evidence
5. Experiment Copilot
6. Weekly Growth Brief

### Exit gate
A Roblox developer can understand the product, value proposition and workflow in under 60 seconds using simulated but realistic data.

## Sprint R2 — SaaS foundation
### Stack baseline
- Next.js / TypeScript frontend
- FastAPI / Python backend
- PostgreSQL
- Docker development environment
- pytest + frontend checks
- GitHub Actions

### Exit gate
One command starts the local stack and CI validates backend/frontend baseline.

## Sprint R3 — Roblox data connection
### Deliverables
- Analytics adapter
- least-privilege auth model
- metric normalization
- test fixtures
- ingestion history

### Exit gate
A connected pilot experience can produce normalized, persisted analytics without manual transformation.

## Sprint R4 — Decision Engine v1
### Initial rule families
- retention deterioration
- platform/segment gap
- onboarding/funnel drop-off
- monetization deterioration/opportunity
- acquisition readiness warning
- post-release regression

### Exit gate
Every priority includes deterministic metric evidence, impact score and confidence score before AI text generation.

## Sprint R5 — AI Product Analyst
### Exit gate
The model cannot introduce unsupported metric values; recommendation output references only supplied evidence and can abstain when confidence is insufficient.

## Sprint R6 — Experiment Copilot
### Exit gate
Each supported priority can be converted into a structured experiment proposal with hypothesis, audience, KPI and guardrails.

## Sprint R7 — Pilot readiness
### Pilot target
5–10 external Roblox developers/studios.

### Exit gate
Pilot user can onboard, connect one experience, receive priorities and submit feedback without developer intervention.

## Sprint R8–R11 — Paid Go-Live
Commercial, security, reliability and production launch hardening.

## Go-Live P0 gates
- real analytics integration works with least privilege
- deterministic decision evidence verified
- no unsupported AI metrics
- auth/secrets secure
- billing states tested
- delete/disconnect flow works
- observability and failure alerts present
- privacy/terms baseline present
- deployment reproducible
- pilot feedback supports willingness to pay

## Portfolio tracking
The portfolio page must show:
- current sprint
- completed / total sprints
- validation, product, engineering and commercial readiness
- architecture
- key product screens
- evidence collected
- project decisions and pivots
