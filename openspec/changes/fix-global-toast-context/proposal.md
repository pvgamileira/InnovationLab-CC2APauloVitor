## Why

In Next.js App Router, Context API files must be Client Components to function properly. Currently, the global notification system is failing to render the visual toast alerts because the helper toast component was deleted and the context configuration requires optimization and verification.

## What Changes

- Add `"use client";` as the absolute first line of `context/ToastContext.jsx`.
- Update `ToastProvider` to output both `{children}` and a fixed absolute container (`fixed bottom-4 right-4 z-50`) mapping active toasts to render the UI `div` boxes using the `animate-slide-in-right` Tailwind classes.
- Verify `app/dashboard/layout.jsx` imports `ToastProvider` and wraps children.

## Capabilities

### New Capabilities
- None

### Modified Capabilities
- `global-toasts`: Restoring visual rendering and correct client-side context initialization.

## Impact

- `context/ToastContext.jsx`: Main file being updated.
- `app/dashboard/layout.jsx`: Layout file to verify.
