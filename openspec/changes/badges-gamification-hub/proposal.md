## Why

To keep the sidebar clean and organized, we need to group gamification features together. A "Conquistas" (Badges/Achievements) system directly integrated into the Profile page will add massive UX value and drive gamification without cluttering the main navigation.

## What Changes

- Add a static list of predefined Badges in `app/dashboard/perfil/page.jsx`.
- Implement a responsive grid below the user's existing profile data to display the "Minhas Conquistas".
- Active/Unlocked badges will be rendered with full color, glowing borders, and their specific icons.
- Inactive/Locked badges will be rendered in grayscale with a `Lock` icon, indicating they are yet to be achieved.

## Capabilities

### New Capabilities
- `profile-badges`: Display of unlocked and locked gamification badges inside the Profile page.

### Modified Capabilities

## Impact

- **Affected code**: `app/dashboard/perfil/page.jsx`
- **UI additions**: A new section added to the user's profile view. existing XP, level, and email displays remain untouched.
