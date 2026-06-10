## Context

The profile page (`app/dashboard/perfil/page.jsx`) currently displays user stats (XP, level, email). We are enhancing it by adding a "Conquistas" (Badges) section directly below the profile data to increase gamification engagement without cluttering the sidebar.

## Goals / Non-Goals

**Goals:**
- Render a static list of 5 gamification badges inside the Profile page.
- Distinguish between unlocked and locked badges visually using opacity, grayscale, colors, and borders.
- Make the badges grid responsive.

**Non-Goals:**
- Implementing the actual logic to dynamically unlock these badges in the backend (they are static UI elements for now, some hardcoded to `true` and some to `false`).
- Altering existing XP or Level display components.

## Decisions

- **Data Structure**: A constant array `BADGES_LIST` will be defined outside the component to hold badge metadata (id, name, desc, icon, unlocked status, and tailwind color classes).
- **Icons Mapping**: We will use a mapping object or dynamic element mapping for the `lucide-react` icons (Moon, Zap, Target, Flame, TrendingUp, Lock).
- **Styling Strategy**: 
  - If `unlocked` is true, apply the badge's custom color, background, and border classes (e.g., `text-purple-400`, `bg-purple-500/20`, etc.).
  - If `unlocked` is false, apply grayscale and opacity (`grayscale opacity-50 bg-white/5 border-white/10`) and display a small Lock icon to signify it is pending.

## Risks / Trade-offs

- **Risk**: Hardcoded data for badges.
  - **Mitigation**: This is explicitly an UI update. Dynamic fetching logic can be added later without changing the UI representation.
