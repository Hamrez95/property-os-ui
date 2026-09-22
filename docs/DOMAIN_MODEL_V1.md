# Property OS — Domain Modeling Blueprint v1

Status: WORKING → intended to become LOCKED after founder review  
Research snapshot: 2026-09-22  
Owners: Shared (Hamidreza + Masoud)

## 0. Why this document exists

This is the modeling contract between Product/UX and Backend/Data.

A screen is not the domain model. A marketplace listing is not the property. A government registry is not our database. Property OS must keep stable real-world records separate from temporary projections, operational workflows and external verification.

The production repository should not begin schema work until the rules below are accepted or explicitly changed by ADR.

---

## 1. Core invariants

1. **Property Record is canonical; Listing is a projection.**
2. **An account does not have one global role.** Relationships are scoped and time-bounded.
3. **Party ↔ Role ↔ Scope ↔ Time Range** is the access/relationship foundation.
4. **Parking and Storage are Spaces**, not booleans on Apartment.
5. Physical facts, market terms, operational state and legal/official state are separate concepts.
6. Derived values are not stored as facts when they can be deterministically recalculated.
7. Claims requiring proof carry provenance/evidence/verification state.
8. Official-system identifiers are references to an external authority; Property OS does not pretend to be that authority.
9. Regulated transaction functionality remains behind capability gates.
10. Stable core fields should not be implemented as an unbounded EAV table.

---

## 2. Resource map

```text
Portfolio
  └── PropertyRecord
      ├── Parcel
      │   ├── RegistryIdentity
      │   ├── Geometry
      │   └── PropertyRight
      ├── Structure
      │   ├── Building
      │   └── Villa/House structure
      ├── Space
      │   ├── Unit
      │   ├── Parking
      │   ├── Storage
      │   ├── Shop
      │   └── Office
      └── Asset
          ├── Equipment
          └── Building system

Party
  ├── Person
  └── Organization
      ↓
Relationship / RoleAssignment
      ↓
Scope = Property | Parcel | Structure | Space | Bundle

PropertyRecord
  ├── Claim ── Evidence ── Verification
  ├── Document
  ├── Media
  ├── Lease
  ├── Listing
  ├── Inspection
  ├── Maintenance
  └── Optional ShortStayOffering
```

---

## 3. Aggregate boundaries

### 3.1 Property aggregate

**Root:** `PropertyRecord`

Purpose: stable identity and operating record for a real-world immovable property.

Contains/references:
- property category/subtype
- canonical address/geolocation
- parcel(s)
- structure(s)
- space(s)
- equipment/assets
- registry references
- documents/media
- claims/evidence
- relationships

A Property may represent:
- Apartment-related record
- Villa/House
- Commercial unit
- Office unit
- Land
- Old/Teardown property

The physical hierarchy must still be explicit. An apartment may be a Space inside a Building/Structure even if the user experiences it as "a property" in the app.

### 3.2 Party aggregate

`Party` is independent from Property.

Party types:
- Person
- Organization

Do not duplicate identity fields inside every lease/listing/ownership row. Use party references plus historical snapshots only when a signed/legal artifact requires immutable wording.

### 3.3 Relationship aggregate

`RoleAssignment`
- party_id
- role_type
- scope_type
- scope_id
- valid_from
- valid_to
- authority_source
- permission_profile
- status

Examples:
- Owner → Villa Lavasan → indefinite
- Tenant → Unit 4 + Parking P21 Bundle → lease term
- Building Manager → Niavaran Building → assembly term
- Representative → Listing #... → limited negotiation scope

### 3.4 Ownership aggregate

`OwnershipInterest`
- party_id
- property_right_id / scope
- share_numerator
- share_denominator
- source_notation
- valid_from / valid_to
- evidence_document_id
- verification_state

Do not store ownership as a float.

Example UI:
- 6/6 dang
- 2.5/6 dang

Storage example:
- 5 / 12 rational share
- `source_notation = "2.5/6 dang"`
- derived display percentage = 41.666...

### 3.5 Claim / Evidence / Verification

A field can be:
- self-reported
- evidence-backed
- provider-verified
- platform-verified
- officially-verified

`Claim`
- subject_type + subject_id
- claim_type
- value payload
- asserted_by
- asserted_at
- validity window
- status

