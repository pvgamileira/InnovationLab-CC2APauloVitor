## 1. Apply Date Input Boundaries
- [x] 1.1 Locate `components/NovaDisciplinaModal.jsx`. Add `min="2026-01-01"`, `max="2030-12-31"`, and `required` to any `<input type="date">`.
- [x] 1.2 Locate `components/NovaTarefaModal.jsx` (or similarly named components). Add `min="2026-01-01"`, `max="2030-12-31"`, and `required` to any `<input type="date">`.

## 2. Refactor Kanban Drag Logic
- [x] 2.1 Open `components/KanbanBoard.jsx` (or the specific file handling drag-and-drop state).
- [x] 2.2 Locate the function responsible for the drag drop logic (e.g., `onDragEnd`).
- [x] 2.3 Wrap the database update and state logic in a `try/catch` block.
- [x] 2.4 Inside the `try` block: Ensure that if a task is moved out of "Concluídas", XP subtraction is calculated safely: `Math.max(0, currentXp - xpReward)`.
- [x] 2.5 Inside the `try` block: Ensure `refreshUserData()` is awaited properly.
- [x] 2.6 Inside the `catch` block: Safely revert the UI state to the original columns snapshot.
- [x] 2.7 Inside the `catch` block: Trigger a `toast.error("Erro ao mover a tarefa. Tente novamente.")`. (Ensure `toast` is imported).
