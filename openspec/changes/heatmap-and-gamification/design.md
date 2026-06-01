# Design: Implement GitHub-Style Heatmap and Gamification System

## Abordagem Técnica

### 1. Update User Profile Schema
- While a real backend update might involve migrations, for this phase we assume the `user_profiles` table (or equivalent) handles `xp` and `level` fields.
- On the frontend, we will query and update these fields via Supabase. If the table doesn't exist, we can store it in the `user_metadata` within Supabase Auth for simplicity, or simulate it. For this scope, updating `user_metadata.xp` via `supabase.auth.updateUser` is the most robust serverless approach without needing explicit DB migrations.

### 2. Gamification Logic (KanbanBoard.jsx)
- **Target:** `components/KanbanBoard.jsx`
- **Change:** Inside the `handleDragEnd` or status update function.
- **Logic:**
  - Check if the task was moved from a non-completed status to "completed".
  - If true, calculate new XP (+50). Calculate level logic (e.g., Level = `Math.floor(newXP / 500) + 1`).
  - Show an alert or toast: `"Você ganhou +50 XP!"`.
  - Update the user's `xp` and `level` in Supabase (either `user_metadata` or a `profiles` table).

### 3. Create Heatmap Component (ActivityHeatmap.jsx)
- **Target:** `components/ActivityHeatmap.jsx`
- **Logic:**
  - Fetch completed tasks for the authenticated user from the last 30 days (`academic_tasks` where `status === 'completed'`).
  - Generate an array representing the last 30 days.
  - Iterate through the days and count tasks whose `updated_at` (or `due_date`) matches the day.
- **UI:**
  - Use Tailwind Grid: `<div className="flex gap-1 flex-wrap">` or `<div className="grid grid-cols-7 gap-1">`.
  - Render small squares (`w-4 h-4 rounded-sm`).
  - Colors based on count:
    - 0 tasks: `bg-green-500/10`
    - 1 task: `bg-green-500/40`
    - 2 tasks: `bg-green-500/70`
    - 3+ tasks: `bg-green-500`
  - Add native HTML `title` attributes for tooltips (e.g., `title="12/04: 2 tarefas concluídas"`).

### 4. Update Dashboard UI
- **Target:** `app/dashboard/estatisticas/page.jsx` (and potentially the main Dashboard header).
- **Change:** 
  - Render `<ActivityHeatmap />` inside a new glassmorphism card (`bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6`).
  - Title the card: "Consistência Acadêmica".
  - Include an XP/Level badge in the Dashboard header (e.g., a small pill showing "🌟 Nível 3 (1250 XP)").

### 5. Constraints
- Pure JavaScript and Tailwind CSS.
- No external charting libraries for the Heatmap.
- Maintain dark glassmorphism styling.
