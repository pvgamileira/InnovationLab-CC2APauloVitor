## Context

The Task Creation Modal is the primary entry point for new data. To elevate the user experience and showcase the platform's AI capabilities, we want to introduce "Alive AI". Specifically, when the user types a task title, the AI should predict the effort required.

## Goals / Non-Goals

**Goals:**
- Add real-time, non-blocking UI estimation logic as the user types the task title.
- Use a debounce mechanism (800ms) to simulate AI processing without causing jitter or making actual heavy API calls on every keystroke.
- Implement a visually striking "ghost tag" below or near the input to show the prediction.

**Non-Goals:**
- Making real API calls to Gemini or OpenAI in this iteration (we will mock the logic for now).
- Blocking the user from creating the task if the AI is still "thinking".

## Decisions

- **State Management**: Use standard React `useState` for `isPredicting` and `aiEstimate`.
- **Debounce Mechanism**: Use a `useEffect` hook that depends on the task title (`titulo`). We will use `setTimeout` and clear it on unmount or subsequent changes to handle debouncing efficiently.
- **Mock Logic**:
  - Contains "prova" or "estudar" -> "🔥 Alto: ~2h"
  - Contains "exercício" or "lista" -> "⚡ Médio: ~45m"
  - Otherwise -> "⏱️ Rápido: ~20m"
- **UI Aesthetic**: We will use a purple glassmorphism aesthetic to indicate AI activity.

## Risks / Trade-offs

- **Risk**: Setting timeouts in `useEffect` can cause memory leaks or state updates on unmounted components if cleanup is forgotten.
  - **Mitigation**: Strictly implement `return () => clearTimeout(delayDebounceFn)` in the `useEffect`.
