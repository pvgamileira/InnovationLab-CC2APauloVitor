# Proposta: Hotfix PDF AutoTable and Global Mentor UI Overflow

## Contexto
We need to fix a server-side PDF generation error (`doc.autoTable is not a function`) and a UI bug where the Global Mentor chat overflows the screen height.

## Motivation
- The PDF generation is currently failing due to incorrect import/usage of `jspdf-autotable`.
- The Global Mentor chat UI pushes content off-screen when the message list grows, making it unusable and breaking the application's layout.

## Scope
- Update `app/api/generate-report/route.js` to correctly import and use `jspdf-autotable`.
- Update `components/GlobalMentor.jsx` to apply a maximum height and internal scroll to the chat wrapper.

## Success Criteria
- The PDF generation route works without throwing the `doc.autoTable is not a function` error.
- The Global Mentor UI does not overflow the viewport, using `max-h-[80vh]` and `overflow-y-auto` appropriately.
