## MODIFIED Requirements

### Requirement: Persistent Global Toasts during Navigation
The system SHALL display global toasts that persist across navigation within the dashboard layout without disappearing prematurely due to full page reloads.

#### Scenario: User navigates while a toast is active
- **WHEN** user clicks on a navigation link in the sidebar
- **THEN** the application performs client-side routing using Next.js Link
- **THEN** any currently active global toasts remain visible until their timer expires
