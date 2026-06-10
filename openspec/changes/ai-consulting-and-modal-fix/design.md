# Design: AI Consulting Tab and Modal Hotfix

## 1. Deletion Modal/State Fix
- **File:** `app/dashboard/disciplinas/page.jsx`
- **Location:** `handleDeleteSubject` function.
- **Change:** After a successful Supabase deletion (`await supabase.from('subjects').delete().eq('id', subjectId)`), update the `subjects` state immediately: `setSubjects(prev => prev.filter(s => s.id !== subjectId));` and forcefully close any modals: `setIsEditModalOpen(false);` and `setIsDraggingSubject(false);`. Add an OpenSpec code comment explaining the state cleanup.

## 2. Consultoria IA Panel
- **File:** `app/dashboard/estatisticas/page.jsx`
- **Location:** `EstatisticasPage` active tab `ia`.
- **Change:**
  - Import `useUserContext` from `@/context/UserContext` to access `userData.xp`.
  - Fetch user's tasks via `supabase` on mount to calculate accurate backlog data.
  - Calculate **Backlog Burn Down**: `completed_tasks` vs `pending_tasks`.
  - Render a **Terminal de Insights**: A component styled with `bg-black/40 font-mono border border-white/5 p-4 rounded-lg`.
  - Implement **Heuristic Logic**:
    - If `xp < 100` or pending tasks > completed tasks: Show a warning `[SISTEMA NERVOSO CENTRAL]: Detetada sobrecarga cognitiva potencial... Recomendação: Ativar Overclock de Foco no Pomodoro para mitigar dívida técnica.`
    - Else: Show healthy status `[SISTEMA NERVOSO CENTRAL]: Cadência operacional otimizada.`
  - Add an OpenSpec code comment documenting the context mapping.

## Constraints
- Pure JS/JSX. NO TypeScript.
- No external APIs, rely purely on local heuristic state.
- Use only existing system theme classes (`bg-black/40`, etc).
