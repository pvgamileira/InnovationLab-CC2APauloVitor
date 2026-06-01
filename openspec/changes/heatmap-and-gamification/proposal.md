# Proposta: Implement GitHub-Style Heatmap and Gamification System

## Contexto
EduTrack AI needs a unique differentiator to keep students engaged and motivated to complete their academic tasks consistently. Implementing a GitHub-style Activity Heatmap to track daily consistency alongside a gamification system (XP and Levels) will encourage continuous usage and reward productivity.

## Motivation
- Increase user retention and daily active engagement through positive reinforcement (XP/Levels).
- Provide a clear visual representation of a user's consistency over the last 30 days.
- Enhance the dashboard's "premium" and interactive feel without relying on heavy external libraries.

## Scope
- Add gamification logic to `components/KanbanBoard.jsx`: moving a task to "completed" grants +50 XP and shows a subtle toast/alert.
- Create a pure Tailwind CSS `ActivityHeatmap.jsx` component that maps the last 30 days of completed tasks to colored squares.
- Integrate the `ActivityHeatmap` into `app/dashboard/estatisticas/page.jsx` inside a new glassmorphism card titled "Consistência Acadêmica".
- Update the Dashboard header to display the user's current XP and Level.

## Success Criteria
- Moving a task to "completed" reliably triggers an XP gain and visual feedback.
- The `ActivityHeatmap` displays the last 30 days correctly, with dynamic opacity/colors based on daily completion volume (0, 1, 2, 3+ tasks).
- Tooltips display the exact date and number of completed tasks on hover.
- The Dashboard header displays a small XP/Level badge.
- The entire feature is built using pure JavaScript and Tailwind CSS, strictly adhering to the existing dark glassmorphism theme.
