## Context

This atomic fix targets broken UI flows and dead ends. The application is built on Next.js (App Router, Tailwind CSS). The overarching theme must remain cohesive: `pt-BR` messaging, "Rich Black" deep dark mode, and `lucide-react` SVG iconography.

## Goals / Non-Goals

**Goals:**
- Inject reliable client-side or server-side redirection inside `app/page.jsx`.
- Deploy `app/disciplinas/page.jsx` using a glassmorphism placeholder displaying "Gerenciamento de Disciplinas".
- Deploy `app/estatisticas/page.jsx` using a glassmorphism placeholder displaying "Estatísticas Avançadas".
- Confine changes exactly to these three files without impacting existing authentication or statistical logic.

**Non-Goals:**
- Implementing actual features for Disciplinas or Estatísticas.
- Any backend or API modifications.

## Decisions

- **Placeholders Elements:** Utilize a heavy `backdrop-blur-xl`, border accents (`border-white/5` or `border-indigo-500/10`), and a centralized message structure to give an illusion of depth typical of premium Glassmorphism.
- **Routing:** Use `useEffect` + `supabase.auth.getSession()` or Next.js `redirect()` to handle the routing fluidly in `app/page.jsx`.

## Risks / Trade-offs

- None expected. This is a purely cosmetic and surface-level routing enhancement.
