## Context

The Focus Room (`/foco`) functions as a dedicated Zen zone for the student. The design mandate strictly points to a "large, elegant digital timer" enveloped by pulsating glassmorphism elements when active. The user must be able to select a pending task from Supabase. 

## Goals / Non-Goals

**Goals:**
- Deliver a premium timer UI utilizing `framer-motion` that visually responds to the "active" play state (pulsing neon background).
- Support standard Pomodoro values (25m, 5m, 15m) using React state.
- Render a highly stylized dropdown for selecting tasks fetched from Supabase where `status != 'completed'`.
- Define colors based on application states: `#3a86ff` (Neon Blue) for Focus/Work, and Emerald variations for Break times.
- Ensure strict localization (pt-BR).

**Non-Goals:**
- Backend synchronization of tracked times. (While the timer runs, we will not log the time back to the database in this MVP, though the foundation allows for it).
- Background notifications or Service Worker background running (out of scope for an Atomic Feature).

## Decisions

- **Timer State Management**: Use a simple `setInterval` wrapped in a `useEffect`. State variables `timeLeft` (in seconds) and `isActive` control the flow. We use `useRef` or just standard React cleanup to avoid memory leaks.
- **Animation Strategy**: We will use `framer-motion`'s `animate={{ boxShadow: ... }}` and `<motion.div>` on the timer's container. When `isActive` is true, an infinite loop animation will create the required breathing/pulsating neon glow.
- **Task Selector UI**: HTML `<select>` is notoriously difficult to style perfectly with Glassmorphism. We will build a custom headless-style dropdown using standard `div`s and toggle state, fetching only `academic_tasks`.

## Risks / Trade-offs

- **Risk**: Javascript's `setInterval` drifts over time or pauses when the browser tab is heavily throttled in the background.
  *Mitigation*: For a basic MVP Pomodoro, this acceptable. If extreme precision is needed later, we store an `endTime = Date.now() + 25m` and diff it inside a `requestAnimationFrame`. For now, `setInterval(..., 1000)` subtracting 1 is sufficient for the requested scope.
