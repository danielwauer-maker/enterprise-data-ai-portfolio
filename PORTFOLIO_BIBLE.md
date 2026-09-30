# Enterprise Data & AI Portfolio — Portfolio Bible

**Version:** 2.0-draft  
**Program start:** 2026-10-01  
**High-End target:** 2027-06-30  
**Planned capacity:** 20 h/week  
**Program capacity:** ~780 h  
**Owner:** Daniel Wauer  
**Primary commercial product:** BCSentinel

---

## 1. Purpose

This document is the permanent source of context for the Enterprise Data & AI Portfolio.

It exists so that a new ChatGPT/Codex session can immediately understand:

- what the portfolio is trying to achieve;
- which repositories are authoritative;
- what is already built;
- what must still be delivered;
- how BCSentinel, EOIP and the intelligence modules fit together;
- the complete sprint plan from S00 through S19;
- how readiness, effort, schedule variance and AI-assisted delivery are measured;
- what must never be lost during repository cleanup or migration.

The previous portfolio baseline remains historical evidence and must not be rewritten to make later delivery look faster.

---

## 2. Strategic Goal

Build a production-oriented Enterprise Data & AI portfolio around Microsoft Dynamics 365 Business Central.

The program has two parallel goals:

### Track A — Commercial Product

BCSentinel Core  
→ Pilot Release  
→ Design Partner  
→ Paying Customer  
→ BCSentinel Professional  
→ Enterprise / Autonomous capabilities

### Track B — High-End Engineering Portfolio

EOIP  
→ Decision Intelligence  
→ Inventory Intelligence  
→ Margin & Customer Intelligence  
→ Procurement Intelligence  
→ AI Copilot  
→ Agent Platform  
→ Human-approved BC Actions  
→ Enterprise AI Platform

The portfolio must demonstrate not only finished software, but also:

- engineering discipline;
- architecture decisions;
- data engineering;
- analytics;
- AI engineering;
- security;
- testing;
- observability;
- release management;
- measurable AI-assisted delivery efficiency.

---

## 3. Portfolio Scope

### Main professional portfolio

1. **BCSentinel**
   - commercial Business Central product;
   - technical data-health monitoring;
   - findings, scoring, reports, monitoring and remediation;
   - future intelligence, AI and controlled action platform.

2. **EOIP — Enterprise Operational Intelligence Platform**
   - enterprise data and analytics R&D platform;
   - synthetic ERP source model;
   - PostgreSQL;
   - raw/staging/dimensional layers;
   - KPI and semantic model;
   - Power BI;
   - source of reusable intelligence concepts for BCSentinel Professional.

3. **Decision Intelligence modules**
   - Inventory Intelligence;
   - Margin Intelligence;
   - Customer Intelligence;
   - Procurement Intelligence.

4. **AI Platform**
   - Ask BCSentinel / Copilot;
   - structured tool calling;
   - AI evaluation;
   - specialized agents;
   - orchestration;
   - policy and approval layer;
   - human-approved Business Central actions.

5. **Portfolio Control Center**
   - roadmap;
   - sprint status;
   - sprint readiness;
   - historical timeline;
   - plan vs actual;
   - effort tracking;
   - forecast;
   - AI-assisted delivery metrics;
   - engineering evidence.

### Explicitly outside the main professional portfolio

These remain private/side projects and do not drive the main portfolio roadmap:

- Trevella / Travel Time AI;
- MoneyOS;
- Spareno.

They may remain on GitHub or be referenced privately, but they should not dilute the main Data/AI/BC positioning.

---

## 4. Repository Roles

### enterprise-data-ai-portfolio

**Role:** Portfolio control plane and source of truth for program-level planning.

Owns:

- this Portfolio Bible;
- High-End roadmap;
- sprint metadata;
- effort model;
- plan-vs-actual;
- Control Center data;
- portfolio website;
- program metrics;
- historical portfolio baseline.

It must NOT duplicate implementation truth from BCSentinel or EOIP.

### bcsentinel

