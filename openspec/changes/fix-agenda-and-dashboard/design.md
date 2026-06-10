## Context

We are addressing isolated user experience bugs across the application, specifically the Agenda module and the Dashboard UI. 

## Goals / Non-Goals

**Goals:**
- Fix the Agenda timezone bug by adjusting task due dates to local time.
- Remove Tailwind classes hiding the Agenda on mobile devices.
- Implement a 30s cooldown mechanism on the PDF generation button using a new `useState` hook.
- Remove the duplicated "Vire Premium" button in the `app/dashboard/page.jsx`.
- Strict adherence to Pure JS/JSX. NO TypeScript.

**Non-Goals:**
- Refactoring the entire Kanban board logic.
- Rewriting the PDF generation service itself.
- Restructuring the Agenda calendar beyond simple timezone handling and mobile layout fixes.

## Decisions

- **Agenda Timezone Fix**: When parsing or rendering the `due_date`, we will append `T12:00:00` or adjust the timezone offset locally to ensure the date aligns with the user's local day instead of rolling back to the previous day due to UTC conversion.
- **Mobile Visibility**: We will identify and remove `md:block`, `hidden`, or similar classes on the Agenda container in the layout.
- **PDF Cooldown**: A standard `useState` and `useEffect` combo will disable the button and show the countdown.
- **UI Cleanup**: We will simply delete the redundant `<a href="/dashboard/premium">` block in `page.jsx`.

## Risks / Trade-offs

- **Risk**: Hardcoding `T12:00:00` might behave strangely in extreme edge-case timezones.
  - **Mitigation**: It's a standard workaround for "Date-only" local representations without complex libraries like `date-fns-tz`. Given the app relies on simple `new Date(task.due_date)` rendering, ensuring it's treated as a midday UTC string generally stabilizes the date locally.
