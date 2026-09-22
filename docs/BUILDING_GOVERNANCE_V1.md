# Property OS — Building Governance & Operations v1

Status: WORKING  
Purpose: modeling and UX contract for apartment/building management.

## 1. Why this is separate from Property

A Building is a physical Structure, but building management is a time-bounded operational mandate.

Do not store "manager_id" directly on a building as permanent truth.

Use:

```text
Building
  ↓
BuildingManagementMandate
  ↓
Manager Party + Validity + Appointment Source
```

## 2. Management mandate

`BuildingManagementMandate`
- id
- building_id
- manager_party_id
- valid_from
- valid_to
- appointment_source
- appointment_document_id
- status
- permission_profile_id

Possible appointment sources:
- assembly_resolution
- owner_agreement
- developer_initial
- court_or_authority
- imported_legacy
- unknown

## 3. Assembly / resolutions

`BuildingAssembly`
- building_id
- meeting_type
- scheduled_at
- held_at
- location
- quorum_snapshot
- minutes_document_id
- status

`AssemblyParticipant`
- assembly_id
- party_id
- represented_scope
- attendance_state
- voting_weight_snapshot

`Resolution`
- assembly_id
- title
- description
- resolution_type
- proposed_at
- voting_rule
- effective_from
- effective_to
- status
- evidence_document_id

`ResolutionVote`
- resolution_id
- party_id / represented scope
- vote
- voting_weight_snapshot
- cast_at

Historical voting weight must be snapshotted; do not recalculate old votes from current ownership.

## 4. Charge schemes

A single hardcoded charge formula is incorrect.

`ChargeScheme`
- building_id
- name
- allocation_method
- valid_from
- valid_to
- resolution_id
- parameters_json (schema-versioned)
- status

Allocation methods:
- by_area
- equal
- mixed
- custom_approved

`ChargeAssessment`
- scheme_id
- period_start
- period_end
- issue_date
- due_date
- total_amount
- currency
- status

`ChargeAllocation`
- assessment_id
- liable_scope_type
- liable_scope_id
- liable_party_id
- amount
- currency
- basis_snapshot_json
- paid_amount
- state

The basis snapshot explains why Unit 4 owes a specific amount.

## 5. Expenses / reserve

`BuildingExpense`
- category
- vendor
- amount
- currency
- incurred_at
- invoice_document_id
- work_order_id
- resolution_id if approval required
- approval_state

`ReserveFund`
- building_id
- purpose
- balance read-model
- policy/resolution reference

Use a financial ledger/event model as source of truth instead of manually mutating a balance field.

## 6. Insurance

Current apartment-management rules include fire-insurance duties for the building as a whole.

Model:
`BuildingInsurancePolicy`
- insurer
- policy_number
- policy_type
- coverage_start/end
- insured_scope
- premium_amount
- document_id
- status
- renewal_reminder

Insurance compliance state should be operational reminder + document evidence, not a bare checkbox.

## 7. Maintenance

```text
MaintenanceTicket
  → Triage
  → Quote(s)
  → Approval
  → WorkOrder
  → Completion Evidence
  → Expense
```

Important:
- requester may be tenant/resident/manager/owner
- authorization to approve spend depends on manager mandate/rules
- common-area ticket and private-unit ticket are different scopes
- photos/invoices/service reports become Evidence/Document references

## 8. Announcements

`Announcement`
- building_id
- audience_scope
- title/body
- publish_at
- expires_at
- priority
- acknowledgement_required
- created_by

Audience examples:
- all occupants
- owners only
- tenants only
- one unit
- affected floors
- committee/managers

## 9. Occupant vs owner visibility

Tenant/occupant:
- own charge/debt if policy allows
- building announcements
- maintenance relevant to occupied scope
- common service schedules
- own lease-linked obligations

Owner:
- property-level charge and expense history
- voting/resolution access
- manager mandate
- financial documents where authorized

Manager:
- building-wide operations within mandate
- resident contact only where permitted
- charges/expenses
- announcements
- service operations

## 10. Audit

Must audit:
- manager mandate changes
- charge scheme changes
- charge issuance
- manual adjustment/waiver
- expense approval
- assembly resolutions
- insurance updates
- maintenance approval and closure

## 11. Current legal modeling signals

The Iranian apartment-ownership framework distinguishes exclusive and common parts and allows common expense allocation to differ based on the nature of the expense or approved arrangements.

Therefore the model must preserve:
- private/common space distinction
- effective-dated charge scheme
- assembly/resolution evidence
- calculation basis snapshot

Managers also have operational duties such as maintaining expense records and fire-insurance coverage; the product should surface these as trackable obligations with evidence and due dates.
