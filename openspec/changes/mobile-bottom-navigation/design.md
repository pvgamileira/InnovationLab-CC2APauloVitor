# Design: Implement Mobile Bottom Navigation for Dashboard

## Abordagem Técnica

### 1. Update Layout Component
- **Target:** `app/dashboard/layout.jsx`
- **Change:** Add a new `<nav>` element specifically for mobile devices.
- **Logic:**
  - Create an array of primary mobile navigation links: Painel (`/dashboard`), Disciplinas (`/dashboard/disciplinas`), Estatísticas (`/dashboard/estatisticas`), and Configurações (`/dashboard/configuracoes`).
  - Render a `<nav>` tag directly inside the main wrapper layout, below the `<main>` tag.
  - Apply styling: `md:hidden fixed bottom-0 left-0 w-full h-[85px] bg-[#0a0c14]/95 backdrop-blur-2xl border-t border-white/5 z-50 flex items-center justify-around px-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]`.
  - Iterate over the mobile navigation links to render `<a>` tags.
  - Compare `pathname === link.href` to determine active state. If active, color is `#3a86ff` (blue), otherwise `gray-500`.

### 2. Layout Spacing Fix
- To ensure content isn't hidden behind the newly added bottom navigation on mobile, we must ensure the `<main>` tag has adequate bottom padding on small screens.
- **Change:** Add `pb-24 md:pb-0` to the `<main>` container class list.

### 3. Constraints
- Pure JavaScript and Tailwind CSS.
- Strictly do not modify the existing desktop sidebar.
- Maintain existing dark glassmorphism styling parameters.
