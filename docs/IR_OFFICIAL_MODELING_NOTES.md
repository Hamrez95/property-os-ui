# Iran Official / Legal Modeling Notes v1

Research snapshot: 2026-09-22  
This document is technical modeling guidance, not legal advice.

## 1. Apartment private vs common parts

The apartment ownership framework distinguishes exclusive parts from common parts. Modeling consequence:

- `Space.access_scope` must distinguish exclusive/common/restricted-common.
- Building systems such as elevators, shared utility infrastructure, stairs, roof and external facade should not be owned as if they were a private unit.
- A parking/storage space may be legally/documentarily exclusive or merely have a usage relationship; do not assume from physical access alone.

Recommended:
`space_legal_relation = deeded_exclusive | dependent_exclusive | usage_right | common | unknown`

## 2. Building management and charge basis

Current apartment-ownership rules allow common expense allocation to depend on area for some expenses and equal/custom-approved allocation for others.

Therefore:
- do not hardcode a single formula
- `ChargeScheme.allocation_method` is versioned/effective-dated
- preserve the calculation basis snapshot on every issued allocation

## 3. Lease registration model

Current lease rules require explicit term, rent and deposit, registration in electronic systems, and confirmation flow involving parties and witnesses for tracking-code issuance.

Model:
- Lease starts_on / ends_on
- deposit
- recurring rent
- LeaseParty roles
- witness role
- external registration status
- tracking code reference
- immutable final contract document

Do not hardcode the number/requirements of witnesses into the core table. Put current requirements in an external-integration policy/configuration because workflow may change.

## 4. Official real-estate registration direction

Current official-registration rules increasingly require relevant non-movable property transactions/rights to be registered in official electronic systems.

Property OS should therefore have:
- `OfficialRegistrationRef`
- external transaction/draft identifiers
- submitted / accepted / rejected / superseded states
- immutable request/response evidence hashes where permitted
- capability gates until an approved integration exists

Property OS must not label its own internal state as "official" unless backed by an authoritative external response/evidence.

## 5. Cadastral / official property data items

Recent technical/legal materials for uniform contracts refer to official property data items including concepts such as:
- area
- easement rights
- usufruct rights
- parking/storage and their count/area
- freehold/waqf state
- geographic location
- parcel geometry

This directly supports modeling:
- Parcel
- PropertyRight
- Space
- RegistryIdentity
- Geometry
as separate resources rather than a flat listing form.

## 6. Registry identity

Suggested fields:
- registration district
- main/sub parcel numbers
- separation piece
- official/cadastral identifier
- issue date
- authority/system
- geometry reference

These fields are sensitive and owner/admin scoped.

## 7. Rights, not only owners

Do not model the legal world with only `owner_id`.

Use `PropertyRight`:
- ownership
- usufruct
- easement
- mortgage/security
- use/lease rights
- other

Then link right holders and evidence.

## 8. Ownership shares

Store exact rational representation:
- numerator
- denominator
- original/source notation

Never use floating point for legal shares.

## 9. External source policy

Authoritative source classes:
- Official registry response
- Official contract/registration system
- Notary/official document
- Verified provider
- Uploaded document
- Self-report

The same semantic field may have multiple observations. The canonical display value should follow a precedence policy, never silently overwrite provenance.

## 10. Regulatory capability gates

At minimum gate:
- official registration submission
- official identity/property verification
- escrow/payment custody
- legally binding contract generation if approval/integration is required

Build/test can exist behind a disabled capability.
