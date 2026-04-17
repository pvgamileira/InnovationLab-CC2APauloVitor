## Context

The `/disciplinas` page needs to become a functional Kanban board, migrating away from its current placeholder state. It will leverage `@dnd-kit` to provide a seamless drag-and-drop interaction model, completely replacing the need for click-based arrows (`←`/`→`) used in the simpler dashboard Kanban. 

## Goals / Non-Goals

**Goals:**
- Provide a robust drag-and-drop Kanban using `@dnd-kit`.
- Implement a comprehensive Subject Header displaying names, workloads, and a simulated "Grade/Average" badge.
- Ensure strict adherence to the Rich Black (`#02040a`) theme with neon accents and Glassmorphism styling constraint.
- When an item is dropped in the "Concluído" column, automatically trigger an XP update flow equivalent to what happens on the main dashboard.
- Ensure tasks preserve state locally for an immediate, optimistic UX, backing up with a Supabase `update` call.

**Non-Goals:**
- Modifying the main dashboard's simple arrow-based Kanban. (This robust DnD version is exclusively for `/disciplinas`).
- Modifying database schemas or tables.
- Modifying PDF report generation.

## Decisions

- **State Management**: A React `useState` will manage the array of tasks. `@dnd-kit`'s `onDragOver` and `onDragEnd` hooks will handle translating visual positions and mutating the local array in real-time.
- **DnD Library**: `@dnd-kit` gives the most flexible layout without assuming a strict vertical list. We will use `DndContext`, `SortableContext`, and `useSortable` to build the columns and cards.
- **Data Hooking**: The page will use `useEffect` to fetch session, subjects, and tasks from Supabase upon mount (same pattern as `/dashboard`).
- **Cards**: Reusable SortableItem wrapper applying standard transform styles, rendering the glassmorphism card content (title, subject tag, due date).

## Risks / Trade-offs

- **Risk**: `@dnd-kit` has a learning curve with layout and sensors.
  *Mitigation*: We will use `rectIntersection` collision detection and pointer sensors configured to only start on 10px drag, preventing accidental clicks from opening tasks.
- **Risk**: Optimistic updates failing on the server could cause UI desync.
  *Mitigation*: Always re-fetch data (`refetchData()`) from Supabase if an error is caught during the `.update()` sequence.
