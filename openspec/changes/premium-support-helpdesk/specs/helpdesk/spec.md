## ADDED Requirements

### Requirement: Support/Helpdesk Page
The system SHALL provide a `/dashboard/suporte` page accessible to users, featuring a FAQ section and a ticket submission form.

#### Scenario: Submitting a Support Ticket
- **WHEN** the user selects a Category, enters a Subject and Description, and clicks Submit
- **THEN** the system simulates a submission with a 1.5-second delay, shows a success Toast notification, clears the form, and resets the submitting state.
