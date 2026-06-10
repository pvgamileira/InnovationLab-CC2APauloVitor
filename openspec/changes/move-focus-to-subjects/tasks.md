## 1. Clean Sidebar

- [x] 1.1 Open `app/dashboard/layout.jsx`.
- [x] 1.2 Locate the `navItems` or equivalent sidebar navigation array/links.
- [x] 1.3 Remove the "Foco" link completely from the sidebar.

## 2. Add Focus Button to Subjects

- [x] 2.1 Open `app/dashboard/disciplinas/page.jsx`.
- [x] 2.2 Import `Timer` or `Play` from `lucide-react` (if not already imported) and `Link` from `next/link`.
- [x] 2.3 Locate the `subjects.map(subj => ...)` rendering logic.
- [x] 2.4 Inside the Subject card, recreate the floating action buttons area `div` (absolute top-4 right-4) or add the button next to the title.
- [x] 2.5 Add a `Link` pointing to `/dashboard/foco`.
- [x] 2.6 Style the `Link` as a button (e.g., `p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-gray-400 hover:text-emerald-400 transition-all cursor-pointer`) with the title "Iniciar Modo Foco".
- [x] 2.7 Render the `Timer` or `Play` icon inside the button.
