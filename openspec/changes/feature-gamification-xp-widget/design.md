## Context

The platform currently tracks `completedTasks` but lacks a visual reward system to encourage users to continue completing tasks. Gamification, specifically an XP and Level system, provides this immediate visual feedback. The UI requires a premium feel, utilizing strict dark mode (Rich Black) and neon accents, adhering to the project's design language. 

## Goals / Non-Goals

**Goals:**
- Calculate XP and Level dynamically based on existing `completedTasks` data.
- Display a visually appealing, premium glassmorphism progress bar on the Dashboard.
- Provide a smooth visual representation of progress to the next level.
- Ensure all copy is in Portuguese (pt-BR).

**Non-Goals:**
- Creating a separate backend table for XP or Levels (calculation is strictly derived from completed tasks for now).
- Implementing complex animations beyond simple progress bar fill or subtle hover effects.
- Changing routing or existing pages other than `app/dashboard/page.jsx`.
- Modifying PDF generation logic.

## Decisions

- **Logic**: XP will be calculated as `completedTasks * 50`. Level will be calculated as `Math.floor(totalXP / 500) + 1`. This provides a predictable scale where every 10 tasks increment the level.
- **UI Architecture**: The widget will be implemented as a new React component (e.g., `GamificationWidget`) and imported into `app/dashboard/page.jsx` to keep the main dashboard file clean.
- **Styling**: We will use Tailwind CSS with glassmorphism utilities (`bg-white/5`, `backdrop-blur-md`, `border-white/10`) to achieve the premium look over the Rich Black background. Neon blue/purple will be used for the progress bar fill and Lucide icons (e.g., `Trophy` or `Zap`).
- **Icons**: Lucide React is chosen as it aligns with modern React ecosystems and is likely already in use or easy to add. Let's use `Zap` for XP and `Trophy` for Levels.

## Risks / Trade-offs

- **Risk**: Formula might scale poorly if a user completes thousands of tasks (Level would be very high, progress bar might feel stagnant). 
  - **Mitigation**: The current linear formula (`Math.floor(totalXP / 500) + 1`) is sufficient for an MVP. Future iterations can introduce exponential leveling.
- **Risk**: `completedTasks` might not be immediately available on first render, leading to a flash of Level 1 / 0 XP.
  - **Mitigation**: Ensure null/loading checks or skeleton states are handled gracefully if the data is fetched asynchronously.
