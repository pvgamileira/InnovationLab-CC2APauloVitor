# Tasks: Real AI Consulting & Modal Fix

## 1. Enforce Discipline Deletion Reset
- [x] Open `app/dashboard/disciplinas/page.jsx`.
- [x] Locate the deletion handler (`handleDeleteSubject`).
- [x] Verify/Add local state removal and explicitly set `setIsEditModalOpen(false)`.
- [x] Add OpenSpec inline documentation for the cleanup.

## 2. Build Native REST AI Route
- [x] Create `app/api/ai/consultoria/route.js`.
- [x] Implement `POST` handler extracting `tarefas` and `xp`.
- [x] Construct the native `fetch` payload to the official Gemini REST endpoint using `process.env.GEMINI_API_KEY`.
- [x] Apply the strict persona prompt formatting.
- [x] Parse and return the diagnosis safely. Add OpenSpec documentation block.

## 3. Implement Frontend AI Dashboard
- [x] Open `app/dashboard/estatisticas/page.jsx`.
- [x] Add `isLoading`, `aiData`, and `error` state hooks.
- [x] Build the "Gerar Diagnóstico Neural" action button with native theme styling.
- [x] Implement the `handleGenerateDiagnosis` function to `POST /api/ai/consultoria` using live context data.
- [x] Build the pulsing skeleton loading UI.
- [x] Build the glassmorphism result card to display the markdown response.
- [x] Implement silent error fallback UI. Add OpenSpec documentation.
