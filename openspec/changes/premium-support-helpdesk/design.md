## Context

The application is entering Phase 2, which focuses on advanced UX and new features. Currently, there is no direct channel within the application for users to reach out to the development team or find answers to frequently asked questions. 

## Goals / Non-Goals

**Goals:**
- Provide a responsive Helpdesk component (`app/dashboard/suporte/page.jsx`).
- Implement a static FAQ list.
- Provide a functional (simulated) form for users to submit feedback or tickets using `use client` and `useState`.
- Adhere strictly to the established Premium Glassmorphism UI aesthetic.

**Non-Goals:**
- Creating a real backend or database table for ticket submission (we are simulating the submission with a delay).
- Complex authentication checks specific to the helpdesk (it's already protected by the dashboard layout).
- Using TypeScript (Strict rule: Pure JS/JSX).

## Decisions

- **Client Component**: Since we need form state (`category`, `subject`, `description`, `isSubmitting`), the page will be a `"use client"` component.
- **Two-Column Layout**: On desktop (`lg:grid-cols-12` or similar), we will split the layout to show the FAQ on the left (`col-span-5` or `col-span-4`) and the form on the right (`col-span-7` or `col-span-8`). On mobile, they will stack sequentially.
- **Submission Simulation**: We will use `await new Promise(r => setTimeout(r, 1500))` and `useToast` to provide immediate, realistic feedback to the user without touching the database schema at this moment.

## Risks / Trade-offs

- **Risk**: Since the submission is simulated, actual tickets will be lost.
  - **Mitigation**: This is acceptable for this development phase as we are focusing on UI/UX scaffolding first. Backend integration will be scheduled for a later phase.
