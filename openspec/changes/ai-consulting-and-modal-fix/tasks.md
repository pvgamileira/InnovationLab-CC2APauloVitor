# Tasks: AI Consulting & Modal Hotfix

## 1. Fix Discipline Deletion State Reset
- [x] Open `app/dashboard/disciplinas/page.jsx`.
- [x] Locate `handleDeleteSubject`.
- [x] Implement `setSubjects` filter to remove the deleted subject locally.
- [x] Ensure `setIsEditModalOpen(false)` is explicitly called.
- [x] Add OpenSpec structural code comment explaining the reset.

## 2. Build Consultoria IA Tab
- [x] Open `app/dashboard/estatisticas/page.jsx`.
- [x] Import `useUserContext` and `supabase`.
- [x] Implement a `useEffect` to fetch real `academic_tasks`.
- [x] Calculate `completed` and `pending` task counts.
- [x] Replace the AI skeleton with the Terminal de Insights component.
- [x] Inject the Heuristic Logic (Overload Warning vs Healthy).
- [x] Add OpenSpec structural code comment explaining context mapping.
