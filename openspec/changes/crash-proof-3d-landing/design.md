## Context

The current landing page setup has routing issues (locking out unauthenticated users) and requires a significant visual upgrade. The user has specifically requested an interactive, crash-proof 3D parallax presentation page using `framer-motion` for the root URL. Furthermore, it is critical to strictly adhere to the project's native system palette (e.g., from `/auth` or `/dashboard`) instead of introducing hardcoded colors like purple.

## Goals / Non-Goals

**Goals:**
- Fix routing in `app/page.jsx` by removing any aggressive redirects that block unauthenticated users from the landing page.
- Implement a crash-proof, client-side 3D parallax component (`InteractiveNotebook`) using `framer-motion`.
- Ensure all animations (fade-in, slide-up, parallax tilt) are smooth and hydration-safe.
- Dynamically extract and use the existing primary/accent colors from the project's UI.

**Non-Goals:**
- Using heavy 3D rendering libraries like WebGL or Three.js. We will achieve the 3D effect purely through CSS 3D transforms managed by `framer-motion`.
- Adding new aesthetic palettes or themes. 

## Decisions

- **Framework**: Next.js App Router. We will use `use client` strictly where needed (e.g., inside the `InteractiveNotebook` and animation wrappers) to prevent hydration mismatches.
- **Parallax Implementation**: 
  - Use `onMouseMove` and `onMouseLeave` to track the cursor relative to a container.
  - Map cursor coordinates to `rotateX` and `rotateY` using `useMotionValue` and `useTransform` from `framer-motion` (max tilt of ~15 degrees).
- **Color Palette**: During implementation, we will inspect files like `tailwind.config.js`, `tailwind.config.ts`, or global CSS (e.g., `app/globals.css`) to identify the exact hex codes or Tailwind classes used in `/auth` and `/dashboard`, and apply those to the CTA button and accents.

## Risks / Trade-offs

- **Risk**: Hydration mismatch errors if `framer-motion` attempts to animate elements before the client is fully hydrated.
  - **Mitigation**: We will ensure that animations use sensible initial states and only run client-side. The 3D component will be strictly a client component.
