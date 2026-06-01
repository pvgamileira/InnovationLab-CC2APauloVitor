# Design: Hotfix PDF AutoTable and Global Mentor UI Overflow

## Abordagem Técnica

### 1. Fix PDF Route
The issue is caused by using `doc.autoTable(...)` when `jspdf-autotable` expects to be used as a standalone function in the newer syntax, or because the plugin isn't properly attaching to the `jsPDF` instance in the backend environment.
- **Solution:** Import `autoTable` as a default import from `jspdf-autotable`.
- **Change:** Replace `doc.autoTable({...})` with `autoTable(doc, {...})`.
- **Target File:** `app/api/generate-report/route.js`

### 2. Fix Mentor UI Overflow
The Global Mentor UI uses fixed positioning but lacks a height constraint, causing it to push content beyond the screen limits when there are many messages.
- **Solution:** Add CSS classes to constrain the maximum height and allow internal scrolling.
- **Change:** Apply `max-h-[80vh]` and `flex flex-col` to the main wrapper (`div` with `fixed bottom-20`). Ensure the inner container has `overflow-y-auto`.
- **Target File:** `components/GlobalMentor.jsx`

## Security and Rules
- Maintain Strict Dark Mode theme and glassmorphism.
- Use only JavaScript (no TypeScript).
- Do not change any logic other than the ones specified in the requirements.
