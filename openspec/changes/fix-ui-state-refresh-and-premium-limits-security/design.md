## Context
While `app/dashboard/page.jsx` effectively inserts new rows into Supabase, the React state hooks (`subjects` and `tasks`) are not updated unless the user manually refreshes the page. Furthermore, while the visual buttons are disabled for Free Tier limits, the `onSubmit` handlers (`handleCreateSubject` and `handleCreateTask`) do not enforce the limits internally, leaving a potential client-side bypass.

## Goals / Non-Goals
**Goals:**
- Instantly reflect database inserts on the UI without reloading.
- Patch the handler-level vulnerability for Free Tier limits.

**Non-Goals:**
- Modifying the backend Supabase RLS policies (this change focuses strictly on React application logic).

## Decisions
- **Re-use `refetchData`**: Since `refetchData` is already implemented and handles fetching both subjects and tasks natively, we will simply `await` it after a successful Supabase insert. This keeps code DRY.
- **Top-of-function Limit Checks**: Adding explicit IF guards at the very top of the handlers guarantees that if a user maliciously enables the button via DevTools, the function will safely short-circuit and display a Toast.
