## ADDED Requirements

### Requirement: Mobile Quick Actions Dashboard
The system SHALL provide a section of quick-access buttons on the mobile Dashboard for secondary features omitted from the bottom nav.

#### Scenario: Mobile dashboard rendering
- **WHEN** the user is viewing the Dashboard on a mobile device (`md:hidden` breakpoint)
- **THEN** a block containing "Agenda" and "Foco" buttons is rendered below the header

#### Scenario: Desktop dashboard rendering
- **WHEN** the user is viewing the Dashboard on a desktop device (`md:block` breakpoint)
- **THEN** the quick-access block is NOT rendered
