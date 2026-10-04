# S06 — Existing BC SaaS Release Evidence Audit

**Audit date:** 2026-10-04  
**Purpose:** Record already existing runtime evidence that the Control Center currently under-credits.

This document does not close S06 and does not replace final Release Candidate acceptance.

## Evidence already present in BCSentinel

### Fresh Business Central SaaS installation

Source:

`quality/release/ext-50-02-fresh-installation-evidence.json`

Recorded status: `VERIFIED_WITH_KNOWN_DEFECTS`

Verified scope includes:

- clean BC SaaS sandbox;
- APP upload and installation;
- no install/schema error;
- setup page;
- backend registration;
- duplicate-registration protection;
- Free Data Health Score;
- 10/10 modules and 199/199 checks;
- history and findings;
- HTML and PDF Executive Report;
- dashboard link;
- manual Monitoring scan;
- scheduled Monitoring scan;
- scheduled execution without an open BC client.

Permission-role/no-SUPER verification was explicitly deferred to S01 / EXT-50-04 and therefore is not inferred from this evidence.

### Real BC upgrade and data preservation

Source:

`quality/release/ext-50-03-upgrade-evidence.json`

Recorded status: `PASS_WITH_KNOWN_DEFECTS`

Verified upgrade:

- source 1.0.2.16;
- target 1.0.2.20;
- direct update without uninstall;
- schema synchronization;
- registration preserved;
- API URL preserved;
- scan history preserved;
- Run IDs and scores preserved;
- DH Exceptions preserved;
- HTML/PDF/dashboard access preserved;
- scheduler configuration preserved;
- manual Monitoring works post-upgrade;
- scheduled Monitoring works post-upgrade;
- no unintended duplicate scheduler run observed.

## Known defects do not erase the evidence

Both evidence files deliberately carry product/UX defects forward. These defects remain separate work and must not be silently converted into a release PASS.

However, they also do not justify keeping the following S06 scope items at `planned`:

- Fresh BC SaaS installation runtime evidence;
- Real BC upgrade and primary data-preservation evidence.

## Portfolio implication

After the current S02 portfolio synchronization is merged, S06 should be updated from **50% to 70% Scope Readiness** by marking those two existing 10%-weight detail items as done.

S06 must remain `PLANNED` / not DONE because these gates remain open:

- restore/rollback operational drill;
- fixed RC artifact SHA and complete release manifest;
- final pilot journey;
- final monitoring acceptance;
- final release closeout.

No new runtime result is created by this audit; it only binds existing GitHub evidence to the central portfolio model.
