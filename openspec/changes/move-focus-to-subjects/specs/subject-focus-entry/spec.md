## ADDED Requirements

### Requirement: Focus Room Entry via Subject
The system SHALL provide a button on each Subject card to access the Focus Room.

#### Scenario: Navigating to Focus Room
- **WHEN** the user clicks the "Iniciar Modo Foco" button on a Subject card
- **THEN** the system navigates to `/dashboard/foco`

## REMOVED Requirements

### Requirement: Global Focus Link
**Reason**: To declutter the sidebar and contextualize the Focus feature within the subjects context.
**Migration**: Use the "Iniciar Modo Foco" button on Subject cards in the Disciplinas page.
