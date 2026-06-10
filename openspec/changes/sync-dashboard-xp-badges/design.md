## Architecture

- **Page**: `app/dashboard/page.jsx`
- **Data Source**: Context API via `useUserContext`.

## Components

### 1. Context Integration
- Import `useUserContext` from `@/context/UserContext`.
- Destructure `userData` from the hook execution inside `DashboardHome`.

### 2. Header XP and Level Section
- Locate the element displaying `Lv. 2`. Replace `2` with `{userData?.level || 1}`.
- Locate the element displaying `0 / 500 XP`. Replace `0` with `{userData?.xp || 0}` and `500` with `{userData?.level ? userData.level * 500 : 500}`.
- Update the progress bar's inline style `width` to be calculated dynamically:
  ```jsx
  style={{ width: `${Math.min(((userData?.xp || 0) / ((userData?.level || 1) * 500)) * 100, 100)}%` }}
  ```

### 3. Insignias Widget Wrapper
- Import `Link` from `next/link`.
- Locate the "INSÍGNIAS" block (it contains text "INSÍGNIAS" and circular placeholders).
- Wrap the entire block within `<Link href="/dashboard/perfil"> ... </Link>`.
- Add classes `hover:scale-105 transition-transform cursor-pointer` to the wrapper div to make it interactive.

### 4. Insignias Icons
- Import `Moon`, `Target`, and `Flame` from `lucide-react`.
- Replace the existing `div` placeholder circles with:
  1. Moon icon: `bg-purple-500/20 border-purple-500/30 text-purple-400`.
  2. Target icon: `bg-emerald-500/20 border-emerald-500/30 text-emerald-400`.
  3. Flame icon: `bg-orange-500/20 border-orange-500/30 text-orange-400`.
- The exact markup inside the flex container should look like:
  ```jsx
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-500/20 border border-purple-500/30 z-20">
      <Moon className="w-4 h-4 text-purple-400" />
  </div>
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-emerald-500/20 border border-emerald-500/30 -ml-3 z-10">
      <Target className="w-4 h-4 text-emerald-400" />
  </div>
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-orange-500/20 border border-orange-500/30 -ml-3 z-0">
      <Flame className="w-4 h-4 text-orange-400" />
  </div>
  ```

## Constraints

- Pure JS/JSX. NO TypeScript.
- Do not alter any statistics cards or the `Suspense` boundaries below the header. Ensure all modifications remain strictly within the header bounds.
