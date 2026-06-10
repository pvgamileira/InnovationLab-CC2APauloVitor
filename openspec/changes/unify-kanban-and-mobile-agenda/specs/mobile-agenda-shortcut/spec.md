## ADDED Requirements

### Requirement: Mobile Agenda Shortcut
The system SHALL display a mobile-only button on the main Dashboard view (`app/dashboard/page.jsx`) that links to `/dashboard/agenda`.

#### Scenario: Mobile visibility
- **WHEN** the dashboard is viewed on a mobile screen (`md:hidden`)
- **THEN** the "📅 Abrir Agenda Completa" button is visible and links to the Agenda page using Next.js `<Link>`

#### Scenario: Desktop hidden
- **WHEN** the dashboard is viewed on a desktop screen
- **THEN** the mobile Agenda button is hidden

#### Scenario: Agenda navigation
- **WHEN** the user clicks the "📅 Abrir Agenda Completa" button on mobile
- **THEN** the system navigates to `/dashboard/agenda` without a full page reload
