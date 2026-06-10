## ADDED Requirements

### Requirement: Support Helpdesk Button Navigation
The system SHALL provide a mechanism in the Settings/Profile area to navigate to the Support Helpdesk page without using the main Sidebar navigation.

#### Scenario: User clicks the Support Button
- **WHEN** the user is on the Settings or Profile page and clicks "Abrir chamado de suporte"
- **THEN** the system navigates the user to `/dashboard/suporte`

### Requirement: Support Helpdesk Form Submission
The system SHALL provide a ticket submission form on the Support Helpdesk page.

#### Scenario: User submits a ticket
- **WHEN** the user selects a Category, enters a Subject and Description, and clicks Submit
- **THEN** the system prevents default form submission, simulates a 1-second delay, shows a success toast message, and clears the form.
