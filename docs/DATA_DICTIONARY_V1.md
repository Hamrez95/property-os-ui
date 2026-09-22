# Property OS — Data Dictionary v1

Status: WORKING  
Purpose: modeling-ready registry for PostgreSQL/OpenAPI design.

Legend:
- **R** required at resource creation
- **C** conditionally required
- **O** optional
- Visibility: Public / Auth / Occupant / Manager / Owner / Sensitive Admin
- Provenance: User / Document / Provider / Platform / Official / Derived

---

## 1. Shared technical fields

| Field | Type | Req | Notes |
|---|---|---:|---|
| id | uuid | R | Server-generated |
| created_at | timestamptz | R | UTC |
| updated_at | timestamptz | R | UTC |
| version | bigint | R | Optimistic concurrency |
| status | enum | R | Resource-specific |
| source_kind | enum | C | user/document/provider/platform/official/import |
| source_ref | text | O | External/internal provenance pointer |

---

## 2. PropertyRecord

| Field | Type | Req | Visibility | Provenance | Notes |
|---|---|---:|---|---|---|
| id | uuid | R | Auth | Platform | |
| portfolio_id | uuid | C | Owner | Platform | |
| property_category | enum | R | Auth | User/Official | residential/commercial/office/land/mixed |
| property_subtype | enum | R | Auth | User/Official | apartment/villa/shop/office/land/teardown |
| display_name | text | R | Auth | User | |
| lifecycle_state | enum | R | Auth | Platform | active/archived/disputed/etc |
| occupancy_state | enum | O | Scoped | User/Lease | occupied/vacant/owner_occupied/unknown |
| canonical_address_id | uuid | C | Scoped | Provider/User | |
| geo_id | uuid | O | Scoped | Provider/Official | |
| primary_registry_identity_id | uuid | O | Owner | Official/Document | |
| privacy_class | enum | R | Owner | Platform | |
| notes_private | text | O | Owner | User | not public listing text |

---

## 3. Address

| Field | Type | Req | Visibility | Notes |
|---|---|---:|---|---|
| country_code | char(2) | R | Scoped | IR |
| province | text | R | Scoped | normalized lookup preferred |
| city | text | R | Scoped | |
| district | text | O | Scoped | |
| neighborhood | text | O | Scoped | |
| street | text | O | Owner/Occupant | |
| alley | text | O | Owner/Occupant | |
| plaque | text | O | Owner/Occupant | |
| floor_text | text | O | Scoped | if address-related |
| unit_text | text | O | Scoped | |
| postal_code | varchar(10) | O | Sensitive | validate length/format separately |
| formatted_address | text | O | Scoped | derived/snapshot |
| public_location_precision | enum | O | Public | exact/approximate/neighborhood/city |

---

## 4. Geo

| Field | Type | Req | Provenance | Notes |
|---|---|---:|---|---|
| latitude | numeric(9,6) | O | User/Provider/Official | |
| longitude | numeric(9,6) | O | User/Provider/Official | |
| geometry | geometry | O | Official/Provider | polygon/multipolygon |
| precision | enum | O | Platform | exact/approx |
| geometry_source | enum | O | | |
| captured_at | timestamptz | O | | |

---

## 5. Parcel

| Field | Type | Req | Visibility | Provenance |
|---|---|---:|---|---|
| property_id | uuid | R | Auth | Platform |
| area_m2 | numeric(12,2) | C | Scoped | Document/Official/User |
| frontage_m | numeric(8,2) | O | Scoped | Evidence/User |
| depth_m | numeric(8,2) | O | Scoped | Evidence/User |
| road_width_m | numeric(8,2) | O | Scoped | Evidence/User |
| orientation | enum | O | Auth | User |
| front_count | smallint | O | Auth | User/Evidence |
| corner_type | enum | O | Auth | User |
| shape | enum | O | Auth | User/Evidence |
| slope | enum | O | Auth | User/Evidence |
| registered_land_use | enum/text | O | Owner | Official/Document |
| road_access | enum | O | Auth | User/Evidence |
| fenced | boolean | O | Auth | User |
| planning_boundary_state | enum | O | Owner | Claim/Official |

---

## 6. Structure / Building

| Field | Type | Req | Notes |
|---|---|---:|---|
| property_id | uuid | R | |
| parcel_id | uuid | C | |
| structure_type | enum | R | building/villa/house/other |
| year_built | smallint | O | evidence metadata recommended |
| floors_above | smallint | O | |
| floors_below | smallint | O | |
| built_area_m2 | numeric(12,2) | O | |
| construction_system | enum | O | |
| facade_type | enum | O | |
| structural_condition | enum | O | |
| total_units | smallint | O | |
| lobby | boolean | O | |
| concierge_security | boolean | O | |
| elevator_count | smallint | O | equipment refs preferred for lifecycle |

