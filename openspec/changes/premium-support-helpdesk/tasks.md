## 1. Setup Helpdesk Page

- [x] 1.1 Create file `app/dashboard/suporte/page.jsx`.
- [x] 1.2 Import `useState` from React and `useToast` from the Toast context.
- [x] 1.3 Import `LifeBuoy` or `HelpCircle` and `Send` from `lucide-react`.
- [x] 1.4 Export the default component `SupportPage` with `"use client"`.

## 2. Implement Form State & Logic

- [x] 2.1 Set up state variables: `category` (default "Dúvida"), `subject` (""), `description` (""), and `isSubmitting` (false).
- [x] 2.2 Create `handleSubmit` function that prevents default form submission.
- [x] 2.3 Add artificial delay (`await new Promise(r => setTimeout(r, 1500))`) inside `handleSubmit`.
- [x] 2.4 Trigger success toast upon completion and clear form inputs.

## 3. UI Layout and Styling

- [x] 3.1 Build the page header with the chosen icon and title "Central de Ajuda".
- [x] 3.2 Create the main layout grid: 1 column on mobile, 2 columns on large screens (`lg:grid-cols-12`).
- [x] 3.3 Construct the Left Column (FAQ): Add 3 static, expandable/accordion-style questions.
- [x] 3.4 Construct the Right Column (Form): Build the ticket submission form inside a glassmorphism card (`bg-white/5 border border-white/10 rounded-2xl p-6`).

## 4. Build Form Elements

- [x] 4.1 Add the `<select>` element for the Category ("Dúvida", "Reportar Bug", "Sugestão") with appropriate dark theme styling.
- [x] 4.2 Add the `<input>` element for the Subject.
- [x] 4.3 Add the `<textarea>` element for the Description with `min-height: 150px`.
- [x] 4.4 Add the Submit button, displaying a loading spinner if `isSubmitting` is true, otherwise the `Send` icon.
