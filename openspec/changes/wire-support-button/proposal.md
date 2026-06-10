## Why

The newly created Support Helpdesk page is currently inaccessible because the existing "Abrir chamado de suporte" button in the Settings area was not wired to navigate to it. We need to connect this button to `/dashboard/suporte` and verify that the Helpdesk page itself renders correctly.

## What Changes

- **Wire Support Button**: Locate the existing support button in the Settings area (e.g., `app/dashboard/perfil/page.jsx` or similar) and wrap it in a `<Link href="/dashboard/suporte">` or use `router.push('/dashboard/suporte')`.
- **Verify Support Page**: Ensure `app/dashboard/suporte/page.jsx` uses `'use client'`, implements a glassmorphism container, and correctly handles form submission with a simulated delay and a success toast. (This was mostly implemented, but we must verify and ensure it strictly adheres to all current constraints).

## Capabilities

### New Capabilities
- `wire-support`: Connects the existing Settings UI to the Helpdesk page, providing users with a clear navigation path.

### Modified Capabilities

## Impact

- **Affected code**: Settings UI component (likely `app/dashboard/perfil/page.jsx` or similar). `app/dashboard/suporte/page.jsx` will be verified.
- **User Experience**: Users can now smoothly navigate to the Helpdesk page from the Settings area.
