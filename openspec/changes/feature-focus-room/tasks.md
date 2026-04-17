## 1. Page Scaffolding & Data Setup

- [x] 1.1 Create the directory `app/dashboard/foco` and define `page.jsx` with `"use client"`.
- [x] 1.2 Implement the Supabase data fetching sequence via `useEffect` to retrieve active `academic_tasks` using `.neq('status', 'completed')`.
- [x] 1.3 Create state variables for the timer logic: `timeLeft` (seconds), `isActive` (boolean), AND `currentMode` ('work', 'shortBreak', 'longBreak').

## 2. Custom Task Dropdown

- [x] 2.1 Build a highly styled custom dropdown to replace standard `<select>`, utilizing `isOpen` state and clicking outside logic if necessary (or a simpler togglable list).
- [x] 2.2 The dropdown must map over the fetched tasks. When a task is selected, apply its title to the active state.
- [x] 2.3 Style the dropdown with Rich Black / Glassmorphism conventions: `bg-[#0a0c14]/80 backdrop-blur border border-white/10`. 

## 3. Core Timer Logic & Animation

- [x] 3.1 Implement a `useEffect` that triggers `setInterval` when `isActive` is true, decrementing `timeLeft` every 1000ms. Handle reaching 0 (auto-clear interval, play a logic or sound if applicable - just stop for MVP).
- [x] 3.2 Design the large digital timer display, formatting the `timeLeft` integer into a sleek `MM:SS` string using a monospaced font or tabular numbers.
- [x] 3.3 Import `framer-motion` and wrap the central timer container in `<motion.div>`. Apply an `animate` prop that listens to `isActive` and pulses the `boxShadow` or `borderColor` gently. 

## 4. Controls & Visual Polish

- [x] 4.1 Build the control dock: Play, Pause, and Reset buttons utilizing `lucide-react` icons (Play, Pause, RotateCcw).
- [x] 4.2 Build the mode selection pills (Pomodoro, Pausa Curta, Pausa Longa) spanning the top of the timer.
- [x] 4.3 Ensure the active theme color dynamically updates: `#3a86ff` for work/Pomodoro mode and an Emerald hue (e.g. `text-emerald-400 / border-emerald-500/20`) for break blocks. 
