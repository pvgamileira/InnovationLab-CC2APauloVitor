# Tasks: Remove Task Breaker & Add LGPD Consent

## 1. Clean Dashboard
- [x] Open `app/dashboard/page.jsx`.
- [x] Delete the `breakingTaskId` state and the `breakDownTask` function.
- [x] Remove `onBreakTask` and `breakingTaskId` props from the `<KanbanBoard />` instantiation.

## 2. Clean Kanban Board
- [x] Open `components/KanbanBoard.jsx`.
- [x] Remove the `onBreakTask` and `breakingTaskId` props from the component signature.
- [x] Delete the magic wand button block inside the task cards.
- [x] Remove unused `Wand2` and `Loader2` icons if they are no longer needed.

## 3. Update Onboarding Modal
- [x] Open `components/OnboardingModal.jsx`.
- [x] Add the `consent` boolean state.
- [x] Add the required checkbox UI with the LGPD text and Next.js Links to `/termos` and `/privacidade` just above the submit button.
- [x] Ensure the submit button is disabled when the checkbox is not checked.
