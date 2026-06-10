## 1. Wire Support Button

- [x] 1.1 Locate the "Abrir chamado" button in the Settings/Profile area (search in `app/dashboard`).
- [x] 1.2 Import `Link` from `next/link` or `useRouter` from `next/navigation` in that file.
- [x] 1.3 Wrap the button with `<Link href="/dashboard/suporte">` or add `onClick={() => router.push('/dashboard/suporte')}`.

## 2. Verify Support Helpdesk Page

- [x] 2.1 Open `app/dashboard/suporte/page.jsx`.
- [x] 2.2 Verify it has `"use client"`.
- [x] 2.3 Verify the header title is "Central de Ajuda".
- [x] 2.4 Verify the Category `<select>` has "Bug", "Dúvida", "Sugestão".
- [x] 2.5 Verify the Subject `<input>` exists.
- [x] 2.6 Verify the Description `<textarea>` has `min-height: 150px`.
- [x] 2.7 Verify `handleSubmit` uses `e.preventDefault()`, a 1-second delay, shows a success Toast ("✅ Chamado aberto com sucesso!"), and clears form fields.
- [x] 2.8 Verify the UI uses a glassmorphism container (`bg-white/5 border border-white/10 rounded-2xl p-6`).
