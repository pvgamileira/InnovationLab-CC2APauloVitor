## 1. Fix Bottom Nav

- [x] 1.1 Open `app/dashboard/layout.jsx`.
- [x] 1.2 Locate the `mobileLinks` array mapping near the top of the component return.
- [x] 1.3 Ensure the `mobileLinks` array only includes 'Painel', 'Disciplinas', and 'Caderno' explicitly (along with the hardcoded 'Perfil' link at the bottom) so it renders max 4 items.
- [x] 1.4 Optional: Verify there are no duplicate or conflicting `mobileLinks` arrays.

## 2. Add Mobile Quick Access Shortcuts

- [x] 2.1 Open `app/dashboard/page.jsx`.
- [x] 2.2 Import `Calendar`, `Timer`, and `Target` from `lucide-react` if not already imported.
- [x] 2.3 Locate the main header section in the mobile view (`<header className="...">`).
- [x] 2.4 Add a new `div` below the header or at the top of the content that is visible ONLY on mobile (`block md:hidden mb-6`).
- [x] 2.5 Inside this new `div`, create a grid (`grid grid-cols-2 gap-4`).
- [x] 2.6 Add two `Link` components (`next/link`) inside the grid: one for `/dashboard/agenda` and one for `/dashboard/foco`.
- [x] 2.7 Style the `Link` components as large, tap-friendly buttons (e.g., `bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center text-sm font-bold active:scale-95 transition-transform`).
- [x] 2.8 Add appropriate icons inside the buttons (`Calendar` for Agenda, `Target` or `Timer` for Foco).
