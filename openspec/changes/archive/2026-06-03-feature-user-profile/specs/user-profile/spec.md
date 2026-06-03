## ADDED Requirements

### Requirement: Premium RPG-style Profile Header
The system SHALL surface a dense, glassmorphism header card representing the core identity of the user.

#### Scenario: Viewing Profile Identity
- **WHEN** the user navigates to `/dashboard/perfil`
- **THEN** a header card renders presenting the name "Paulo Vitor".
- **AND** the role "Analista de Suporte de TI" and education details "Ciência da Computação - 2º Semestre (Noturno) na Faculdade Impacta" are clearly displayed.

---

### Requirement: Gamification Meta-Stats
The system SHALL present a visually distinct progress/status section summarizing the user's gamified performance.

#### Scenario: Viewing XP and Level
- **WHEN** the user observes the gamification sector
- **THEN** a bold "Level 12" aesthetic is visible alongside an XP progress bar containing a neon blue (`#3a86ff`) dynamic fill.
- **AND** a stats grid accompanies it, detailing "Total Tasks Completed" and "Study Hours" using clean icons.

---

### Requirement: Staggered Entrance Animations
The system SHALL utilize `framer-motion` to construct an immersive experience upon arriving at the route.

#### Scenario: Page Load Render sequence
- **WHEN** the route successfully mounts
- **THEN** the elements do not flash onto the screen simultaneously.
- **AND** the elements slide up and fade in sequentially (e.g., Header -> XP Bar -> Stats Grid), generating a sense of high-fidelity interaction.
