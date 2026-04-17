## Context

The current `app/page.jsx` serves as the project's root route but lacks a polished marketing-grade landing page. The first impression is critical for user acquisition. This design establishes the visual architecture, animation strategy, and structural skeleton that will eventually host a 3D Spline robot — a key premium design element.

## Goals / Non-Goals

**Goals:**
- Build `app/page.jsx` as a `"use client"` component.
- Use Framer Motion for staggered fade-up entrance animations on the left column.
- Achieve a 50/50 split hero layout with an absolute top navbar.
- Keep Right Column as a placeholder div only — no Spline integration at this stage.
- All user-facing copy in pt-BR.

**Non-Goals:**
- Integrating Spline or any 3D library.
- Implementing authentication flows on this page (links to `/auth`).
- Modifying `app/dashboard/page.jsx`, API routes, or any other page.
- Full responsive/mobile optimization (foundation only).

## Decisions

- **`"use client"`**: Required since Framer Motion hooks (`useAnimation`, `motion`) rely on browser APIs and cannot run in React Server Components.
- **Framer Motion over CSS animations**: Provides declarative, composable, and easily adjustable stagger orchestration — critical for the premium entrance feel.
- **`staggerChildren` on the container variant**: Each child animates sequentially with a slight delay, giving a polished "typewriter-row" feel without JS timers.
- **Navbar: absolute positioning**: Keeps it visually overlapping the hero without impacting layout flow. Logo right, nav links left, matching design spec.
- **Right column: empty placeholder div**: Enforces a strict boundary between skeleton and future Spline work. The comment `{/* SPLINE 3D ROBOT GOES HERE */}` is mandated as the integration handoff contract.
- **`framer-motion` dependency**: Already common in Next.js / React stacks. Must be installed via npm if not already present.

## Risks / Trade-offs

- **Risk**: `framer-motion` not installed yet → **Mitigation**: Task 1.1 explicitly checks and installs it.
- **Risk**: Overwriting existing `app/page.jsx` content → **Mitigation**: Task is scoped to recreate the file entirely; any valuable existing content should be manually preserved beforehand.
- **Risk**: `"use client"` boundary may conflict with app-level server layouts → **Mitigation**: Next.js App Router supports client components anywhere; root layout remains a server component.
