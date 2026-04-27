## Context

EduTrack AI currently tracks user subjects and academic tasks, but it lacks a proactive, intelligent mechanism to provide strategic advice. By leveraging the Gemini 1.5 Flash model and the data stored in our Supabase instance, we can introduce a "Senior Academic Mentor" capability. This requires creating a secure, backend-only API route in Next.js (App Router) to orchestrate data fetching, prompt construction, and interaction with the Google Generative AI SDK, avoiding any client-side exposure of API keys or direct database access.

## Goals / Non-Goals

**Goals:**
- Create a Next.js API route (`app/api/gemini-insights/route.js`) to generate AI insights.
- Fetch authenticated user session securely using Supabase SSR client.
- Fetch user-specific `subjects` and `academic_tasks` using Supabase RLS.
- Process and format this data into a structured context for the Gemini model.
- Execute a prompt against `gemini-1.5-flash` to return exactly 3 short strategic insights.

**Non-Goals:**
- Creating the frontend UI components to display these insights (this is backend only).
- Using TypeScript (Strictly JSX/JS only).
- Implementing complex RAG (Retrieval-Augmented Generation) or fine-tuning models.

## Decisions

1. **Next.js Route Handler over Server Action:** We will implement this as a RESTful API route (`app/api/gemini-insights/route.js`) instead of a Server Action to provide a clear, testable contract that can be easily consumed by any frontend component, ensuring clear separation of concerns for this complex orchestration.
2. **Supabase SSR:** We will use `@supabase/ssr` to securely read the authentication cookies in the route handler, ensuring that we only query data for the logged-in user.
3. **Data Aggregation:** We will calculate simple metrics (completed vs pending tasks) within the route handler before sending the context to Gemini to reduce token usage and improve the relevance of the insights, rather than sending raw database rows.
4. **Google Generative AI SDK:** We will use the official `@google/generative-ai` SDK, specifically targeting `gemini-1.5-flash` for its speed and cost-effectiveness for text analysis. We will enforce JSON response formatting.

## Risks / Trade-offs

- **Risk:** High latency in AI generation could lead to a poor user experience if the API blocks for too long.
  → **Mitigation:** Use the `gemini-1.5-flash` model which is optimized for low latency. Ensure the prompt is concise.
- **Risk:** Token limits or API rate limits from Google.
  → **Mitigation:** Only send aggregated metrics and a limited set of recent/active tasks instead of the entire user history.
- **Risk:** Unstructured AI responses.
  → **Mitigation:** Explicitly instruct the model to return JSON, or use `responseMimeType: "application/json"` if supported by the model config, and strongly type the expected JSON schema in the system prompt.
