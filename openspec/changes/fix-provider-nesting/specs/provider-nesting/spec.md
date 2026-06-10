## ADDED Requirements

### Requirement: Correct Context Provider Nesting
The system SHALL ensure that all global context providers are properly nested. Specifically, `UserProvider` MUST wrap `AiProvider` so that any `useUserContext` hook calls within `AiProvider` or its children do not throw an error.

#### Scenario: Application initialization
- **WHEN** the dashboard application loads and orchestrates its global layout
- **THEN** the React component tree successfully renders because `AiProvider` is nested inside `UserProvider`, correctly resolving the `useUserContext` dependency.
