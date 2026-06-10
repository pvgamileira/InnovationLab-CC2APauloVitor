## ADDED Requirements

### Requirement: Disciplinas Gamification on Task Completion
The system SHALL award 50 XP to the user when they complete a task in the Disciplinas Kanban board by dragging it to the "completed" column.

#### Scenario: User drags task to completed column
- **WHEN** user drags an academic task to the 'completed' status column on the Disciplinas page
- **THEN** system calculates updated XP and level
- **THEN** system updates user metadata via Supabase auth
- **THEN** system displays a success toast notification "🎉 Você ganhou +50 XP!"

### Requirement: Disciplinas Smart Alerts
The system SHALL automatically evaluate tasks on the Disciplinas page to detect upcoming and overdue items and notify the user via a global toast.

#### Scenario: User has upcoming or overdue tasks
- **WHEN** the user navigates to the Disciplinas page and tasks are loaded
- **THEN** system checks if any task is overdue or due within 24 hours
- **THEN** system displays an appropriate toast alert for the first matching task
