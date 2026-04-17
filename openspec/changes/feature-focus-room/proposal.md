## Why

Academic success relies on a balance between task management and deep work execution. Having a Premium Focus Room (built-in Pomodoro timer) within the dashboard minimizes context switching. By allowing users to link a focus session directly to a pending academic task, the EduTrack AI platform transitions from a passive tracking tool to an active productivity environment. 

## What Changes

- Creation of `app/dashboard/foco/page.jsx` as an interactive Client Component.
- Introduction of `framer-motion` for complex UI responses (e.g., pulsating glassmorphism neon rings to signify active focus states).
- Implementation of an interval timer with tri-state logic: Pomodoro (25m), Short Break (5m), and Long Break (15m). 
- Addition of a Supabase data fetcher that retrieves uncompleted `academic_tasks` to feed a custom task selector dropdown.

## Capabilities

### New Capabilities
- `focus-room-timer`: An interval timer logic block capable of counting down predefined segments and handling play/pause/reset toggles.
- `task-focus-selector`: A custom interface allowing the user to assign their current timer session to a specific pending task loaded from the database.

### Modified Capabilities
- None. (Supabase tables for subjects and academic_tasks remain unaltered; data is read-only for this MVP).

## Impact

- **New Route**: Establishes `app/dashboard/foco/page.jsx`, which the user has already mapped to `/dashboard/layout.jsx` under the `Sala de Foco` menu.
- **Dependencies**: Leverages existing installs of `framer-motion` and `lucide-react`.
- **Constraints**: Follows the `#02040a` Rich Black theme without touching other pages.
