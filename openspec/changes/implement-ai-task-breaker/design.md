# Design: Implement AI Task Breaker

## Component: API Route
**File**: `app/api/gemini-task-breaker/route.js`
- Must include `export const dynamic = 'force-dynamic';`.
- Authenticate via Supabase Authorization header (`createClient` passing the header).
- Extract `taskTitle` from `await request.json()`.
- Validate environment variable `GEMINI_API_KEY`.
- Initialize `GoogleGenerativeAI` with model `gemini-2.5-flash`.
- Use the Prompt: "Você é um mentor de produtividade. Quebre a tarefa acadêmica '[taskTitle]' em 3 ou 4 subtarefas curtas e diretas. Retorne EXATAMENTE um array JSON válido de strings, sem blocos de código markdown ao redor. Exemplo: [\"Fazer pesquisa\", \"Escrever introdução\", \"Revisar texto\"]".
- Parse the result string as JSON array.
- Return `{ subtasks: [...] }` as JSON (status 200).

## Component: Dashboard Page
**File**: `app/dashboard/page.jsx`
- Add async function `breakDownTask(task)`.
- Set a global or localized loading state (since `KanbanBoard` will need to reflect it, maybe set `breakingTaskId` in state to show a loader on the specific task).
- Make a `POST` request to `/api/gemini-task-breaker` with `{ taskTitle: task.title }`.
- For each returned subtask string, perform a Supabase `insert` into `academic_tasks`, carrying over `user_id`, `subject_id`, `due_date`, and setting `status: 'pending'`.
- Perform a Supabase `delete` on the original task by `task.id`.
- Call `refetchData()` to refresh the dashboard.
- Pass `breakDownTask` and `breakingTaskId` as props to `<KanbanBoard />`.

## Component: Kanban Board & TaskCard
**File**: `components/KanbanBoard.jsx`
- Destructure `breakDownTask` and `breakingTaskId` from props in `<KanbanBoard />` and pass them down through `<KanbanColumn />` to `<TaskCard />`.
- In `TaskCard`, import `Wand2` from `lucide-react`.
- Add a new button in the `.border-t.border-white/5` controls section.
- Render the button ONLY if `task.status === 'pending'`.
- Styling: `p-1 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-400/20 transition-all`.
- `onClick={() => breakDownTask(task)}`.
