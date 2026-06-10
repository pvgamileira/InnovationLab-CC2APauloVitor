## 1. Fix Global Navigation Routing

- [x] 1.1 Open `app/dashboard/layout.jsx` and import `Link` from `next/link`.
- [x] 1.2 Replace all native HTML `<a>` tags with Next.js `<Link>` components in the sidebar/navigation to prevent full page reloads and preserve global toast state.

## 2. Implement Gamification Toasts in Disciplinas

- [x] 2.1 Open `app/dashboard/disciplinas/page.jsx` and locate the `onDragEnd` function.
- [x] 2.2 Immediately after the `supabase.from('academic_tasks').update()` call, inject logic to check if `task.status === 'completed'`.
- [x] 2.3 If true, retrieve the user's current XP from `user.user_metadata.xp` (or default to 0), add 50 XP, and calculate the new level (Math.floor(newXP / 100) + 1).
- [x] 2.4 Update the user metadata via `supabase.auth.updateUser` with the new XP and Level.
- [x] 2.5 Fire the global toast: `showToast("🎉 Você ganhou +50 XP!", "success")` inside the same completion block.

## 3. Implement Smart Alerts in Disciplinas

- [x] 3.1 Open `app/dashboard/disciplinas/page.jsx` and add a `useEffect` hook dependent on `[tasks]`.
- [x] 3.2 Inside the `useEffect`, check if there are any overdue tasks or tasks due within 24 hours (copying the logic from `KanbanBoard.jsx`).
- [x] 3.3 Fire a `showToast` alert for the first matching overdue or upcoming task (e.g. `showToast(\`⚠️ A tarefa "\${...}" está atrasada!\`, "error")`).