---

## 7. Space

| Field | Type | Req | Notes |
|---|---|---:|---|
| structure_id | uuid | C | null for standalone spaces only when justified |
| property_id | uuid | R | |
| space_type | enum | R | residential_unit/office/shop/parking/storage/common/... |
| label | text | R | Unit 4, P-21, A4 |
| floor | text | O | supports basement formats |
| unit_number | text | O | |
| area_m2 | numeric(10,2) | O | |
| access_scope | enum | R | exclusive/common/restricted_common |
| legal_relation | enum | O | deeded_exclusive/dependent/usage_right/common |
| independently_leaseable | boolean | R | |
| independently_listable | boolean | R | |
| occupancy_state | enum | O | |

---

## 8. Residential unit profile

| Field | Type | Req |
|---|---|---:|
| property_id | uuid | R |
| rooms_count | smallint | O |
| master_rooms_count | smallint | O |
| bathrooms_count | smallint | O |
| floor_number | smallint | O |
| floors_total | smallint | O |
| units_on_floor | smallint | O |
| year_built | smallint | O |
| orientation | enum | O |
| balcony | boolean | O |
| daylight_profile | enum | O |
| flooring_type | enum | O |
| kitchen_type | enum | O |
| cabinet_type | enum | O |
| window_type | enum | O |
| heating_type | enum | O |
| cooling_type | enum | O |

---

## 9. Villa profile

| Field | Type | Req |
|---|---|---:|
| property_id | uuid | R |
| land_area_m2 | numeric(12,2) | C |
| built_area_m2 | numeric(12,2) | C |
| floors_count | smallint | O |
| rooms_count | smallint | O |
| master_rooms_count | smallint | O |
| bathrooms_count | smallint | O |
| yard_area_m2 | numeric(12,2) | O |
| garden_area_m2 | numeric(12,2) | O |
| parking_capacity | smallint | O |
| pool_type | enum | O |
| jacuzzi | boolean | O |
| terrace | boolean | O |
| rooftop | boolean | O |
| gazebo | boolean | O |
| bbq_area | boolean | O |
| road_access | enum | O |
| privacy_profile | enum/claim | O |

---

## 10. Commercial profile

| Field | Type | Req |
|---|---|---:|
| property_id | uuid | R |
| commercial_use | enum/text | O |
| shopfront_width_m | numeric(8,2) | O |
| frontage_count | smallint | O |
| ceiling_height_m | numeric(6,2) | O |
| warehouse_area_m2 | numeric(10,2) | O |
| restroom_count | smallint | O |
| three_phase_power | boolean | O |
| loading_access | boolean | O |
| signage_right | enum | O |
| business_right_type | enum | O |
| current_business_use | text | O |

---

## 11. Office profile

| Field | Type | Req |
|---|---|---:|
| property_id | uuid | R |
| office_use_status | enum | O |
| room_count | smallint | O |
| meeting_room_count | smallint | O |
| kitchenette | boolean | O |
| restroom_profile | enum | O |
| hvac_type | enum | O |
| network_profile | enum | O |
| fiber_available | boolean | O |
| reception | boolean | O |
| access_hours | text | O |
| visitor_parking | text/int | O |

---

## 12. Land profile

| Field | Type | Req |
|---|---|---:|
| property_id | uuid | R |
| parcel_id | uuid | R |
| land_use | enum/text | O |
| wall_fence | enum | O |
| water_access | enum | O |
| electric_access | enum | O |
| gas_access | enum | O |
| sewage_access | enum | O |
| buildability_claim_id | uuid | O |
| density_claim_id | uuid | O |
| setback_claim_id | uuid | O |

---

## 13. Teardown profile

| Field | Type | Req |
|---|---|---:|
| property_id | uuid | R |
| current_built_area_m2 | numeric(12,2) | O |
| current_floor_count | smallint | O |
| current_unit_count | smallint | O |
| year_built | smallint | O |
| condition | enum | O |
| occupancy_state | enum | O |
| demolition_access | enum | O |
| old_permit_document_id | uuid | O |
| build_potential_claim_id | uuid | O |

---

## 14. RegistryIdentity

