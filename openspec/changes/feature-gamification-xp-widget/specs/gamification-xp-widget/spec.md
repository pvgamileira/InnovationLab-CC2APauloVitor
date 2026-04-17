## ADDED Requirements

### Requirement: Calculate and Display User Gamification Stats
The system SHALL calculate the user's Total XP and Current Level based on their `completedTasks` metric and display this information prominently on the dashboard.

#### Scenario: User has 0 completed tasks
- **WHEN** a user with 0 completed tasks views the dashboard
- **THEN** the Gamification Widget displays "0 XP" and "Nível 1"

#### Scenario: User has multiple completed tasks
- **WHEN** a user with 12 completed tasks views the dashboard
- **THEN** the Gamification Widget displays "600 XP" (12 * 50) and "Nível 2" (Math.floor(600 / 500) + 1)

### Requirement: Render Premium Progress Bar 
The system SHALL render a visual progress bar indicating how close the user is to the next level, styled with premium glassmorphism and neon accents.

#### Scenario: Progress to next level
- **WHEN** a user is at Nível 1 with 200 XP
- **THEN** the progress bar indicates 40% completion towards Nível 2 (target is 500 XP)

#### Scenario: Level up threshold reached
- **WHEN** a user reaches exactly 500 XP
- **THEN** the progress bar resets visually for the current level progress (0% of the way to 1000 XP) and the Level display increments to Nível 2.

### Requirement: Localized Text in pt-BR
The widget SHALL utilize Portuguese (pt-BR) for all user-facing text, without exception.

#### Scenario: Verify language
- **WHEN** the Gamification Widget renders
- **THEN** all text such as "Nível", "XP", and any associated labels are in Portuguese.
