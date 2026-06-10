## Architecture

- **Modals/Inputs**: Any component rendering an `<input type="date">`. Primary targets: `components/NovaDisciplinaModal.jsx`, `components/NovaTarefaModal.jsx` (or similarly named components).
- **Kanban Logic**: `components/KanbanBoard.jsx` (specifically the `onDragEnd` or equivalent drop handler function).

## DOM Structure & React Layout

### 1. Date Input Boundaries
For every date input found in the target files, modify the element to include strict boundaries:
```jsx
<input
  type="date"
  min="2026-01-01"
  max="2030-12-31"
  required
  // ... existing props (value, onChange, className, etc.)
/>
```

### 2. Kanban Drag Crash Recovery
Inside `components/KanbanBoard.jsx`, locate the function handling the drop event (likely where the Supabase update happens). Restructure the logic with a strict try/catch block.

```javascript
// Inside the drag end handler (pseudocode architecture)

// 1. Calculate safe XP if moving out of 'Concluídas'
let newXp = currentXp;
if (sourceColumn === 'concluidas' && destinationColumn !== 'concluidas') {
  // Prevent NaN or negative XP
  newXp = Math.max(0, (userData?.xp || 0) - taskXpReward);
}

try {
  // 2. Perform local state mutation optimistically (or right after Supabase call)
  
  // 3. Await Supabase update
  const { error } = await supabase.from('tarefas').update({...}).eq('id', taskId);
  if (error) throw error;
  
  // 4. Update user XP via Supabase if necessary
  
  // 5. Refresh context safely
  if (typeof refreshUserData === 'function') {
    await refreshUserData();
  }
} catch (err) {
  console.error("Error moving task:", err);
  // 6. Revert state safely to previous columns
  setColumns(originalColumnsSnapshot);
  // 7. Trigger user feedback
  toast.error("Erro ao mover a tarefa. Tente novamente.");
}
```

## Constraints

- Pure JS/JSX. NO TypeScript.
- Do NOT alter the visual layout or CSS of the Kanban board.
- Rely solely on native HTML5 validation for the date inputs (`min`, `max`, `required`).
- Ensure `toast` is imported if not already present in the Kanban component.
