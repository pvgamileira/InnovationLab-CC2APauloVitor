# Tarefas: Refactor PDF Generation and Add Security

## 1. Install Dependencies
- [x] Install `jspdf` and `jspdf-autotable` via npm.

## 2. Refactor PDF Route
- [x] Open `app/api/generate-report/route.js`.
- [x] Remove all `child_process`, `fs`, `path`, and python-related code.
- [x] Import `jsPDF` and `autoTable`.
- [x] Implement the native JS PDF generation logic, iterating over the user's subjects and tasks fetched from Supabase.
- [x] Return the generated PDF buffer as a `NextResponse` with appropriate MIME type headers.

## 3. Apply Security Headers
- [x] Open `next.config.mjs`.
- [x] Add the `headers()` async function.
- [x] Configure `X-Frame-Options`, `X-Content-Type-Options`, and `Content-Security-Policy` for the `'/(.*)'` source path.
