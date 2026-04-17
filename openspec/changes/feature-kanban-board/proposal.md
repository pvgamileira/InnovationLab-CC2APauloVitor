## Why

The current task list in the dashboard renders all tasks in a single vertical list regardless of status, making it hard to get a quick visual overview of workflow state. A 3-column Kanban board (Backlog / Em Progresso / Concluídas) gives users an instant spatial sense of their academic pipeline and encourages moving tasks forward deliberately.

## What Changes

- Replace the "Backlog de Tarefas" flat list section in `app/dashboard/page.jsx` with a new `KanbanBoard` component.
- Introduce a third task status value: `"in_progress"` (alongside the existing `"pending"` and `"completed"`).
- Create `components/KanbanBoard.jsx` as a self-contained board that accepts `tasks`, `subjects`, and a `moveTask` callback.
- Add a `moveTask` function to `page.jsx` that calls the existing Supabase `.update()` logic to change a task's `status`.
- Task cards display: title, subject tag, due date, overdue/upcoming badges, and directional arrow buttons to move left/right between columns.
- **Zero changes** to API routes, PDF logic, auth, or Supabase query structure.

## Capabilities

### New Capabilities
- `kanban-board`: A 3-column Kanban view rendering tasks grouped by status with glassmorphism card styling and status-transition controls.

### Modified Capabilities
None — the Supabase fetching (`refetchData`), updating (`toggleTaskStatus` → replaced by `moveTask`), and all auth logic remain structurally unchanged. Only the UI rendering layer changes.

## Impact

- `app/dashboard/page.jsx`: Remove old backlog section; add `KanbanBoard` import and `moveTask` handler; pass `tasks`, `subjects`, and `moveTask` as props.
- `components/KanbanBoard.jsx`: New file.
- Supabase `academic_tasks` table: The `status` column will now accept a third value `"in_progress"` in addition to `"pending"` and `"completed"`.
- **No changes to**: `app/api/generate-report/route.js`, `scripts/generate_report.py`, `app/auth/`, or any other route.
