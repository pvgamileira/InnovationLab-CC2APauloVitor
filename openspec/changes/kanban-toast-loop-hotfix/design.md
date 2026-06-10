# Design: Prevent Infinite Toast Loop in KanbanBoard

## Component Tweak: `components/KanbanBoard.jsx`

1. **Imports:** Ensure `useRef` is imported from React.
2. **State Guard:** Add `const hasToastedRef = useRef(false);` at the top level of the component.
3. **Condition Wrap:** Inside the alert `useEffect`, wrap the `showToast` calls with `if (!hasToastedRef.current)`.
4. **State Reset:** Add an `else` block to reset `hasToastedRef.current = false;` when no tasks are overdue or upcoming, allowing future alerts to trigger appropriately when data changes.

## Constraints
- Pure JS/JSX. NO TypeScript.
- Do not remove the core logic of the notification, only prevent the loop.
