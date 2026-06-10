## ADDED Requirements

### Requirement: Unified Kanban Component
The system SHALL use the global `<KanbanBoard/>` component in the Disciplinas page (`app/dashboard/disciplinas/page.jsx`) to handle task drag-and-drop and status updates.

#### Scenario: Dragging a task
- **WHEN** the user drags a task to a new status column
- **THEN** the system optimistically updates the UI and persists the new status to Supabase via `handleMoveTask`

#### Scenario: Kanban XP Gamification
- **WHEN** a task is moved to the 'completed' status using the global `<KanbanBoard/>` component
- **THEN** the system triggers the global XP gamification logic and displays a success toast

### Requirement: Remove Duplicate DND Code
The system SHALL NOT contain local duplicated drag-and-drop implementations (`SortableTaskCard`, `BoardColumn`) or `@dnd-kit` imports in `app/dashboard/disciplinas/page.jsx`.

#### Scenario: Code duplication removal
- **WHEN** viewing the source of `app/dashboard/disciplinas/page.jsx`
- **THEN** no `@dnd-kit` imports or local DND components are present
