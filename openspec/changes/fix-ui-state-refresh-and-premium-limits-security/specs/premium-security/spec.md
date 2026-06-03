## ADDED Requirements

### Requirement: Real-Time UI Synchronization
The system SHALL refresh the locally displayed lists of subjects and tasks immediately after a new record is successfully persisted to the database.

#### Scenario: Successful Task Creation Updates Board
- **WHEN** the user creates a new task and receives a success toast
- **THEN** the task appears on the Kanban board without requiring a page reload.

### Requirement: Handler-Level Security for Limits
The system SHALL prevent the submission of new subjects or tasks if the user has reached the Free Tier limits, regardless of client-side DOM button enablement.

#### Scenario: Free Tier User Attempts Bypass via DOM
- **WHEN** a Free Tier user manually removes the "disabled" attribute from the submit button and fires a submit event while already having 3 subjects
- **THEN** the `handleCreateSubject` function aborts execution
- **AND** displays an error toast stating "Limite de 3 disciplinas atingido. Faça upgrade para o Pro."
