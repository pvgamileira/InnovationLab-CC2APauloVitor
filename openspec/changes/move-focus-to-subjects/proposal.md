## Why

To continue decluttering the sidebar, we want to remove the standalone "Foco" (Focus Room) link. Moving the entry point for the Focus feature directly into the Subject cards creates a more contextual, task-oriented workflow where users naturally launch a Pomodoro session directly tied to the subject they are studying.

## What Changes

- **Sidebar Navigation**: The "Foco" link will be completely removed from the sidebar menu in `app/dashboard/layout.jsx`.
- **Subject Cards**: A new "Timer/Play" button will be added to the floating action buttons area of each Subject card in `app/dashboard/disciplinas/page.jsx`.
- **Navigation Flow**: Clicking the new button will navigate the user to `/dashboard/foco`.
- **Logic Intact**: The underlying Focus page logic will not be modified in this change.

## Capabilities

### New Capabilities
- `subject-focus-entry`: The capability to access the focus room contextually from a Subject card.

### Modified Capabilities

## Impact

- **Affected code**: `app/dashboard/layout.jsx` and `app/dashboard/disciplinas/page.jsx`.
- **User Flow**: Users will no longer access the Focus mode from the global sidebar, but rather contextually from their Disciplinas dashboard.
