## Why

The Kanban board currently suffers from three significant issues that degrade user experience and gamification integrity:
1. **Infinite XP Exploit**: The recent hotfix correctly secured the drag logic and implemented XP subtraction logic in `app/dashboard/page.jsx`, but a parallel check inside `components/KanbanBoard.jsx` is missing or unlinked, allowing an exploit where users can rapidly drag tasks in and out of the "Concluídas" column to farm XP.
2. **Toast Object Crashes**: Error toasts in the Kanban component are occasionally passed raw Error objects instead of strings, causing React to crash when it attempts to render the toast.
3. **Cluttered "Concluídas" Column**: Users accumulate completed tasks indefinitely. There is currently no visual expiration mechanism, causing the board to become overwhelmed with old data.

## What Changes

1. **XP Subtraction Patch**: We will locate the `onDragEnd` logic (either in `KanbanBoard.jsx` or the function it calls) and ensure that if a task moves FROM "Concluídas" TO another column, `Math.max(0, currentXp - 50)` is rigorously applied to the Supabase user profile, immediately followed by `refreshUserData()`.
2. **Toast Sanitization**: We will audit every `toast.error()` and `toast.success()` invocation inside `components/KanbanBoard.jsx`. Any raw error objects will be mapped to `err.message`.
3. **Visual Auto-Hide Filter**: Inside `components/KanbanBoard.jsx`, before the tasks are rendered in the columns, we will inject a filter for the "Concluídas" column. If a task is in "Concluídas" AND its `due_date` is strictly before the current date (ignoring time boundaries), it will be filtered out of the UI array (while remaining untouched in the database).

## Capabilities

### Modified Capabilities
- `kanban-gamification`: Secured against infinite XP farming.
- `kanban-ui-rendering`: Implemented automatic visual expiration for old, completed tasks to maintain a clean workspace.

## Impact

- **Affected code**: `components/KanbanBoard.jsx` (and potentially the `moveTask` handler in `app/dashboard/page.jsx` if logic is shared).
- **User Experience**: The board will remain pristine as old completed tasks auto-hide. Crashes related to toasts will cease, and the gamification economy will be protected from exploits.
