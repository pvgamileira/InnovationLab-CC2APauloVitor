## ADDED Requirements

### Requirement: Three-column Kanban layout
The system SHALL render a full-width 3-column Kanban board below the existing dashboard sections. Columns SHALL be equal width and display tasks grouped by status: `pending` (Backlog), `in_progress` (Em Progresso), and `completed` (Concluídas).

#### Scenario: Tasks segregated by status
- **WHEN** a user has tasks with statuses `pending`, `in_progress`, and `completed`
- **THEN** each task appears in exactly one column matching its status

#### Scenario: All columns shown even when empty
- **WHEN** a column has zero tasks
- **THEN** the column still renders with its header and an empty state placeholder (dashed border + icon + message)

---

### Requirement: Glassmorphism task cards
Each task card SHALL use `bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl` base styles with `hover:bg-white/10 transition-all duration-200` on hover.

#### Scenario: Card renders required data
- **WHEN** a task card renders
- **THEN** it displays the task title, the linked subject name as a tag, and the due date (or "Prazo Indeterminado" if absent)

#### Scenario: Overdue badge
- **WHEN** a task has a `due_date` in the past and is not `completed`
- **THEN** a red "Atrasada" badge is visible on the card

#### Scenario: Upcoming badge
- **WHEN** a task has a `due_date` within 48 hours and is not `completed`
- **THEN** a yellow "Próxima" badge is visible on the card

---

### Requirement: Status transition controls
Each task card SHALL have directional controls to move the task one column forward or backward. Controls at the edge columns SHALL be visually disabled.

#### Scenario: Move task forward
- **WHEN** the user clicks the "→" button on a `pending` task
- **THEN** the task's status updates to `in_progress` in Supabase and the task moves to the "Em Progresso" column

#### Scenario: Move task backward
- **WHEN** the user clicks the "←" button on an `in_progress` task
- **THEN** the task's status updates to `pending` in Supabase and the task moves to the "Backlog" column

#### Scenario: Edge buttons disabled
- **WHEN** a task is in the first column ("Backlog")
- **THEN** the "←" backward button is absent or visually disabled

#### Scenario: Completed edge disabled
- **WHEN** a task is in the last column ("Concluídas")
- **THEN** the "→" forward button is absent or visually disabled

---

### Requirement: Preserved Supabase interaction
The status update SHALL use the existing Supabase client (`supabase.from('academic_tasks').update({ status }).eq('id', taskId)`) followed by a `refetchData` call. No new API routes or RPC calls SHALL be introduced.

#### Scenario: Optimistic local update
- **WHEN** a user clicks a directional button
- **THEN** the task card immediately moves to the new column in the UI before the Supabase call resolves

#### Scenario: Error handling
- **WHEN** the Supabase update call returns an error
- **THEN** an alert is displayed and the UI reverts to the previous state on the next `refetchData`

---

### Requirement: Column task count badges
Each Kanban column header SHALL display the count of tasks currently in that column.

#### Scenario: Count updates on move
- **WHEN** a task is moved to a new column
- **THEN** both column counts update to reflect the new totals
