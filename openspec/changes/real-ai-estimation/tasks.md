## 1. Backend Route Creation

- [x] 1.1 Create a new directory and file: `app/api/ai/estimativa/route.js`.
- [x] 1.2 Import `@google/genai` and initialize the Gemini client using `process.env.GEMINI_API_KEY`.
- [x] 1.3 Create an async `POST` export that parses the request body to extract `{ titulo }`.
- [x] 1.4 Construct the prompt: `"Você é um assistente de produtividade. O usuário vai te enviar o título de uma tarefa. Responda APENAS com uma estimativa de tempo curta e direta, usando um emoji e o tempo. Exemplo: '⏱️ ~45m', '🔥 ~2h', '⚡ ~15m'. Não adicione nenhum outro texto."`
- [x] 1.5 Call `gemini-1.5-flash` with the prompt and the `titulo`.
- [x] 1.6 Return the response text wrapped in a JSON object using `NextResponse.json({ estimativa: text })`.

## 2. Frontend Integration

- [x] 2.1 Open `app/dashboard/page.jsx` where the `NovaTarefaModal` logic resides.
- [x] 2.2 Locate the `useEffect` handling the `newTask.title` debounce.
- [x] 2.3 Remove the mock logic (the `if/else` checks for "prova", "exercício", etc.).
- [x] 2.4 Replace it with an async `try/catch` block that fetches from `/api/ai/estimativa`.
- [x] 2.5 In the `try` block, if `response.ok`, parse the JSON and call `setAiEstimate(data.estimativa)`. If not, call `setAiEstimate(null)`.
- [x] 2.6 In the `catch` block, fail silently by calling `setAiEstimate(null)`.
- [x] 2.7 In the `finally` block, call `setIsPredicting(false)`.
