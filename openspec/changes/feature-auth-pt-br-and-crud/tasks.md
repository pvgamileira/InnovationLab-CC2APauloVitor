## 1. Authentication Layer

- [x] 1.1 Scaffold the `app/auth/page.jsx` route mimicking the Premium UI dark aesthetic parameters.
- [x] 1.2 Implement the Supabase Email/Password interactions (`signUp`, `signInWithPassword`) natively mapping form states (loading, errors).
- [x] 1.3 Update the main `app/dashboard/page.jsx` logic to enforce session validation actively blocking unauthenticated endpoints and storing `user.id`.

## 2. UI Polish & Translation (PT-BR)

- [x] 2.1 Refactor the DOM systematically purging all native OS emojis present, optionally utilizing inline SVG traces or libraries mimicking Lucide React.
- [x] 2.2 Translate all static UI strings, analytical headers, and structural placeholders across `/dashboard` into localized Brazilian Portuguese (pt-BR).

## 3. CRUD Modals Engineering

- [x] 3.1 Construct a Glassmorphism React Modal overlay explicitly managing states for "Nova Disciplina" (fetching `name`, `professor`, `workload`).
- [x] 3.2 Construct a secondary Glassmorphism Modal overlay for "Nova Tarefa" enabling dynamic `subject_id` dropdown selection.
- [x] 3.3 Ensure both modal boundaries successfully dispatch the `INSERT` payloads to the Supabase endpoint incorporating `auth.uid()` and gracefully rehydrating the active view.
