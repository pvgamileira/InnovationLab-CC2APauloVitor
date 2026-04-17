## 1. Setup

- [x] 1.1 Verify if `lucide-react` is installed in `package.json`, and install it if necessary.

## 2. Component Implementation

- [x] 2.1 Create a new component `GamificationWidget` (e.g., `components/GamificationWidget.jsx`).
- [x] 2.2 Implement the calculation logic: `totalXP = completedTasks * 50` and `level = Math.floor(totalXP / 500) + 1`.
- [x] 2.3 Build the basic UI shell using Tailwind CSS with glassmorphism classes (`bg-white/5 backdrop-blur-md border border-white/10`).
- [x] 2.4 Add typography and icons (`Zap` for XP, `Trophy` for Level) with neon blue/purple accents.
- [x] 2.5 Implement the progress bar dynamically calculating `(totalXP % 500) / 500 * 100` for width.
- [x] 2.6 Refine all text to ensure it is correctly translated to pt-BR (e.g., "Nível").

## 3. Dashboard Integration

- [x] 3.1 Import `GamificationWidget` into `app/dashboard/page.jsx` or equivalent dashboard page.
- [x] 3.2 Render the widget at the top of the dashboard.
- [x] 3.3 Pass the existing `completedTasks` data to the `GamificationWidget` as a prop.
- [x] 3.4 Verify responsive alignment and spacing relative to existing dashboard content.