`Evidence`
- claim_id
- document/media/source reference
- evidence_type
- captured_at
- hash / integrity metadata

`Verification`
- claim_id
- level
- verifier type / verifier reference
- decision
- verified_at
- expires_at
- notes

Examples that should often be Claims until sourced:
- allowed density
- setback
- buildability
- "no overlooking"
- commercial suitability
- exact renovation year if unsupported
- permit state if not linked to evidence

---

## 4. Physical model

### 4.1 Parcel

A land/cadastral parcel.

Recommended fields:
- id
- property_id
- area_m2
- frontage_m
- depth_m
- road_width_m
- orientation
- corner_count
- shape
- slope
- registered_land_use
- boundary_geometry
- centroid
- access_type
- inside_planning_boundary (nullable/claim-backed)
- utilities proximity

### 4.2 Structure

A built structure associated with a Parcel.

Fields:
- structure_type
- construction_year
- floors_above_ground
- floors_below_ground
- built_area_m2
- construction_system
- facade
- condition
- occupancy_state

### 4.3 Space

A discrete usable/leaseable/assignable space.

Fields:
- space_type
- structure_id
- floor
- unit_number
- area_m2
- access_scope
- legal_relation
- independently_leaseable
- independently_listable
- status

`space_type`:
- residential_unit
- office_unit
- shop
- parking
- storage
- common_area
- roof
- yard
- utility_room
- caretaker_room
- other

`access_scope`:
- exclusive
- common
- restricted_common

`legal_relation`:
- deeded_exclusive
- dependent_exclusive
- usage_right
- common
- unknown

Parking/Storage therefore remain real Spaces even when a deed links them to a unit.

### 4.4 Asset / Equipment

Examples:
- elevator
- boiler
- pump
- generator
- HVAC unit
- fire system
- water tank
- smart lock

Useful for maintenance lifecycle:
- manufacturer/model
- serial
- installed_at
- warranty_until
- service_interval
- last_service_at
- next_service_at
- scope (space/structure/building)

---

## 5. Property subtype model

Avoid one giant table containing 150 nullable columns.

Recommended pattern:

```text
properties
property_residential_units
property_villas
property_commercial_units
property_offices
property_land_profiles
property_teardown_profiles
```

All subtype tables are 1:1 with `properties`.

### Apartment / Residential Unit
Core subtype:
- rooms_count
- master_rooms_count
- bathrooms_count
- floor_number
- floors_total
- units_on_floor
- year_built
- orientation
- daylight_profile
- balcony
- flooring_type
- kitchen_type
- cabinet_type
- window_type
- heating_type
- cooling_type
- lobby
- concierge/security

Parking/storage references are relation rows to Space, not booleans.

### Villa / House
- land_area_m2
- built_area_m2
- floors
- rooms
- master_rooms
- bathrooms
- yard_area_m2
- garden_area_m2
- parking_capacity
- pool_type
- jacuzzi
- terrace
- rooftop
- gazebo
- bbq_area
- privacy_profile
- road_access
- permit/end-of-work claim refs

### Commercial
- commercial_use
- shopfront_width_m
- frontage_count
- ceiling_height_m
- warehouse_area_m2
- restroom_count
- three_phase_power
- loading_access
- signage_right
- business_right_type
- current_business_use

### Office
- office_use_status
- room_count
- meeting_room_count
- kitchenette
- restroom_profile
- hvac_type
- network_profile
- fiber_available
- reception/lobby
- access_hours
- visitor_parking

### Land
- area
- dimensions
- frontage
- road width
- corner/front count
- orientation
- slope
- shape
- registered land use
- utility availability/proximity
- wall/fence
- road access
- geometry

Planning density/setback/buildability remain claims until evidence exists.

### Old / Teardown
- parcel area
- current built area
- current floors/units
- construction year/age
- structural condition
- occupancy
- fronts/road widths
- current utilities
- old permits/docs
- demolition access

"Participation in construction" is an Offering/Deal term, not a physical property field.

---

## 6. Legal / registry identity

Keep official identity in a dedicated resource.

`RegistryIdentity`
- property_id / parcel_id / space_id
- authority
- registry_system
- registry_identifier
- province / city / registration_district
- main_parcel_no
- sub_parcel_no
- separation_piece_no
- postal_code
- cadastral_geometry_ref
- issue_date
- status
- last_checked_at

