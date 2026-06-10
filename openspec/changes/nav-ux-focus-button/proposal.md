## Why

The current placement of the "Foco" button inside individual Subject cards is aesthetically displeasing and clutters the interface. Additionally, the mobile bottom navigation bar remains overcrowded and needs strict limiting to 5 items. We need to move the "Foco" access to a cleaner, top-level location on both desktop and mobile while providing optimized mobile shortcuts.

## What Changes

- **Disciplinas Page Update**: Remove the "Foco" button from the Subject cards and add a prominent "Modo Foco" button to the top-right header of the Disciplinas page.
- **Desktop Sidebar Update**: Add the "Foco" link to the main navigation array (`menuGroups`) in the layout so it is always accessible on desktop.
- **Mobile Navigation Constraint**: Explicitly limit the mobile bottom navigation to 5 core items ("Painel", "Disciplinas", "Caderno", "Estatísticas", and "Perfil"). "Agenda" and "Foco" will be strictly excluded.
- **Mobile Dashboard Shortcuts**: Enhance the mobile-only section in `app/dashboard/page.jsx` to render two premium glassmorphism buttons for "Ver Agenda" and "Modo Foco".

## Capabilities

### New Capabilities
- `nav-ux-improvements`: Enhanced navigation structures on desktop (adding Foco to sidebar) and mobile (restricting bottom nav to 5 items, adding dashboard shortcuts).
- `focus-button-relocation`: Relocation of the Focus Mode entry point from Subject cards to the Disciplinas page header.

### Modified Capabilities

## Impact

- **Affected code**: `app/dashboard/disciplinas/page.jsx`, `app/dashboard/layout.jsx`, and `app/dashboard/page.jsx`.
- **User Experience**: Cleaner Subject cards, more prominent and accessible "Modo Foco" buttons, and an uncluttered mobile navigation bar.
