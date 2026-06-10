## 1. Remove API Dependency

- [ ] 1.1 Open `components/NovaTarefaModal.jsx` (or `app/dashboard/page.jsx` where the modal logic resides).
- [ ] 1.2 Locate the `fetch` call to `/api/ai/estimativa` inside the `useEffect`.
- [ ] 1.3 Delete the entire `try/catch` block handling the external API call.
- [ ] 1.4 Delete the `app/api/ai/estimativa` folder and its `route.js` file completely.

## 2. Implement Local Mock Heuristics

- [ ] 2.1 Inside the debounced `useEffect`, add the deterministic mock logic based on `lowerTitle = newTask.title.toLowerCase()`.
- [ ] 2.2 Add the regex condition: `if (lowerTitle.match(/(prova|trabalho final|projeto|artigo|apresentação)/))` -> `estimate = "🔥 ~2h+ (Alta Carga)"`.
- [ ] 2.3 Add the regex condition: `else if (lowerTitle.match(/(estudar|revisar|ler|resumo|sql|banco|codigo|api)/))` -> `estimate = "⚡ ~1h (Foco Intenso)"`.
- [ ] 2.4 Add the regex condition: `else if (lowerTitle.match(/(exercicio|lista|email|pesquisar|organizar)/))` -> `estimate = "⏱️ ~20m (Rápido)"`.
- [ ] 2.5 Add a default estimate `let estimate = "⏱️ ~30m";`.
- [ ] 2.6 Wrap the state updates (`setAiEstimate(estimate)` and `setIsPredicting(false)`) inside a `setTimeout` of 600ms to simulate network latency, keeping the `delayDebounceFn` intact to prevent rapid re-renders.
