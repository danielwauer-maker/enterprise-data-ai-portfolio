# Enterprise Data & AI Portfolio 2027 — Portfolio Master Specification v1.0

**Baseline date:** 22 September 2026  
**Application-ready target:** 28 February 2027  
**Status:** Baseline v1.0

## Vision

Build a professional enterprise portfolio that demonstrates the full chain from operational business problems and ERP-style data through data modeling, analytics engineering and BI to decision support and measurable business impact.

The portfolio prioritizes business value, traceability, delivery quality and credibility over technology count or tutorial-style projects.

## Professional positioning

Target positioning combines 10+ years of enterprise IT / ERP experience with Business Central, SQL, Power BI, Python, data engineering, analytics engineering, software engineering and business-process optimization.

Primary target roles:
- Data & AI Solutions Consultant
- Analytics Engineer
- Data & Analytics Consultant
- BI & Data Platform Engineer
- Microsoft Fabric / Power BI Consultant
- Decision Intelligence / Business Analytics

## Portfolio story

Enterprise Operations / ERP → Operational Software → Enterprise Analytics Platform → Specialized Decision Intelligence → future Data & AI extensions.

## Project landscape

### BCSentinel
Real independent SaaS / software project in the Microsoft Dynamics 365 Business Central ecosystem. It demonstrates software engineering, SaaS architecture, APIs, backend development, databases, monitoring, testing, CI/CD, security, release management and production readiness.

BCSentinel is not artificially integrated into the NordWerk fictional company. The February 2027 requirement is **portfolio readiness**, not commercial completion of the SaaS roadmap.

### EOIP — Enterprise Operational Intelligence Platform
Central portfolio and BI capstone project. EOIP provides the shared enterprise data foundation for specialized analytics projects.

EOIP V1 focuses on SQL, staging/transformation, dimensional modeling, star schema, Power BI, DAX, KPI engineering and traceable business cases.

Core analytical areas:
- Executive Overview
- Sales & Margin Intelligence
- Inventory Intelligence

### InventoryIQ
Inventory & Working Capital Intelligence. Extends EOIP with ABC/XYZ segmentation, demand variability, safety-stock/reorder logic, inventory optimization, simulation and working-capital analysis.

### MarginGuard
Customer & Product Profitability Intelligence. Focuses on contribution margin, customer/product profitability, cost-to-serve and margin leakage.

### ProcureGuard
Procurement Cost Leakage & Supplier Intelligence. Planned as optional V1 MVP and first major scope to defer if the mandatory readiness forecast turns amber/red.

### CashFlowIQ / AI extensions
Post-V1 stretch scope only.

## Shared enterprise world

EOIP, InventoryIQ, MarginGuard and ProcureGuard use the same fictional but realistic company: **NordWerk Distribution GmbH**.

Approximate scale:
- 240 employees
- €62M revenue
- 18,500 products
- 4,200 customers
- 310 suppliers
- 4 warehouses
- €8.4M inventory
- €31M procurement volume

Data must be ERP-like and internally coherent. Financial outcomes must be calculated from the data and documented assumptions rather than invented as marketing claims.

## Technology strategy

Core technologies:
- SQL / relational database
- dimensional modeling / star schema
- Power BI / DAX / Power Query
- Python where advanced analytics justifies it
- Git / GitHub
- APIs / FastAPI / Docker where appropriate
- Microsoft Business Central, Power BI and progressively Fabric
- Next.js / TypeScript / Tailwind for the static portfolio website

A technology is introduced only when it solves a project requirement, materially strengthens target-role positioning, demonstrates an important capability or simplifies the solution.

## Business-impact framework

Financial outcomes remain separated into:
- revenue impact
- profit impact
- cost savings
- working-capital release

Evidence levels:
- Level A: directly calculated from portfolio data
- Level B: modeled opportunity using documented assumptions
- Level C: scenario based on explicit hypothetical assumptions

