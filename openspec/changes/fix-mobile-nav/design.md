## Context

The bottom navigation bar on mobile devices is currently rendering too many items, causing overflow or truncation issues. This leads to a poor mobile experience. We need to pare down the bottom navigation to a maximum of 4 core items while maintaining accessibility to the removed items via shortcuts on the main dashboard.

## Goals / Non-Goals

**Goals:**
- Restrict the mobile bottom navigation bar in `app/dashboard/layout.jsx` to show only: Painel, Disciplinas, Caderno, and Perfil.
- Exclude "Agenda", "Estatísticas", and "Foco" from the mobile navigation bar.
- Add quick-access buttons for "Agenda" and "Foco" to the top of `app/dashboard/page.jsx`, visible only on mobile screens (`md:hidden`).

**Non-Goals:**
- Changing the desktop sidebar (the items should remain there).
- Changing the logic of the target pages.

## Decisions

- **Layout Modification**: The `mobileLinks` array in `app/dashboard/layout.jsx` is already dynamically created. We will adjust the filter condition: `['Painel', 'Disciplinas', 'Caderno']` and the hardcoded `Perfil` link at the end to ensure we only have 4 items max.
- **Dashboard Shortcuts**: We will create a new responsive `div` block at the top of the dashboard page (`app/dashboard/page.jsx`) that uses Tailwind's `block md:hidden` to only render on mobile. This block will contain a CSS Grid (`grid-cols-2`) with two big, tap-friendly `Link` components for "Agenda" and "Foco".

## Risks / Trade-offs

- **Risk**: Cluttering the top of the dashboard on mobile.
  - **Mitigation**: The new shortcuts will be styled minimally (e.g., glassmorphism panels `bg-white/5` with borders) to blend naturally with the existing dashboard design language without being overly distracting.
