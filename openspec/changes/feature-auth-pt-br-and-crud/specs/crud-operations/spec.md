## ADDED Requirements

### Requirement: Subject Creation Interface (Nova Disciplina)
The system MUST provide an interactive form/modal triggered by the main action button (Nova Disciplina). It MUST collect standard parameters (`name`, `professor`, and `workload`) and actively execute an `INSERT` operation directly binding the new payload to the currently authenticated `user.id`.

#### Scenario: Inserting a new subject
- **WHEN** the user inputs valid data and submits the modal
- **THEN** a new row safely commits to Supabase and the dashboard rehydrates dynamically

### Requirement: Task Creation Interface (Nova Tarefa)
The system MUST provide an interactive form/modal triggered by the secondary action button (Nova Tarefa). It MUST collect mapping arrays (`title`, `subject_id` selected from active subjects, and `due_date`) executing an `INSERT` directly binding both to the subject and the `user.id`.

#### Scenario: Inserting a new task
- **WHEN** the user targets an existing subject and submits the task modal
- **THEN** a new row commits to the database securely and triggers a UI update
