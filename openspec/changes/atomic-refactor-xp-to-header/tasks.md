## 1. New Component

- [x] 1.1 Create `components/XpHudBar.jsx` with `completedTasks` prop (default 0).
- [x] 1.2 Implement XP logic: `totalXP = completedTasks * 50`, `level = Math.floor(totalXP / 500) + 1`, `progress = (totalXP % 500) / 500 * 100`.
- [x] 1.3 Render a single flex row with: `Lv. X` label, thin progress bar track + fill, and `X/500 XP` text — all `text-xs` and compact.
- [x] 1.4 Style the progress bar fill with `bg-gradient-to-r from-[#3a86ff] to-purple-500`, `h-1.5 rounded-full`, and a neon glow via `shadow-[0_0_6px_rgba(58,134,255,0.9)]`.

## 2. Dashboard Cleanup

- [x] 2.1 Remove the `import GamificationWidget from '@/components/GamificationWidget'` line from `app/dashboard/page.jsx`.
- [x] 2.2 Remove the `{/* Gamification Widget */}` block (the `<div className="mb-10">` wrapper and `<GamificationWidget>` element) from the dashboard JSX.

## 3. Header Integration

- [x] 3.1 Import `XpHudBar` at the top of `app/dashboard/page.jsx`.
- [x] 3.2 Place `<XpHudBar completedTasks={completedTasks} />` inside the header's right-side flex container (alongside the PDF export + action buttons), wrapped in `hidden sm:flex items-center`.