**Role:** Core product implementation and runtime truth.

Owns:

- Business Central AL extension;
- FastAPI backend;
- PostgreSQL persistence;
- migrations;
- runtime behavior;
- dashboards;
- reports;
- landing/sales pages;
- billing integration;
- tests;
- CI/CD;
- release evidence.

### bcsentinel-product-system

**Role:** Normative BCSentinel product authority.

Owns:

- product model;
- terminology;
- requirements;
- product contracts;
- entitlements;
- access-state definitions;
- traceability;
- design contracts;
- cross-repository drift register.

This repository remains important.

### bcsentinel-figma-builder

**Role:** Supporting internal design/rendering tooling only.

It is NOT a flagship portfolio project.

Rules:

- keep it available;
- use it when it materially supports product UX;
- no separate major roadmap track;
- do not let design-tooling work delay BCSentinel Core commercial readiness;
- Product System remains authoritative, not the builder.

### EOIP

**Role:** Enterprise Data & Analytics implementation and intelligence R&D.

Owns:

- ERP-like source model;
- synthetic data generator;
- PostgreSQL data foundation;
- staging/transformation;
- dimensional model;
- KPI layer;
- semantic model;
- Power BI;
- business-impact use cases;
- reusable Decision Intelligence research.

---

## 4A. Cross-Repository Authority Hierarchy

The High-End program adds one authority level above repository-local roadmaps.

| Domain | Authority |
|---|---|
| Overall strategy, portfolio scope, sprint sequence, dates, capacity | Portfolio Bible + `data/high-end-program-v2.yaml` |
| BCSentinel product model, terminology, entitlements, requirements, target UX | `bcsentinel-product-system` |
| BCSentinel implemented/tested runtime truth | `bcsentinel` with evidence |
| Figma/design rendering | `bcsentinel-figma-builder` as derived-only tooling |
| EOIP implementation truth | `eoip` |
| Program metrics and effort truth | Portfolio Control Center data |

Repository-local roadmaps remain valid inside their domain, but they cannot activate work outside the current High-End sprint by themselves.

The detailed contract is `docs/CROSS_REPO_AUTHORITY_V2.md`.

## 5. BCSentinel Safety Rule

No destructive repository cleanup is allowed before a verified release baseline is secured.

Required order:

1. preserve current Git history;
2. catalogue important branches, PRs, releases and evidence;
3. close current pilot/runtime blockers;
4. produce a known-good Core Release Candidate;
5. freeze and document that baseline;
6. only then create or migrate to a cleaner canonical repository structure;
7. retain legacy history as reference evidence.

Do not fake or backdate commits.

Historical development may be reconstructed in documentation using actual:

- commit dates;
- PR dates;
- issue dates;
- release versions;
- CI runs;
- runtime evidence;
- documented milestones.

Historical effort that was not measured must be labelled as an estimate with a confidence level.

---

## 6. Target Architecture

```text
                       BUSINESS CENTRAL
                              |
                      BC Connector Layer
                              |
              +---------------+---------------+
              |                               |
              v                               v
       BCSentinel Core                   Data Platform
              |                               |
     Technical Data Health                    EOIP
              |                               |
              |                        Feature Engineering
              |                               |
              |               +---------------+---------------+
              |               |               |               |
              |               v               v               v
              |          Inventory         Margin         Procurement
              |          Intelligence      Intelligence   Intelligence
              |               |               |               |
              +---------------+---------------+---------------+
                              |
                       Insight Contract
                              |
                    Recommendation Engine
                              |
                        AI Copilot
                              |
                     Agent Orchestrator
                              |
                        Policy Engine
                              |
                       Human Approval
                              |
                         BC Actions
```

The LLM must not become the source of business truth.

Structured analytics and deterministic services provide evidence. AI explains, orchestrates and assists.

---

## 7. BCSentinel Product Direction

### Core

- data-health scans;
- findings;
- score;
- business impact;
- executive reports;
- monitoring;
- history;
- remediation;
- permissions;
- access and entitlement control.

