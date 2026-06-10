## 1. Unify Kanban in Disciplinas

- [x] 1.1 Open `app/dashboard/disciplinas/page.jsx`.
- [x] 1.2 Import the global component: `import KanbanBoard from '@/components/KanbanBoard';`
- [x] 1.3 Remove local imports from `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities`.
- [x] 1.4 Delete the local `SortableTaskCard` and `BoardColumn` component functions.
- [x] 1.5 Replace the local `<DndContext> ... </DndContext>` block with the `<KanbanBoard tasks={filteredTasks} moveTask={handleMoveTask} />` element.

## 2. Implement handleMoveTask

- [x] 2.1 Inside the main `DisciplinasPage` component, create an async `handleMoveTask` function receiving `taskId` and `actionOrStatus`.
- [x] 2.2 Replicate the optimistic UI logic (similar to `app/dashboard/page.jsx`) to safely calculate the new status based on arrows or drag-and-drop.
- [x] 2.3 Perform the optimistic update on the local `tasks` array.
- [x] 2.4 Add the `supabase.from('academic_tasks').update({ status: newStatus }).eq('id', task.id)` call to persist the status change.
- [x] 2.5 Ensure `showToast` is called for error cases, and if an error occurs, revert the optimistic update by calling `refetchData(session?.user?.id)`.

## 3. Add Mobile Agenda Access

- [x] 3.1 Open `app/dashboard/page.jsx`.
- [x] 3.2 Locate an appropriate spot to add the mobile agenda button (e.g., right under the `Visão Geral` header or inside the header action group).
- [x] 3.3 Add a new `Link` element pointing to `/dashboard/agenda` with the text "📅 Abrir Agenda Completa".
- [x] 3.4 Apply styling classes `block md:hidden w-full h-12 px-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold flex items-center justify-center gap-2 mb-6` to ensure it only shows on mobile and matches the glassmorphism UI.
