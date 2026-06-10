## Architecture

- **Page**: `app/dashboard/suporte/page.jsx`
- **Entry Point**: The existing Settings area (e.g. `app/dashboard/perfil/page.jsx` or similar depending on the exact implementation). The navigation should be handled using `next/link` or `useRouter` from `next/navigation`.

## Components

### 1. Settings Navigation (Modification)
- Find the specific component housing the "Abrir chamado de suporte" text/button.
- Implement an explicit `/dashboard/suporte` navigation path.

### 2. Helpdesk Page (`app/dashboard/suporte/page.jsx`)
- Must use `'use client'` to allow state management and form handling.
- **UI Container**: Glassmorphism effect applying `bg-white/5 border border-white/10 rounded-2xl p-6`.
- **Header**: "Central de Ajuda".
- **Form Controls**:
  - `Category`: A `<select>` with options: "Bug", "Dúvida", "Sugestão".
  - `Subject`: An `<input>` for short text.
  - `Description`: A `<textarea>` with a minimum height of `150px`.
  - `Submit Button`: A primary action button ("Enviar").
- **State Management**:
  - Keep track of `category`, `subject`, `description`, and an `isSubmitting` boolean.
  - On `handleSubmit(e)`:
    - Prevent default.
    - Set `isSubmitting` to `true`.
    - Wait for 1 second (`await new Promise(r => setTimeout(r, 1000))`).
    - Dispatch a global success Toast containing the message `"✅ Chamado aberto com sucesso!"` using `useToast()`.
    - Clear form fields.
    - Set `isSubmitting` to `false`.

## Constraints

- Pure JS/JSX. NO TypeScript.
- Strict Dark Mode aesthetics (Rich Black, Metallic Blue).
- No new links added to the Sidebar/Navbar. The entry point MUST be only the Settings screen.
- Form must include the specific categories (Bug, Dúvida, Sugestão).
