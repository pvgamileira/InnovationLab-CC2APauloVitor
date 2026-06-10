## Architecture

- **Page/Component**: `components/KanbanBoard.jsx` (for the gamification logic, toast sanitization, and UI filtering) and `app/dashboard/page.jsx` (if `moveTask` requires adjustments).
- **Scope**: Adjusting the math and state synchronization for XP penalties, wrapping all error toasts with string conversions, and implementing a date-based array filter for the "Concluídas" column rendering.

## DOM Structure & React Layout

### 1. Fix XP Subtraction (Infinite XP Glitch)
Inside `components/KanbanBoard.jsx`, locate the `handleMoveTaskWithGamification` function.
If a task was already completed (`wasAlreadyCompleted = task?.status === 'completed'`) and its `finalStatus` is NO LONGER `completed`:
```jsx
if (wasAlreadyCompleted && finalStatus !== 'completed') {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const currentXP = user.user_metadata?.xp || 0;
      const newXP = Math.max(0, currentXP - 50);
      const newLevel = Math.floor(newXP / 500) + 1;
      
      await supabase.auth.updateUser({
        data: { xp: newXP, level: newLevel }
      });
      
      await refreshUserData();
      // Optional: showToast("⚠️ XP Removido", "error");
    }
  } catch (err) {
    console.error("Erro ao remover XP:", err);
  }
}
```

### 2. Toast Crash Fixes
Audit the file for `showToast`. Ensure any variable passed from a `catch(err)` block explicitly references `err.message` or `String(err)`.
```jsx
// Incorrect
showToast(err, "error");

// Correct
showToast(`Erro: ${err.message || "Falha desconhecida"}`, "error");
```

### 3. Implement Visual Auto-Hide (Expiration)
Inside `components/KanbanBoard.jsx`, locate where `grouped` tasks are calculated (likely a `.reduce` over `STATUS_ORDER`).
Modify the filter logic specifically for the `completed` column to exclude expired tasks:

```jsx
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Normalize to start of today

  const grouped = STATUS_ORDER.reduce((acc, key) => {
    acc[key] = tasks.filter(t => {
      // 1. Check basic column assignment
      const belongsToCol = (t.status === key) || (key === 'pending' && !STATUS_ORDER.includes(t.status));
      if (!belongsToCol) return false;

      // 2. If it is in 'completed', apply auto-hide logic
      if (key === 'completed' && t.due_date) {
        const dueDate = new Date(t.due_date);
        dueDate.setHours(0, 0, 0, 0);
        // Hide if the due date is strictly before today
        if (dueDate < now) return false;
      }
      
      return true;
    });
    return acc;
  }, {});
```

## Constraints

- Pure JS/JSX. NO TypeScript.
- The auto-hide logic MUST only hide tasks from the UI. It must not trigger a database delete.
- Ensure all Date objects are handled safely (ignoring time-of-day offsets using `.setHours(0,0,0,0)`).
