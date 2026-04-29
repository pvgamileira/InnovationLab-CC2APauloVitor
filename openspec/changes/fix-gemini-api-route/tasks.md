# Tasks: Fix Gemini API Route

## 1. Update API Route Configuration
- [x] Open `app/api/gemini-insights/route.js`.
- [x] Add `export const dynamic = 'force-dynamic';` below the imports.

## 2. Update Model Selection
- [x] In `app/api/gemini-insights/route.js`, change `model: "gemini"` to `model: "gemini-1.5-flash"`.

## 3. Implement Detailed Error Logging in Backend
- [x] Update the `catch (error)` block in `app/api/gemini-insights/route.js`.
- [x] Return `{ error: error.message, name: error.name, stack: error.stack }` as JSON with a 500 status.

## 4. Extract Real Error on Frontend
- [x] Open `components/GlobalMentor.jsx`.
- [x] Locate the `fetchInsights` function.
- [x] Update the `!res.ok` block to `await res.json()` and `throw new Error(errData.error)`.
