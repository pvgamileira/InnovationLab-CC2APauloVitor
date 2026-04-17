## Why

The user requires a spatial and chronological visualization of their academic tasks. While the Kanban board is excellent for workflow status ("What am I doing right now?"), a Calendar Grid (Agenda) is crucial for deadline management and time planning ("When are things due?"). This feature establishes a new central hub (`/dashboard/agenda`) dedicated entirely to time-based organization.

## What Changes

- Creation of `app/dashboard/agenda/page.jsx` as a client-side component (`"use client"`).
- Implementation of a full monthly calendar grid utilizing `date-fns` for rendering weeks, days, and navigating between months.
- Integration with Supabase to fetch `academic_tasks` and `subjects` for the authenticated user.
- Tasks are matched to grid cells based on their `due_date` property.
- Addition of interactive, glassmorphism-styled grid cells that display sleek neon indicator badges for tasks.

## Capabilities

### New Capabilities
- `calendar-agenda`: A monthly grid view that geographically maps academic tasks over time, allowing previous/next month navigation and visual deadline tracking.

### Modified Capabilities
- None. (Supabase tables for subjects and academic_tasks remain unmodified).

## Impact

- **New Route**: Establishes `app/dashboard/agenda/page.jsx` (accessible via the assumed sidebar or URL).
- **Dependencies**: Exploits the recently installed `date-fns` package.
- **Constraints**: No changes to existing API routes, layout dependencies, or database schemas.
