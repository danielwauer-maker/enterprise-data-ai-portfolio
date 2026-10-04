# S02 — Product Model & Entitlement Closure

**Delivery status:** UPCOMING / pre-work in progress while S01 remains current  
**Target Scope Readiness after pre-work merge:** 90%  
**Target Delivery Gate Readiness after pre-work merge:** 80%

## Objective

Align Business Central, dashboard, reports, access control, pricing and checkout to one consistent customer-facing product truth while preserving all existing customer rights and legacy storage compatibility.

## Canonical product truth

Paid commercial offers:

- Assessment
- Validation
- Monitoring

Free Entry is not a paid offer.

Monitoring monthly and annual are billing variants of the same commercial offer.

The following remain compatibility/storage identifiers only:

- data_health_score
- full_analysis
- assessment
- validation_check
- monitoring_monthly
- monitoring_annual
- premium

## Completed pre-work

### Product architecture

- canonical Product Model already exists in Core;
- runtime product policy adoption already exists;
- runtime drift detection already exists;
- BPS now owns a machine-readable product-model contract;
- BPS DRIFT-003 machine/human registers are aligned;
- premium is explicitly classified outside canonical commercial offers.

### Compatibility and implementation

- legacy storage/API codes resolve to canonical offers;
- no persisted customer rights are rewritten;
- pricing payloads expose canonical product metadata;
- checkout accepts canonical aliases:
  - assessment;
  - validation;
  - monitoring + monthly/yearly;
- Stripe checkout metadata records canonical commercial offer and billing variant;
- legacy free/premium tenant pricing remains isolated as compatibility logic.

### Tests and evidence

Automated coverage includes:

- canonical offer aliases;
- entitlement mappings;
- billing variants;
- fail-closed premium semantics;
- public pricing canonical metadata;
- checkout canonical aliases and Stripe metadata;
- cross-repository Product System contract validation.

## Remaining manual closure

S02 must not be marked DONE until a focused runtime checkout/grant smoke verifies:

1. Assessment grants/preserves the expected Assessment access.
2. Validation creates the expected validation capability/credit.
3. Monitoring monthly and annual both map to Monitoring while preserving billing cadence.
4. A legacy premium tenant state alone does not grant Monitoring.
5. Existing customer rights remain unchanged through the compatibility layer.

## Definition of Done

S02 is DONE when:

- the runtime smoke above passes;
- BPS DRIFT-003 can move from IN_PROGRESS to RESOLVED;
- Core implementation, tests and evidence are merged;
- no customer-facing surface derives capabilities from display names or premium;
- final S02 closeout evidence is recorded.

## Safety rule

Do not perform a destructive data migration merely to replace legacy product codes. Compatibility mapping is preferred until a separately tested migration proves no loss of existing customer rights.
