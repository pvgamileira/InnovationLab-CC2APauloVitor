## ADDED Requirements

### Requirement: XP HUD Bar component
The system SHALL provide a `XpHudBar` component that accepts a single `completedTasks` prop (number, defaults to 0) and renders the user's XP Level and progress in a compact, header-embeddable format.

#### Scenario: Zero completedTasks
- **WHEN** `completedTasks` is `0`
- **THEN** the bar renders "Lv. 1", "0/500 XP", and a 0% filled progress bar

#### Scenario: Mid-level progress
- **WHEN** `completedTasks` is `6`
- **THEN** the bar renders "Lv. 1", "300/500 XP", and a 60%-filled progress bar

#### Scenario: Level threshold crossed
- **WHEN** `completedTasks` is `10`
- **THEN** the bar renders "Lv. 2", "0/500 XP", and a 0%-filled progress bar (progress resets each level)

---

### Requirement: Minimal progress bar styling
The progress bar track SHALL be `h-1.5` (6px) maximum, with a neon-glowing gradient fill using blue-to-purple colors, rendered against the Rich Black theme.

#### Scenario: Visual bar renders
- **WHEN** `XpHudBar` is mounted
- **THEN** a thin horizontal bar is visible with a glowing blue/purple fill proportional to the current level progress

---

### Requirement: Header integration
The `XpHudBar` SHALL be placed inside the dashboard header's right-aligned action area. It SHALL be hidden on small screens (`hidden sm:flex`) and visible from `sm` breakpoint upward.

#### Scenario: Hidden on small screens
- **WHEN** the viewport is narrower than the `sm` breakpoint
- **THEN** `XpHudBar` is not visible (display: none)

#### Scenario: Visible on desktop
- **WHEN** the viewport is `sm` or wider
- **THEN** `XpHudBar` is visible between the page header title and the action buttons

---

### Requirement: Old GamificationWidget block removed
The large `GamificationWidget` block and its import SHALL be removed from `app/dashboard/page.jsx`, freeing the layout space between the header and KPI cards.

#### Scenario: Dashboard renders without old widget
- **WHEN** the dashboard page loads
- **THEN** there is no `GamificationWidget` element rendered and no `mb-10` gap block between the header and KPI cards