### Professional

Core plus:

- Inventory Intelligence;
- Margin Intelligence;
- Customer Intelligence;
- Procurement Intelligence;
- recommendations;
- forecasting;
- AI Copilot.

### Enterprise

Professional plus:

- multi-company;
- advanced policies;
- custom rules;
- APIs;
- advanced observability;
- enterprise deployment;
- enhanced security and audit capabilities.

### Future Autonomous capabilities

- specialized agents;
- workflow orchestration;
- controlled action preparation;
- human approvals;
- policy checks;
- audited Business Central actions.

No uncontrolled autonomous posting or destructive ERP actions.

---

## 8. Program Timeline

Program v2 baseline:

- **Start:** 2026-10-01
- **Target:** 2027-06-30
- **Capacity:** 20 h/week
- **Total capacity:** approximately 780 h

The program uses one initial 20-hour sprint followed by nineteen approximately 40-hour two-week sprints.

---

## 9. Sprint Operating Model

Every sprint must have a Sprint Brief before implementation starts.

Required fields:

- Sprint ID;
- title;
- dates;
- objective;
- business value;
- why now;
- starting state;
- repositories affected;
- in scope;
- out of scope;
- architecture/design work;
- implementation work;
- learning units;
- tests;
- manual acceptance;
- risks;
- planned effort;
- dependencies;
- Definition of Done;
- expected visible result.

No Codex implementation prompt should be started without a Sprint Brief.

Every sprint closes with a Sprint Closeout containing:

- planned scope;
- actual delivery;
- deferred work;
- defects found;
- tests and runtime evidence;
- planned hours;
- actual human hours;
- AI-assisted categories;
- schedule variance;
- readiness;
- evidence links;
- next sprint impacts.

---

## 10. Sprint Readiness Model

Sprint readiness must not be an arbitrary subjective percentage.

Default weighted readiness:

| Area | Weight |
|---|---:|
| Sprint Brief / Requirements | 10% |
| Architecture / Design | 10% |
| Implementation | 35% |
| Automated Tests | 15% |
| Runtime / Manual Acceptance | 15% |
| Documentation / Evidence | 10% |
| Merge / Release / Closeout | 5% |
| **Total** | **100%** |

Allowed sprint states:

- PLANNED
- READY
- IN_PROGRESS
- BLOCKED
- IN_REVIEW
- ACCEPTANCE
- DONE

A sprint can be 80–90% ready and still not be DONE if runtime acceptance or evidence remains open.

---

## 11. Program Metrics

Control Center must distinguish:

### Sprint Readiness
Completion state of one sprint.

### Track Readiness
Examples:

- BCSentinel Core;
- Decision Intelligence;
- AI Platform;
- Enterprise Engineering.

### Program Completion
Weighted completion of the entire High-End program.

### Application Readiness
How ready the portfolio is for job applications.

### Commercial Readiness
How ready BCSentinel is for real customers.

### Engineering Maturity
Architecture, testing, security, operations and release maturity.

### AI Platform Maturity
Copilot, evaluation, agents, policy and action capabilities.

---

## 12. Effort and AI Measurement

### From 2026-10-01 onward

Track measured active human effort.

Recommended categories:

- planning;
- learning;
- research;
- architecture;
- development;
- debugging;
- testing;
- runtime acceptance;
- documentation;
- data modeling;
- analytics;
- portfolio management.

AI runtime itself is not human labor.

### Historical work before measured tracking

Do not infer exact labor from Git timestamps.

Historical effort may be shown only as:

**Reconstructed historical effort estimate**

with confidence:

- LOW;
- MEDIUM;
- HIGH.

### AI-assisted engineering metric

Before a meaningful work package begins, record a conventional human-effort benchmark where possible.

After completion compare:

- benchmark human effort;
- actual human effort;
- quality/evidence achieved.

Use wording such as:

**Estimated effort compression**

Do not claim that AI independently delivered the work.

---

## 13. Control Center v2 Requirements

