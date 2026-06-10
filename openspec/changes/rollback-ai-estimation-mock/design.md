## Context

The recent real Gemini API integration for task estimation is causing 500 fatal errors in production due to dependency issues. With a critical presentation tomorrow, we are executing an emergency code freeze. We must remove the broken API route and replace the `fetch` logic on the frontend with a robust, local heuristic mock.

## Goals / Non-Goals

**Goals:**
- Completely remove the `app/api/ai/estimativa` route to resolve build/production errors.
- Replace the frontend `fetch` call with a synchronous regex-based local logic.
- Maintain the exact same UI/UX illusion (the pulsing "Calculando..." state followed by the ghost tag).

**Non-Goals:**
- Debugging the Gemini API dependency issues. We don't have time; stability is the absolute priority.
- Changing the visual presentation of the feature.

## Decisions

- **Local Mock Heuristics**: We will use a regex-based classification inside the debounced `useEffect`:
  - `(prova|trabalho final|projeto|artigo|apresentação)` -> "🔥 ~2h+ (Alta Carga)"
  - `(estudar|revisar|ler|resumo|sql|banco|codigo|api)` -> "⚡ ~1h (Foco Intenso)"
  - `(exercicio|lista|email|pesquisar|organizar)` -> "⏱️ ~20m (Rápido)"
  - Default -> "⏱️ ~30m"
- **Simulated Delay**: We will wrap the state update (`setAiEstimate`, `setIsPredicting(false)`) inside a 600ms `setTimeout` to mimic network latency.

## Risks / Trade-offs

- **Risk**: The estimates are deterministic and not "real AI".
  - **Trade-off**: This is acceptable for a presentation/demo, as it guarantees 100% stability and zero latency/rate-limit issues, which is critical for the current deadline.