`PropertyRight`
- subject scope
- right_type
- tenure_status
- holder party
- share
- valid_from / valid_to
- official_reference
- evidence_id

Right types may include:
- ownership
- usufruct
- easement
- mortgage/security interest
- leasehold/use right
- other

Tenure state should support at least:
- freehold / طلق
- waqf / وقف
- unknown / needs verification

Do not expose raw official identifiers to all roles by default.

---

## 7. Address and geometry

`Address`
- country
- province
- city
- district
- neighborhood
- street
- alley
- plaque
- floor
- unit
- postal_code
- formatted_address

`Geo`
- latitude
- longitude
- polygon/multipolygon when available
- precision
- source
- captured_at

Privacy:
- public Listing may use approximate location
- trusted transaction may use exact location
- owner/private passport may use full address

---

## 8. Document and Media

`Document`
- document_type
- subject scope
- owner party
- storage object ref
- issue_date
- expiry_date
- issuer
- document_number (sensitive)
- hash
- visibility_class
- verification state

Document types:
- deed
- lease
- permit
- end_of_work
- tax/municipal receipt
- utility evidence
- identity evidence
- inspection report
- invoice
- insurance
- floor plan
- other

`Media`
- subject scope
- media_type
- semantic_category
- storage ref
- width/height/duration
- captured_at
- uploader
- alteration_state
- visibility

Semantic categories:
- exterior
- living_room
- kitchen
- bedroom
- bathroom
- parking
- storage
- yard
- pool
- document_scan
- floor_plan
- defect
- inspection_evidence

---

## 9. Lease model

`Lease`
- property/scope
- lease_type
- status
- starts_at
- ends_at
- possession_date
- deposit_money
- recurring_rent_money
- payment_frequency
- currency
- renewal_state
- termination state

`LeaseParty`
- lease_id
- party_id
- role = lessor | lessee | witness | guarantor | representative
- sign_state
- signed_at

`LeaseScope`
May point to:
- Property
- Space
- Bundle

Example:
Unit 4 + Parking P21 + Storage A4.

`LeaseRegistrationRef`
- external_system
- external_tracking_code
- status
- submitted_at
- confirmed_at
- contract_document_id

`LeaseObligation`
- party role
- obligation_type
- description
- due rule
- responsibility scope

Lease registration requirements are policy/configuration, not hardcoded UI assumptions.

---

## 10. Building operations

A Building is a Structure with building-management capability.

Resources:

### BuildingManagementMandate
- building_id
- manager party
- starts_at / ends_at
- appointment source
- status

### ChargeScheme
- building_id
- name
- allocation_method
- effective period

Allocation methods:
- by_area
- equal
- mixed
- custom_approved

### ChargeAssessment
- scheme_id
- period
- total
- due_at
- status

### ChargeAllocation
- assessment_id
- liable party/scope
- amount
- basis snapshot
- paid_amount
- status

### Expense
- building_id
- category
- vendor
- amount
- incurred_at
- invoice document
- approval state

### Announcement
- building_id
- audience scope
- title/body
- published_at
- acknowledgement requirement

### MaintenanceTicket
- subject scope
- reported_by
- category
- severity
- description
- status
- assignee/vendor
- opened_at / resolved_at

### WorkOrder
- maintenance_ticket_id
- vendor
- estimated amount
- approved amount
- scheduled_at
- completed_at
- evidence

---

## 11. Listing / marketplace model

`Listing` is never the canonical property.

- property_id
- listing_scope
- listing_type = sale | long_term_rent | commercial_right | ...
- status
- title
- public_description
- public_location_precision
- selected_media
- published_at
- expires_at

`ListingTerms`
Sale:
- asking_price
- negotiable
- price_per_area derived

Rent:
- deposit
- recurring_rent
- convertible terms

`VisitRequest`
`Offer`
`NegotiationThread`
`Deal`

A Listing can close/expire without changing Property identity.

---

## 12. Short-Stay model

Short-stay is an optional operating overlay.

`StayOffering`
- property/space scope
- host relationship
- status
- standard_capacity
- max_capacity
- minimum_stay
- check_in_time
- check_out_time
- instant_booking
- cancellation_policy
- guest_identity_policy

