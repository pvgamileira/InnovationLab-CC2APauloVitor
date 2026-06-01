# Tarefas: Hotfix ActivityHeatmap Database Query

- [x] **Fix Supabase Query**
  - [x] Open `components/ActivityHeatmap.jsx`.
  - [x] Locate the `supabase.from('academic_tasks')` query block.
  - [x] Update `.select('updated_at')` to `.select('created_at')`.
  - [x] Update `.gte('updated_at', ...)` to `.gte('created_at', ...)`.
  - [x] In the mapping loop, update `task.updated_at` to `task.created_at`.