The Control Center should show:

### Program header

- program dates;
- overall completion;
- current sprint;
- schedule position;
- forecast completion;
- consumed / remaining effort.

### Sprint board

All S00–S19 with:

- sprint ID;
- title;
- date range;
- planned hours;
- actual hours;
- state;
- readiness %;
- track;
- dependencies;
- blocker count.

### Sprint detail

- objective;
- scope;
- readiness breakdown;
- tasks/work packages;
- learning units;
- repositories;
- evidence;
- hours;
- forecast;
- blockers;
- Definition of Done.

### Timeline

Three views:

- History;
- Current;
- Roadmap.

### Delivery analytics

- planned vs actual hours;
- schedule variance;
- sprint cycle time;
- forecast;
- throughput;
- rework;
- defect counts where meaningful.

### AI-assisted delivery

- AI-assisted work packages;
- actual human effort;
- benchmark effort;
- estimated effort compression;
- methodology and confidence.

---

# 14. Complete Sprint Roadmap

## S00 — Control Center v2 & High-End Baseline

**Dates:** 2026-10-01 to 2026-10-07  
**Budget:** 20 h  
**Track:** Portfolio Platform  
**Goal:** Establish the permanent program cockpit before further High-End development.

Deliverables:

- preserve Baseline v1;
- create Baseline v2;
- define S00–S19 structured data;
- build sprint-readiness model;
- update Control Center;
- add historical/current/roadmap timeline model;
- remove private projects from main portfolio scope;
- add commercial, engineering and AI maturity metrics;
- prepare historical BCSentinel evidence model;
- complete cross-repository authority alignment for Portfolio, BPS and BFB;
- prevent Product System and Figma Builder roadmaps/copy from overriding active program priorities.

Exit result:

The Control Center already shows every planned sprint, current readiness, planned hours, dependencies and timeline.

---

## S01 — BCSentinel Permission Runtime Closure

**Dates:** 2026-10-08 to 2026-10-21  
**Budget:** 40 h  
**Track:** BCSentinel Core

Goal:

Complete real BC SaaS Least-Privilege runtime evidence without SUPER.

Roles:

- plain BC user;
- VIEWER;
- SCAN;
- SETUP;
- SCHEDULER;
- ADMIN.

Validate:

- dashboard;
- history;
- setup;
- scan;
- scheduled scan;
- findings;
- reports;
- admin actions.

Learning:

- AL PermissionSets;
- indirect permissions;
- least privilege;
- BC runtime authorization.

Exit result:

A documented runtime PASS/FAIL matrix with evidence for all roles.

---

## S02 — Product Model & Entitlement Closure

**Dates:** 2026-10-22 to 2026-11-04  
**Budget:** 40 h  
**Track:** BCSentinel Core

Goal:

Make product offers, entitlements, access states, dashboard, reports, BC UI and pricing consistent.

Canonical offers:

- Free Entry;
- Assessment;
- Validation;
- Monitoring.

Deliverables:

- close critical product-model drift;
- validate access snapshot;
- verify Free/Paid boundaries;
- remove contradictory visible terminology;
- align reports, dashboard and marketing copy;
- regression evidence.

Exit result:

One consistent product truth for a real customer.

---

## S03 — Pilot Onboarding

**Dates:** 2026-11-05 to 2026-11-18  
**Budget:** 40 h  
**Track:** BCSentinel Commercialization

Goal:

Enable a controlled pilot customer to onboard safely.

Deliverables:

- pilot enrollment;
- one-time expiring tokens;
- revocation;
- identity binding;
- audit events;
- tenant creation;
- invite email;
- login/logout;
- resend;
- suspend/reactivate;
- tenant isolation;
- pilot status model.

Exit result:

Invitation → registration → BC connection → dashboard works reproducibly.

---

## S04 — Dashboard & Executive Report Product Hardening

**Dates:** 2026-11-19 to 2026-12-02  
**Budget:** 40 h  
**Track:** BCSentinel Product UX

Goal:

