# Tarefas: Implement Mobile Bottom Navigation for Dashboard

- [x] **Define Mobile Navigation Links**
  - [x] Open `app/dashboard/layout.jsx`.
  - [x] Identify the existing `mobileLinks` variable or create a new array containing key links: Painel, Disciplinas, Estatísticas, and Configurações.

- [x] **Update Main Container Padding**
  - [x] Locate the `<main>` tag wrapping `{children}`.
  - [x] Ensure it has padding bottom on mobile: `pb-24 md:pb-0` so content is not obscured.

- [x] **Render Bottom Navigation**
  - [x] Locate the existing mobile `<nav>` at the bottom of the file (or replace it if it's outdated).
  - [x] Ensure it has the wrapper classes: `md:hidden fixed bottom-0 left-0 w-full h-[85px] bg-[#0a0c14]/95 backdrop-blur-2xl border-t border-white/5 z-50 flex items-center justify-around px-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]`.
  - [x] Map over the mobile navigation links.
  - [x] Apply conditional styling for the active state (`text-[#3a86ff]` vs `text-gray-500`).
