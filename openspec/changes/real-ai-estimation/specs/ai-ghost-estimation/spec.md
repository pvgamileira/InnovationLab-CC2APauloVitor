## MODIFIED Requirements

### Requirement: Task Effort AI Estimation
The system SHALL display an AI-generated effort estimation directly below or near the task title input field while the user is typing, without requiring manual button clicks. The estimation SHALL be generated via the real Gemini AI API.

#### Scenario: User types a long task title
- **WHEN** the user types a task title of 5 or more characters and pauses for 800ms
- **THEN** the system displays a loading indicator ("IA calculando...") followed by a "ghost tag" showing the estimated effort fetched from the Gemini API.

#### Scenario: User types a short task title
- **WHEN** the user types a task title with fewer than 5 characters
- **THEN** the system clears any existing estimation and does not trigger the AI prediction logic.

#### Scenario: API request fails or is rate-limited
- **WHEN** the system attempts to fetch the AI estimation and an error or non-ok response occurs
- **THEN** the system fails silently, clears any existing estimation, and allows the user to continue creating the task without any blocking error toasts.
