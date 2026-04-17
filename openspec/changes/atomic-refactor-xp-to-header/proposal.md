## Why

The current Gamification XP Widget occupies a large, prominent block between the dashboard header and the KPI cards, disrupting the visual hierarchy and consuming valuable screen real estate. Moving it to a compact, sleek strip inside the dashboard's own header frees up breathing room and makes the XP status feel like a persistent, ambient HUD element rather than a focal section.

## What Changes

- Remove the large `<GamificationWidget>` block from the main body of `app/dashboard/page.jsx`.
- Create a new compact component `components/XpHudBar.jsx` that renders:
  - A thin (4–6px) neon-glowing progress bar.
  - A `Lv. X` label and `150/500 XP` numeric value in a tiny elegant font.
- Integrate `XpHudBar` into the inline dashboard header (top-right area), passing `completedTasks` as a prop.
- Retire `components/GamificationWidget.jsx` (or leave it unused; it will no longer be imported).
- **Zero changes** to any API route, PDF logic, or Supabase queries.

## Capabilities

### New Capabilities
- `xp-hud-bar`: A minimal, header-embedded HUD strip showing Level, XP progress bar, and numeric XP value, replacing the old full-width widget.

### Modified Capabilities
None (the underlying XP calculation logic is unchanged; only the rendering location and visual size change).

## Impact

- `app/dashboard/page.jsx`: Remove `GamificationWidget` import and render block; add `XpHudBar` import and inline it in the header.
- `components/XpHudBar.jsx`: New file to create.
- `components/GamificationWidget.jsx`: Import removed from dashboard; file itself left in place but dormant.
- **No API routes, PDF scripts, or Supabase logic touched.**
