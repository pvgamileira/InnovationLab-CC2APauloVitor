## 1. Fix Infinite XP Exploit
- [x] 1.1 Open `components/KanbanBoard.jsx`.
- [x] 1.2 Locate the `handleMoveTaskWithGamification` function.
- [x] 1.3 Add a new block checking `if (wasAlreadyCompleted && finalStatus !== 'completed')`.
- [x] 1.4 Inside this block, fetch the user, calculate the penalty (`Math.max(0, currentXP - 50)`), update Supabase, and call `await refreshUserData()`.

## 2. Sanitize Error Toasts
- [x] 2.1 Audit all `showToast` calls inside `components/KanbanBoard.jsx` (specifically inside `useEffect` and `catch` blocks).
- [x] 2.2 Ensure no raw error objects are passed. Use `err.message` or template literals for all error toasts.

## 3. Implement Visual Auto-Hide (Expiration)
- [x] 3.1 Locate the `grouped` logic inside `components/KanbanBoard.jsx`.
- [x] 3.2 Add a `const now = new Date(); now.setHours(0,0,0,0);` before the `.reduce` function.
- [x] 3.3 Modify the `.filter` inside the `.reduce` to explicitly return `false` if `key === 'completed'`, the task has a `due_date`, and the normalized due date is strictly `< now`.
