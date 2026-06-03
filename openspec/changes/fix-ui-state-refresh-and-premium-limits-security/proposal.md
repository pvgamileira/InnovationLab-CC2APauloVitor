## Why
Currently, the Dashboard UI fails to refresh the React state after a successful Subject or Task creation, forcing users to manually refresh the page (F5) to see their newly added items. Additionally, while the previous change disabled the visual buttons when Free Tier limits are reached, tech-savvy users might still bypass the UI buttons. We need to enforce these limits directly inside the submit handlers (`handleCreateSubject` and `handleCreateTask`) to guarantee data integrity.

## What Changes
- Enforce the 3-subject limit for Free Tier users directly at the top of `handleCreateSubject`.
- Enforce the 20-task limit for Free Tier users directly at the top of `handleCreateTask`.
- Inject `await refetchData(session.user.id);` into both handlers so the UI updates instantly after successful creations.
- Ensure the modal buttons continue to properly use `disabled={!isPremium && limitReached}`.

## Capabilities

### New Capabilities
- `ui-state-refresh`: Ensures real-time synchronization between the Supabase database and the React client state upon data mutation.
- `premium-limits-security`: Enforces tier limitations at the handler execution level rather than just visually.

### Modified Capabilities

## Impact
- Core modification to the dashboard's creation handlers (`app/dashboard/page.jsx`).
- Greatly improves UX by eliminating manual page reloads.
- Secures the Free Tier limitations from client-side DOM manipulation bypasses.
