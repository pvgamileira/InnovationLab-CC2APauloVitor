## Why

The previous execution failed to connect the existing UI to the new Support Helpdesk page. The Helpdesk should be accessed strictly via the existing "Abrir chamado de suporte" button located in the Settings/Configuration area. We need to wire this button up properly and ensure the Helpdesk page itself renders correctly and meets the exact UI requirements.

## What Changes

1. **Wire the Button**: Locate the existing Settings area component containing the "Abrir chamado de suporte" button and wrap it in a `<Link href="/dashboard/suporte">` or use `router.push('/dashboard/suporte')`.
2. **Build/Refine Support Page**: Ensure `app/dashboard/suporte/page.jsx` uses pure JS/JSX (no TS) with `'use client'`, implements a glassmorphism container, and correctly handles the support form submission with a simulated delay, a success toast ("✅ Chamado aberto com sucesso!"), and clears form fields.

## Capabilities

### New Capabilities
- `helpdesk-navigation`: Enables users to reach the Support Helpdesk strictly via the Settings/Profile area.

### Modified Capabilities
- `settings-ui`: Updated to provide actual routing to the Support page.

## Impact

- **Affected code**: Settings UI component (e.g., `app/dashboard/perfil/page.jsx`, `app/dashboard/configuracoes/page.jsx` or similar), and `app/dashboard/suporte/page.jsx`.
- **User Experience**: Users can securely and reliably access the Helpdesk using the designated entry point without any navbar/sidebar clutter.
