## Context

The `app/dashboard/disciplinas/page.jsx` contains Subject cards with floating edit and delete buttons. We want to remove these explicit buttons to clean up the UI and instead implement a double-click-to-edit interaction and a drag-and-drop-to-delete (Trash Zone) interaction using native HTML5 Drag and Drop events.

## Goals / Non-Goals

**Goals:**
- Implement double-click to edit on Subject cards.
- Implement HTML5 native drag-to-trash for Subject cards.
- Render a fixed "Trash Dropzone" conditionally when a card is being dragged.
- Update the delete toast message to "🗑️ Disciplina eliminada".

**Non-Goals:**
- Modifying the Kanban board drag-and-drop mechanism.
- Altering any functionality outside of the Disciplinas page.

## Decisions

- **State Management**: We will introduce a boolean state `isDraggingSubject` to control the visibility of the Trash Dropzone.
- **Native HTML5 Drag and Drop**: We will explicitly avoid using `@dnd-kit` for this feature to prevent context collision with the Kanban board. We'll use standard `draggable={true}`, `onDragStart`, `onDragEnd`, `onDragOver`, and `onDrop` events.
- **Data Transfer**: The `subjectId` will be passed using `e.dataTransfer.setData('subjectId', subj.id)` and retrieved on the dropzone.

## Risks / Trade-offs

- **Risk**: Event bubbling or collision with `@dnd-kit`'s pointer sensors.
  - **Mitigation**: Using purely native HTML5 properties (`draggable`) on a completely separate node hierarchy (above the Kanban board) typically avoids interference, as `@dnd-kit` is scoped to its `DndContext`.
- **Risk**: Discoverability of the edit/delete actions.
  - **Mitigation**: The Trash dropzone clearly indicates the delete action when the user attempts to drag the card. Double-click is a standard OS-level paradigm that many power users recognize, fulfilling the "Advanced UX" phase.
