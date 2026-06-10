## Context

Currently, the Next.js `app/dashboard/layout.jsx` file uses standard HTML anchor tags (`<a>`) for navigation instead of Next.js's native `<Link>` component. This triggers full-page reloads and clears the client-side state, which causes global `ToastContext` notifications to disappear immediately. Additionally, the `app/dashboard/disciplinas/page.jsx` file implements a duplicate drag-and-drop mechanism for Kanban boards. However, this file misses the gamification capabilities (XP rewards and level calculation) and smart alerts present in the main `KanbanBoard.jsx`.

## Goals / Non-Goals

**Goals:**
- Fix navigation by converting all `<a>` tags in `app/dashboard/layout.jsx` to `<Link>` components from `next/link`.
- Add gamification logic (+50 XP for completed tasks) to `onDragEnd` in `app/dashboard/disciplinas/page.jsx`.
- Implement a `useEffect` to trigger a toast for upcoming and overdue tasks in `app/dashboard/disciplinas/page.jsx`.
- Use purely JS/JSX. No TypeScript.

**Non-Goals:**
- Refactoring the drag-and-drop code into a single shared component (we are specifically asked to keep the duplicated DnD logic in Disciplinas).
- Implementing new UI themes or layouts outside of these logic hooks.
- Upgrading dependencies or making major system migrations.

## Decisions

- **Navigation Tag Replacement:** `next/link` components will replace `<a>` tags in `app/dashboard/layout.jsx`. This leverages the App Router's client-side navigation capabilities and preserves React context boundaries.
- **Duplicated Gamification Code Injection:** The gamification and level update logic will be directly copied into `app/dashboard/disciplinas/page.jsx`. While this is less DRY, it directly honors the user's specific instruction to keep the existing duplicated DnD logic and only inject the missing calls.
- **Pure JavaScript:** `page.jsx` and `layout.jsx` will be written without any TypeScript syntax, adhering to the "NO TypeScript" rule from the user directives.

## Risks / Trade-offs

- **Risk:** Maintaining duplicated DnD logic means future changes to the Kanban behavior need to be implemented twice.
  - **Mitigation:** Acknowledge this constraint but proceed to satisfy immediate task requirements.
- **Risk:** Calculating levels client-side and relying on client state for gamification could technically be manipulated.
  - **Mitigation:** Existing architecture relies on `supabase.auth.updateUser` to store `user_metadata`, so we keep alignment with the current established pattern.
