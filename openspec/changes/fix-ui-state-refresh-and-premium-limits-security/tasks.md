## 1. Fix Create Subject Handler

- [x] 1.1 In `app/dashboard/page.jsx`, open `handleCreateSubject`. At the VERY TOP of the function, add: `if (!isPremium && subjects.length >= 3) { showToast("Limite de 3 disciplinas atingido. Faça upgrade para o Pro.", "error"); return; }`
- [x] 1.2 In `handleCreateSubject`, right after `if (error) throw error;`, add: `await refetchData(session.user.id);`

## 2. Fix Create Task Handler

- [x] 2.1 In `app/dashboard/page.jsx`, open `handleCreateTask`. At the VERY TOP of the function, add: `if (!isPremium && currentMonthTasksCount >= 20) { showToast("Limite de 20 tarefas atingido. Faça upgrade para o Pro.", "error"); return; }`
- [x] 2.2 In `handleCreateTask`, right after `if (error) throw error;`, add: `await refetchData(session.user.id);`

## 3. Verify Modal Buttons Logic

- [x] 3.1 Verify the Subject modal submit button has exactly `disabled={submitting || (!isPremium && subjects.length >= 3)}` and the ternary correctly reads `(!isPremium && subjects.length >= 3) ? "Limite de 3 atingido - Faça Upgrade" : "Confirmar Criação"`.
- [x] 3.2 Verify the Task modal submit buttons have exactly `disabled={!isPremium && currentMonthTasksCount >= 20}`.
