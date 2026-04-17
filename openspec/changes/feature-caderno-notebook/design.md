## Context

The Caderno feature acts as a frictionless digital notepad attached to the user's subjects. It sits alongside the Kanban, Dashboard, Agenda, and Focus Room as the 5th pillar of the module.

## Goals / Non-Goals

**Goals:**
- Provide an elegant Rich Black (`#02040a`) viewing interface. 
- Fetch `subjects` securely via Supabase and list them as side-tabs or horizontally scrollable pills.
- Offer a minimal, robust `textarea` for writing that feels snappy.
- Implement an auto-save loop using LocalStorage (`edutrack_notes_[subject_id]`) until the backend is expanded.

**Non-Goals:**
- Adding a rich-text editor (e.g., Draft.js, TipTap). The MVP requires a "clean text-editor style", so a native `<textarea>` styled beautifully with Tailwind is optimal.
- Migrating new Supabase schemas. (The proposal identifies the schema needed, but we will strictly stick to the front-end for this atomic slice).

## Decisions

- **State Syncing**: Fetch `subjects`. Initialize `activeSubject` to the first subject in the array. When `activeSubject` changes, load the content from LocalStorage into the `content` state.
- **Auto-Save**: Use a `useEffect` that listens to `content` and `activeSubject`. Apply a debouncing mechanism (`setTimeout`) to write to LocalStorage to prevent thrashing, accompanied by a small "Salvando..." / "Salvo" neon indicator in the corner.
- **Fallback Tab**: Create an implicit "Geral" (General) tab if a student has no subjects or wants to write unassigned notes.

## Risks / Trade-offs

- **Risk**: LocalStorage is wiped if the browser cache is explicitly cleared or used across different devices.
  *Mitigation*: This is an acceptable, explicitly designed trade-off since the goal states avoiding altering the database schema prematurely. The UI will indicate it's a local draft setup.
