## Context

Currently, the Focus Room (Foco) is accessed via a standalone link in the main navigation sidebar. To clean up the sidebar and align the Focus feature more closely with the subjects a user is studying, we will move the entry point for the Focus Room into the Subject cards on the Disciplinas page.

## Goals / Non-Goals

**Goals:**
- Remove the "Foco" link from the sidebar in `app/dashboard/layout.jsx`.
- Add a new button (using `Link` from `next/link`) inside each Subject card in `app/dashboard/disciplinas/page.jsx` that navigates to `/dashboard/foco`.

**Non-Goals:**
- Modifying the internal logic of the `/dashboard/foco` page itself.
- Changing how the Focus room attributes time to subjects (this is a UI entry point refactor only).

## Decisions

- **UI Placement**: The new "Iniciar Modo Foco" button will be placed inside the existing floating action controls area of the Subject card, where the edit and delete buttons used to be (before they were removed in the Advanced UX refactor). Since they were removed, we will recreate or repurpose that floating controls area to house the Focus button.
- **Iconography**: We will use the `Timer` or `Play` icon from `lucide-react`. The button will have a distinct styling (e.g., hover state with a green or purple tint) to indicate it's an action, separate from the card's double-click-to-edit action.

## Risks / Trade-offs

- **Risk**: Users might not discover the Focus feature immediately since it's no longer in the global sidebar.
  - **Mitigation**: The floating action button on the subject cards (visible on hover) provides an intuitive, context-relevant place to discover it when they are actually managing their study subjects.
