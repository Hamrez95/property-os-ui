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
