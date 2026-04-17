## ADDED Requirements

### Requirement: Interactive Calendar Grid
The system SHALL provide a monthly calendar interface at `app/dashboard/agenda/page.jsx`, rendering accurate weeks and days for a given focal month. 

#### Scenario: Displaying the Current Month
- **WHEN** the user navigates to `/dashboard/agenda`
- **THEN** the calendar initializes showing the current month and year.
- **AND** the days of the week headers (Dom, Seg, Ter...) are in Portuguese.

#### Scenario: Navigating Months
- **WHEN** the user clicks the "Mês Anterior" (Previous) or "Próximo Mês" (Next) buttons
- **THEN** the grid instantly updates to reflect the accurate calendar structure of the requested month.

---

### Requirement: Task Mapping
Academic tasks possessing a `due_date` SHALL be visibly mapped onto the exact calendar cell matching that date.

#### Scenario: Day with Tasks
- **WHEN** a specific day on the calendar has one or more tasks associated with it
- **THEN** the calendar cell renders a sleek, neon-accented badge/indicator containing the task's title.
- **AND** the badge color or icon indicates its status (e.g., completed or pending).

#### Scenario: Day without Tasks
- **WHEN** a day possesses no tasks
- **THEN** the cell appears empty, maintaining its glassmorphism style and responding seamlessly to hover states.

---

### Requirement: Rich Black Theming Integration
The feature SHALL strictly match the overarching design system.

#### Scenario: Hovering over cells
- **WHEN** the user hovers their cursor over a valid calendar cell
- **THEN** it reacts with a subtle `bg-white/10` or neon highlight transition, emphasizing interactivity against the `#02040a` background.
