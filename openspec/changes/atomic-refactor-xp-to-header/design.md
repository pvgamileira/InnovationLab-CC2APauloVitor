## Context

The dashboard `page.jsx` renders a self-contained layout with no shared sidebar or persistent header component — the header is an inline JSX block at the top of the page return. The previous `GamificationWidget` was a full-width card (80px+ tall) inserted between the header and KPI cards. The refactor keeps the same props interface (`completedTasks`) and XP formulas, but drastically reduces the visual footprint.

## Goals / Non-Goals

**Goals:**
- Create `XpHudBar` as a self-contained component consuming one prop: `completedTasks`.
- Render a 4–6px progress bar with box-shadow neon glow (blue/purple) — achievable with `h-1.5` + Tailwind `shadow-[0_0_8px_...]`.
- Show `Lv. X` and `150/500 XP` inline in a compact single row, `text-xs` font.
- Place the HUD in the top-right area of the existing dashboard header flex row.
- Remove the old `GamificationWidget` import and render block entirely from `page.jsx`.

**Non-Goals:**
- Building a shared layout header or sidebar.
- Animating the progress bar on load (keep it simple/static fill).
- Touching `app/api/generate-report/route.js` or `scripts/generate_report.py` in any way.
- Changing Supabase queries or authentication logic.

## Decisions

- **Component location**: `components/XpHudBar.jsx` — consistent with existing component conventions.
- **Styling**: Pure Tailwind CSS inline. The bar uses `bg-gradient-to-r from-[#3a86ff] to-purple-500` fill, `h-1.5 rounded-full`, wrapped in a `bg-white/5 rounded-full` track. Glow via `drop-shadow` or `shadow-[0_0_6px_rgba(58,134,255,0.8)]` on the fill div.
- **XP math stays identical**: `totalXP = completedTasks * 50`, `level = Math.floor(totalXP / 500) + 1`, `progress = (totalXP % 500) / 500 * 100`.
- **Header placement**: The existing header is `flex flex-col md:flex-row md:items-end justify-between`. `XpHudBar` slots into the right side next to the action buttons row, shrunk to `w-40` or similar constrained width so it doesn't compete with CTAs.

## Risks / Trade-offs

- **Risk**: The header is already dense with 3 action buttons on smaller screens → **Mitigation**: `XpHudBar` is hidden on `sm` and below (`hidden sm:flex`) to avoid crowding.
- **Risk**: `GamificationWidget.jsx` remains as dead code → **Mitigation**: Acceptable for now; a future cleanup chore can remove it.
