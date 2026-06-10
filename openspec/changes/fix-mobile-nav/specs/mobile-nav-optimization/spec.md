## ADDED Requirements

### Requirement: Optimized Mobile Nav
The system SHALL limit the mobile bottom navigation bar to only core items (max 4).

#### Scenario: Mobile view
- **WHEN** the user is viewing the app on a mobile device (`md:hidden` breakpoint)
- **THEN** the bottom navigation bar only renders `Painel`, `Disciplinas`, `Caderno`, and `Perfil`
