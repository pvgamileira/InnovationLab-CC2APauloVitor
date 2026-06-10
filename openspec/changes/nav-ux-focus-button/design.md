## Context

The current UI design has the "Foco" button placed inside each Subject card, which clutters the cards. The mobile navigation bar is also overcrowded with more than 5 items, causing visual overflow. We need to implement isolated UI updates to move the "Foco" button to the main header of the Disciplinas page, add it to the global desktop sidebar, strictly limit the mobile bottom nav to 5 items, and add quick-access tiles to the mobile dashboard.

## Goals / Non-Goals

**Goals:**
- Relocate "Modo Foco" button from Subject cards to the top-right header of `app/dashboard/disciplinas/page.jsx`.
- Add "Foco" to the main `menuGroups` in `app/dashboard/layout.jsx` for desktop visibility.
- Restrict `mobileLinks` array to 5 core items ("Painel", "Disciplinas", "Caderno", "Estatísticas", "Perfil").
- Add a new `md:hidden` block in `app/dashboard/page.jsx` containing premium glassmorphism buttons for "Agenda" and "Foco".

**Non-Goals:**
- Modifying XP sync logic, database calls, or Kanban state.
- Refactoring global UI themes.
- Converting any components to TypeScript.

## Decisions

- **Header Layout Modification**: In `app/dashboard/disciplinas/page.jsx`, the header will be updated to use flexbox (`flex justify-between items-start`) to align the title on the left and the new "Modo Foco" button on the right.
- **Mobile Links Filter**: The filter for `mobileLinks` in `app/dashboard/layout.jsx` will explicitly define the 4 main items + 1 user item: `['Painel', 'Disciplinas', 'Caderno', 'Estatísticas']` (Perfil is added separately). This guarantees exactly 5 items.
- **Dashboard Quick Access**: In `app/dashboard/page.jsx`, we will inject a new `<div className="flex md:hidden gap-3 mb-6">` near the top, rendering two `<Link>` components styled as premium tiles (`flex-1 py-4 text-center font-bold bg-white/5 border border-white/10 rounded-2xl`).

## Risks / Trade-offs

- **Risk**: The header in the Disciplinas page might break on very small screens.
  - **Mitigation**: Using flex-wrap or ensuring the button size is constrained so it remains responsive.
