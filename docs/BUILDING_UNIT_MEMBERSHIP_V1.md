# Building / Unit Membership & Matching v1

Status: working contract for founder review · 2026-09-23

## Canonical rule

`Building` has an independent physical identity and owns canonical `Unit` records. A tenant, owner or manager joins a pre-existing scope through a time-bounded relationship; they do not create a duplicate physical unit merely because they arrive first.

```text
Building → Unit
Party → RoleAssignment → Building | Unit → valid_from / valid_to
Ownership = Claim → Evidence → Verification
```

## Match before create

1. Collect `postal_code` (when available), normalized address, building identity and unit identifier.
2. Search candidate buildings / units.
3. Let the user confirm a matched canonical record.
4. Create a relationship request, invitation acceptance or ownership claim.
5. Only offer **Create building / unit** when there is no credible match or the user rejects candidates.

## Postal code caution

Postal code is a useful matching signal, but is **not assumed to be a global canonical unit identifier**. The product stores it as an address attribute and evaluates it with normalized address + building identity + unit number. The exact Iranian postal-code allocation/uniqueness rule remains a research / provider-integration question before production enforcement.

## Canonical journeys

### Tenant first

`Address / postal code → Building match → Unit match → tenant relationship request → manager/inviter approval → time-bounded Tenant → Unit`

The tenant sees residence, lease, charges, announcements and tenant-scoped maintenance only after authorization.

### Owner later

`Address / postal code → existing building + unit → ownership Claim → Evidence → Verification`

Self-entry never marks an ownership claim official. `OwnershipInterest` is created/activated only according to the verified policy; its rational share and validity window remain explicit.

### Building manager

`Create / import building → define Units → issue scoped invite / join code / QR → party accepts role + scope + time`

Manager authority is a `BuildingManagementMandate`, not a permanent `manager_id` on Building.

## Prototype routes

- `#/app/join-residence`
- `#/app/join-residence-match`
- `#/app/tenant-request-sent`
- `#/app/claim-ownership`
- `#/app/claim-ownership-evidence`
- `#/app/building-invite`

These are UX decision surfaces only; they do not assert a backend or official-verification contract.
