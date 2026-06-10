## Context

The `app/dashboard/disciplinas/page.jsx` currently implements its own drag-and-drop context and Kanban columns. This prevents it from benefiting from the gamification, global state updates, and visual consistency provided by the centralized `KanbanBoard` component located in `components/KanbanBoard.jsx`. Additionally, mobile users lack direct, intuitive access to the full Agenda view from the dashboard page.

## Goals / Non-Goals

**Goals:**
- Replace duplicated drag-and-drop implementations in the Disciplinas page with the global `KanbanBoard` component.
- Provide a consistent method (`handleMoveTask`) to optimistically update tasks and synchronize status changes with Supabase.
- Add a mobile-friendly button in the dashboard to access the Agenda view.

**Non-Goals:**
- Modifying the core `components/KanbanBoard.jsx` component.
- Altering the database schema or the existing gamification algorithms.

## Decisions

- **Use of `KanbanBoard` Component**: We will import `KanbanBoard` into `app/dashboard/disciplinas/page.jsx` and pass the filtered tasks and a `handleMoveTask` function as props. This immediately inherits all drag-and-drop capabilities, styling, and gamification hooks present in the global component.
- **State Management**: `handleMoveTask` will perform an optimistic UI update by modifying the local state array. If the Supabase mutation fails, a re-fetch ensures the state correctly reflects the database, minimizing disruption to the user experience.
- **Mobile Agenda Button**: To keep the dashboard clean on larger screens, the new "📅 Abrir Agenda Completa" button will utilize the `md:hidden` Tailwind class. It will use Next.js `Link` for efficient client-side routing.

## Risks / Trade-offs

- **Risk**: Moving tasks on the Disciplinas page might fail silently if Supabase encounters an error.
  - **Mitigation**: Implement robust error handling in `handleMoveTask` using `showToast` and calling `refetchData` to revert optimistic updates.
- **Risk**: The KanbanBoard expects `tasks` as an array. The Disciplinas page filters tasks by selected subject.
  - **Mitigation**: Pass the already filtered `filteredTasks` array to the `KanbanBoard` instead of the raw `tasks` array, ensuring only relevant tasks are displayed.
