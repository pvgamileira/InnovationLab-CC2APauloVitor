## 1. Fix Agenda Timezone

## 1. Fix Agenda Timezone

- [x] 1.1 Open `app/dashboard/agenda/page.jsx` (or the equivalent component where due dates are parsed and rendered).
- [x] 1.2 Locate the function or logic that instantiates a `new Date()` from the task's `due_date`.
- [x] 1.3 Adjust the parsing logic (e.g., append `T12:00:00` to `YYYY-MM-DD` strings before instantiating the Date) to prevent local timezone offsets from shifting it to the previous day.

## 2. Fix Agenda Mobile Visibility

- [x] 2.1 Locate the grid or layout container for the Agenda view (e.g., in `app/dashboard/agenda/page.jsx` or the main dashboard layout).
- [x] 2.2 Find and remove any Tailwind classes such as `hidden md:block` or similar that force the component to be hidden on smaller screens.

## 3. Implement PDF Cooldown

- [x] 3.1 Locate the PDF generation button component (e.g., in `app/dashboard/estatisticas/page.jsx` or `app/dashboard/page.jsx`).
- [x] 3.2 Add the state `const [pdfCooldown, setPdfCooldown] = useState(0)` at the top of the component.
- [x] 3.3 Add a `useEffect` hook that decreases `pdfCooldown` by 1 every second when `pdfCooldown > 0`.
- [x] 3.4 Modify the click handler of the PDF button to set `pdfCooldown` to 30.
- [x] 3.5 Disable the PDF button while `pdfCooldown > 0` and change its text to `Aguarde ${pdfCooldown}s...`.

## 4. Clean Dashboard UI

- [x] 4.1 Open `app/dashboard/page.jsx`.
- [x] 4.2 Locate the duplicated/redundant "Vire Premium" button or banner.
- [x] 4.3 Delete the redundant Premium element to declutter the UI.
