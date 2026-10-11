# Roblox Decision Engine — Product Master

Status: Validation / R1–R2
Start: 2026-10-12
Owner: Daniel Wauer

## Product thesis
Roblox already provides strong native analytics. The product therefore does not compete on charts. It acts as an AI Product & Growth Analyst that answers one operational question: **What should I do next?**

## Primary user
Small to mid-sized Roblox studios with meaningful live traffic and monetization but without a dedicated data/product analyst. Initial ICP hypothesis: experiences with roughly 5k–250k DAU.

## Core jobs-to-be-done
1. Detect the highest-impact retention, onboarding or monetization issue.
2. Explain the evidence and affected segment.
3. Prioritize opportunities by likely impact and confidence.
4. Recommend the next concrete product action.
5. Draft an experiment hypothesis, audience, KPI and guardrails.
6. Warn when acquisition should not be scaled yet.
7. Compare product health before and after updates.
8. Produce a concise weekly growth brief.

## V1 surfaces
- Marketing landing page with Early Access CTA
- Connect Roblox onboarding
- Today's Priorities
- Investigation / Evidence
- Experiment Copilot
- Weekly Growth Brief
- Minimal Product Health overview
- Settings / Experience connection

## Product principles
- Decisions over dashboards.
- Evidence before explanation.
- No fabricated metrics.
- Native Roblox analytics remain the source for broad exploration.
- The AI layer receives deterministic calculations and evidence, not raw permission to invent causes.
- Every recommendation exposes confidence, evidence and an experiment path.

## Decision engine
Metric change -> data quality check -> baseline comparison -> segment comparison -> funnel / KPI evidence -> impact scoring -> root-cause candidates -> recommendation -> experiment proposal.

## Initial commercial hypothesis
Free: weekly health check for one experience.
Indie: $19/mo — daily priorities and update analysis.
Growth: $49/mo — experiments, monetization analysis, monitoring.
Studio: $99/mo — multiple experiences, team workflows and portfolio health.
Pricing is validation-only until pilot interviews confirm willingness to pay.

## Validation gates
- 10+ Roblox developer conversations or equivalent high-signal feedback.
- At least 5 developers describe the priority workflow as materially useful.
- At least 3 indicate willingness to pay or join a paid/discounted pilot.
- Functional pilot can ingest real Roblox analytics with least-privilege access.
- Recommendations are auditable and traceable to evidence.

## V1 non-goals
- No Roblox game development.
- No replacement for native Roblox Analytics.
- No proprietary A/B test engine.
- No full telemetry SDK in V1.
- No generic AI chat interface as the primary product.
- No large BI dashboard.

## Portfolio story
The project demonstrates product discovery, competitive validation, external API integration, analytics engineering, deterministic decision logic, grounded AI recommendations, experiment design, SaaS architecture and product-led onboarding.
