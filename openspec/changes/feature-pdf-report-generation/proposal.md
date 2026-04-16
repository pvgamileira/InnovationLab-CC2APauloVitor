## Why

Users need a way to export their academic progress into a portable format. Generating a PDF report provides a tangible, structured document summarizing student data and task statistics, enabling them to share or archive their educational journey.

## What Changes

- Creation of a new Next.js API Route (`app/api/generate-report/route.js`) to act as the bridge between the frontend and the Python script.
- Implementation of a Python script (`scripts/generate_report.py`) utilizing libraries like `reportlab` or `fpdf` to generate styled PDF reports.
- UI integration on the `/dashboard` route with an "Exportar Relatório PDF" button that triggers the API route and downloads the resulting PDF.

## Capabilities

### New Capabilities
- `pdf-report-generation`: The capability to compile user data and task statistics into a formatted, downloadable PDF report via a Python backend integration.

### Modified Capabilities
- None.

## Impact

- **Backend:** A new API endpoint will facilitate the execution of external Python scripts.
- **Python Integration:** A new standalone script will handle PDF drawing and formatting logic.
- **Frontend:** The dashboard will feature a unified export action interacting dynamically with the new endpoint.
