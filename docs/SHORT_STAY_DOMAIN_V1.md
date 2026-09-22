# Property OS — Short-Stay Domain v1

Status: P1 / optional overlay  
Benchmark signals: Otaghak, Shab, Jabama, Jajiga

## Principle

A villa does not become a different Property because it is rented nightly.

```text
Villa Property
    ↓ scoped by
StayOffering
    ├── AvailabilityCalendar
    ├── RateRules
    ├── HouseRules
    ├── AmenityProfile
    ├── Reservation
    ├── GuestParty
    └── SettlementReference
```

## 1. StayOffering

Fields:
- id
- scope_type / scope_id
- host_role_assignment_id
- status
- title
- short_description
- standard_capacity
- max_capacity
- bedroom_count snapshot
- bed configuration
- minimum_stay_nights
- check_in_time
- check_out_time
- instant_booking
- booking_notice_minutes
- cancellation_policy_id
- identity_policy_id

## 2. AmenityProfile

Use controlled many-to-many lookup.

Groups:
- pool/spa
- kitchen
- entertainment
- internet/work
- parking/access
- heating/cooling
- outdoor
- accessibility
- safety
- child/family
- pet

Avoid dozens of boolean columns in StayOffering.

## 3. Availability

`AvailabilityDay`
- offering_id
- local_date
- state = available | blocked | reserved | unavailable
- reason
- source
- version

Use property-local date, not UTC timestamp, for calendar-day inventory.

## 4. Pricing

`RateRule`
- priority
- valid range
- weekdays
- nightly amount
- extra guest amount
- min/max stay override
- discount type/value
- reason/source

Final Reservation stores an immutable pricing snapshot.

## 5. Reservation

State machine:
```text
requested
→ pending_host
→ accepted
→ payment_pending
→ confirmed
→ checked_in
→ checked_out
→ completed

alternatives:
rejected / cancelled_guest / cancelled_host / expired / dispute
```

## 6. Guest party

- booking party
- adults
- children
- infants if needed
- identity verification state
- guest list where required

Sensitive identity data must not be replicated into marketing/listing data.

## 7. House rules

Versioned rules:
- pets
- smoking
- party/event
- quiet hours
- visitor policy
- child policy
- identity/document policy
- check-in instructions

Reservation links to the accepted rules version.

## 8. Host operations

Later:
- reservation inbox
- calendar
- instant booking windows
- payouts/settlements reference
- transaction history
- support/dispute
- occupancy analytics
- dynamic pricing suggestions

## 9. Reviews

Review belongs to StayOffering/Reservation context, not to canonical Property facts.

Possible:
- guest_to_stay_review
- host_to_guest_review
- moderation state

## 10. Trust

Evidence from short-stay operations can contribute to trust signals, but should not automatically become official property verification.

Examples:
- repeated accurate guest reviews → operational reputation
- host identity verification → Party trust
- document-backed pool safety → specific Claim evidence
