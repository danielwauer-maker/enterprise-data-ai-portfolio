# EOIP Requirements & Scope Specification v1.0

**Project:** Enterprise Operational Intelligence Platform (EOIP)  
**Work package:** EOIP-01  
**Status:** V1 scope frozen  
**Canonical structured specification:** `data/eoip/requirements.yaml`

## 1. Purpose

EOIP is the central enterprise analytics project of the portfolio. Its V1 purpose is to demonstrate how realistic ERP-style operational data can be transformed into a trusted analytical model, governed KPIs and management-ready Power BI decision support.

EOIP is intentionally **not** a broad AI platform. Its value comes from the quality of the enterprise data model, analytical reasoning, Power BI execution and traceable business impact.

## 2. Business problem

NordWerk Distribution GmbH operates with transaction-oriented ERP data across customers, products, sales documents and inventory movements. Operational systems are suitable for processing transactions, but management requires a consistent analytical layer that can answer:

- How is commercial performance changing?
- Which customers, products and categories drive those changes?
- Where do discounts and returns erode gross margin?
- Where is inventory tying up working capital?
- Where does insufficient inventory create availability risk?
- Which findings deserve management action first?

The target is not merely a dashboard. EOIP must connect operational data to **management decisions** and then to **supportable financial impact**.

## 3. V1 analytical boundaries

EOIP contains four analytical domains:

1. Executive Performance
2. Sales Performance
3. Gross Margin & Commercial Leakage
4. Inventory Intelligence

The canonical scope contains **18 KPI identities** and **five Power BI report pages**. Their machine-readable list is maintained only in `data/eoip/requirements.yaml` to avoid duplicate manual maintenance.

A later KPI work package (EOIP-06) will add formulas, grains, filters, DAX definitions and validation rules while preserving the frozen KPI identities unless a formal scope change is approved.

## 4. Deliberate separation from later projects

A major portfolio design decision is that EOIP remains a strong enterprise BI foundation rather than absorbing every later analytical idea.

### InventoryIQ owns

- ABC/XYZ segmentation
- safety-stock logic
- reorder-point logic
- deeper inventory optimization
- advanced working-capital simulation

### MarginGuard owns

- cost-to-serve
- contribution margin after additional cost components
- customer profitability
- product profitability
- deeper margin-leakage analysis

### ProcureGuard owns

- supplier performance
- purchase-price variance
- procurement savings
- supplier lead-time intelligence

This separation keeps EOIP achievable while making the later projects genuine analytical extensions rather than copies of the same dashboard.

## 5. Source-system boundary

EOIP V1 uses a realistic synthetic ERP-style operational model built around:

- customer and product master data
- product categories
- warehouse/location master data
- sales orders and order lines
- posted invoices and invoice lines
- returns / credit memos
- discounts
- inventory movements and balances
- transfers and receipt/issue movements
- a documented unit-cost / COGS basis sufficient for gross-margin analysis

It intentionally excludes full finance, AR/cash collection, HR/payroll, CRM activity, detailed supplier contracting and external market data.

No real customer or employee personal data is permitted.

## 6. Business-impact contract

EOIP V1 must support three distinct impact stories:

- excess inventory → **working-capital release**
- discount leakage → **profit opportunity**
- stockout exposure → **revenue-at-risk scenario**

These classifications follow the central `data/business-impact.yaml` rules.

The portfolio must never present working-capital release as profit, revenue-at-risk as realized lost sales, or modeled opportunities as realized savings.

## 7. Data-quality contract

Data quality is a project requirement, not a cleanup activity at the end.

Before EOIP data generation and modeling progress, the project has explicit requirements for:

- unique keys
- referential integrity
- required fields
- sales reconciliation
- return sign conventions
- cost validity
- inventory reconciliation
- date validity
- amount validity
- synthetic-data-only usage

The exact requirement IDs are canonical in `data/eoip/requirements.yaml`.

## 8. Non-functional requirements

EOIP V1 must be:

**Reproducible** — synthetic data and SQL transformations can be rerun from version-controlled configuration.

**Traceable** — KPI and business-case lineage can be followed from source data to analytical output.

**Maintainable** — raw, staging, dimensional and reporting responsibilities remain separated.

**Portable** — the core portfolio demonstration does not depend on paid enterprise infrastructure.

**Appropriately performant** — report interactions remain responsive for the intended portfolio-scale dataset.

**Safe for public presentation** — no production credentials, secrets or real confidential data are committed.

## 9. V1 exclusions

EOIP V1 explicitly excludes:

- autonomous agents
- LLM orchestration
- ML model training
- advanced forecasting
- production MLOps
- real-time streaming
- Kubernetes
- unnecessary microservices
- custom API infrastructure solely to serve Power BI
- CashFlow / DSO analytics
- full procurement analytics
- full profitability / cost-to-serve analytics
- advanced inventory optimization

These are not missing features. They are deliberate scope decisions.

## 10. Definition of Done for EOIP-01

EOIP-01 is complete when:

- the business problem and target users are frozen;
- management decisions are defined;
- analytical domains are bounded;
- source-system scope is explicit;
- the V1 KPI identities and report-page scope are frozen;
- business-case targets and evidence levels are defined;
- data-quality and non-functional requirements are defined;
- overlap with InventoryIQ, MarginGuard and ProcureGuard is prevented;
- the specification is committed to GitHub;
- EOIP-02 can begin without unresolved V1 scope questions.

## 11. Change control

After this specification is merged, changes to KPI count, report-page scope, analytical domains, source boundaries, business cases or downstream ownership are treated as **scope changes**, not casual additions.

Every material change must state:

- expected portfolio value
- target role strengthened
- implementation effort
- impact on current forecast
- whether the change is necessary for V1

The 28 February 2027 Application Readiness target remains the governing constraint.
