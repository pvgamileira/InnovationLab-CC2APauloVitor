## Context

The dashboard currently has a `lg:col-span-5` right column containing a Recharts pie chart and a flat task backlog list. The flat list iterates all tasks and uses a binary `pending ↔ completed` toggle. The Kanban board replaces only the flat list section while keeping all Supabase logic, the pie chart, the subject list, and all other dashboard sections completely intact.

## Goals / Non-Goals

**Goals:**
- Build `KanbanBoard` as a pure UI component taking `tasks`, `subjects`, and `moveTask(taskId, direction)` as props.
- Render 3 equal-width columns using `grid grid-cols-3 gap-4` (or `flex` with equal flex-basis), each with a column header and scrollable card area.
- Each task card: glassmorphism (`bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl`), hover lift (`hover:bg-white/10 transition-all`), shows title, subject tag, due date badge, overdue/upcoming indicators.
- Left/right arrow buttons on cards to call `moveTask` (disabled at column edges).
- `moveTask` in `page.jsx` computes the new status (`pending → in_progress → completed`) and calls `supabase.from('academic_tasks').update({ status: newStatus }).eq('id', taskId)` then `refetchData` — the same pattern as the old `toggleTaskStatus`.

**Non-Goals:**
- Drag-and-drop (mouse/touch DnD requires heavy libraries — arrow buttons are sufficient MVP).
- Changing any Supabase schema (the `status` column already stores arbitrary strings).
- Modifying `app/api/generate-report/route.js`, `scripts/generate_report.py`, auth pages, or layout files.
- Replacing the Recharts pie chart or KPI cards.

## Decisions

- **Column order & status mapping**:
  - Column 1: `"Backlog"` → `status === "pending"`
  - Column 2: `"Em Progresso"` → `status === "in_progress"`
  - Column 3: `"Concluídas"` → `status === "completed"`
- **moveTask direction**: `"forward"` advances one column, `"backward"` reverses one. Edge cards show a disabled arrow.
- **Column width in the layout**: The Kanban board will replace the `lg:col-span-5` backlog panel and expand to `lg:col-span-12` (full width below the Subjects + Chart row) — giving the 3 columns adequate space.
- **Empty column states**: Each empty column renders a minimal placeholder (dashed border, icon, short text).
- **Task count badges**: Each column header shows the count of cards in that column.

## Risks / Trade-offs

- **Risk**: `"in_progress"` tasks created pre-migration won't exist in Supabase yet → **Mitigation**: Any task without a matching status defaults to the Backlog column; no data loss.
- **Risk**: Full-width Kanban below the chart may feel disconnected → **Mitigation**: Add a clear section divider and section heading ("Quadro de Tarefas") with an icon.
- **Risk**: Pie chart only counts `pending` / `completed`, ignoring `in_progress` → **Mitigation**: Acceptable for now; chart is unchanged as per constraints.
