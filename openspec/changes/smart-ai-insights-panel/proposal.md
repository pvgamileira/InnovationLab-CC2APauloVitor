## Why

While the EduTrack AI platform now aggregates data and offers visual completion metrics (via Recharts), it lacks a direct, actionable summary of what the student should do next. The `gemini-insights-api` backend is already functional. We now need to connect the frontend to surface these AI-driven strategic insights directly on the Analytics dashboard. This ensures students receive personalized, immediate guidance without leaving the primary analytics view.

## What Changes

- Update `app/dashboard/estatisticas/page.jsx` to fetch and display AI insights.
- Add an API call to `/api/gemini-insights` triggered upon component mount (using `useEffect`).
- Introduce a new "Smart Insights" UI component at the top of the analytics page. It will feature a Rich Black (`#02040a`) glassmorphism card with neon blue (`#3a86ff`) accents and a Sparkles icon from `lucide-react`.
- Implement a glowing skeleton loading state for the card while the AI data is being fetched.
- Strictly preserve all existing Recharts pie charts and Kanban board elements on the page.

## Capabilities

### New Capabilities
- `smart-ai-insights-panel`: Display of AI-generated strategic insights within the Analytics dashboard, complete with loading states and modern UI styling.

### Modified Capabilities
- No existing capabilities are modified at the requirements level.

## Impact

- **Frontend:** Modification of `app/dashboard/estatisticas/page.jsx` to include new React state (`insights`, `loading`, `error`), side-effects (`useEffect`), and a new UI section.
- **Dependencies:** Uses existing `lucide-react` icons. Relies on the newly created `/api/gemini-insights` endpoint.
- **Visuals:** Integrates seamlessly with the established dark mode / glassmorphism theme without disrupting existing charts.
