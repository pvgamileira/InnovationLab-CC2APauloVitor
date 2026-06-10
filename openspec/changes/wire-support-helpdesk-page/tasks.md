## 1. Wire Support Button

- [x] 1.1 Locate the "Abrir chamado de suporte" text/button in the Settings area (e.g., `app/dashboard/perfil/page.jsx`, `app/dashboard/configuracoes/page.jsx` or relevant modal).
- [x] 1.2 Import `Link` from `next/link` or `useRouter` from `next/navigation`.
- [x] 1.3 Wrap the existing UI trigger with `<Link href="/dashboard/suporte">` or add an `onClick={() => router.push('/dashboard/suporte')}` handler.
- [x] 1.4 Ensure no new Support links are added to the general Sidebar or Navbar.

## 2. Build Support Helpdesk Page

- [x] 2.1 Create or open `app/dashboard/suporte/page.jsx`.
- [x] 2.2 Add the `"use client"` directive to the top of the file.
- [x] 2.3 Implement the main UI layout, ensuring a glassmorphism container (`bg-white/5 border border-white/10 rounded-2xl p-6`).
- [x] 2.4 Add the header text: "Central de Ajuda".
- [x] 2.5 Build the form containing:
  - Category `<select>` with options "Bug", "Dúvida", "Sugestão".
  - Subject `<input>`.
  - Description `<textarea>` with `min-height: 150px` (or Tailwind `min-h-[150px]`).
- [x] 2.6 Build the submit button ("Enviar").

## 3. Form Logic and Feedback

- [x] 3.1 Setup React state for the form fields (`category`, `subject`, `description`) and loading state (`isSubmitting`).
- [x] 3.2 Implement `handleSubmit` function.
- [x] 3.3 In `handleSubmit`, call `e.preventDefault()`, set loading state, and `await new Promise(r => setTimeout(r, 1000))` to simulate network delay.
- [x] 3.4 Import `useToast` from the project's global toast context (e.g., `components/ui/toast` or similar).
- [x] 3.5 In `handleSubmit`, trigger `toast({ title: "✅ Chamado aberto com sucesso!" })` (or equivalent method per project convention).
- [x] 3.6 Clear the form fields and remove loading state after submission.
