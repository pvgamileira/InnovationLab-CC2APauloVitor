## 1. Directory and Data Fetching
- [x] 1.1 Create `app/dashboard/caderno/page.jsx` utilizing `"use client"`.
- [x] 1.2 Implement the Supabase data fetching logic mapping `subjects` to the authenticated session context. 

## 2. Layout Structure & Navigation
- [x] 2.1 Implement the Page Header ("Caderno") and description.
- [x] 2.2 Create a horizontal scrollable pill-menu mapping the fetched `subjects` (with a default "Anotações Gerais" tab injected at `id: 'general'`).
- [x] 2.3 Add state variables `activeSubjectId`, `notesText`, and `saveStatus`.

## 3. Editor & Local Storage Sync
- [x] 3.1 Design the main editor using a large, borderless, seamless `<textarea>` wrapped in a glassmorphism container (`bg-[#05070e]/80`, `backdrop-blur-xl`).
- [x] 3.2 Implement `useEffect` for reading from `localStorage` whenever `activeSubjectId` changes.
- [x] 3.3 Implement `useEffect` with a standard Javascript timeout/debounce that writes `notesText` to `localStorage` a few milliseconds after the user stops typing. 
- [x] 3.4 Wire up the `saveStatus` UI indicator ("Salvando..." vs "Salvo localmente" + Check icon) positioned at the bottom or top-right of the editor.

## 4. Visual Polish
- [x] 4.1 Apply strict Rich Black / Neon accent theming (`text-[#3a86ff]`, neon outer shadows on selected tabs).
- [x] 4.2 Use Framer Motion or Tailwind transitions to fade in the text area when swapping tabs to create a snappy app-like sensation.
