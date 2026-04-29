# Tasks: Implement AI Copilot in Notebook

## 1. Create API Route
- [x] Create `app/api/gemini-copilot/route.js`.
- [x] Add `export const dynamic = 'force-dynamic';`.
- [x] Set up Supabase authentication check using Authorization headers.
- [x] Parse `noteContent` from request body.
- [x] Call `gemini-2.5-flash` with the specified system prompt.
- [x] Return the generated content or standard JSON error.

## 2. Update Frontend UI
- [x] Open `app/dashboard/caderno/page.jsx`.
- [x] Import `Sparkles` from `lucide-react` (if not already there).
- [x] Add states for `isCopilotLoading` and `aiResponse`.
- [x] Add the "Aprimorar com IA" button in the toolbar, implementing the `from-[#3a86ff] to-[#2563eb]` gradient style.

## 3. Implement Integration Logic
- [x] Create `handleCopilotEnhance` function inside `page.jsx`.
- [x] Send `POST` to `/api/gemini-copilot` with `notesText`.
- [x] Manage loading, success, and error states elegantly.

## 4. Render AI Response
- [x] Add a display section below the textarea to show the AI output when `aiResponse` exists.
- [x] Style the section using `bg-[#0a0c14]/80`, `backdrop-blur-xl`, `border border-white/5`.
- [x] Add a close button to dismiss the AI response if the user wants to continue typing normally.
