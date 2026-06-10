## Why

The application currently has a few isolated bugs that negatively impact user experience. First, timezone offsets cause the Agenda to display due dates incorrectly (e.g., saving a task on the 30th displays it as the 29th). Second, the Agenda is hidden on mobile devices due to CSS classes. Third, users can spam the PDF generation button, requiring a cooldown mechanism. Finally, the main Dashboard UI features a redundant Premium upgrade button that clutters the interface. Addressing these ensures a polished, bug-free user experience without introducing regressions.

## What Changes

- Adjust how task due dates are parsed or saved in the Agenda to correctly account for local timezone offsets.
- Remove hidden `md:block` (or similar) Tailwind classes from the Agenda container to ensure mobile visibility.
- Implement a 30-second cooldown state (`pdfCooldown`) for the PDF generation button, displaying a countdown text while active.
- Remove the duplicated "Vire Premium" button in `app/dashboard/page.jsx`, keeping only the contextual main button.

## Capabilities

### New Capabilities
- `agenda-fixes`: Bug fixes related to the Agenda's timezone handling and mobile layout visibility.
- `dashboard-ui-fixes`: Clean up redundant Premium buttons and add cooldowns to PDF generation to prevent spam.

### Modified Capabilities

## Impact

- `app/dashboard/agenda/page.jsx` (or wherever Agenda due dates and layout are handled) will be modified for timezone parsing and mobile CSS.
- The PDF generation component (likely in the dashboard or statistics) will be updated with a new React hook state.
- `app/dashboard/page.jsx` will be modified to remove redundant UI elements.
- No other components or the core Kanban logic will be affected.
