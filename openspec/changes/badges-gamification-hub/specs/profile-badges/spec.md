## ADDED Requirements

### Requirement: Display Minhas Conquistas in Profile
The system SHALL render a static "Minhas Conquistas" grid section in the Profile page containing predefined badges.

#### Scenario: User views Profile page
- **WHEN** the user navigates to the Profile page
- **THEN** they see the "Minhas Conquistas" section containing a grid of badge cards

### Requirement: Differentiate Badge States
The system SHALL visually distinguish between unlocked and locked badges.

#### Scenario: Badge is unlocked
- **WHEN** a badge's `unlocked` property is true
- **THEN** it renders with its specific color glow, background, border, and main icon

#### Scenario: Badge is locked
- **WHEN** a badge's `unlocked` property is false
- **THEN** it renders in grayscale with 50% opacity, a neutral background, and an additional or alternative Lock icon
