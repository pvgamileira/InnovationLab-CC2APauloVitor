## Context

The global toast notification system in the application is managed via a Context API. However, due to Next.js App Router rules, files utilizing React's context must specify `"use client";`. In addition, the visual components of toast rendering were deleted when `components/Toast.jsx` was removed. The `ToastProvider` must now contain the mapping and rendering of toast UI boxes directly.

## Goals / Non-Goals

**Goals:**
- Add `"use client";` directive at the absolute top of `context/ToastContext.jsx`.
- Re-integrate the toast rendering logic directly inside `ToastProvider` rendering block.
- Adjust toast container location to bottom-right (`fixed bottom-4 right-4 z-50`).
- Ensure toast boxes use Tailwind animations like `animate-slide-in-right`.
- Verify layout wrapping in `app/dashboard/layout.jsx`.

**Non-Goals:**
- Creating a separate `components/Toast.jsx` file (rendering should be inline in `ToastProvider` for maximum reliability and simplicity).
- Re-architecting the state management or duration logic of `ToastProvider`.

## Decisions

### Decision 1: Inline Rendering of Toasts inside ToastProvider
- **Option A**: Recreate a separate `components/Toast.jsx` component.
- **Option B (Chosen)**: Render the toast HTML elements inline inside `ToastProvider`'s return statement.
- **Rationale**: Keeps the context logic self-contained, reducing import complexity and avoiding broken imports/dependencies.

### Decision 2: Repositioning Container
- **Option A**: Keep container at `fixed top-6 right-6 z-[9999]`.
- **Option B (Chosen)**: Change container to `fixed bottom-4 right-4 z-50`.
- **Rationale**: Matches the requested styling specification exactly, keeping consistent with standard mobile/web notifications placements.

## Risks / Trade-offs

- **Risk**: Overlap with other floating elements (e.g. mobile navigation bar, GlobalMentor).
  - *Mitigation*: Set appropriate z-index (`z-50` or higher) and spacing so the toasts remain visible and clickable without blocking crucial features.