Every material business case exposes baseline, formula, assumptions, affected population, limitations, financial category and confidence level.

## GitHub strategy

Central repository: `enterprise-data-ai-portfolio`.

GitHub is the technical source of truth. Structured data drives roadmap, status, documentation and website views. Important metrics are not independently maintained in multiple places.

Canonical sources are expected under `data/`, including `portfolio.yaml`, `roadmap.yaml`, certifications/metrics data and project metadata.

GitHub Issues, Milestones and a central Project are used for execution and evidence of delivery discipline, but commit counts or issue counts are not quality metrics.

## Portfolio website

The website is the executive presentation layer; GitHub remains the technical evidence layer.

It should show professional positioning, featured projects, business impact, project status, roadmap/timeline, plan vs actual, forecast, certifications, architecture, technology stack, delivery metrics, business cases, repository links and demos.

The website consumes the same structured data as the GitHub portfolio and uses a static architecture unless a genuine requirement justifies backend infrastructure.

## Certification strategy

Priority sequence:
1. MB-800 — Business Central / ERP processes
2. PL-300 — Power BI / analytics
3. DP-600 — Fabric / enterprise analytics (stretch, not a February readiness blocker)

Certifications support the project story and never replace project delivery.

## Delivery model

Discover → Specify → Design → Build → Validate → Document → Release.

Code existing is not equivalent to Done. Documentation, validation and business interpretation are part of the project Definition of Done.

## Progress measurement

The baseline uses weighted work packages, not subjective project percentages.

- Portfolio Scope Progress: completed weighted portfolio scope / 100.
- Application Readiness Progress: completed mandatory weighted scope / 95, normalized to 100%.
- Planned Progress: baseline-weighted scope expected complete by the date.
- Schedule Variance: Actual Progress − Planned Progress.
- Forecast Completion: based on remaining mandatory weight, recent throughput, dependencies and critical-path constraints.

The authoritative work-package baseline lives in `data/roadmap.yaml`.

## Scope guardrails

Any substantial new feature must state:
1. portfolio value,
2. target role strengthened,
3. effort,
4. effect on 28 February forecast,
5. whether it is required for V1.

Items above roughly one focused working day that are not in baseline require a scope review.

Explicit V1 exclusions unless they replace existing scope:
- autonomous multi-agent systems
- complex LLM orchestration
- custom model training
- Kubernetes
- unnecessary microservices
- real-time architecture without a business requirement
- unrelated portfolio projects
- unnecessary paid infrastructure

## Quality gates

Every flagship project must pass:
1. Business credibility
2. Data trustworthiness
3. Engineering reproducibility / maintainability
4. Analytical decision value
5. Portfolio communication quality

## Application-readiness criteria

Mandatory by 28 February 2027:
- EOIP released
- InventoryIQ released
- MarginGuard released
- BCSentinel portfolio ready
- central GitHub portfolio complete
- portfolio website public and synchronized
- CV, LinkedIn and GitHub aligned
- project demos/links functional
- interview case stories prepared
- no major placeholder or broken content

ProcureGuard MVP is desirable but not mandatory.

## Critical path

Portfolio Foundation → EOIP Specification → NordWerk Data Foundation → Star Schema → KPI / Analytics Layer → EOIP V1 → InventoryIQ → MarginGuard → Website Integration → Hardening → Application Packaging.

BCSentinel product development is not on the critical path; only the defined portfolio-readiness package is mandatory.

## Feature freeze and buffer

- Feature freeze: 14 February 2027
- Hardening: 15–21 February 2027
- Application packaging/final review: 22–28 February 2027

New non-essential features do not enter the mandatory scope after feature freeze.

## North star

The final portfolio should demonstrate:

**Enterprise experience + ERP understanding + Data Engineering + Business Intelligence + Software Engineering + measurable Business Impact.**

The recurring question for every feature is:

> What business decision becomes better because this solution exists?