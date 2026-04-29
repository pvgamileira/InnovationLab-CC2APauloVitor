# Tasks: Fix Notebook Markdown & Settings Logic

## 1. Install Dependencies
- [x] Check if `react-markdown` is installed. If not, install it via `npm install react-markdown`.

## 2. Enhance Notebook Markdown
- [x] Open `app/dashboard/caderno/page.jsx`.
- [x] Import `ReactMarkdown`.
- [x] Replace the plain text AI response renderer with `<ReactMarkdown>` and style the sub-components (`h1`, `h2`, `ul`, `li`, `p`, `strong`) using Tailwind classes.

## 3. Implement Account Deletion
- [x] Open `app/dashboard/configuracoes/page.jsx`.
- [x] Add an `isDeleting` state.
- [x] Implement `handleDeleteAccount` to sequentially delete data from `academic_tasks`, `subjects`, and `user_profiles`, followed by a `signOut` and redirect.
- [x] Attach the function to the "Excluir minha conta" button and disable it while loading.

## 4. Build Help Center FAQ
- [x] In `app/dashboard/configuracoes/page.jsx`, locate the `'ajuda'` tab content.
- [x] Create structured FAQ cards for "Mentor IA" and "Kanban Inteligente" using the existing dark theme styles.
