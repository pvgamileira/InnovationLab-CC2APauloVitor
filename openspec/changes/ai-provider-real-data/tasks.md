## 1. Clean the Status Bar UI
- [x] 1.1 Open `components/GlobalStatusBar.jsx`.
- [x] 1.2 Remove the right-side static `<div className="flex items-center gap-4 text-gray-500">` block.
- [x] 1.3 Update the left-side text container. Add `truncate block max-w-full` to the `span`. Set `w-full` on the flex container so it occupies the entire bar, allowing truncation to work properly. Ensure the `icon` is wrapped in a `shrink-0` div.

## 2. Connect AiContext to Real Data
- [x] 2.1 Open `contexts/AiContext.jsx`.
- [x] 2.2 Import `useUserContext` from `@/context/UserContext`.
- [x] 2.3 Inside `AiProvider`, call `const { userData } = useUserContext();` and extract `userData?.tarefas`.
- [x] 2.4 Update the `useEffect` dependency array to `[userData]`.

## 3. Implement Dynamic Diagnostic Logic
- [x] 3.1 Replace the existing `try/catch` and `setTimeout` block inside the `useEffect`.
- [x] 3.2 Add the fallback: if `!userData?.tarefas`, gracefully degrade to 'offline' and return.
- [x] 3.3 Create date logic: `const now = new Date(); now.setHours(0,0,0,0);`.
- [x] 3.4 Filter for `activeTasks` (status not 'completed').
- [x] 3.5 Calculate `overdueTasksCount` by checking `due_date <= now`.
- [x] 3.6 Update `setAiStatus` and `setGlobalInsight` dynamically based on the three conditions: `overdueTasksCount > 0`, `activeTasks.length > 0` but none overdue, and no active tasks.
