## 1. State for Trash Zone

- [x] 1.1 Open `app/dashboard/disciplinas/page.jsx`.
- [x] 1.2 Add the state `const [isDraggingSubject, setIsDraggingSubject] = useState(false);` inside the `DisciplinasPage` component.

## 2. Refactor Subject Cards

- [x] 2.1 Locate the subject mapping section (`subjects.map(subj => ...)`).
- [x] 2.2 Delete the floating div containing the `Pencil` and `Trash2` action buttons.
- [x] 2.3 Add the `onDoubleClick={() => handleOpenEditModal(subj)}` prop to the main wrapper `div` of the Subject card.
- [x] 2.4 Add `draggable={true}` to the main wrapper `div`.
- [x] 2.5 Add `onDragStart={(e) => { e.dataTransfer.setData('subjectId', subj.id); setIsDraggingSubject(true); }}` to the main wrapper.
- [x] 2.6 Add `onDragEnd={() => setIsDraggingSubject(false)}` to the main wrapper.

## 3. Implement Trash Dropzone

- [x] 3.1 At the bottom of the JSX return (outside the normal flow, conditionally rendered if `isDraggingSubject`), add a new fixed Trash Dropzone `div`.
- [x] 3.2 Add styles: `fixed bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 z-50 bg-red-900/40 backdrop-blur-md border-2 border-dashed border-red-500/50 rounded-2xl flex flex-col items-center justify-center text-red-200 transition-all`.
- [x] 3.3 Inside the dropzone, render a `Trash2` icon and the text "Solte aqui para excluir".
- [x] 3.4 Add `onDragOver={(e) => e.preventDefault()}` to the dropzone.
- [x] 3.5 Add `onDrop={(e) => { e.preventDefault(); const id = e.dataTransfer.getData('subjectId'); if(id) handleDeleteSubject(id); setIsDraggingSubject(false); }}` to the dropzone.

## 4. Add Easter Egg Toast

- [x] 4.1 Locate the `handleDeleteSubject` function.
- [x] 4.2 Change the success `showToast` message to exactly: `"🗑️ Disciplina eliminada"`.
