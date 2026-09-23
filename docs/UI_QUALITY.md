# UI quality contract

Property OS coded UI is **RTL-first and LTR-ready**.

## Required states
Every data-heavy product surface should reuse or match these semantics:
- loading
- empty
- error
- forbidden
- stale / needs refresh
- success / verified

## Accessibility
- Visible keyboard focus via `:focus-visible`.
- Practical 44px target size for full-size interactive prototype controls.
- Verification/status always has text or icon; never color alone.
- `prefers-reduced-motion` disables non-essential animation.
- New layout CSS should prefer logical properties (`margin-inline`, `padding-inline`, `start/end`).
- Text containers should tolerate Persian/English expansion without fixed single-line assumptions.

## Color contract
Blue = action/information.
Green = verified/success.
Amber = pending/attention/expiring.
Red = error/danger.
Neutral = ordinary information.

## Review route
Use `#/design` (or the root hash route) to review the entire system together.

## Role / Scope clarity (P0)

- Operational screens show a persistent, switchable `Role + Scope` context: tenant / unit 2; owner / unit 1; or building manager / Niavaran building.
- The active context is shared between Home, Property, Space, Building, Charges, Lease and Maintenance prototype routes.
- A work order must name its scope, responsible role and physical place. It must not rely on color, a generic title or a redirect to general messages to imply ownership.
- First-run onboarding is a four-step RTL flow; the Home tour is optional, dismissible and includes a "do not show again" control.
