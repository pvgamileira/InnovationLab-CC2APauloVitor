## ADDED Requirements

### Requirement: Toast Client Context Directive
The toast context file MUST be initialized as a Next.js Client Component, beginning with `"use client";` as the absolute first line.

#### Scenario: Client directive presence
- **WHEN** ToastContext.jsx is compiled/loaded by Next.js App Router
- **THEN** Next.js successfully resolves all Client Context API features without SSR mismatches.

### Requirement: Toast UI Rendering in Provider
The `ToastProvider` component MUST render both `{children}` and a fixed container positioned at the bottom right (`fixed bottom-4 right-4 z-50`) mapping active toast objects to visual `div` boxes using the `animate-slide-in-right` animation class.

#### Scenario: Toast UI displays correctly
- **WHEN** a toast notification is created via `showToast`
- **THEN** a message box styled according to the context rules is rendered inside the fixed absolute container at the bottom-right of the viewport.

### Requirement: Dashboard Layout Integration
The dashboard layout file (`app/dashboard/layout.jsx`) MUST import and wrap the main render tree inside `ToastProvider`.

#### Scenario: Layout integrates ToastProvider
- **WHEN** the dashboard page layout renders
- **THEN** the children and workspace UI are wrapped within the active `ToastProvider` context.
