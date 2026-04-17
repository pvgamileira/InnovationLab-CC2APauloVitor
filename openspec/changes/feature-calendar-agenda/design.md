## Context

The `/agenda` route is a brand-new top-level page within the dashboard. The core of this page is a classic 7-column monthly calendar grid. We must fetch tasks on mount, compute the local timezone alignment so that UTC `due_date` strings display on the correct calendar block, and render them elegantly against a dark theme.

## Goals / Non-Goals

**Goals:**
- Provide a robust Calendar Grid utilizing `date-fns` (`startOfWeek`, `endOfMonth`, `addDays`, `subMonths`, `addMonths`).
- Render glassmorphism cells (`bg-white/5`, `backdrop-blur`, `hover:bg-[#3a86ff]/10`) on a Rich Black background.
- Map tasks precisely onto the days corresponding to their `due_date`.
- Ensure performance remains high even with dozens of tasks (by pre-grouping them in memory).
- Text strings must strictly use `pt-BR` (e.g., "Janeiro", "Segunda", "Terça").

**Non-Goals:**
- Allowing drag-and-drop between days on the calendar (MVP is visualization only).
- Day/Week specific views (MVP is the Monthly view).
- Creating new backend tables or routes.

## Decisions

- **Date Library**: `date-fns` provides immutable date math and localized formatting without the overhead of `moment.js`. We will import the `ptBR` locale from `date-fns/locale`.
- **State Management**: We will track a `currentMonth` Date object using `useState(new Date())`. Navigation simply uses `setCurrentMonth(subMonths(currentMonth, 1))` or `addMonths`.
- **Task Grouping**: After fetching tasks from Supabase, we derive an object where keys are `YYYY-MM-DD` strings, and values are arrays of tasks. This guarantees `O(1)` lookup time while checking if a calendar cell has a task.
- **Cell UI**: Dates from the previous/next month will appear slightly dimmed (`opacity-50`). The current day receives a subtle glowing border. Task badges will be highly compressed, truncating long titles via Tailwind's `truncate`.

## Risks / Trade-offs

- **Risk**: Time zone mismatch where a task due at `2026-04-18T01:00:00Z` falls on `04-17` visually.
  *Mitigation*: We will parse `due_date` reliably using raw ISO matching or `format` to local timezone when grouping. We'll use standard `new Date(task.due_date)` which respects the user's browser timezone.