| Field | Type | Req | Visibility | Provenance |
|---|---|---:|---|---|
| subject_type | enum | R | Owner | Platform |
| subject_id | uuid | R | Owner | Platform |
| authority | text/enum | R | Owner | Official |
| registry_system | text | R | Owner | Official |
| registry_identifier | text | C | Sensitive | Official |
| registration_district | text | O | Owner | Document/Official |
| main_parcel_no | text | O | Sensitive | Document/Official |
| sub_parcel_no | text | O | Sensitive | Document/Official |
| separation_piece_no | text | O | Sensitive | Document/Official |
| postal_code | varchar(10) | O | Sensitive | Provider/Official |
| issue_date | date | O | Owner | Official |
| status | enum | R | Owner | Platform/Official |
| last_checked_at | timestamptz | O | Owner | Platform |

---

## 15. PropertyRight

| Field | Type | Req |
|---|---|---:|
| subject_type | enum | R |
| subject_id | uuid | R |
| right_type | enum | R |
| tenure_status | enum | O |
| holder_party_id | uuid | R |
| valid_from | date | O |
| valid_to | date | O |
| external_ref | text | O |
| evidence_id | uuid | O |

Right types: ownership, usufruct, easement, mortgage/security, lease/use, other.

---

## 16. OwnershipInterest

| Field | Type | Req |
|---|---|---:|
| property_right_id | uuid | R |
| party_id | uuid | R |
| share_numerator | bigint | R |
| share_denominator | bigint | R |
| source_notation | text | O |
| valid_from | date | O |
| valid_to | date | O |
| evidence_document_id | uuid | O |
| verification_state | enum | R |

Constraint: numerator > 0; denominator > 0; share <= 1 unless explicit exception.

---

## 17. Party

| Field | Type | Req | Visibility |
|---|---|---:|---|
| party_type | enum | R | Scoped |
| display_name | text | R | Scoped |
| legal_name | text | O | Sensitive |
| national_identifier | encrypted/text ref | O | Sensitive |
| phone | encrypted/text ref | O | Sensitive |
| email | citext | O | Sensitive |
| verification_state | enum | R | Scoped |

PII storage design should be separately security-reviewed.

---

## 18. RoleAssignment

| Field | Type | Req |
|---|---|---:|
| party_id | uuid | R |
| role_type | enum | R |
| scope_type | enum | R |
| scope_id | uuid | R |
| valid_from | timestamptz/date | O |
| valid_to | timestamptz/date | O |
| status | enum | R |
| authority_source | enum | O |
| permission_profile_id | uuid | O |

Roles: owner, tenant, resident, building_manager, representative, inspector, service_provider, guest/host where applicable.

---

## 19. Bundle

Used to scope Lease/Listing to multiple independent Spaces.

| Field | Type | Req |
|---|---|---:|
| id | uuid | R |
| property_id | uuid | R |
| name | text | R |
| purpose | enum | R |
| status | enum | R |

`BundleItem(bundle_id, space_id, required)`

Example: Unit 4 + P21 + A4.

---

## 20. Document

| Field | Type | Req |
|---|---|---:|
| subject_type / subject_id | polymorphic reference | R |
| document_type | enum | R |
| object_storage_key | text | R |
| issue_date | date | O |
| expiry_date | date | O |
| issuer | text | O |
| document_number | encrypted/text | O |
| content_hash | text | R |
| visibility_class | enum | R |
| verification_state | enum | R |

---

## 21. Media

| Field | Type | Req |
|---|---|---:|
| subject_type / subject_id | ref | R |
| media_type | enum | R |
| semantic_category | enum | O |
| object_storage_key | text | R |
| width | int | O |
| height | int | O |
| duration_seconds | numeric | O |
| alteration_state | enum | O |
| captured_at | timestamptz | O |
| visibility_class | enum | R |

---

## 22. Claim

| Field | Type | Req |
|---|---|---:|
| subject_type / subject_id | ref | R |
| claim_type | enum | R |
| value_json_typed | jsonb | R | schema validated per claim type |
| asserted_by_party_id | uuid | O |
| asserted_at | timestamptz | R |
| valid_from | timestamptz/date | O |
| valid_to | timestamptz/date | O |
| state | enum | R |

Controlled JSON is acceptable here because claim schemas are explicitly versioned.

---

## 23. Evidence / Verification

Evidence:
- claim_id
- evidence_type
- document_id/media_id/external_ref
- captured_at
- submitted_by

Verification:
- claim_id
- level
- verifier_type
- verifier_ref
- decision
- verified_at
- expires_at
- reason

---

## 24. Lease

