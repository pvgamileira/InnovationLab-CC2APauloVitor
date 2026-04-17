## 1. Setup & Data Fetching

- [x] 1.1 Create the directory structure `app/dashboard/agenda` and initialize `page.jsx` with the `"use client"` directive.
- [x] 1.2 Implement the Supabase data fetching logic: retrieve `academic_tasks` and `subjects` for the authenticated user via `useEffect()`.
- [x] 1.3 Create a memoized grouping function that transforms the flat tasks array into a dictionary map keyed by the `YYYY-MM-DD` representation of the task's `due_date`.

## 2. Calendar Logic (`date-fns`)

- [x] 2.1 Set up local state for `currentMonth` (`useState(new Date())`).
- [x] 2.2 Construct the calendar matrix logic: calculate the `startOfMonth`, `endOfMonth`, and the `startDate` (start of the week of the first day), then iterate using `addDays` to push all visible grid days into an array.
- [x] 2.3 Add handler functions utilizing `addMonths` and `subMonths` to step back and forth in time.

## 3. UI Implementation (Glassmorphism & Theming)

- [x] 3.1 Design the main page header featuring the Month/Year localized title and the dual chevron navigation buttons.
- [x] 3.2 Establish the 7-column CSS grid (`grid-cols-7`). Output the localized day-of-week headers (Dom, Seg, Ter...).
- [x] 3.3 Render the grid cells dynamically. Apply the core Glassmorphism styles (`bg-white/5 backdrop-blur border border-white/5 hover:border-white/20 transition-all`).
- [x] 3.4 Dim cells where `isSameMonth(day, currentMonth)` is false to visually distinguish the focal month from adjacent dates.

## 4. Task Badge Rendering

- [x] 4.1 Within each day cell mapping loop, assess the grouped task dictionary to find tasks mapped to that specific day.
- [x] 4.2 If tasks exist, render minimalist neon-bordered mini-badges inside the remaining cell space. Title should be truncated. Make sure the badge utilizes `text-[10px]` and tightly constrained padding to prevent cell overflow height issues.
