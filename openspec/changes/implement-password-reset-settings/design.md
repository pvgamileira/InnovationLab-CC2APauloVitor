# Design: Password Reset Logic in Settings

## Component: Settings Page
**File**: `app/dashboard/configuracoes/page.jsx`

### State Management
- `newPassword` (string)
- `confirmPassword` (string)
- `passwordLoading` (boolean)
- `passwordError` (string | null)
- `passwordSuccess` (string | null)

### Form Logic (`handlePasswordUpdate`)
- Triggered on form submit.
- **Validation**:
  - Check if `newPassword.length < 6`. Set error if true.
  - Check if `newPassword !== confirmPassword`. Set error if true.
- **Execution**:
  - `setPasswordLoading(true)`
  - Call `await supabase.auth.updateUser({ password: newPassword })`.
  - On success: clear inputs, set `passwordSuccess` to a confirmation message, clear any errors.
  - On catch: set `passwordError` with `err.message`.
  - `finally`: `setPasswordLoading(false)`.

### UI Updates
- Replace the existing `handleResetPassword` email button with a structured `<form>` inside the `ConfigSection` for "Segurança & Acesso".
- Add two `<input type="password">` fields:
  - "Nova Senha"
  - "Confirmar Nova Senha"
- Apply Tailwind classes: `bg-[#0a0c14]/50 border border-white/10 focus:border-[#3a86ff]/50 rounded-xl px-4 py-3 text-white outline-none w-full`.
- Display dynamic validation messages (red for errors, emerald/green for success).
- Add a submit button with the `Loader2` icon when `passwordLoading` is true.
