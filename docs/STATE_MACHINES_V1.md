# Property OS — State Machines v1

Status: WORKING

## Lease

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> pending_parties
  pending_parties --> pending_registration
  pending_parties --> cancelled
  pending_registration --> active
  pending_registration --> cancelled
  active --> expiring
  active --> terminated
  expiring --> renewed
  expiring --> expired
  renewed --> active
  expired --> [*]
  terminated --> [*]
  cancelled --> [*]
```

Rules:
- Terms snapshot becomes immutable after all-party signature.
- External registration state is related but separate.
- Renewal creates a new term/version rather than silently overwriting historical dates.

## Listing

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> ready
  ready --> published
  published --> paused
  paused --> published
  published --> under_offer
  under_offer --> published
  under_offer --> closed
  published --> withdrawn
  published --> expired
  closed --> [*]
  withdrawn --> [*]
  expired --> [*]
```

## Offer

```mermaid
stateDiagram-v2
  [*] --> draft
  draft --> submitted
  submitted --> countered
  countered --> submitted
  submitted --> accepted
  submitted --> rejected
  submitted --> expired
  accepted --> converted_to_deal
  converted_to_deal --> [*]
```

Each counter should be a version/event, not mutation without history.

## Maintenance

```mermaid
stateDiagram-v2
  [*] --> open
  open --> triaged
  triaged --> quoted
  quoted --> awaiting_approval
  awaiting_approval --> scheduled
  awaiting_approval --> cancelled
  scheduled --> in_progress
  in_progress --> resolved
  resolved --> closed
  closed --> [*]
```

## Verification

```mermaid
stateDiagram-v2
  [*] --> self_reported
  self_reported --> evidence_backed
  evidence_backed --> provider_verified
  evidence_backed --> platform_verified
  provider_verified --> officially_verified
  platform_verified --> officially_verified
  evidence_backed --> rejected
  provider_verified --> expired
  platform_verified --> expired
  officially_verified --> expired
```

Verification **level** and verification **decision** should be separate fields if the workflow needs rejected/expired states.

## Reservation

```mermaid
stateDiagram-v2
  [*] --> requested
  requested --> pending_host
  requested --> accepted
  pending_host --> accepted
  pending_host --> rejected
  accepted --> payment_pending
  payment_pending --> confirmed
  payment_pending --> expired
  confirmed --> checked_in
  confirmed --> cancelled_guest
  confirmed --> cancelled_host
  checked_in --> checked_out
  checked_out --> completed
  completed --> [*]
  rejected --> [*]
  expired --> [*]
```

Instant booking may skip pending_host.

## Official registration adapter

```mermaid
stateDiagram-v2
  [*] --> not_submitted
  not_submitted --> draft
  draft --> submitted
  submitted --> pending
  pending --> accepted
  pending --> rejected
  accepted --> superseded
  rejected --> draft
```

Never infer "officially verified" merely because submission succeeded locally.
