## 1. Setup Context
- [x] 1.1 Open `app/dashboard/page.jsx`.
- [x] 1.2 Import `useUserContext` from `@/context/UserContext`.
- [x] 1.3 Inside `DashboardHome`, extract `const { userData } = useUserContext();`.

## 2. Sync XP and Level
- [x] 2.1 Locate the header container with the Level and XP text (currently "Lv. 2" and "0 / 500 XP").
- [x] 2.2 Update the Level text to: `Lv. {userData?.level || 1}`.
- [x] 2.3 Update the XP text to: `{userData?.xp || 0} / {userData?.level ? userData.level * 500 : 500} XP`.
- [x] 2.4 Update the progress bar's `style` attribute: `style={{ width: \`\${Math.min(((userData?.xp || 0) / ((userData?.level || 1) * 500)) * 100, 100)}%\` }}`.

## 3. Integrate Badges (Insignias) Widget
- [x] 3.1 Import `Moon, Target, Flame` from `lucide-react`.
- [x] 3.2 Import `Link` from `next/link`.
- [x] 3.3 Locate the `<div>` containing the "INSÍGNIAS" label.
- [x] 3.4 Wrap that entire `<div>` with `<Link href="/dashboard/perfil"> ... </Link>`.
- [x] 3.5 Add `hover:scale-105 transition-transform cursor-pointer` to the `className` of the `<div>` holding the insignias section.
- [x] 3.6 Replace the three placeholder inner `div` circles with the dynamic icons: Moon (purple), Target (emerald), and Flame (orange). Maintain the overlapping `-ml-3` and `z-index` styling.
