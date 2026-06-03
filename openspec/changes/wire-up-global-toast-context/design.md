## Context

Currently, dashboard components are using localized state or deprecated methods to dispatch toast notifications, or they lack context consumption. By centralizing toast rendering inside `ToastProvider`, we can simplify our dashboard components and rely entirely on the global `useToast` hook.

## Goals / Non-Goals

**Goals:**
- Inject `import { useToast } from '@/context/ToastContext';` into `components/KanbanBoard.jsx`, `app/dashboard/disciplinas/page.jsx`, and `app/dashboard/page.jsx`.
- Clean up any local toast state (`toasts`, `setToasts`, local `showToast`, custom inline rendering of toasts) from these components.
- Ensure all notification triggers in these files call `showToast` from `useToast()`.
- Keep all messages in Brazilian Portuguese.

**Non-Goals:**
- Recreating any layout wrapper logic.
- Adding styles to the context provider (already styled in previous change).

## Decisions

### Decision 1: Complete Cleanup of Local Toast States
- **Option A**: Keep local toast state as fallback.
- **Option B (Chosen)**: Complete removal of local toast state.
- **Rationale**: Keeps the components clean and ensures single source of truth for UI notification rendering.

### Decision 2: Message Language Standard
- **Option A**: Support multi-language.
- **Option B (Chosen)**: Standardize on Brazilian Portuguese.
- **Rationale**: Aligning with system design directives and Portuguese UX of the application.

## Risks / Trade-offs

- **Risk**: Missing a local notification trigger reference during refactoring.
  - *Mitigation*: Run grep searches to check all instances of `showToast`, local state usage, and perform manual/linter verification.
