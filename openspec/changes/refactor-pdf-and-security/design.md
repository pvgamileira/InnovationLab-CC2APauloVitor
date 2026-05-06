# Design: PDF Refactor & Security Headers

## Component: PDF Generation Route
**File**: `app/api/generate-report/route.js`
- **Dependencies**: Install `jspdf` and `jspdf-autotable`.
- **Logic**:
  - Securely fetch the user's `subjects` and `academic_tasks` using `createClient` and the authorization header.
  - Calculate global stats (Total workload, pending tasks, completed tasks).
  - Initialize `new jsPDF()`.
  - Draw the header: "Relatório Acadêmico - EduTrack AI" with the current date.
  - Draw the Stats section using standard text functions.
  - Use `autoTable` from `jspdf-autotable` to draw a clean, formatted table of all `subjects` (Name, Professor, Workload).
  - Convert the document to an `arraybuffer` via `doc.output('arraybuffer')`.
  - Return the buffer in a `NextResponse` with headers `Content-Type: application/pdf` and `Content-Disposition: attachment`.

## Component: Next.js Config
**File**: `next.config.mjs`
- Export an asynchronous `headers()` function.
- Target all routes `source: '/(.*)'`.
- Inject headers:
  - `X-Frame-Options: DENY` (Prevents clickjacking).
  - `X-Content-Type-Options: nosniff` (Prevents MIME sniffing).
  - `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https: wss:;` (Basic CSP allowing Supabase and Next.js HMR).
