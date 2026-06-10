## 1. Disciplinas Page - Header & Card Cleanup

- [x] 1.1 Open `app/dashboard/disciplinas/page.jsx`.
- [x] 1.2 Locate the `<header>` section at the top of the page. Modify its container to use Flexbox (e.g., `flex flex-col md:flex-row md:justify-between md:items-start`).
- [x] 1.3 Add a new `Link` component inside the header on the right side for `/dashboard/foco`.
- [x] 1.4 Style the `Link` button with a premium background (e.g., `bg-[#3a86ff] hover:bg-[#2563eb] text-white py-2 px-4 rounded-xl flex items-center gap-2 font-bold transition-all`). Include the `Timer` icon from `lucide-react` inside it.
- [x] 1.5 Locate the `subjects.map` rendering block and completely remove any existing `Link` or button for "Foco" (the one added in the previous session) from inside the subject cards.

## 2. Desktop Navbar & Mobile Restraint

- [x] 2.1 Open `app/dashboard/layout.jsx`.
- [x] 2.2 In the `menuGroups` array, add "Foco" to the main navigation (e.g., `title: 'Principal'`) with `href: '/dashboard/foco'` and `icon: Timer` (import `Timer` from `lucide-react` if needed).
- [x] 2.3 Locate the `mobileLinks` variable definition. Ensure it explicitly maps ONLY to `['Painel', 'Disciplinas', 'Caderno', 'Estatísticas']` (assuming 'Perfil' is still rendered separately). Verify the final mobile navigation contains exactly 5 items and excludes 'Agenda' and 'Foco'.

## 3. Mobile Dashboard Quick Access

- [x] 3.1 Open `app/dashboard/page.jsx`.
- [x] 3.2 Locate the `md:hidden` block that was added for mobile quick access.
- [x] 3.3 Ensure the container is `flex gap-3 mb-6` or a grid, containing exactly two buttons: "Ver Agenda" and "Modo Foco".
- [x] 3.4 Style both buttons as premium glassmorphism tiles (`flex-1 py-4 text-center font-bold bg-white/5 border border-white/10 rounded-2xl`). Update their text to match the requested design ("📅 Ver Agenda" and "⏱️ Modo Foco").
