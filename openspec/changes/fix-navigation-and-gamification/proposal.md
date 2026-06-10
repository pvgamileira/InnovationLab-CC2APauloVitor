## Why

The application is experiencing two significant issues:
1. Global toasts disappear prematurely because navigation in the dashboard layout relies on native HTML `<a>` tags, which trigger full page reloads. This destroys the client-side state of the toast system.
2. The `Disciplinas` page has a duplicated Kanban drag-and-drop implementation that misses out on the gamification features (XP awards) and smart alerts (overdue/upcoming tasks) found in the main dashboard Kanban board. This creates an inconsistent user experience and breaks the intended gamification loop.

## What Changes

- Replace all native `<a>` tags in the sidebar and navigation within `app/dashboard/layout.jsx` with Next.js `<Link>` components to enable client-side routing.
- Inject gamification logic into the duplicated `onDragEnd` function in `app/dashboard/disciplinas/page.jsx` to award 50 XP, calculate level upgrades, and fire success toasts when a task is marked as "completed".
- Add smart alert logic (`useEffect` block) to `app/dashboard/disciplinas/page.jsx` to automatically detect overdue and upcoming tasks (< 24h) and fire appropriate toast alerts.
- Adhere strictly to pure JS/JSX without TypeScript and maintain the existing duplicated drag-and-drop structure.

## Capabilities

### New Capabilities
- `gamification-toasts-disciplinas`: Add XP tracking, level calculation, and toast notifications to the duplicated Kanban board in the Disciplinas page.

### Modified Capabilities
- `global-toasts`: The global toast requirements are now better enforced by ensuring the application layout supports client-side navigation.

## Impact

- `app/dashboard/layout.jsx` will be modified to support Next.js `<Link>` routing.
- `app/dashboard/disciplinas/page.jsx` will receive new `useEffect` hooks and modifications to its `onDragEnd` logic.
- Global Toast Context state will be preserved across navigation.
- Database (`supabase.from('academic_tasks')` and `supabase.auth.updateUser`) interactions will remain intact but will now include user metadata updates (XP).
