# Property OS coded design system

This folder is the implementation source for the **Calm Premium** visual language.

## Principles

- Secure, premium, calm, modern, human, trustworthy.
- RTL-first and LTR-ready. Prefer logical CSS properties over left/right in new work.
- Blue means action, green means verified/success, amber means pending/attention, red means error/danger.
- Verification is never communicated by color alone.
- Gradients are reserved for brand/hero surfaces, not routine controls.
- Property Card is a cross-surface brand anchor.
- Progressive disclosure: the UI should be super-app-ready without looking like super-app chaos.

## Token rules

Use semantic tokens from `tokens.css` rather than adding new raw colors.

Spacing follows 4 / 8 / 12 / 16 / 24 / 32 / 40 / 48.
Control radius is 12, card radius 16, large panel radius 20.
Elevation is intentionally limited to two levels.

## Accessibility baseline

- 44px practical interaction targets in full-size prototype views.
- Visible focus ring.
- Status labels include icon/text.
- Reduced-motion is respected.
- Keep body copy readable and tolerate text expansion.
