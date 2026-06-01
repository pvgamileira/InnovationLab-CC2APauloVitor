# Tarefas: Hotfix PDF AutoTable and Global Mentor UI Overflow

- [x] **Fix PDF Route**
  - [x] Open `app/api/generate-report/route.js`.
  - [x] Change the import to: `import autoTable from 'jspdf-autotable';`
  - [x] Locate the `doc.autoTable({...})` call around line 81.
  - [x] Change it to use the standalone function: `autoTable(doc, { startY: 90, head: [['Disciplina', 'Professor', 'Carga Horária']], body: tableData, theme: 'grid', headStyles: { fillColor: [58, 134, 255] } });`

- [x] **Fix Mentor UI**
  - [x] Open `components/GlobalMentor.jsx`.
  - [x] Locate the main wrapper div of the chat window (the one with `fixed bottom-20`).
  - [x] Add classes: `max-h-[80vh]` and `flex flex-col` to restrict its maximum height.
  - [x] Ensure the inner container holding the messages and suggestions has `overflow-y-auto` so it scrolls internally instead of pushing the whole UI off-screen.
