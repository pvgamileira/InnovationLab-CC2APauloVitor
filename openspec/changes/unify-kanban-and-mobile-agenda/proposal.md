## Why

The Disciplinas page (`app/dashboard/disciplinas/page.jsx`) currently uses a duplicated, hardcoded drag-and-drop implementation instead of the global `<KanbanBoard/>` component. This causes the page to miss out on the unified arrows logic, XP gamification, and success toasts that the global component provides.
Additionally, there is no quick, mobile-friendly way to access the Agenda from the main Dashboard view.

## What Changes

- **Unify Kanban in Disciplinas**: Delete local `SortableTaskCard`, `BoardColumn`, and `@dnd-kit` imports from `app/dashboard/disciplinas/page.jsx`. Replace the entire `<DndContext>` block with the official `<KanbanBoard/>` component.
- **Implement handleMoveTask**: Create the `handleMoveTask` function in `app/dashboard/disciplinas/page.jsx` to optimistically update the state and commit the change to Supabase, then refetch the data.
- **Mobile Agenda Button**: Add a mobile-only button (`block md:hidden`) in `app/dashboard/page.jsx` linking to `/dashboard/agenda`.

## Capabilities

### New Capabilities
- `kanban-unification`: Unifies the Kanban board across the app by replacing duplicate implementations with the global `<KanbanBoard/>` component.
- `mobile-agenda-shortcut`: Adds a mobile-only shortcut button to the Agenda from the main Dashboard view.

### Modified Capabilities

## Impact

- **Affected Code**: `app/dashboard/disciplinas/page.jsx` (removing local DND code, importing `KanbanBoard`), `app/dashboard/page.jsx` (adding the mobile button).
- **Dependencies**: Removing `@dnd-kit` imports from `app/dashboard/disciplinas/page.jsx`. No new packages required.
- **Rules**: Pure JS/JSX. No TypeScript. `<KanbanBoard/>` component will NOT be modified.
