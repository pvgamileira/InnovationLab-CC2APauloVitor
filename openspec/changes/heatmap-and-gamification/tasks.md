# Tarefas: Implement GitHub-Style Heatmap and Gamification System

- [x] **Gamification Logic in Kanban**
  - [x] Open `components/KanbanBoard.jsx`.
  - [x] Locate the task status update logic (e.g., `handleDragEnd` or `updateTaskStatus`).
  - [x] Add a condition to check if the new status is "completed".
  - [x] If moved to "completed", grant +50 XP (save to `user_metadata` via `supabase.auth.updateUser` or your specific profile table).
  - [x] Trigger an `alert("Você ganhou +50 XP!")` or a custom toast notification.

- [x] **Create ActivityHeatmap Component**
  - [x] Create a new file `components/ActivityHeatmap.jsx`.
  - [x] Fetch completed tasks from `academic_tasks` over the last 30 days.
  - [x] Generate an array of the last 30 dates.
  - [x] Map the dates to a Tailwind grid (`grid grid-cols-7 gap-1` or similar flex layout).
  - [x] Apply dynamic opacity classes based on daily task count (0 = 10%, 1 = 40%, 2 = 70%, 3+ = 100% green).
  - [x] Add `title` attributes to each square for native tooltips showing the date and task count.

- [x] **Update Dashboard & Statistics Pages**
  - [x] Open `app/dashboard/estatisticas/page.jsx`.
  - [x] Import and render the `<ActivityHeatmap />` component within a new glassmorphism card (`bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6`).
  - [x] Add the title "Consistência Acadêmica" to the card.
  - [x] Locate the main Dashboard header (either in `page.jsx` or a layout file).
  - [x] Fetch and display the user's current XP and Level as a small badge in the header.
