## Why

Several UX disjoints and technical debt items need addressing prior to deeper systemic integrations. The root redirect lacks robust session checking, the authentication page visual design is missing a premium feel, tasks on the dashboard do not adequately alert users regarding due dates, and the PDF generator API might fail if the JSON payload isn't synchronized correctly.

## What Changes

- Redesign of the `/auth` page integrating a dark-theme Split-Screen layout with heavy `backdrop-blur` floating forms.
- Re-implementation of the `/` root route to effectively intercept requests and route logic securely evaluating Supabase sessions.
- Enhancements in the dashboard tasks list with proactive, visually distinct notification badges for deadlines utilizing `lucide-react`.
- Solidification of the `generate-report/route.js` to properly stringify and await the Supabase fetches before passing them into the Python subprocess.

## Capabilities

### New Capabilities
- None. This is a hotfix phase focusing on existing structural UX and data passing reliability.

### Modified Capabilities
- `auth-flow`: More resilient redirecting out of the root page and premium UI.
- `task-tracking`: Proactive visual cues (Overdue, Upcoming, Indeterminate deadlines).
- `pdf-report-generation`: Hardened data passing to the subprocess bridge.

## Impact

- **Frontend:** Revisions to core `app/auth/page.jsx`, `app/page.jsx`, and `app/dashboard/page.jsx`.
- **Backend Bridge:** Explicit serialization enforcement in the `generate-report` API route.
