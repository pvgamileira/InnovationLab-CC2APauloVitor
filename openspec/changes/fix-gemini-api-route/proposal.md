# Proposal: Fix Gemini API Route with Dynamic Rendering and Verbose Logging

## Problem
The Gemini API route (`app/api/gemini-insights/route.js`) is throwing a 500 error. The root cause is likely static caching from Next.js App Router, or a failure during model instantiation. Furthermore, the frontend (`components/GlobalMentor.jsx`) swallows the actual error details, showing a generic "Falha no motor da IA" message.

## Proposed Solution
1. **Force Dynamic Execution**: Disable static caching in the API route by adding `export const dynamic = 'force-dynamic';`.
2. **Set Correct Model**: Ensure the Generative AI model is set to `"gemini-1.5-flash"` instead of just `"gemini"`.
3. **Verbose Logging**: Improve the error handling in the API route to return detailed error object information (`error.message`, `error.name`, `error.stack`).
4. **Client-Side Extraction**: Modify the client side to extract the exact Google error response from the JSON payload and throw it, so the user sees the real issue.

## Benefits
- Resolves the 500 error caused by static caching.
- Upgrades to `gemini-1.5-flash`, which is standard and reliable.
- Exposes actual error logs to the client for significantly better debugging.
