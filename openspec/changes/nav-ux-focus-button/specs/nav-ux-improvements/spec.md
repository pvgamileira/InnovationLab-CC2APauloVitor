## ADDED Requirements

### Requirement: Desktop Sidebar Nav Update
The system SHALL display a "Foco" link within the main navigation on desktop views.

#### Scenario: Desktop view rendering
- **WHEN** the user is viewing the application on a desktop
- **THEN** the sidebar displays a link to "Foco"

### Requirement: Mobile Nav Restraint
The system SHALL explicitly limit the mobile bottom navigation bar to exactly 5 core items ("Painel", "Disciplinas", "Caderno", "Estatísticas", and "Perfil").

#### Scenario: Mobile view rendering
- **WHEN** the user views the application on a mobile device (`md:hidden`)
- **THEN** "Agenda" and "Foco" are excluded from the bottom navigation bar

### Requirement: Mobile Dashboard Quick Access
The system SHALL provide a dedicated mobile-only container with quick access tiles to secondary features.

#### Scenario: Mobile dashboard tiles
- **WHEN** the user views the Dashboard on a mobile device
- **THEN** a container featuring "Ver Agenda" and "Modo Foco" buttons is rendered at the top
