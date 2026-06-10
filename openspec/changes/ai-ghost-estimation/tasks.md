## 1. Setup State and Logic

- [x] 1.1 Open the Task Creation Modal component (e.g., `components/NovaTarefaModal.jsx`).
- [x] 1.2 Add `isPredicting` and `aiEstimate` to the component's state using `useState`.
- [x] 1.3 Implement a `useEffect` hook that listens to the task title input (`titulo`).
- [x] 1.4 Inside the `useEffect`, add logic to clear the estimate if `titulo.length < 5` and return early.
- [x] 1.5 Set up a `setTimeout` for 800ms to debounce the AI prediction.
- [x] 1.6 Inside the timeout, set `isPredicting(true)`, calculate the mock estimate based on keywords ("prova", "estudar", "exercício", "lista"), and then update `aiEstimate` and set `isPredicting(false)`.
- [x] 1.7 Add the cleanup function to the `useEffect` (`return () => clearTimeout(delayDebounceFn)`).

## 2. Render UI

- [x] 2.1 Locate the Task Title input field in the JSX.
- [x] 2.2 Wrap the input in a relative container if necessary.
- [x] 2.3 Directly below the input, conditionally render the loading state: if `isPredicting` is true, show `<span className="text-xs text-purple-400 animate-pulse font-mono flex items-center gap-1"><Loader2 className="animate-spin" size={12} /> IA calculando esforço...</span>`.
- [x] 2.4 Conditionally render the ghost tag: if `aiEstimate` exists and `!isPredicting`, show `<span className="text-xs font-mono text-purple-300 bg-purple-900/30 px-2 py-1 rounded border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)]">✨ Estimativa IA: {aiEstimate}</span>`.
