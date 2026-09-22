# Property OS — PostgreSQL Table Manifest v1

Status: WORKING  
Purpose: bridge from domain model to physical ERD/migrations.

## Conventions

- PK: `uuid`
- timestamps: `timestamptz` UTC
- business dates: `date`
- money: integer amount + currency
- legal shares: exact numerator/denominator
- optimistic concurrency: `version bigint`
- soft/archive state for business records; avoid cascade-delete history
- PostGIS is recommended for parcel/building geometry if production map/geometry workflows require it

## core.properties

PK: id

Important columns:
- property_category
- property_subtype
- display_name
- lifecycle_state
- occupancy_state
- canonical_address_id
- privacy_class
- version
- created_at / updated_at

Indexes:
- property_subtype
- lifecycle_state
- portfolio relation/read model as needed

## core.addresses

- property/address subject relation
- country/province/city/district/neighborhood/street/alley/plaque/unit
- postal_code
- formatted_address
- public_location_precision

Indexes:
- normalized city/neighborhood
- postal_code where legally/operationally justified

## core.geos

- lat/lng
- geometry
- precision
- source

Indexes:
- GiST on geometry when PostGIS enabled

## core.parcels

FK property_id → properties

Constraints:
- area_m2 > 0 where present
- frontage/depth/road width >= 0

## core.structures

FK:
- property_id
- parcel_id nullable when legitimate

## core.spaces

FK:
- property_id
- structure_id nullable only by rule

Unique candidates:
- (structure_id, label) where label is operationally unique

Critical:
- space_type
- access_scope
- legal_relation
- independently_leaseable
- independently_listable

## core.assets

FK to Space/Structure via explicit subject strategy.

Prefer explicit nullable FKs + check constraint or a typed resource reference abstraction agreed in ADR; do not use unconstrained polymorphic UUID pairs without integrity.

## subtype profile tables

One-to-one PK/FK = property_id:
- property_residential_units
- property_villas
- property_commercial_units
- property_offices
- property_land_profiles
- property_agricultural_profiles
- property_industrial_profiles
- property_teardown_profiles

Constraint:
- property subtype must match profile table via service/domain validation and optionally DB trigger/check strategy if maintainable.

## core.parties

- party_type
- display_name
- sensitive identity refs
- verification state

PII may be separated into a dedicated encrypted identity table/service after security ADR.

## core.role_assignments

FK:
- party_id

Scope must be integrity-preserving.

Recommended physical strategy:
Option A: dedicated join tables per scope for strongest FK integrity.
Option B: scope_type/scope_id with application + audit enforcement.

Decision is P0 before schema freeze.

Indexes:
- party_id + active time range
- scope + role + active status

## core.property_rights

- subject scope
- right_type
- tenure_status
- holder/reference semantics
- validity
- evidence/official ref

## core.ownership_interests

FK:
- property_right_id
- party_id

Constraints:
- numerator > 0
- denominator > 0
- numerator <= denominator unless a domain-approved exception
- no floating-point share

Index:
- right_id
- party_id

## core.registry_identities

Sensitive.

Unique:
- (authority, registry_system, registry_identifier) when identifier is present and globally unique in that authority context

## platform.documents

- subject relation
- object_storage_key
- content_hash
- visibility
- verification

Unique:
- content_hash may not always be globally unique due to intentional copies; decide dedupe policy separately

## platform.media

- subject relation
- semantic category
- storage ref
- dimensions
- capture metadata
- alteration state

## trust.claims

- subject
- claim_type
- typed/versioned JSON payload
- asserted_by
- validity
- state

Index:
- subject + claim_type + active state

## trust.evidence

FK claim_id
Reference exactly one evidence source class.

## trust.verifications

FK claim_id

Never overwrite old verification decisions when history matters; append/version or audit transitions.

## ops.bundles / ops.bundle_items

Bundle scopes multiple independent Spaces.

Unique:
- bundle_id + space_id

## ops.leases

- scope
- status
- starts_on / ends_on
- money fields
- version

Constraints:
- ends_on > starts_on
- amount >= 0

## ops.lease_parties

FK lease_id / party_id
Unique candidate:
- lease_id + party_id + role where duplicate role not intended

## ops.lease_registration_refs

External authority/system reference.

Unique:
- external_system + external_tracking_code when present

## ops.building_management_mandates

FK building/structure + manager party

Index:
- building + active validity

Rule:
- overlapping active mandates may be allowed for boards/co-managers only if model explicitly supports it; otherwise exclude overlap.

## ops.building_assemblies

- meeting metadata
- quorum snapshot
- minutes document

## ops.resolutions / resolution_votes

Historical voting weight snapshot.

## ops.charge_schemes

Effective-dated rule.

## ops.charge_assessments

One issued calculation period.

## ops.charge_allocations

Immutable basis snapshot + payable amount + payment state.

Never recalculate historical debt from current property area without preserving the original basis.

## ops.expenses

Link invoice/work order/resolution where relevant.

## ops.maintenance_tickets

Subject scope + reporter + severity + state.

## ops.work_orders

FK maintenance ticket
Vendor/service provider party
Amounts + schedule/completion evidence

## ops.announcements

Audience scope must be explicit.

## market.listings

FK property
Scope can be property/space/bundle.

Indexes:
- status + published_at
- type + public location
- search/read model indexes

## market.listing_terms

1:1 or versioned snapshots depending workflow.

## market.visit_requests

## market.offers

## market.offer_versions

Every counter-offer version append-only.

## market.deals

Immutable agreed terms snapshot.

## hospitality.stay_offerings

Scope + host relationship.

## hospitality.availability_days

Unique:
- offering_id + local_date

## hospitality.rate_rules

Index date ranges / priority.

## hospitality.house_rules

Version rules; reservation references accepted version.

## hospitality.reservations

Constraints:
- checkout > checkin
- guest counts >= 0
- pricing snapshot immutable after confirmation

## trust.inspection_requests
## trust.inspection_assignments
## trust.inspections
## trust.findings
## trust.inspection_reports

Finalized reports should be immutable/versioned.

## platform.audit_events

Append-only.

Indexes:
- resource_type + resource_id + timestamp
- actor + timestamp
- correlation_id

Retention/archival policy belongs to security/compliance ADR.

## External integrations

Prefer a generic integration envelope table plus domain-specific references:

`platform.integration_events`
- provider/system
- direction
- operation
- request_id
- correlation_id
- state
- request_hash
- response_hash
- timestamps
- redacted metadata

Do not make raw provider payloads the canonical business record.
