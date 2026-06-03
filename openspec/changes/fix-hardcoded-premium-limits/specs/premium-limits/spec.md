## ADDED Requirements

### Requirement: Premium Users Bypass Usage Limits
The system SHALL bypass all hardcoded Free Tier usage limitations (e.g., maximum of 3 subjects, maximum of 20 tasks per month) across the Dashboard UI when the user is identified as Premium (`isPremium === true`).

#### Scenario: Premium User Creating a Fourth Subject
- **WHEN** a Premium user with 3 or more subjects opens the "Nova Disciplina" modal
- **THEN** the submit button is enabled
- **AND** the warning text indicating "Limite atingido" is not rendered.

#### Scenario: Premium User Exceeding 20 Tasks
- **WHEN** a Premium user with 20 or more tasks in the current month attempts to create a new task
- **THEN** the "Nova Tarefa" header button is enabled
- **AND** the "Adicionar Demanda" footer button is enabled
- **AND** the modal's internal warning text regarding task limits is not rendered.
