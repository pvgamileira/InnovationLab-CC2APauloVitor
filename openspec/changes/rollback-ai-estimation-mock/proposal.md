## Why

The recent integration of the real Google Gemini API for Predictive Task Estimation is causing fatal 500 errors in the production environment due to dependency and environment configuration issues. With the project deadline arriving tomorrow, an emergency "Code Freeze" is in effect. We must rollback the AI estimation to a robust local mock (Smoke and Mirrors) to guarantee 100% stability for the upcoming presentation while preserving the visual "Alive AI" illusion.

## What Changes

- **Remove API Dependency**: Delete the backend route (`app/api/ai/estimativa`) completely to prevent Next.js build errors.
- **Implement Robust Local Mock**: Replace the `fetch` call in the Task Modal (`components/NovaTarefaModal.jsx` or equivalent) with a fast, regex-based heuristic logic.
- **Maintain UI Illusion**: The UI will still show the pulsing "Calculando..." state with an artificial `setTimeout` delay of 600ms before revealing the mock estimate, perfectly simulating a real API call.

## Capabilities

### Modified Capabilities
- `ai-ghost-estimation`: The effort estimation will revert to a robust, client-side regex heuristic instead of fetching from a live AI model, prioritizing deployment stability over dynamic intelligence.

## Impact

- **Affected code**: 
  - `app/api/ai/estimativa/route.js` (**DELETE**)
  - Task Creation Modal logic (`app/dashboard/page.jsx`)
- **System Architecture**: Removes the server-side proxy endpoint, reducing external dependencies to zero for this feature.
- **User Experience**: The user will perceive identical behavior (loading state followed by an estimate), but the estimates will be deterministic based on title keywords.
