# Property OS — Controlled Lookups v1

Status: WORKING

Use stable English machine keys in database/API. Persian/English labels belong to localization.

## property_subtype
- apartment
- villa_house
- commercial_shop
- office
- land
- agricultural_garden
- industrial_warehouse
- teardown_old
- mixed_use
- other

## lifecycle_state
- active
- archived
- disputed
- pending_verification

## occupancy_state
- vacant
- owner_occupied
- tenant_occupied
- operator_occupied
- mixed
- unknown

## space_type
- residential_unit
- office_unit
- shop
- parking
- storage
- common_area
- roof
- yard
- garden
- utility_room
- caretaker_room
- warehouse
- workshop
- other

## access_scope
- exclusive
- common
- restricted_common

## space_legal_relation
- deeded_exclusive
- dependent_exclusive
- usage_right
- common
- unknown

## role_type
- owner
- co_owner
- tenant
- resident
- building_manager
- representative
- inspector
- service_provider
- host
- guest
- buyer
- seller
- lessor
- lessee
- witness
- guarantor

## scope_type
- property
- parcel
- structure
- space
- bundle
- listing
- lease
- building

## right_type
- ownership
- usufruct
- easement
- mortgage_security
- lease_use
- other

## tenure_status
- freehold_talq
- waqf
- mixed
- unknown

## verification_level
- self_reported
- evidence_backed
- provider_verified
- platform_verified
- officially_verified

## verification_decision
- pending
- verified
- partially_verified
- rejected
- expired
- superseded

## visibility_class
- public
- authenticated
- occupant
- manager
- owner
- authorized_representative
- sensitive_admin

## source_kind
- user
- uploaded_document
- inspection
- provider
- platform
- official
- import
- derived

## listing_type
- sale
- long_term_rent
- commercial_right
- participation_offer
- other

## listing_status
- draft
- ready
- published
- paused
- under_offer
- closed
- expired
- withdrawn

## lease_status
- draft
- pending_parties
- pending_registration
- active
- expiring
- renewed
- terminated
- expired
- cancelled

## maintenance_status
- open
- triaged
- quoted
- awaiting_approval
- scheduled
- in_progress
- resolved
- closed
- cancelled

## stay_offering_status
- draft
- active
- paused
- suspended
- archived

## reservation_status
- requested
- pending_host
- accepted
- payment_pending
- confirmed
- checked_in
- checked_out
- completed
- rejected
- cancelled_guest
- cancelled_host
- expired
- disputed

## availability_state
- available
- blocked
- reserved
- unavailable

## official_registration_status
- not_submitted
- draft
- submitted
- pending
- accepted
- rejected
- superseded
- cancelled

## document_type
- deed
- lease_contract
- sale_contract
- permit
- end_of_work
- municipal_receipt
- utility_evidence
- identity_evidence
- inspection_report
- invoice
- insurance
- floor_plan
- registry_extract
- other

## media_semantic_category
- exterior
- living_room
- kitchen
- bedroom
- bathroom
- office
- shopfront
- warehouse
- parking
- storage
- yard
- garden
- pool
- floor_plan
- document_scan
- defect
- inspection_evidence
- other

## money
Never encode currency in the field name alone. Use:
- amount_minor / amount
- currency_code
- optional display_unit metadata

WORKING Iran convention:
- canonical integration amount: IRR where required
- UI presentation may use TOMAN conversion
