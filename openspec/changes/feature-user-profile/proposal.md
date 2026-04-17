## Why

The EduTrack AI platform lacks a personalized identity hub. While users can track their tasks, subjects, and Pomodoro time, they don't have a centralized location to view their meta-progress. The Premium User Profile Dashboard serves as a "Character Sheet" that reinforces the application's gamification system (XP/Levels) and provides a sense of cohesive identity for the student.

## What Changes

- Creation of `app/dashboard/perfil/page.jsx` utilizing `"use client"`.
- Implementation of a glassmorphism Profile Header Card containing highly specific academic placeholder data.
- Implementation of a Gamification Stats grid highlighting Level, XP, Total Tasks, and Study Hours.
- Extensive use of `framer-motion` to animate the entry sequence of the user's data blocks, providing a premium, native-app feel.

## Capabilities

### New Capabilities
- `user-profile-identity`: A high-end visual representation of the user leveraging the Rich Black / Metallic Blue aesthetic.
- `gamification-dashboard`: A grid breaking down meta-statistics mapped to static UI (MVP).

### Modified Capabilities
- None. (This is purely a frontend UI creation, deferring complex Supabase fetching of meta-stats for a future sprint).

## Impact

- **New Route**: Establishes the previously blank `/dashboard/perfil` route.
- **Dependencies**: Leverages existing `framer-motion`, `lucide-react`, and Tailwind integrations.