Make customer-facing dashboard and reports production-quality.

Dashboard coverage:

- Overview;
- Analytics;
- Scans;
- Issues;
- Actions;
- Reports;
- Subscription;
- Settings.

States:

- Free;
- Assessment;
- Validation;
- Monitoring;
- loading;
- empty;
- error;
- locked.

QA:

- DE/EN;
- dark/light;
- responsive;
- encoding;
- large-number formatting;
- drilldowns.

Reports:

- executive PDF;
- Free vs Full;
- large values;
- many findings;
- exceptions;
- multilingual Chromium PDF QA.

Exit result:

Dashboard and reports are pilot-presentable.

---

## S05 — Salespage, Pricing & Pilotpage

**Dates:** 2026-12-03 to 2026-12-16  
**Budget:** 40 h  
**Track:** Commercialization

Goal:

Create truthful professional external product presentation.

Pages:

- Home;
- How it works;
- Pricing;
- Executive Reports;
- Security / Trust;
- Why BCSentinel;
- Pilot / Design Partner;
- Contact;
- FAQ;
- legal/privacy navigation.

Mandatory claim audit:

Do not claim AppSource, Azure hosting, GDPR compliance, Enterprise readiness or features unless supported by current evidence.

Exit result:

A potential pilot customer can understand the product, trust the claims and request participation.

---

## S06 — BCSentinel Core Release Candidate

**Dates:** 2026-12-17 to 2026-12-30  
**Budget:** 40 h  
**Track:** BCSentinel Core

Goal:

Freeze a known-good pilot release.

Gates:

- fresh install;
- upgrade;
- migrations;
- PostgreSQL;
- real BC SaaS;
- role matrix;
- tenant isolation;
- monitoring;
- reports;
- onboarding;
- billing;
- restore;
- rollback.

Documentation:

- operator runbook;
- support runbook;
- installation;
- troubleshooting;
- release notes;
- known limitations.

Milestone:

**BCSentinel Core Pilot RC**

---

## S07 — Design Partner & Canonical Repository

**Dates:** 2026-12-31 to 2027-01-13  
**Budget:** 40 h  
**Track:** Product + Engineering Governance

Goal:

Use the verified Core RC as the baseline for a clean canonical product repository and pilot operation.

Rules:

- preserve old Git history;
- catalogue historical evidence;
- no fake/backdated commits;
- migrate only verified baseline;
- document legacy-to-canonical mapping.

Exit result:

A professional canonical codebase with the original development journey still traceable.

---

## S08 — EOIP V1 + Shared Intelligence Contract

**Dates:** 2027-01-14 to 2027-01-27  
**Budget:** 40 h  
**Track:** Data Platform

Goal:

Finish EOIP V1 and define a reusable insight contract.

EOIP:

- Executive Overview;
- Sales & Margin;
- Inventory;
- business cases;
- QA;
- documentation.

Insight Contract fields include:

- insight ID;
- type;
- entity;
- evidence;
- severity;
- confidence;
- financial impact;
- recommendation;
- provenance.

Exit result:

EOIP and future BCSentinel intelligence modules can exchange structured business insights.

---

## S09 — Inventory Intelligence V1

**Dates:** 2027-01-28 to 2027-02-10  
**Budget:** 40 h  
**Track:** Decision Intelligence

Capabilities:

- ABC/XYZ;
- demand rate;
- lead time;
- safety stock;
- reorder point;
- days of supply;
- stockout risk;
- overstock;
- dead stock;
- working capital;
- transfer opportunities.

No LLM dependency for core calculations.

Exit result:

Explainable inventory recommendations based on structured evidence.

---

## S10 — Margin & Customer Intelligence

**Dates:** 2027-02-11 to 2027-02-24  
**Budget:** 40 h  
**Track:** Decision Intelligence

Capabilities:

- product margin;
- customer margin;
- margin trend;
- discount leakage;
- returns;
- credit memos;
- cost-to-serve;
- sales decline;
- customer inactivity;
- payment behaviour.

