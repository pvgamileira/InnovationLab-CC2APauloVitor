## 1. Create UserContext

- [x] 1.1 Create file `context/UserContext.jsx`.
- [x] 1.2 Import `createContext`, `useContext`, `useState`, `useEffect` from `react` and `supabase` client.
- [x] 1.3 Create `UserProvider` component wrapping `{children}` and managing `userData` state.
- [x] 1.4 Implement `refreshUserData` async function to fetch `supabase.auth.getUser()` and update state.
- [x] 1.5 Export `UserProvider` and a `useUserContext` hook.

## 2. Wrap Application

- [x] 2.1 Open `app/dashboard/layout.jsx`.
- [x] 2.2 Import `UserProvider` from `context/UserContext.jsx`.
- [x] 2.3 Wrap `{children}` in `<UserProvider>` or wrap the entire dashboard tree in it.
- [x] 2.4 Refactor `app/dashboard/layout.jsx` to consume `useUserContext()` instead of its local `loadUserLevel` state logic for XP, Level, and Premium status.

## 3. Consume in Components

- [x] 3.1 Open `app/dashboard/page.jsx`.
- [x] 3.2 Remove local XP/Level state and the `useEffect` that fetches `supabase.auth.getUser()`.
- [x] 3.3 Import and use `useUserContext()` to display XP and Level.
- [x] 3.4 Open `app/dashboard/perfil/page.jsx`.
- [x] 3.5 Replace its local XP/Level state with the centralized `useUserContext()` data.

## 4. Real-Time Gamification Refresh

- [x] 4.1 Open `components/KanbanBoard.jsx`.
- [x] 4.2 Import `useUserContext()`.
- [x] 4.3 Locate the logic where a task is completed and `supabase.auth.updateUser` is called to add XP.
- [x] 4.4 Immediately call `refreshUserData()` after the update so the HUD and other components reflect the new XP and Level instantly.
