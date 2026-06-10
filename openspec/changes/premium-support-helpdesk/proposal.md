## Why

As we enter Phase 2 (New Features), users need a centralized place to ask for help, report bugs, or submit feedback. Creating a Support/Helpdesk page improves the user experience by giving them a direct line to support without leaving the application.

## What Changes

- **Helpdesk Page Creation**: Build `app/dashboard/suporte/page.jsx` as a new Client Component.
- **Form State & UI Layout**: Implement a two-column layout on large screens featuring a static FAQ section on the left and a ticket submission form on the right.
- **Form Mechanics**: Include a Category selector, Subject input, and Description textarea. Add an artificial delay upon submission to simulate network activity, culminating in a success Toast notification.

## Capabilities

### New Capabilities
- `helpdesk`: Provides a UI for users to submit support tickets and consult static FAQs.

### Modified Capabilities

## Impact

- **Affected code**: New file at `app/dashboard/suporte/page.jsx`.
- **User Experience**: Users can now access the Support page to solve queries and send messages to the development team directly from their dashboard.
