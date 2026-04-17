## 1. Subject Header & Data Fetching Setup

- [x] 1.1 Convert `app/dashboard/disciplinas/page.jsx` to a `"use client"` component and implement data fetching (`useEffect`) for session, `subjects`, and `academic_tasks`.
- [x] 1.2 Implement the "Subject Context Header" UI mapping over `subjects`, rendering glassmorphism pill/cards showing Professor, Workload, and a static "Nota" (Grade/Average) badge.

## 2. Dnd-Kit UI Implementation

- [x] 2.1 Set up the `@dnd-kit` framework inside the page: instantiate `DndContext`, configure sensors (`PointerSensor`, `KeyboardSensor`), and define `onDragOver` and `onDragEnd` handlers.
- [x] 2.2 Create three column definitions (`pending`, `in_progress`, `completed`). Render each column using `SortableContext` wrapping its respective filtered task list.
- [x] 2.3 Build the `SortableTaskCard` component utilizing `useSortable` to apply CSS transforms and transition styling for dragging.
- [x] 2.4 Style the `SortableTaskCard` with the required premium glassmorphism logic: `bg-white/5 backdrop-blur border border-white/10`. Include title, subject tag, and due date.

## 3. Data Sync & XP

- [x] 3.1 In `onDragEnd`, extract the final destination column and the dragged task's ID. Update the local `tasks` array state optimistically to reflect the drop.
- [x] 3.2 Execute the Supabase `update` call (`supabase.from('academic_tasks').update({ status }).eq('id', taskId)`) securely.
- [x] 3.3 Add error handling to call `refetchData()` to resync the board if the Supabase request fails.
