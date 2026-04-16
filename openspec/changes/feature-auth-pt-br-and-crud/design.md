## Context
We are implementing the actual application lifecycle operations. As the schemas and designs are strictly configured to isolate data via Row Level Security based on the active user session, we critically need the Authentication Gateway to issue these tokens. Simultaneously, the UI must localize to PT-BR, eliminate visual inconsistencies (emojis), and provide the input channels (modals) for actual data insertion.

## Goals / Non-Goals

**Goals:**
- Implement an `/auth` component purely via Next.js and `@supabase/supabase-js`.
- Localize all dashboard phrasing to proper Brazilian Portuguese (pt-BR).
- Build React state-managed modal interfaces for "Nova Disciplina" and "Nova Tarefa", executing Supabase `insert` mutations natively.
- Enforce iconography purity: restrict use to SVG formats (like Lucide React) exclusively.

**Non-Goals:**
- Implementing Third-Party OAuth (Google/Github/Apple). We will focus strictly on the fundamental Email/Password methods.
- Full CRUD matrix interactions. This specific spec focuses heavily on the `CREATE/INSERT` capability.

## Decisions
- **Auth Strategy:** We will utilize client-side `@supabase/supabase-js` methods (`signUp` and `signInWithPassword`) housed within an `/auth` page acting as the portal. State syncs via `supabase.auth.getSession()`.
- **UI Architecture for Modals:** The data-entry modals will exist structurally within `app/dashboard/page.jsx` or a parallel structural sibling, governed by explicit React State hooks (`isSubjectModalOpen`). Backgrounds will leverage intense `bg-black/80 backdrop-blur-sm` layers.
- **Iconography Cleanup:** Emojis map differently across OS ecosystems fundamentally breaking the "Premium" vision. All emojis will be forcefully purged and replaced with deterministic vector graphic SVGs.

## Risks / Trade-offs
- [Client-side Auth Transition] → Trade-off: Client-side routing between auth and dashboard might possess standard react-lifecycle delays. Mitigation: Strong suspense or unified loading (`loading subjects...`) states.
