## Why

To increase user engagement and retention by introducing a gamification system. By rewarding users with XP and levels based on their completed tasks, we provide immediate visual feedback on their progress, making the platform more motivating to use. 

## What Changes

- Add a new Gamification XP Widget at the top of the Dashboard.
- Calculate total XP using the formula: `completedTasks * 50`.
- Calculate current Level using the formula: `Math.floor(totalXP / 500) + 1`.
- Implement a premium glassmorphism progress bar indicating progress to the next level.
- Use Lucide React icons (e.g., Trophy or Zap) and neon blue/purple accents against the Rich Black theme.
- All text must be in Portuguese (pt-BR).
- No changes to routing, other pages, or PDF logic.

## Capabilities

### New Capabilities
- `gamification-xp-widget`: Renders a top-level widget on the dashboard that tracks user XP and Level based on task completion, using premium glassmorphism UI.

### Modified Capabilities


## Impact

- `app/dashboard/page.jsx` (or the equivalent dashboard file): Will be modified to include the new widget component.
- Visual elements using modern, strict dark mode guidelines (Rich Black, Metallic Blue).
- No impact on existing backend, routing, or PDF generation logic.
