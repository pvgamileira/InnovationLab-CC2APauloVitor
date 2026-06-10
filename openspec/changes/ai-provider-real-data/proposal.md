## Why

The current `GlobalStatusBar` has static, non-functional text on the right side ("UTF-8 | JS/JSX") which wastes valuable screen real estate. The AI context (`AiProvider`) currently uses a fake timer to simulate a scan. To evolve the "Alive AI" architecture, we must connect the AI to the user's real context—specifically their Kanban tasks—and allow the status bar to expand across the full width to display dynamic, actionable insights based on whether the user is falling behind or keeping up.

## What Changes

1. **Clean Status Bar UI**: In `components/GlobalStatusBar.jsx`, we will completely remove the right-side `div` containing the static IDE tech jargon. The left side (icon + text) will take up the full width, utilizing `truncate max-w-full` to ensure long AI messages are handled gracefully.
2. **Connect Data**: In `contexts/AiContext.jsx`, we will import `useUserContext` to access the global state, extracting the `tarefas` array.
3. **Dynamic Diagnostic Logic**: We will replace the dummy `setTimeout` logic in `AiContext` with a reactive `useEffect` that listens to `tarefas`. 
   - The AI will calculate the number of active tasks ("A Fazer" or "Em Progresso") that are due today or strictly overdue.
   - If `overdueTasksCount > 0`, it alerts the user (`warning`).
   - If there are active tasks but none are overdue, it encourages the user (`online`).
   - If there are no active tasks at all, it congratulates the user (`online`).
4. **Robust Graceful Degradation**: If `tarefas` is undefined or fails to load, the system will fall back to an `offline` state, keeping the application stable.

## Capabilities

### Modified Capabilities
- `ide-status-bar`: Transformed from a static mockup to a dynamic, full-width insight banner.
- `ambient-ai-context`: Now actively monitors and reacts to the real state of the user's Kanban board.

## Impact

- **Affected code**: `components/GlobalStatusBar.jsx`, `contexts/AiContext.jsx`.
- **User Experience**: The status bar immediately becomes useful. As the user drags tasks on the Kanban board or dates pass, the AI will update its insight dynamically, alerting them to pressing deadlines or praising their clean backlog.
