## 1. Python Generation Script Setup

- [ ] 1.1 Create the `scripts` directory if it does not exist at the project root.
- [ ] 1.2 Write `scripts/generate_report.py` ensuring it accepts standard input arguments (JSON or arg list) for user data and task statistics.
- [ ] 1.3 Utilize `reportlab` or `fpdf` inside the script to format and output a PDF file conceptually matching the modern, clean aesthetics of the app. Ensure it outputs either directly to stdout or to a temp file that Next.js can read.

## 2. Next.js API Integration

- [ ] 2.1 Architect the API endpoint `app/api/generate-report/route.js`.
- [ ] 2.2 Inside the endpoint, structure the execution of the Python script using `child_process` (exec/spawn), passing down incoming data payloads securely.
- [ ] 2.3 Format the API response to return the generated PDF as an `application/pdf` Blob/Stream with adequate Content-Disposition headers for downloading.

## 3. Dashboard UI Implementation

- [ ] 3.1 Locate or update the `app/dashboard/page.jsx` or relevant layout component.
- [ ] 3.2 Add the "Exportar Relatório PDF" button using standard Tailwind CSS classes (Metallic Blue style).
- [ ] 3.3 Implement the client-side JavaScript logic to trigger the API, handle the response blob, and force the download correctly using URL.createObjectURL.
