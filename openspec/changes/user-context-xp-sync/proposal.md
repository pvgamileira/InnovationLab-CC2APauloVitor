## Why

Currently, there is a state desync bug where the Profile page and Dashboard show different XP and Level values. Furthermore, when tasks are completed on the Kanban board, the UI (such as the header HUD) does not update in real-time. Implementing a global UserContext will serve as the Single Source of Truth for user metadata, allowing all components to stay instantly synchronized.

## What Changes

- **Create UserContext**: Introduce `context/UserContext.jsx` with a `UserProvider` and a `refreshUserData` function that fetches the latest user metadata from `supabase.auth.getUser()`.
- **Wrap Application**: Wrap the entire application within the `UserProvider` inside `app/dashboard/layout.jsx`.
- **Dashboard Component Update**: Replace local XP/Level fetching logic in `app/dashboard/page.jsx` with the synchronized data from `useUserContext`.
- **Profile Component Update**: Replace local XP/Level fetching logic in `app/dashboard/perfil/page.jsx` with the synchronized data from `useUserContext`.
- **Real-Time Gamification**: Update `components/KanbanBoard.jsx` to consume `useUserContext` and trigger `refreshUserData()` immediately after awarding XP upon task completion.

## Capabilities

### New Capabilities
- `user-context-sync`: Provides real-time synchronization of user metadata (XP, Level, Premium status) across the application.

### Modified Capabilities

## Impact

- **Affected code**: `context/UserContext.jsx` (New), `app/dashboard/layout.jsx`, `app/dashboard/page.jsx`, `app/dashboard/perfil/page.jsx`, and `components/KanbanBoard.jsx`.
- **User Experience**: Immediate feedback upon gaining XP, no stale data across different dashboard routes.
