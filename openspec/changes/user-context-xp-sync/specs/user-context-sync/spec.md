## ADDED Requirements

### Requirement: Global User Metadata Context
The system SHALL provide a centralized UserContext that maintains and serves the current user's metadata (including `xp`, `level`, and `premium` status).

#### Scenario: Components consume context data
- **WHEN** the user navigates to the Dashboard or Profile page
- **THEN** the components read `xp` and `level` from the shared UserContext instead of fetching it locally

### Requirement: Real-Time Context Refresh
The system SHALL provide a method (`refreshUserData`) within the context to update the centralized state dynamically.

#### Scenario: XP gain triggers refresh
- **WHEN** a user completes a task in the Kanban Board and gains XP
- **THEN** the Kanban Board invokes `refreshUserData()`, causing the header and other components to immediately reflect the new XP and Level
