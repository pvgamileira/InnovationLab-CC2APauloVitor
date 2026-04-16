## Context

This hotfix aims to apply final polishing on existing UX and system logic. We use pure JavaScript Next.js App Router, Supabase, and Tailwind CSS. The style adheres strictly to pt-BR language guidelines and "Rich Black/Metallic Blue" aesthetics without the use of system OS emojis. 

## Goals / Non-Goals

**Goals:**
- Upgrade `app/auth/page.jsx` to a premium Split-Screen structure featuring EduTrack AI branding and a floating Glassmorphism card.
- Secure `app/page.jsx` utilizing `supabase.auth.getSession()` to redirect adequately.
- Add deadline badges in `app/dashboard/page.jsx`. "Prazo Indeterminado" (Null), "Atrasada" (Red, < Today), "Próxima" (Yellow, < 48 hours).
- Enforce explicit `JSON.stringify` logic for the Python payload inside `app/api/generate-report/route.js`.

**Non-Goals:**
- Creating new backend tables or Python scripts.
- Using TypeScript. 

## Decisions

- **Root Routing:** The `app/page.jsx` will be a Client Component deploying `useEffect` with `supabase.auth.getSession()`, redirecting seamlessly without relying on insecure middleware loops for this phase.
- **Task Triage Visuals:** Simple JavaScript Date object manipulation will determine conditionality for inline badges, using `lucide-react` icons exclusively (`Clock`, `AlertCircle`) instead of emojis.
- **Split-Screen Auth:** A dual-pane flex layout hidden on smaller screens (`lg:flex`) where the right pane hosts the interactive dark mode form enveloped in `backdrop-blur-3xl`.

## Risks / Trade-offs

- Over-fetching session data: Negligible on the client via Supabase's local storage sync.
