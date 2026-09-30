# S01 — BCSentinel Permission Runtime Closure

**Status:** IN_PROGRESS  
**Track:** BCSentinel Core  
**Planned effort:** 40 h  
**Objective:** Complete real Business Central SaaS least-privilege runtime evidence for all BCSentinel product roles without SUPER.

## Why this sprint matters

BCSentinel cannot be considered pilot-ready while product roles are only defined in AL and automated contracts. S01 converts the permission model into real SaaS evidence and closes any permission gaps without widening roles unnecessarily.

## Runtime principle

One licensed non-SUPER test identity is reused sequentially. Before each scenario:

1. remove all BCSentinel permission sets;
2. preserve the documented standard BC permission baseline;
3. assign exactly one BCSentinel role;
4. confirm SUPER = false;
5. capture Effective Permissions;
6. renew the user session;
7. execute the scenario and record actual result;
8. classify every unexpected failure before any permission change.

## Roles and acceptance

### Plain BC user
Expected: no BCSentinel access.

Current evidence: PASS.

### BCSENTINEL VIEWER
Expected: dashboard/history readable, mutation/setup/scan denied.

Current evidence: PASS for dashboard/history visibility and negative setup/manual scan enforcement. Finding-level mutation tests are supplementary evidence.

### BCSENTINEL SCAN
Expected: manual scan and remediation capabilities without setup authority.

Current evidence: **manual scan PASS on 1.0.2.25**. Completed and synchronized in real BC SaaS with 10/10 modules and 199/199 checks. Direct setup modification remains denied.

### BCSENTINEL SETUP
Expected: registration/configuration/check selection/scheduler configuration; no direct scan-result manipulation.

Current evidence: pending real SaaS runtime.

### BCSENTINEL SCHEDULER
Expected: scheduled/headless scan succeeds without interactive setup authority.

Current evidence: pending real SaaS runtime.

### BCSENTINEL ADMIN
Expected: all intended BCSentinel capabilities work without SUPER.

Current evidence: pending real SaaS runtime.

## Defect closed during S01

**EXT-50-04-DEF-001**

The SCAN role originally failed because `DH Setup` required indirect Modify during scan execution.

Final 1.0.2.25 model:

- direct permission remains read-only;
- lowercase indirect modify (`m`) is granted to the SCAN role;
- authorized BCSentinel codeunits retain object-level table permissions;
- direct setup modification remains denied.

This was verified in real Business Central SaaS.

## Remaining execution order

1. SETUP runtime PASS
2. SCHEDULER runtime PASS
3. ADMIN runtime PASS
4. final role-matrix evidence review
5. PR #46 ready-for-review
6. merge to `staging`
7. post-merge verification

## Stop conditions

Do not widen permissions if a failure may instead be:

- standard BC permission requirement;
- license entitlement limitation;
- unrelated product defect;
- expected denial.

Every failure must first be classified.

## Definition of Done

S01 is DONE only when:

- all five BCSentinel roles work as intended without SUPER;
- plain user has no BCSentinel access;
- no hidden broad BC permission workaround is used;
- all unexpected failures are classified and resolved;
- runtime evidence is complete;
- CI remains green;
- PR #46 is merged and post-merge verification passes.
