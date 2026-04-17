## ADDED Requirements

### Requirement: Subject Context Header
The page SHALL display a visually distinct header section summarizing all active subjects fetched from the `subjects` table.

#### Scenario: Subjects are loaded
- **WHEN** the user has entries in the `subjects` table
- **THEN** the header displays a summary card or chip for each subject, showing its title, professor, workload, and a static "Média: --" placeholder badge.

---

### Requirement: Drag-and-Drop Kanban Interface
The page SHALL provide a 3-column Kanban board built with `@dnd-kit`, corresponding to `pending`, `in_progress`, and `completed`.

#### Scenario: Dragging a task card
- **WHEN** a user clicks and drags a task card
- **THEN** it visually lifts, follows the cursor, and pushes other cards out of the way using smooth transitions.

#### Scenario: Dropping into a new column
- **WHEN** a user drops a task card into a different column
- **THEN** the UI updates optimistically, and a call to Supabase is made to update the task's `status` to match the target column.

#### Scenario: Error handling during drop
- **WHEN** the Supabase update fails after a drop
- **THEN** an error alert is shown and the local state is reverted (via data re-fetch).

---

### Requirement: Gamification Sync on Completion
Moving a task into the completed column SHALL visually or conceptually align with the gamification system.

#### Scenario: Task marked complete via drop
- **WHEN** a task is dropped into the "Concluído" (`completed`) column
- **THEN** the progress is recorded, and if it's a new completion, it contributes to the player's total `completedTasks` pool (automatically synced at the database level).
