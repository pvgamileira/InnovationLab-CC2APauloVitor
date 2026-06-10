## Why

Currently, the Dashboard header (`app/dashboard/page.jsx`) displays a hardcoded XP/Level indicator ("Lv. 2 0/500 XP") and static placeholder icons in the "INSÍGNIAS" section. These values do not reflect the actual state stored in the `useUserContext` (e.g., Level 5). To ensure a cohesive user experience, we need to bind this header to the global user state, dynamically calculate the progress bar, and display an interactive preview of the user's unlocked badges.

## What Changes

1. **Context Integration**: Import and extract `userData` from `useUserContext` inside `app/dashboard/page.jsx`.
2. **Dynamic Progress Bar**: 
   - Replace the hardcoded level with `{userData?.level || 1}`.
   - Replace the hardcoded XP text with `{userData?.xp || 0} / {userData?.level * 500 || 500} XP`.
   - Update the inline `width` style of the progress bar to calculate the percentage dynamically: `Math.min(((userData?.xp || 0) / ((userData?.level || 1) * 500)) * 100, 100)`.
3. **Insignias Widget**:
   - Import `Moon`, `Target`, and `Flame` from `lucide-react`.
   - Replace the static inner elements of the "INSÍGNIAS" section with these three icons (using Purple, Emerald, and Orange colors respectively to match the profile).
   - Wrap the entire "INSÍGNIAS" container in a Next.js `<Link href="/dashboard/perfil">` and add `hover:scale-105 transition-transform cursor-pointer` to convert it into a clickable widget.

## Capabilities

### New Capabilities
- `dashboard-badges-widget`: A new interactive widget on the dashboard header that previews unlocked badges and routes the user to their full profile.

### Modified Capabilities
- `dashboard-xp-tracker`: The dashboard header now accurately reflects real-time XP and Level progression fetched from the global context.

## Impact

- **Affected code**: `app/dashboard/page.jsx`.
- **User Experience**: Users will immediately see their correct Level, XP progress, and unlocked badges as soon as they log in, creating a more engaging and gamified experience.
