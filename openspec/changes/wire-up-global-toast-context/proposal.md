## Why

Components across the dashboard (such as KanbanBoard, Disciplinas Page, and Dashboard Page) are currently failing to trigger notifications or are using duplicate/deprecated local state instead of consuming the global `ToastContext`. Integrating the unified `useToast` hook ensures consistent user feedback and clean rendering.

## What Changes

- Scan and clean `components/KanbanBoard.jsx`, `app/dashboard/disciplinas/page.jsx`, and `app/dashboard/page.jsx` to completely remove any local toast state, local `showToast` functions, and local timeout logic.
- Inject the global hook `import { useToast } from '@/context/ToastContext';` into all three files.
- Call `const { showToast } = useToast();` inside their main functions.
- Update all interaction flows (subject creation/deletion, task creation, Kanban drag-and-drop actions, focus sessions) to dispatch notifications through the global `showToast` hook in Brazilian Portuguese.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `global-toasts`: Wire up all dashboard page and board components to use the global toast context hook.

## Impact

- `components/KanbanBoard.jsx`
- `app/dashboard/disciplinas/page.jsx`
- `app/dashboard/page.jsx`