Exit result:

Evidence-based profitability and customer-risk insights.

---

## S11 — Procurement Intelligence + Job-Ready Portfolio

**Dates:** 2027-02-25 to 2027-03-10  
**Budget:** 40 h  
**Track:** Decision Intelligence + Career

Capabilities:

- spend analysis;
- supplier performance;
- lead-time reliability;
- purchase-price variance;
- delivery reliability;
- supplier dependency;
- purchase recommendations.

Portfolio milestone:

Job-ready presentation of:

- BCSentinel;
- EOIP;
- Inventory Intelligence;
- Margin/Customer Intelligence;
- Procurement Intelligence;
- architecture;
- test evidence;
- engineering timeline;
- AI-assisted delivery metrics.

---

## S12 — AI Copilot Foundation

**Dates:** 2027-03-11 to 2027-03-24  
**Budget:** 40 h  
**Track:** AI Platform

Goal:

Build Ask BCSentinel on trusted structured data.

Flow:

Question → intent → approved tool → semantic/data layer → evidence → AI explanation.

Learning:

- LLM APIs;
- structured outputs;
- tool calling;
- RAG/context;
- prompt contracts;
- AI security.

Exit result:

Evidence-grounded Copilot Alpha.

---

## S13 — AI Evaluation & Copilot UX

**Dates:** 2027-03-25 to 2027-04-07  
**Budget:** 40 h  
**Track:** AI Platform

Build:

- evaluation dataset;
- tool-selection tests;
- query accuracy;
- groundedness;
- unsupported-claim detection;
- completeness;
- latency;
- token cost;
- Copilot UX.

Target:

hundreds of representative enterprise questions, increasing toward 500–1,000 where valuable.

Exit result:

AI quality is measurable rather than anecdotal.

---

## S14 — Agent Platform V1

**Dates:** 2027-04-08 to 2027-04-21  
**Budget:** 40 h  
**Track:** AI Platform

Agents:

- Inventory;
- Margin;
- Customer;
- Procurement;
- Data Health.

Platform:

- orchestrator;
- routing;
- state;
- plans;
- tools;
- retry/fallback;
- boundaries.

Exit result:

Controlled multi-agent analytical workflows.

---

## S15 — AI Observability & Security

**Dates:** 2027-04-22 to 2027-05-05  
**Budget:** 40 h  
**Track:** AI Platform / Enterprise Engineering

Observe:

User → Agent → LLM → Tool → Query → Evidence → Recommendation.

Capabilities:

- OpenTelemetry;
- traces;
- metrics;
- latency;
- token cost;
- errors;
- AI evaluation visibility;
- audit;
- PII handling;
- policy checks.

Exit result:

Explainable and observable AI operations.

---

## S16 — Human-Approved BC Actions

**Dates:** 2027-05-06 to 2027-05-19  
**Budget:** 40 h  
**Track:** AI + BC Integration

Initial action patterns may include:

- purchase-order draft;
- transfer draft;
- follow-up task;
- price-review task;
- customer review;
- supplier review.

Required flow:

Insight → recommendation → policy → permission → human approval → BC draft/action → audit.

No uncontrolled autonomous postings.

---

## S17 — Multi-Company & Enterprise Hardening

**Dates:** 2027-05-20 to 2027-06-02  
**Budget:** 40 h  
**Track:** Enterprise Engineering

Focus:

- multi-company;
- tenant isolation;
- role scopes;
- policy scopes;
- rate limits;
- secrets;
- encryption;
- audit;
- retention;
- backup;
- disaster recovery.

Exit result:

Enterprise-oriented platform architecture.

---

## S18 — Cloud, Infrastructure & Scale

**Dates:** 2027-06-03 to 2027-06-16  
**Budget:** 40 h  
**Track:** Platform Engineering

Choose cloud architecture based on actual need.

Possible technologies:

- Azure Container Apps / App Services;
- AKS only where justified;
- managed PostgreSQL;
- Key Vault;
- Managed Identity;
- Infrastructure as Code;
- CI/CD.