| Field | Type | Req |
|---|---|---:|
| scope_type | enum | R |
| scope_id | uuid | R |
| lease_type | enum | R |
| status | enum | R |
| starts_on | date | R |
| ends_on | date | R |
| possession_on | date | O |
| deposit_amount | bigint | C |
| recurring_rent_amount | bigint | C |
| currency | char(3) | R |
| payment_frequency | enum | R |
| renewal_state | enum | O |

### LeaseParty
- lease_id
- party_id
- role
- signed_state
- signed_at

### LeaseRegistrationRef
- lease_id
- external_system
- external_tracking_code
- status
- submitted_at
- confirmed_at
- final_document_id

---

## 25. Building management

### BuildingManagementMandate
- building_id
- manager_party_id
- starts_on
- ends_on
- appointment_source
- status

### ChargeScheme
- building_id
- allocation_method
- effective_from/to
- parameters_json (validated)

### ChargeAssessment
- period
- due_at
- total_amount
- currency

### ChargeAllocation
- liable_scope
- party_id
- amount
- basis_snapshot_json
- paid_amount
- state

### Expense
- category
- vendor_party_id
- amount
- incurred_at
- invoice_document_id
- approval_state

---

## 26. Maintenance

### MaintenanceTicket
- subject scope
- reporter
- category
- severity
- description
- status
- opened_at
- resolved_at

### WorkOrder
- ticket_id
- service_provider
- quote amount
- approved amount
- scheduled_at
- completed_at
- evidence refs

---

## 27. Announcement

- building_id
- audience_scope
- title
- body
- publish_at
- expires_at
- acknowledgement_required
- created_by

---

## 28. Listing

| Field | Type | Req |
|---|---|---:|
| property_id | uuid | R |
| scope_type / scope_id | ref | R |
| listing_type | enum | R |
| status | enum | R |
| title | text | R |
| public_description | text | O |
| public_location_precision | enum | R |
| published_at | timestamptz | O |
| expires_at | timestamptz | O |

### ListingTerms
Sale:
- asking_price
- currency
- negotiable

Rent:
- deposit
- recurring rent
- payment frequency
- conversion rules

---

## 29. Visit / Offer / Deal

VisitRequest:
- listing_id
- requester party
- proposed slots
- selected slot
- state

Offer:
- listing_id
- offered_by
- offer_type
- financial terms snapshot
- conditions
- expires_at
- state

Deal:
- listing/offer refs
- parties
- agreed terms snapshot
- state
- created_at

---

## 30. Short-Stay

### StayOffering
- scope
- host relationship
- standard_capacity
- max_capacity
- min_stay_nights
- check_in_time
- check_out_time
- instant_booking
- cancellation_policy
- identity_policy
- status

### AvailabilityDay
- offering_id
- date
- availability_state
- block_reason

### RateRule
- date/range
- nightly_rate
- extra_guest_rate
- min_stay override
- discount rule

### Reservation
- offering
- guest party
- check-in/out
- guest counts
- price snapshot
- state
- payment ref

---

## 31. Inspection

InspectionRequest:
- subject scope
- purpose
- requested_by
- requested_at

InspectionAssignment:
- inspector
- assignment state

Inspection:
- template_version
- started/completed
- location/time evidence

Finding:
- category
- result
- severity
- notes
- evidence refs
- claim refs

Report:
- immutable version
- generated_at
- verifier
- document ref

---

## 32. AuditEvent

- id
- actor_party/user
- action
- resource_type
- resource_id
- timestamp
- correlation_id
- source_channel
- before_hash
- after_hash
- metadata_json

---

## 33. Visibility matrix

| Field group | Tenant | Owner | Manager | Public Listing |
|---|---:|---:|---:|---:|
| physical specs | yes | yes | scoped | selected |
| lease terms | own lease | yes | no by default | no |
| building charge | own/unit | scoped | yes | no |
| deed/registry ids | no | yes | no by default | no |
| ownership shares | no | yes | no by default | no |
| valuation/internal finance | no | yes | no | no |
| maintenance relevant to occupant | yes | yes | yes | no |
| announcements | resident scope | yes if resident/owner policy | yes | no |
| approximate location | n/a | n/a | n/a | yes |
| exact address | yes for occupied scope | yes | yes if mandate | gated |

Authorization must be evaluated from relationships, not only screen hiding.

---

## 34. Mutability classes

- **Stable:** property identity, registry references (change rarely)
- **Observed:** physical attributes, condition
- **Temporal:** occupancy, role, lease, manager mandate
- **Transactional:** payments, offers, reservations
- **Derived:** price per area, balances, countdowns
- **Immutable artifact:** signed contract PDF, finalized inspection report
