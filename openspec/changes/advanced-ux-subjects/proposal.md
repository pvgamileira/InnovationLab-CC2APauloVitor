## Why

The infrastructure is stable, and we are moving to Phase 2 (Advanced UX). Standard edit and delete action buttons on the Subject cards in the Disciplinas page can feel generic and sometimes clutter the UI. By replacing them with a modern double-click-to-edit and a native drag-to-trash mechanic, we offer a more immersive, interactive, and advanced user experience.

## What Changes

- **Double-click to Edit**: The explicit "Pencil" button will be removed. Users will double-click the Subject card to open the Edit modal.
- **Drag-to-Trash**: The explicit "Trash" button will be removed. Users will be able to drag the Subject card using HTML5 native drag-and-drop and drop it onto a newly created "Trash Dropzone" to delete it.
- **Trash Dropzone**: A hidden-by-default trash area will appear at the bottom of the screen only when a Subject card is being dragged. It will feature a glassmorphism red background.
- **Easter Egg Toast**: The success toast message upon deletion will be updated to "🗑️ Disciplina eliminada".

## Capabilities

### New Capabilities
- `subject-advanced-ux`: Covers the double-click to edit and native drag-to-trash functionalities for Subject cards.

### Modified Capabilities

## Impact

- **Affected Code**: `app/dashboard/disciplinas/page.jsx`
- **Dependencies**: No new dependencies. Native HTML5 drag-and-drop will be used instead of `@dnd-kit` to avoid interfering with the Kanban board.
