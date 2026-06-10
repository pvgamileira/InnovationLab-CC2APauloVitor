## Why

The current landing page setup has routing issues (locking out unauthenticated users) and lacks the interactive "wow factor" requested by the user. We need to build a crash-proof, highly fluid 3D parallax presentation page using Framer Motion to serve as a stunning, interactive storefront, while strictly adhering to the project's native color palette (no hardcoded purple).

## What Changes

- **Fix Routing**: Remove any `redirect` or `router.push` forcing users away from the root (`/`) page.
- **Hero Section**: Create a dark-themed Hero section with a massive headline ("A Primeira IDE de Produtividade Acadêmica") and a CTA linking to `/auth`.
- **Crash-Proof 3D Parallax Component**: Implement an `InteractiveNotebook` component using `framer-motion` (CSS 3D Transforms) that tilts based on mouse movement.
- **Native System Palette**: Ensure all UI elements use the existing primary/accent colors established in the project (no new hardcoded colors like purple).
- **Fluid Animations**: Use `framer-motion` for smooth entry animations (fade-in/slide-up) for text elements, ensuring zero hydration mismatches.

## Capabilities

### Modified Capabilities
- `premium-landing-page`: The landing page will now feature an interactive 3D parallax component, correct routing, and strictly use the native system color palette instead of a hardcoded purple theme.

## Impact

- **Affected code**: `app/page.jsx`
- **User Experience**: The landing page becomes highly interactive and visually stunning with 3D parallax effects, providing a premium first impression while remaining stable and perfectly aligned with the app's existing design system.
