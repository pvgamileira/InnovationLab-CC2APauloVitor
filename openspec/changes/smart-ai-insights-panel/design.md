## Context

The backend route `/api/gemini-insights` was recently created to generate AI insights based on the user's Supabase session and academic data. The frontend needs to consume this endpoint and display the results on the `estatisticas` page without interfering with existing Recharts pie charts or the Kanban board. The UI must strictly follow the existing "Rich Black" and glassmorphism styling conventions.

## Goals / Non-Goals

**Goals:**
- Fetch data from `/api/gemini-insights` securely from the frontend `app/dashboard/estatisticas/page.jsx`.
- Render a new "Smart Insights" panel at the top of the statistics view.
- Provide a smooth loading experience using a glowing skeleton state.
- Ensure the new component uses Tailwind CSS, Lucide React (`Sparkles` icon), and JSX (no TypeScript).
- Maintain 100% integrity of the existing charts and layout.

**Non-Goals:**
- Modifying the backend `/api/gemini-insights` route.
- Refactoring the existing Recharts pie chart or the Kanban board logic.

## Decisions

1. **Client-Side Data Fetching:** We will use a standard React `useEffect` hook to fetch the data on component mount. Since Supabase handles the session via cookies/headers, we need to pass the current session token in the `Authorization` header. We will get the session using `@supabase/supabase-js` client from the browser.
2. **UI Placement:** The "Smart Insights" card will be prepended inside the main layout container of the `estatisticas` page, above the charts section.
3. **Skeleton Loader:** We will implement a custom Tailwind CSS pulse animation for the loading state to match the premium dark theme (Rich Black/Metallic Blue).
4. **Error Handling:** If the API fails, the panel will gracefully display a fallback message or disappear to prevent layout breakage.

## Risks / Trade-offs

- **Risk:** Existing layout breaking due to adding a new element at the top.
  → **Mitigation:** Wrap the AI panel in a flex/grid container consistent with the current layout's padding and margins. Test responsiveness.
- **Risk:** Session token retrieval failure on the client side.
  → **Mitigation:** Ensure the Supabase client is correctly initialized to get the active session token before making the `fetch` call to the API.
