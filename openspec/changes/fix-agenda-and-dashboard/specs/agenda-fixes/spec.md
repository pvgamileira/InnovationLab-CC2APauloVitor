## ADDED Requirements

### Requirement: Agenda Date Rendering Accuracy
The system SHALL correctly adjust task due dates loaded from the backend so that they render accurately on the local calendar without shifting to the previous day due to UTC conversion.

#### Scenario: User saves a task for the 30th
- **WHEN** the user sets a due date on the 30th
- **THEN** the Agenda MUST display the task on the 30th, irrespective of the user's local timezone offset.

### Requirement: Agenda Mobile Visibility
The system SHALL render the Agenda view visible on all device breakpoints.

#### Scenario: User opens Agenda on a mobile phone
- **WHEN** the user visits the dashboard or Agenda page on a screen smaller than `md`
- **THEN** the Agenda component is visible and fully usable.
