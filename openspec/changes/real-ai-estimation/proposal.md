## Why

The UI for Predictive Task Estimation (Alive AI) was successfully validated using hardcoded mock logic. To bring true value and personalized intelligence to the users, we need to replace this mock with real calls to the Gemini API. We will use a dedicated backend route to proxy the call, securing the API key and ensuring rapid, small-payload responses.

## What Changes

- **Create Backend Route**: Create `app/api/ai/estimativa/route.js` to handle POST requests securely on the server.
- **Integrate Gemini API**: Use the `gemini-1.5-flash` model within the route with a strict system instruction to return *only* a brief time estimate and emoji.
- **Update Frontend Modal**: Replace the mock timeout logic in the Task Modal (`app/dashboard/page.jsx`) with a `fetch` call to the new API endpoint.
- **Graceful Degradation**: Ensure the frontend `catch` block fails silently. If the API is rate-limited or fails, the user should still be able to create tasks without disruption or intrusive error toasts.

## Capabilities

### Modified Capabilities
- `ai-ghost-estimation`: The real-time effort estimation will now use the actual Gemini API instead of hardcoded rules, requiring a backend implementation and a frontend fetch integration.

## Impact

- **Affected code**: 
  - `app/api/ai/estimativa/route.js` (NEW)
  - Task Creation Modal logic (e.g. `app/dashboard/page.jsx`)
- **System Architecture**: Introduces a new lightweight serverless endpoint for micro-interactions.
- **User Experience**: Estimations become dynamic and intelligent, with built-in resilience (graceful degradation) if the AI service becomes unavailable.
