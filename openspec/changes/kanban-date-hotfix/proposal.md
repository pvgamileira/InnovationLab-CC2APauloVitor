## Why

Two critical stability issues have been identified in the current build:
1. **Unrestricted Dates**: The `<input type="date">` elements used for creating disciplines and tasks allow users to scroll infinitely, resulting in unrealistic entries (e.g., year 0001) that cause visual clutter and potential database sorting errors.
2. **Kanban XP Crash**: Dragging an overdue or already-completed task *out* of the "Concluídas" column causes the UI to crash. This occurs due to unhandled promise rejections and unsafe XP subtractions when reverting the task state.

Before introducing new AI features, we must stabilize the core data entry and drag-and-drop mechanics to ensure data integrity and prevent blank screen crashes.

## What Changes

1. **Date Boundaries**: 
   - We will locate all modals and components responsible for creating or editing tasks and disciplines (e.g., `NovaDisciplinaModal`, `NovaTarefaModal`).
   - We will apply strict `min="2026-01-01"`, `max="2030-12-31"`, and `required` attributes to these inputs.
2. **Kanban Crash Recovery**:
   - We will wrap the core database mutation and XP calculation logic in `components/KanbanBoard.jsx` inside a strict `try/catch` block.
   - XP subtractions (when a task moves out of 'Concluídas') will use `Math.max(0, ...)` to ensure safe calculations.
   - State reversion and user feedback (`toast.error`) will be implemented in the `catch` block to handle network or logic failures gracefully.

## Capabilities

### Modified Capabilities
- `task-creation-flow`: Hardened date inputs prevent bad data.
- `kanban-interaction`: Fortified drag-and-drop logic prevents application crashes during edge-case interactions.

## Impact

- **Affected code**: `components/KanbanBoard.jsx`, `components/NovaDisciplinaModal.jsx`, `components/NovaTarefaModal.jsx` (and potentially others utilizing `<input type="date">`).
- **User Experience**: Users will experience a more robust interface. Attempting to enter invalid dates will be blocked by native browser validation, and edge-case dragging interactions will no longer crash the dashboard.
