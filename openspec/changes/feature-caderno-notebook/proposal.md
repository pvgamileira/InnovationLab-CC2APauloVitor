## Why

A core philosophy of EduTrack AI is centralizing the student's entire workflow. Having tasks and a Pomodoro timer is excellent, but students also need a place to jot down quick thoughts, lecture snippets, or drafts immediately linked to their subjects. The "Caderno" (Notebook) serves as an integrated digital notebook, removing friction so the user doesn't have to jump to external apps like Notion or Evernote for rapid notes.

## What Changes

- Creation of a new page block at `app/dashboard/caderno/page.jsx` using `"use client"`.
- Implementation of a Subject-based Sidebar/Tab system fetched dynamically from the `subjects` table in Supabase.
- Integration of a sleek, glassmorphism-styled text-editor area (`textarea`) for capturing raw notes.
- Design of a pseudo-database approach (falling back to LocalStorage for the MVP) to hold notes per subject before a formal `notes` table is migrated.

## Capabilities

### New Capabilities
- `caderno-notebook`: A multi-tab interface that isolates raw text inputs per academic subject.
- `local-drafting`: Auto-saving input text to local storage keyed by `subject_id` to prevent data loss.

### Modified Capabilities
- None. (Supabase is queried read-only for subjects).

## Impact

- **New Route**: Establishes `app/dashboard/caderno`.
- **Database Architecture Plan**: The current implementation relies on LocalStorage. In the future, a `subject_notes` table should be introduced in Supabase with columns: `id`, `user_id`, `subject_id`, `content` (TEXT), and `updated_at` (TIMESTAMP).
