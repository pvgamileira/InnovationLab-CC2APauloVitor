## Context

EduTrack AI needs to generate PDF reports detailing student progress and statistics. The system utilizes a Next.js (App Router, Pure JS, Tailwind CSS) frontend and a Supabase backend. For this specific requirement, the generation of the PDF needs to be handled by a Python script, bridging the gap between Next.js APIs and Python execution visually within the dashboard interface.

## Goals / Non-Goals

**Goals:**
- Architect a Next.js API route (`app/api/generate-report/route.js`) to parse incoming report requests and trigger a Python script.
- Architect a Python script (`scripts/generate_report.py`) utilizing libraries like `reportlab` or `fpdf` to actually construct the structured PDF report from provided parameters.
- Provide a clear UI integration on the `/dashboard` page featuring an "Exportar Relatório PDF" button that initiates the download flow seamlessly.

**Non-Goals:**
- Creating a full-fledged reporting service (MVP focuses on one standard PDF template).
- Direct backend (Supabase) generation; the architecture strictly uses Next.js bridging to Python for execution.

## Decisions

- **API Route:** The Next.js API route will execute the Python script using standard `child_process.exec` or `spawn` methodologies, passing required parameters (e.g., student name, statistics) as arguments or via stdin. The endpoint will capture the generated file or stream and serve it directly back as an attachment with appropriate MIME types (`application/pdf`).
- **Python Scripting:** A library like `reportlab` (or `fpdf`) will draw the report. Given the directives, the script should visually align conceptually with the "Strict Dark Mode" theme (Rich Black and Metallic Blue where applicable, clean modern layout even in print).
- **Frontend Trigger:** The `/dashboard` button will simply execute a standard `fetch` call, interpreting the response as a blob and triggering a native browser download event using object URLs.

## Risks / Trade-offs

- **Performance / Concurrent Executions:** Forking Python processes for every request can be resource-intensive if scaling. *Trade-off:* Acceptable for an MVP. *Mitigation:* Consider task queues or serverless function adaptations later if volume increases.
- **Dependency Management:** The node environment handling the Next.js app needs Python and necessary libraries (like `reportlab`) installed globally or in a known environment. *Mitigation:* Document installation requirements explicitly in README or setup scripts.
