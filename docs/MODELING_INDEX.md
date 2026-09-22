# Property OS — Modeling Pack v1

This folder is the handoff pack for production ERD, PostgreSQL schema and OpenAPI.

## Read in this order

1. **DOMAIN_MODEL_V1.md**
   - aggregate boundaries
   - invariants
   - conceptual ERD
   - PostgreSQL module boundaries

2. **DATA_DICTIONARY_V1.md**
   - modeling-oriented resource/field definitions
   - types, requiredness and visibility

3. **DATA_DICTIONARY_V1.csv**
   - machine-friendly registry for spreadsheet/import/review

4. **ENUMS_V1.md**
   - stable machine keys and controlled vocabularies

5. **STATE_MACHINES_V1.md**
   - Lease, Listing, Offer, Maintenance, Verification, Reservation and Official Registration lifecycles

6. **IR_OFFICIAL_MODELING_NOTES.md**
   - Iran-specific official/registry/lease boundaries
   - external authority references
   - capability-gate rules

7. **BUILDING_GOVERNANCE_V1.md**
   - manager mandate, assemblies, charge schemes, expenses, insurance and maintenance

8. **SHORT_STAY_DOMAIN_V1.md**
   - villa hospitality overlay
   - availability, pricing, booking, rules and guest/host operations

9. **IR_MARKET_BENCHMARK.md**
   - competitor/product-field coverage research

10. **RESEARCH_SOURCE_REGISTRY_V1.md**
   - evidence/source classes and confidence notes

11. **STANDARDS_ALIGNMENT_V1.md**
   - RESO-inspired resource/field/lookup discipline

## Modeling freeze checklist

Before production schema is considered ready:

- [ ] Property / Parcel / Structure / Space boundaries accepted
- [ ] Apartment represented as Space/Unit where appropriate
- [ ] Parking / Storage represented as Space
- [ ] Agricultural / industrial subtype boundaries accepted
- [ ] Party independent from account/user identity
- [ ] RoleAssignment = role + scope + time
- [ ] Ownership represented exactly as rational share
- [ ] Rights separated from simple ownership label
- [ ] Address / exact location privacy accepted
- [ ] Money representation accepted
- [ ] Date/time representation accepted
- [ ] Visibility classes accepted
- [ ] Provenance / Claim / Evidence / Verification accepted
- [ ] External official references accepted
- [ ] Lease Scope / Bundle accepted
- [ ] ChargeScheme and governance model accepted
- [ ] Listing projection boundary accepted
- [ ] Short-stay overlay boundary accepted
- [ ] State machines reviewed
- [ ] Enum keys reviewed
- [ ] Audit requirements reviewed
- [ ] ID strategy reviewed
- [ ] PostgreSQL module/schema strategy reviewed

## Required founder sign-off

Two-signature:
- Security/Auth/Permissions
- Core Data Model
- Ownership History
- Financial Ledger
- Official Integrations
- Transaction Rail
- Major Architecture

After sign-off, create ADR(s) and then generate the production schema/migrations/OpenAPI from this pack.
