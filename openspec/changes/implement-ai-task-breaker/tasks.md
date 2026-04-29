# Tasks: Implement AI Task Breaker

## 1. Create API Route
- [x] Create `app/api/gemini-task-breaker/route.js`.
- [x] Implement Supabase auth header validation.
- [x] Call `gemini-2.5-flash` with the specified JSON-array prompt.
- [x] Parse text into JSON array and return it.

## 2. Implement Logic in Dashboard
- [x] Open `app/dashboard/page.jsx`.
- [x] Add `breakingTaskId` state to track loading per task.
- [x] Implement `breakDownTask(task)` function:
  - [x] Set `breakingTaskId` and fetch subtasks from API.
  - [x] Map and insert new subtasks into Supabase.
  - [x] Delete original task from Supabase.
  - [x] Call `refetchData()` and clear `breakingTaskId`.
- [x] Pass `breakDownTask` and `breakingTaskId` props to `<KanbanBoard />`.

## 3. Update Kanban Board UI
- [x] Open `components/KanbanBoard.jsx`.
- [x] Pass `breakDownTask` and `breakingTaskId` through `KanbanBoard` -> `KanbanColumn` -> `TaskCard`.
- [x] Import `Wand2` from `lucide-react`.
- [x] Render the magic wand button in the card controls for pending tasks.
- [x] Show a loading spinner (`Loader2`) if this task is currently breaking down.
- [x] Bind `onClick` to trigger `breakDownTask(task)`.
