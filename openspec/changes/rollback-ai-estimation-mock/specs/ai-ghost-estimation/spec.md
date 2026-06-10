## MODIFIED Requirements

### Requirement: Task Effort AI Estimation
The system SHALL display an AI-generated effort estimation directly below or near the task title input field while the user is typing, without requiring manual button clicks. The estimation SHALL be generated via a local deterministic heuristic mock rather than a real API, to ensure production stability.

#### Scenario: User types a long task title
- **WHEN** the user types a task title of 5 or more characters and pauses for a simulated delay
- **THEN** the system displays a loading indicator ("IA calculando...") followed by a "ghost tag" showing the estimated effort calculated via local regex heuristics.

#### Scenario: User types a short task title
- **WHEN** the user types a task title with fewer than 5 characters
- **THEN** the system clears any existing estimation and does not trigger the AI prediction logic.
