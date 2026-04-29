# Design: Fix Notebook Markdown & Settings Logic

## Component: Notebook Page
**File**: `app/dashboard/caderno/page.jsx`
- Import `ReactMarkdown` from `react-markdown`.
- Replace the simple `<pre>` or `<p>` tag that renders the `result` state with a `<ReactMarkdown>` component.
- Apply a custom `components` prop to `ReactMarkdown` to style standard HTML tags using Tailwind (e.g., `h1`, `h2`, `h3` for headers; `ul`, `ol`, `li` for lists; `strong` for bold text) ensuring they match the `#0a0c14` dark theme and `text-gray-300` base colors.

## Component: Settings Page
**File**: `app/dashboard/configuracoes/page.jsx`

### 1. Delete Account Logic
- Create an asynchronous function `handleDeleteAccount`.
- Use a `window.confirm` to ensure the user actually wants to delete their data.
- Sequentially delete from Supabase:
  1. `academic_tasks` where `user_id === session.user.id`
  2. `subjects` where `user_id === session.user.id`
  3. `user_profiles` where `user_id === session.user.id`
- Call `supabase.auth.signOut()`.
- Redirect to `/` using `window.location.href`.
- Wrap in try/catch and use an `isDeleting` state to show a loader.

### 2. Help Center UI
- In the tab rendering logic for `'ajuda'`, replace the placeholder with an FAQ layout.
- Use glassmorphism cards (`bg-white/5`, `border-white/10`, `backdrop-blur-md`).
- Add two main FAQ blocks:
  - **Como o Mentor IA funciona?**: Explain that it analyzes tasks and routine via Gemini API to give personalized advice.
  - **Como funciona o Kanban?**: Explain drag-and-drop and status progression.
