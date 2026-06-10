## Why

Currently, the user's Profile page (`app/dashboard/perfil/page.jsx`) displays all information at once, resulting in a cluttered interface. Specifically, the "Badges/Conquistas" grid is located directly below the main user information section, making it visually overwhelming. To enhance the UI/UX and adhere to modern design principles, we need to implement a sleek Tab navigation system to logically separate "Visão Geral" (user info) from "Conquistas" (badges).

## What Changes

1. **State Implementation**: Introduce an `activeTab` state in `app/dashboard/perfil/page.jsx` to track which section the user is currently viewing.
2. **Tab UI Construction**: Build a dynamic tab navigation bar below the main header with two tabs: "Visão Geral" and "Conquistas". The active tab will have a prominent blue underline (`#3a86ff`) and white text, while the inactive tab will be grayed out.
3. **Conditional Rendering**: Wrap the existing user information card/grid in a conditional block that only renders when the `activeTab` is `'geral'`. Similarly, wrap the Badges grid in a block that only renders when the `activeTab` is `'conquistas'`.

## Capabilities

### New Capabilities
- `profile-tab-navigation`: Users can now switch between their general overview and their unlocked badges via a tabbed interface.

### Modified Capabilities
- `profile-ui`: The layout is cleaner and reduces cognitive load by segmenting information.

## Impact

- **Affected code**: Only `app/dashboard/perfil/page.jsx` will be modified.
- **User Experience**: The profile page will feel less cluttered, more organized, and easier to navigate.
