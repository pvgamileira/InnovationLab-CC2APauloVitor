# Tasks: Prevent Infinite Toast Loop in KanbanBoard

## 1. Apply Hotfix in KanbanBoard
- [x] Locate the offending `useEffect` in `components/KanbanBoard.jsx`.
- [x] Import `useRef` from `react` and initialize `const hasToastedRef = useRef(false);`.
- [x] Wrap the `showToast` calls inside the `useEffect` with a strict `hasToastedRef.current` condition check.
- [x] Ensure the ref resets to `false` only when the condition strictly returns to a healthy/default state.
