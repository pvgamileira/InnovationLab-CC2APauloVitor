## 1. Setup Badges Data and Icons

- [x] 1.1 Open `app/dashboard/perfil/page.jsx`.
- [x] 1.2 Update the `lucide-react` imports to include `Moon`, `Zap`, `Target`, `Flame`, `TrendingUp`, and `Lock`.
- [x] 1.3 Define the `BADGES_LIST` constant array outside the component exactly as specified in the context.

## 2. Implement Badges UI Section

- [x] 2.1 Locate the bottom of the main profile UI (below the main user information card/grid).
- [x] 2.2 Add the section header: `<h3 className="text-2xl font-bold mt-10 mb-6">Minhas Conquistas</h3>`.
- [x] 2.3 Create a responsive grid container for the badges: `<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">`.

## 3. Render Badges Cards

- [x] 3.1 Map over `BADGES_LIST` inside the grid.
- [x] 3.2 Determine the styling based on `badge.unlocked`. If unlocked, use full color (e.g. `border border-white/10 ${badge.border} ${badge.bg}`). If locked, use grayscale and opacity classes (e.g. `grayscale opacity-50 bg-white/5 border-white/10`).
- [x] 3.3 Render the dynamic icon using a switch or mapping object inside the badge card.
- [x] 3.4 If the badge is locked, render a small `Lock` icon overlay or beside the name.
- [x] 3.5 Display the badge name and description correctly formatted.
