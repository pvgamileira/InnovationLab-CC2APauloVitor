## 1. New KanbanBoard Component

- [x] 1.1 Create `components/KanbanBoard.jsx` accepting props: `tasks`, `moveTask`.
- [x] 1.2 Define the 3 column definitions with status keys, pt-BR labels, accent colors, and icons (e.g., `Circle` for Backlog, `Play` for Em Progresso, `CheckCircle2` for Concluídas).
- [x] 1.3 Implement the `grid grid-cols-1 md:grid-cols-3 gap-5` column layout with a column header showing icon, label, and count badge.
- [x] 1.4 Implement the task card with glassmorphism styles: `bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all`.
- [x] 1.5 Display on each card: task title (bold, truncated), subject tag (blue pill), due date badge (or "Prazo Indeterminado"), overdue badge (red), and upcoming badge (yellow).
- [x] 1.6 Add `←` / `→` arrow buttons (using `ChevronLeft` / `ChevronRight` from lucide-react) to each card; disable/hide the button at the column edge.
- [x] 1.7 Render a column empty state: dashed border placeholder with an icon and a pt-BR message when a column has zero tasks.

## 2. Dashboard Integration

- [x] 2.1 Add a `moveTask` function to `app/dashboard/page.jsx` that accepts `(taskId, direction)`, computes the new status using the ordered array `['pending', 'in_progress', 'completed']`, optimistically updates local `tasks` state, calls `supabase.from('academic_tasks').update({ status: newStatus }).eq('id', taskId)`, then `refetchData`.
- [x] 2.2 Import `KanbanBoard` at the top of `app/dashboard/page.jsx`.
- [x] 2.3 Remove the old "Backlog de Tarefas" flat list block (lines ~394–458 of the current file) and its "+ Adicionar Demanda" button — **without touching** the add-task modal trigger or any other block.
- [x] 2.4 Add a new full-width section below the existing `lg:grid-cols-12` block: a section heading ("Quadro de Tarefas" + `KanbanSquare` icon) and the `<KanbanBoard tasks={tasks} moveTask={moveTask} />`.
- [x] 2.5 Retain the `+ Adicionar Demanda` dashed button below the Kanban board so users can still create new tasks.
