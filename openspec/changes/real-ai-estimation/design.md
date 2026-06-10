## Context

The Task Creation Modal currently predicts task effort using a mocked debounce mechanism. To realize the full potential of "Alive AI," we need to connect this to the actual Google Gemini API. Because this is a client-side component, making the API call directly would expose our API keys. We need a backend route to handle the request securely.

## Goals / Non-Goals

**Goals:**
- Create a Next.js App Router API endpoint (`app/api/ai/estimativa/route.js`) to interact with the Gemini API securely.
- Ensure the prompt strictly instructs the AI to return only an emoji and the time estimate.
- Update the frontend to call this endpoint.
- Implement robust error handling so the UI fails gracefully if the AI endpoint fails (e.g., rate limits, network errors).

**Non-Goals:**
- Creating a complex AI context window. The prompt should be stateless and very simple to keep latency low.
- Modifying the existing UI design of the Ghost Tag. It should remain exactly as is, but fed with real data.

## Decisions

- **API Route**: We will use a POST route to accept the `titulo` parameter. Next.js server-side code will securely access `process.env.GEMINI_API_KEY`.
- **Model Choice**: Use `gemini-1.5-flash` or similar, as it is optimized for speed and perfectly suited for this micro-interaction.
- **Frontend Error Handling**: If `fetch` fails or the response is not `ok`, the `catch` block will silently set `aiEstimate` to `null`. This prevents intrusive toasts from interrupting the core user flow (task creation).

## Risks / Trade-offs

- **Risk**: API Rate Limiting or High Latency causing a bad UX.
  - **Mitigation**: The debounce handles rapid typing. The frontend `catch` block and timeout ensures the user is not blocked from submitting the form. If it takes too long or fails, the ghost tag simply won't appear.