`AvailabilityDay`
- date
- state
- reason

`RateRule`
- date/date range
- nightly_rate
- extra_guest_rate
- minimum_stay override
- discount
- source

`HouseRule`
- pets
- smoking
- event/party
- quiet hours
- child policy
- identity/document requirements

`Reservation`
- offering
- guest party
- check_in / check_out
- guest counts
- pricing snapshot
- state
- payment ref

Do not store rating/review history on Property core.

---

## 13. Inspection and Trust

`InspectionRequest`
- subject scope
- purpose
- requested_by
- requested_at
- target date

`InspectionAssignment`
- inspector party
- assigned_at
- status

`Inspection`
- template/version
- started_at
- completed_at
- geo/time evidence

`Finding`
- category
- result
- severity
- notes
- claim links
- evidence links

`InspectionReport`
- immutable report version
- generated_at
- signer/verifier
- visibility

---

## 14. Money modeling

WORKING decision:

Never store money as floating point.

Recommended:
- `amount_minor BIGINT`
- `currency_code CHAR(3)`
- explicit display conversion

For Iran, official/integration values should be normalized to IRR where required. UI may display toman. Never persist an unlabeled number called `price`.

Examples:
- asking_price_amount
- asking_price_currency
- deposit_amount
- monthly_rent_amount

---

## 15. Date/time modeling

- Persist machine timestamps in UTC `timestamptz`
- Store business dates as `date` when time is irrelevant
- Jalali/Persian date is a presentation concern, not the canonical database representation
- Signed legal text may additionally preserve original rendered date text in an immutable artifact snapshot

---

## 16. Enum / lookup modeling

Use stable machine keys:
- `residential_apartment`
- `commercial_shop`
- `occupied`
- `evidence_backed`

Persian/English labels are localized presentation.

Do not use free text where a controlled vocabulary is known and stable.

For evolving amenity lists, use lookup tables rather than schema columns for every amenity.

---

## 17. Field governance metadata

Every sensitive or claimable field should be able to answer:

- Where did this value come from?
- Who asserted it?
- When was it captured?
- Is it still valid?
- Who can see it?
- Was it verified?
- By whom?
- What evidence supports it?

Recommended metadata:
- source_kind
- source_ref
- asserted_by_party_id
- captured_at
- valid_from
- valid_to
- verification_level
- verified_at
- visibility_class

Visibility classes:
- public
- authenticated
- occupant
- manager
- owner
- authorized_representative
- admin_sensitive

---

## 18. Audit and history

Use immutable or append-oriented audit events for important changes.

`AuditEvent`
- actor
- action
- resource_type
- resource_id
- before hash / after hash
- timestamp
- request/correlation id
- source channel

Important resources with history:
- ownership
- relationship/roles
- leases
- listing status
- verification
- financial ledger
- official integration state

---

## 19. Suggested production modules

```text
Core
  Party
  Property
  Relationship
  Document
  Trust

Operations
  Lease
  Building
  Maintenance
  Finance

Market
  Listing
  Visit
  Offer
  Deal

Hospitality (later)
  StayOffering
  Calendar
  Reservation

Verification
  Inspection

Platform
  Auth
  Notifications
  Audit
  External Integrations
```

---

## 20. What must be frozen before production schema

P0:
- ID strategy
- Property/Parcel/Structure/Space boundaries
- RoleAssignment scope model
- OwnershipInterest representation
- Money representation
- visibility classes
- provenance/verification fields
- subtype table strategy
- external official reference strategy
- LeaseScope / Bundle model

P1 before Trust:
- Claim/Evidence/Verification persistence
- inspection resources

P1 before Marketplace:
- Listing projection
- public-location privacy
- Offer/Deal history

P2 before Short-Stay:
- availability/rate rule model
- reservation state machine

---

## 21. Explicit non-goals for v1 schema

Do not:
- copy Divar/Sheypoor form structure into DB
- put nightly booking fields on every Property
- store "parking=true" when a Parking Space exists
- model the user as one fixed role
- use JSON blobs for ownership/lease/official state
- treat price estimate as verified property fact
- treat a screenshot/document upload as verified truth
- expose all owner fields to tenants
