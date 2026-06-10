## ADDED Requirements

### Requirement: Premium Landing Page
The system SHALL serve a high-converting, premium-styled landing page on the root route (`/`) that explains the core "Alive AI" features and provides a clear path to enter the application.

#### Scenario: User visits the root URL
- **WHEN** the user navigates to the application's root URL (`/`)
- **THEN** the system displays a dark-themed Hero section with a massive headline, a subtitle explaining the AI benefits, and a glowing "Entrar no Sistema" button linking to `/dashboard`.

#### Scenario: User views feature documentation
- **WHEN** the user scrolls down on the landing page
- **THEN** the system displays three distinct glassmorphism cards detailing "Sistema Nervoso (Linter)", "Kanban Preditivo", and "Pomodoro Dinâmico" with appropriate icons.

#### Scenario: User views pricing/monetization teaser
- **WHEN** the user scrolls to the bottom of the landing page
- **THEN** the system displays a wide gradient banner teasing the "Plano Pro" to indicate commercial viability.
