## Context

The current `app/page.jsx` is likely a default boilerplate or a simple placeholder. We need a proper SaaS Landing Page to greet evaluators and new users. This page must reflect the core ideology of EduTrack-Ai: an intelligent, predictive productivity IDE, not just a standard to-do list.

## Goals / Non-Goals

**Goals:**
- Completely rewrite `app/page.jsx` using Tailwind CSS and `lucide-react` icons.
- Ensure the aesthetic perfectly matches the internal Dashboard (dark mode, glassmorphism, purple/blue accents).
- Clearly explain the three pillar "Alive AI" features using visually distinct cards.
- Add a clear CTA linking to `/dashboard` and a "Pro Plan" tease banner.

**Non-Goals:**
- Implementing complex animations like Framer Motion (we will stick to standard Tailwind hover and pulse effects for stability).
- Building actual authentication gates on this specific page (the CTA will simply route to `/dashboard` where the auth check already happens).

## Decisions

- **Framework**: Next.js App Router, purely server-side rendered (or standard static) since there is no complex client state needed here (no `use client` required unless we add interactivity). We'll stick to basic HTML/Tailwind.
- **Styling**: 
  - Background: `bg-[#0f0f16]` (deep dark).
  - Text: High contrast white and gray (`text-gray-300`).
  - Cards: `bg-white/5 border border-white/10 rounded-2xl` with a blur effect if possible.
- **Icons**: `Terminal`, `Zap`, `Timer` from `lucide-react`.

## Risks / Trade-offs

- **Risk**: Without `framer-motion`, the page might feel static.
  - **Mitigation**: We will use aggressive Tailwind utilities like `hover:-translate-y-2`, `hover:shadow-2xl`, `transition-all`, and `animate-pulse` to ensure the page feels highly interactive and dynamic.
