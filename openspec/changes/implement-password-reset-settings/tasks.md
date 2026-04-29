# Tasks: Implement Password Reset Logic in Settings

## 1. Prepare State Variables
- [x] Open `app/dashboard/configuracoes/page.jsx`.
- [x] Add the following state variables: `newPassword`, `confirmPassword`, `passwordLoading`, `passwordError`, and `passwordSuccess`.

## 2. Implement Update Logic
- [x] Create the `handlePasswordUpdate(e)` function.
- [x] Add length validation (>= 6 chars) and equality validation (`newPassword === confirmPassword`).
- [x] Implement the `supabase.auth.updateUser({ password: newPassword })` call within a `try/catch` block.
- [x] Handle state updates for clearing inputs, setting errors, and showing success messages.

## 3. Update the UI Form
- [x] Locate the "Segurança & Acesso" section inside the `ConfiguracoesPage` component.
- [x] Replace the old button logic with a `<form onSubmit={handlePasswordUpdate}>`.
- [x] Add two styled password input fields for the new password and the confirmation.
- [x] Add conditional rendering for `passwordError` and `passwordSuccess` alerts.
- [x] Ensure the "Salvar Nova Senha" button shows a loading spinner and is disabled while `passwordLoading` is true.
