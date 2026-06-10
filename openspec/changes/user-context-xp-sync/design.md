## Context

Currently, the user's XP and Level are fetched locally within various components (`app/dashboard/layout.jsx`, `app/dashboard/page.jsx`, `app/dashboard/perfil/page.jsx`). When a user completes a task in the `KanbanBoard.jsx`, their metadata is updated in Supabase, but the rest of the application (like the dashboard header or profile page) does not immediately reflect this change because there is no centralized state management for user data.

## Goals / Non-Goals

**Goals:**
- Implement `UserContext` to centralize the fetching and caching of user metadata (`xp`, `level`, `premium`).
- Ensure all consuming components (`layout`, `dashboard`, `profile`) pull data from this single source of truth.
- Trigger `refreshUserData()` upon gamification events (e.g., completing a task in the Kanban board) to ensure the UI updates instantly.

**Non-Goals:**
- Altering the visual layout or UI components.
- Changing how data is structurally saved in Supabase.
- Migrating to TypeScript.

## Decisions

- **React Context API**: Use React Context (`createContext`) instead of external state managers like Redux or Zustand. The state needs are simple enough that Context API is sufficient and minimizes dependencies.
- **Provider Placement**: Wrap `UserProvider` inside `app/dashboard/layout.jsx` around `{children}`. This ensures the dashboard routes have access to the context without wrapping the entire application (e.g., the auth routes don't need it).
- **Refresh Strategy**: `KanbanBoard` will call the context's `refreshUserData` function after successfully calling `supabase.auth.updateUser()`. This avoids complex realtime subscriptions while still providing instantaneous UI updates.

## Risks / Trade-offs

- **Risk**: Context updates will trigger re-renders for all children consuming the context.
  - **Mitigation**: The update frequency (task completion) is low, so the performance impact of re-rendering the dashboard header and profile is negligible.