Performance:

- API throughput;
- concurrent users;
- scan ingestion;
- agent requests;
- database load;
- p95 latency;
- AI cost.

Exit result:

Measured performance and cost baseline.

---

## S19 — BCSentinel Professional Beta / High-End Release

**Dates:** 2027-06-17 to 2027-06-30  
**Budget:** 40 h  
**Track:** Program Release

BCSentinel Core:

stable commercial Data Health product.

BCSentinel Professional Beta:

- Core;
- Inventory Intelligence;
- Margin Intelligence;
- Customer Intelligence;
- Procurement Intelligence;
- AI Copilot;
- recommendations.

Experimental/advanced:

- agent workflows;
- human-approved actions.

Final portfolio outputs:

- architecture;
- case study;
- engineering journey;
- metrics;
- performance;
- security;
- AI evaluation;
- delivery-efficiency report.

Milestone:

**BCSentinel Professional Beta + Enterprise Data & AI Portfolio High-End Release**

---

## 15. Approximate Program Effort Allocation

| Area | Approx. effort |
|---|---:|
| BCSentinel Core & Commercialization | 230 h |
| EOIP / Data Foundation | 90 h |
| Decision Intelligence | 120 h |
| AI Copilot / Agents | 130 h |
| Enterprise / Cloud / Security | 80 h |
| Portfolio / Control Center | 55 h |
| Explicit learning units | 45 h |
| Rework / reserve | 30 h |
| **Total** | **780 h** |

The allocation is a planning baseline, not a promise.

---

## 16. Historical Timeline Policy

The Control Center should distinguish:

### History

Actual work already completed before the High-End baseline.

Examples:

- early BCSentinel prototype;
- SaaS/backend architecture;
- monitoring;
- billing/access model;
- runtime hardening;
- BC SaaS tests;
- EOIP foundation;
- portfolio baseline v1.

### Current

Active sprint with measured readiness and effort.

### Roadmap

Future Sprints S00–S19.

Historical milestone dates must be reconstructed from evidence and never fabricated.

---

## 17. Quality Principle

A feature is not complete because code exists.

Completion may require:

- requirements;
- implementation;
- automated tests;
- real runtime evidence;
- documentation;
- user-facing copy;
- security review;
- release evidence.

Especially for Business Central, CI is not a substitute for real SaaS runtime acceptance when runtime behaviour is part of the requirement.

---

## 18. Portfolio Narrative

The final portfolio should tell one coherent story:

> I use AI as an engineering accelerator to design, build, test and evolve production-oriented enterprise Data & AI systems. The portfolio follows the complete journey from Business Central product engineering and enterprise analytics through decision intelligence, AI copilots, agentic workflows and controlled ERP actions.

The central commercial proof is BCSentinel.

EOIP demonstrates the underlying data and analytics capability.

Decision Intelligence shows how analytics becomes actionable business recommendations.

The AI Platform demonstrates modern AI engineering rather than simple prompt-based coding.

The Control Center demonstrates measurable delivery, project governance and AI-assisted engineering efficiency.

---

## 19. Rules for New Chat Sessions

When a new ChatGPT/Codex session begins:

1. Read this file first.
2. Read the current Control Center / program status.
3. Read the active sprint brief.
4. Read the relevant implementation repository's local instructions.
5. Do not rely on old chat memory if repository evidence differs.
6. Do not start the next sprint until the current sprint closeout is recorded or an explicit decision is made to interrupt it.
7. Update program status when scope, readiness, effort, blockers or sprint state changes.

This document defines program intent. Implementation truth remains in the responsible repository.

---

## 20. Current Next Step

Current program sequence:

1. Complete S00 structured data and Control Center v2.
2. Display S00–S19 with readiness/status/hours/dependencies.
3. Preserve historical Baseline v1.
4. Establish Baseline v2 on 2026-10-01.
5. Begin measured effort tracking.
6. Start S01 only after the S00 closeout is available.
