## Why

The `/disciplinas` page is currently a static placeholder. Transforming it into a dedicated Task Management hub with a full Drag-and-Drop Kanban Board enhances the user experience, allowing students to visualize their workload and progress effortlessly. This complements the dashboard by providing a distraction-free, subject-focused environment.

## What Changes

- Completely rewrite `app/dashboard/disciplinas/page.jsx` as a client component (`"use client"`).
- Implement a 3-column Kanban board (Backlog, Em Progresso, Concluído) utilizing `@dnd-kit/core`, `@dnd-kit/sortable`, and `@dnd-kit/utilities` for a robust drag-and-drop experience.
- Add a Subject Context header at the top, detailing active subjects, professors, workload, and a "Grade/Average" placeholder indicator.
- Refine task cards to exhibit premium Glassmorphism styling (`bg-white/5`, `backdrop-blur`).
- Incorporate Gamification constraints: Dragging a task to "Concluído" updates Supabase and visually grants XP.

## Capabilities

### New Capabilities
- `dnd-kanban-board`: A high-end Drag-and-Drop Kanban interface using `@dnd-kit` enabling dynamic status updates for academic tasks.
- `subject-context-header`: A top-level summary displaying metrics for active subjects.

### Modified Capabilities
- None. (Supabase tables for subjects and academic_tasks remain unmodified).

## Impact

- `app/dashboard/disciplinas/page.jsx`: Replaced from a placeholder to a full interactive dashboard.
- New `@dnd-kit` libraries added to the dependency tree (already installed).
- Zero changes to backend schemas, existing dashboard routing, or the PDF API.
