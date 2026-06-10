## Why

On mobile devices, the bottom navigation bar is truncating or overflowing because there are too many items to display comfortably. We need to explicitly hide non-core items from the mobile bottom nav while still providing quick access to them through prominent shortcuts directly on the mobile Dashboard screen.

## What Changes

- **Bottom Navigation**: Adjust the mobile links array in `app/dashboard/layout.jsx` to limit the bottom navigation to max 4 core items (Painel, Disciplinas, Caderno, Perfil), removing Agenda, Foco, and Estatísticas from the mobile view.
- **Mobile Dashboard Shortcuts**: Add a new mobile-only section to `app/dashboard/page.jsx` with quick-access buttons for "Agenda" and "Foco".
- **Restore Foco Link Context**: Ensure the "Foco" link is available in the data structures if needed, though hidden on mobile nav.

## Capabilities

### New Capabilities
- `mobile-nav-optimization`: Optimized bottom navigation bar for mobile devices, limiting the number of visible items.
- `mobile-quick-actions`: Mobile-only quick access buttons on the dashboard for secondary features like Agenda and Foco.

### Modified Capabilities

## Impact

- **Affected code**: `app/dashboard/layout.jsx` and `app/dashboard/page.jsx`.
- **User Experience**: Mobile users will have a cleaner bottom navigation bar and more discoverable secondary features on their main dashboard.
