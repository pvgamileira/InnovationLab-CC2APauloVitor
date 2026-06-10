## ADDED Requirements

### Requirement: PDF Generation Cooldown
The system SHALL prevent rapid successive clicks on the PDF generation button by enforcing a 30-second cooldown period.

#### Scenario: User clicks to generate a PDF
- **WHEN** the user clicks the "Gerar Relatório (PDF)" button
- **THEN** the button is disabled immediately.
- **AND** the button text changes to reflect the countdown (e.g., "Aguarde Xs...").
- **AND** the button is re-enabled exactly after 30 seconds.

## REMOVED Requirements

### Requirement: Duplicated Premium Button
**Reason**: Clutters the Dashboard UI since there is already a primary contextual Premium button.
**Migration**: Removed from the UI entirely in `app/dashboard/page.jsx`.
