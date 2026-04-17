## ADDED Requirements

### Requirement: Immersive Pomodoro Timer
The application SHALL provide a timer interface at `app/dashboard/foco/page.jsx` with three preset modalities.

#### Scenario: Switching Timer Modes
- **WHEN** the user selects "Foco", "Pausa Curta", or "Pausa Longa"
- **THEN** the timer resets to 25:00, 05:00, or 15:00 respectively.
- **AND** the overarching thematic accent colors switch between Neon Blue (Foco) and Emerald (Pausas).

#### Scenario: Timer Activation
- **WHEN** the user clicks "Iniciar" (Play)
- **THEN** the countdown begins.
- **AND** the timer's glassmorphism container utilizes `framer-motion` to emit a subtle, continuous pulsating glow.

---

### Requirement: Task Context Integration
The user SHALL be able to contextualize their focus session by selecting an active task.

#### Scenario: Fetching and Selecting a Task
- **WHEN** the focus page loads
- **THEN** a `useEffect` fetches uncompleted `academic_tasks`.
- **AND** the user can open a sleek, custom-styled dropdown to select the task they will be working on during the current Pomodoro cycle.
