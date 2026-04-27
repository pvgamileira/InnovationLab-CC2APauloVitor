## 1. Setup and Preparation

- [x] 1.1 Open `app/dashboard/estatisticas/page.jsx`.
- [x] 1.2 Import `useState`, `useEffect` from React.
- [x] 1.3 Import `Sparkles` icon from `lucide-react`.
- [x] 1.4 Import `createClient` from `@supabase/supabase-js` to fetch the session token on the client.

## 2. State Management

- [x] 2.1 Add `insights` state (default `null`).
- [x] 2.2 Add `isLoading` state (default `true`).
- [x] 2.3 Add `error` state (default `null`).

## 3. Data Fetching

- [x] 3.1 Create a `useEffect` hook to fetch AI insights on mount.
- [x] 3.2 Inside the hook, fetch the current Supabase session to retrieve the access token.
- [x] 3.3 Make a `fetch` request to `/api/gemini-insights` including the `Authorization: Bearer <token>` header.
- [x] 3.4 Parse the JSON response. If successful, set `insights` with the data. If error, set `error` state.
- [x] 3.5 Set `isLoading` to `false` in a `finally` block.

## 4. UI Implementation (AI Panel)

- [x] 4.1 Create the JSX structure for the "Smart Insights" panel at the top of the main container, ensuring it is prepended without modifying existing elements.
- [x] 4.2 Apply the Rich Black (`#02040a`) and glassmorphism Tailwind classes to the panel container.
- [x] 4.3 Add a header section with the `Sparkles` icon (colored in neon blue `#3a86ff`) and the title "Insights Inteligentes".
- [x] 4.4 Render the glowing skeleton loader if `isLoading` is true.
- [x] 4.5 Render an error message or return `null` if `error` is true.
- [x] 4.6 Render the list of insights dynamically from the `insights.insights` array (from the API response) if data is available, applying appropriate typography and spacing.

## 5. Verification

- [x] 5.1 Verify that the existing Recharts pie charts and Kanban board are completely untouched and functional.
- [x] 5.2 Verify the UI styling matches the dark mode premium aesthetic requested.
