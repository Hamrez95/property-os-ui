# Property OS — Open Modeling Decisions v1

These items are intentionally not silently frozen.

## P0 — decide before first production migration

### D01 — Production repository topology
WORKING: monorepo `property-os` with apps/services/contracts/infra.

Decision owners: Shared.

### D02 — ID strategy
Recommendation: server-generated UUIDs; consider UUIDv7/time-sortable UUID if .NET/PostgreSQL toolchain support is clean.

Do not use public sequential integer IDs.

### D03 — Scope FK strategy
Question:
How should `RoleAssignment`, Claim and Document point to multiple resource types while preserving referential integrity?

Options:
A. dedicated relation tables per subject/scope — strongest DB integrity
B. typed `resource_type/resource_id` — simpler but weaker FK guarantees
C. shared resource registry table — stronger generic references, extra complexity

Recommendation: use dedicated typed join tables for high-risk rights/roles; generic subject refs only for lower-risk metadata after explicit ADR.

### D04 — PostgreSQL schemas
Recommendation:
- core
- trust
- ops
- market
- hospitality
- platform

### D05 — PostGIS
Recommendation: enable if exact polygon/parcel geometry, radius/map search or spatial verification is in R1/R2 architecture.
If only lat/lng is needed initially, still avoid a design that blocks PostGIS migration.

### D06 — Money canonical unit
Need explicit decision with payment-provider constraints.

Recommendation:
- persist amount integer + currency
- normalize external Iranian payment/official integrations to their required unit
- UI may render toman
- never expose unlabeled `price`

### D07 — PII boundary
Decide whether Party identity/phone/national identifiers live:
A. core DB encrypted
B. separate identity schema/service
C. auth provider + minimal local references

Requires Security ADR.

### D08 — Deletion/retention
Business/legal/audit data cannot follow ordinary hard-delete semantics.

Need resource-specific retention + account deletion policy.

### D09 — Ownership overlap rules
Need validation rules for:
- simultaneous ownership interests
- sum of active interests
- disputed/unknown shares
- incomplete imported records

Do not reject incomplete historical data if it can be represented as "unknown/disputed" with provenance.

### D10 — Official integration boundary
Need adapter/interface contract before any real official workflow:
- availability/capability
- auth/signature
- request id
- status polling/webhook
- evidence storage
- retry/idempotency
- reconciliation
- human fallback

## P1 — before corresponding feature

### D11 — Claim value schemas
Versioned schema registry per claim type.

### D12 — Charge ledger
Choose accounting/ledger model for payments, adjustments, waivers and reconciliation.

### D13 — Listing search model
Canonical PostgreSQL vs separate search/read index.

### D14 — Notification preference model
Operational/mandatory vs marketing consent.

### D15 — Short-stay settlement
Only if/when hospitality becomes scope: payout/refund/dispute model.

## Decision discipline

Every accepted P0 decision should become:
1. ADR in Notion
2. implementation issue in GitHub
3. schema/OpenAPI change
4. migration/test evidence
