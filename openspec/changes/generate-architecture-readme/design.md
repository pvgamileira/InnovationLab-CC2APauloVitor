# Design: Architecture README.md

## Content Strategy
The README will be written in formal, highly technical Portuguese and structure the academic dossier into four primary sections:

1. **Visão Geral:** Define "EduTrack-Ai" and the "Ambient AI / IA Viva" design paradigm.
2. **Metodologia Open-Spec:** Document the strict spec-driven approach to guarantee crash-proof production deployments, specifically rejecting ad-hoc "vibe coding".
3. **Engenharia de Front-end:** Detail the Anti-Crash UI architecture.
   - Mention the `Vanilla JS Canvas` particle background alongside `Framer Motion` for 3D parallax without the overhead of heavy WebGL pipelines (found in `app/page.jsx`).
   - Detail the `useRef` guard pattern used in `components/KanbanBoard.jsx` to prevent `useEffect` infinite re-render loops (Maximum update depth exceeded).
   - Document the optimistic UI state cleanup strategies, such as immediately closing modals (`setIsEditModalOpen(false)`) and clearing render tree artifacts upon deletion in `app/dashboard/disciplinas/page.jsx`.
4. **Integração de IA (Backend):** Explain the architectural decision to bypass buggy SDKs (e.g., `@google/genai`). Document the dependency-free native REST API fetch to the active `gemini-3.5-flash` endpoint implemented in `app/api/ai/consultoria/route.js`.

## Constraints
- Must reflect **only** the exact realities found in the codebase.
- No hallucinated features.
- Formal academic tone appropriate for a Computer Science evaluation board.
