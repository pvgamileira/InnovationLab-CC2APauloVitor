# Design: Hotfix ActivityHeatmap Database Query

## Abordagem Técnica

### 1. Update Database Query
- **Target:** `components/ActivityHeatmap.jsx`
- **Change:** Locate the Supabase fetch call inside the `fetchHeatmapData` function.
- **Logic:**
  - Change `.select('updated_at')` to `.select('created_at')`.
  - Change `.gte('updated_at', thirtyDaysAgo.toISOString())` to `.gte('created_at', thirtyDaysAgo.toISOString())`.
  - In the Javascript iteration (`tasks.forEach(task => ...)`), change `task.updated_at` to `task.created_at`.

### 2. Constraints
- Pure JavaScript and Tailwind CSS.
- Strictly do not modify any other UI logic, styling, or the gamification logic.
- Maintain existing imports and state structure.
