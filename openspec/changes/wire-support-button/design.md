## Context

The Support Helpdesk page was created but the entry point from the UI was not wired up. The user explicitly wants the "Abrir chamado de suporte" button in the Settings/Profile area to navigate to this page, without adding it to the main Sidebar navigation.

## Goals / Non-Goals

**Goals:**
- Find the "Abrir chamado de suporte" button in the Settings/Config area.
- Wrap it with a `<Link href="/dashboard/suporte">` or `router.push('/dashboard/suporte')`.
- Verify the Support Page (`app/dashboard/suporte/page.jsx`) meets all aesthetic and functional requirements.

**Non-Goals:**
- Modifying the Sidebar to include the support link.
- Making backend API calls for support tickets.

## Decisions

- **Navigation**: We will use Next.js `<Link>` around the button to provide fast client-side navigation.
- **Verification**: We will double-check `app/dashboard/suporte/page.jsx` to ensure it is fully compliant with the "Pure JS/JSX" rule and has the glassmorphism layout, simulated delay, and success toast.

## Risks / Trade-offs

- **Risk**: The button might be deeply nested or handled by a separate component.
  - **Mitigation**: We will search for the exact text "Abrir chamado" across the `app/dashboard` directory to ensure we hit the correct button.
