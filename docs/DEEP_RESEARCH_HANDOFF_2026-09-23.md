# Deep Research Handoff — 2026-09-23

> Status: WORKING / Founder Review Required
>
> This handoff consolidates the current Property OS research conclusions that are strong enough to affect product, domain, UX and operating decisions. Legal, tax, payment and regulated claims remain time-sensitive and must be re-verified with current official sources and qualified advisors before activation.

## 1. What research changed

### 1.1 Property Passport
Use two visibility layers:
- **Private Passport**: owner/resident operational data, documents, leases, finance, maintenance, notes and sensitive history.
- **Shareable Trust Passport**: only explicitly shareable claims/evidence relevant to a buyer/renter/professional.

Sensitive tenant history, account information, private disputes and unrestricted registry/document data must not become public by default.

### 1.2 Role-aware Home
Home is not one universal dashboard.
- Tenant/Resident: current lease, due dates, maintenance, building notices, charges and relevant services.
- Owner: portfolio, occupancy, lease expiry, documents, finance and maintenance.
- Multi-owner: portfolio-level risk, occupancy, expiry and finance.
- Building Manager: charges, debt, expenses, announcements, maintenance and governance.

The UI should disclose capabilities progressively from Party + Role + Scope + Time, not expose the whole product equally to everyone.

### 1.3 Property type and Short Stay
Villa/house remains a normal Property subtype.
Short-stay is an overlay:
Villa Property → StayOffering → Availability / RateRule / HouseRule / Reservation

Do not fork the core Property model just because the rental mode is nightly.

### 1.4 Trust
Claims are not facts.
Every important claim should have provenance:
Claim → Evidence → Verification → Validity / Audit

Trust levels remain progressive and explainable rather than a single green badge.

### 1.5 Transaction / Regulation
Transaction UI may be prototyped, but regulated activation must stay behind a Capability Gate until the legal path, partner/access, identity/signature, money handling, reconciliation and liability boundaries are confirmed.

### 1.6 Resilience
The operating model should not assume perfect internet availability. Web/PWA, SMS and human fallback should exist in the operational roadmap for critical flows.

### 1.7 Moat
The research does not justify treating UI or AI as the moat.
The stronger long-term hypotheses are:
- Property History
- Relationship Graph
- Trust / Evidence Graph
- Workflow Habit
- Collaboration
- Integration Depth
- Brand Trust

## 2. Implications for the prototype
The live Design Hub should visibly demonstrate:
1. role-aware Home states;
2. Private vs Shareable Passport;
3. provenance / verification states;
4. short-stay as a Property overlay;
5. gated Transaction states;
6. building and tenant recurring operations;
7. progressive disclosure rather than feature overload.

## 3. Implications for production modeling
Before the first production migration, founders should explicitly review:
- Property / Parcel / Structure / Space boundaries;
- Party / RoleAssignment / Scope / Time;
- exact ownership shares;
- RegistryIdentity and PropertyRight;
- Money + currency representation;
- PII boundary and visibility classes;
- Claim / Evidence / Verification / provenance;
- Lease scope and Bundle;
- Building governance and charge snapshots;
- official integration adapter boundary;
- retention / deletion / audit.

## 4. Business / GTM guardrails
The current strategy is:
Property Record → Operations → Trust → Listing → Transaction

The first evidence should come from recurring operations, not transaction volume alone.

Suggested beachhead remains:
**Urban Owner / Resident + Small / Medium Building Manager**

Marketplace, professional tools, short-stay and regulated transaction rails should scale only after their relevant strategic gates are met.

## 5. What is known vs assumed
### Known / sufficiently supported for product direction
- Property Record should outlive Listings.
- Role + Scope matters for authorization and UX.
- Parking/Storage are Spaces.
- Trust needs provenance and evidence.
- Short-stay can share the Property Core.
- Regulated transaction capabilities need explicit gating.
- Business value should come from recurring property operations before marketplace scale.

### Working hypotheses to validate
- Exact beachhead and willingness-to-pay.
- Building-led distribution efficiency.
- Trust action economics.
- Inspection contribution margin.
- Pricing levels under Iranian inflation.
- Partner and official integration availability.

### Must verify before launch
- Current tax/payment/e-commerce requirements.
- Current official registration / private-platform access.
- Data hosting/privacy obligations applicable to the exact service.
- SMS/OTP contractual and identity requirements.
- Custody/escrow/payment liability.
- Short-stay licensing where applicable.

## 6. Canonical references
- docs/BUSINESS_STRATEGY_V1.md
- docs/BUSINESS_MODEL_CANVAS_V1.md
- docs/GTM_STRATEGY_V1.md
- docs/BUSINESS_METRICS_V1.md
- docs/STRATEGY_FRAMEWORKS_V1.md
- docs/ECONOMIC_SCENARIOS_V1.md
- docs/ORG_STRATEGY_V1.md
- docs/CAPITAL_STRATEGY_V1.md
- docs/BUSINESS_RISK_REGISTER_V1.md
- docs/BUSINESS_RESEARCH_SOURCES_V1.md
- docs/DOMAIN_MODEL_V1.md
- docs/IR_OFFICIAL_MODELING_NOTES.md

## 7. Review rule
Research is an input, not automatic approval. A research conclusion becomes a project decision only after the founders classify it as:
**Evidence / Hypothesis / Decision / Deferred / Needs Legal Verification**.