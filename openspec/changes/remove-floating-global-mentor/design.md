## Context

The current `app/dashboard/layout.jsx` imports and renders a `<GlobalMentor />` floating widget at the bottom of the component tree. This widget is now obsolete due to a shift towards contextual inline AI interactions.

## Goals / Non-Goals

**Goals:**
- Completely remove the `<GlobalMentor />` component import from `app/dashboard/layout.jsx`.
- Completely remove the `<GlobalMentor />` component rendering from `app/dashboard/layout.jsx`.
- Keep the rest of the layout, including sidebar routing and toast contexts, completely intact.
- Follow pure JS/JSX rules without TypeScript.

**Non-Goals:**
- Deleting the `GlobalMentor.jsx` file from the repository (the instruction is to remove it from the layout UI; the file itself might be kept for reference or removed later, but the immediate scope is UI removal).
- Refactoring any other layout elements.

## Decisions

- **UI Removal Only:** We will focus solely on removing the import and instantiation in `layout.jsx`. The file `components/GlobalMentor.jsx` may be removed in a subsequent cleanup, but we adhere strictly to the user's task list which specifies opening and editing only `app/dashboard/layout.jsx`.

## Risks / Trade-offs

- **Risk:** Unused `GlobalMentor.jsx` file remaining in the codebase causing tech debt.
  - **Mitigation:** A separate cleanup task can be issued later. For this change, we tightly scope the edit to `layout.jsx` to ensure no unexpected side effects occur.
