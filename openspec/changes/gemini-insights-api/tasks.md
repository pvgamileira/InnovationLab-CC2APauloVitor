## 1. Setup API Route

- [x] 1.1 Create the directory structure `app/api/gemini-insights/` if it does not exist.
- [x] 1.2 Create the `route.js` file inside the new directory.

## 2. Authentication & Data Fetching

- [x] 2.1 Implement Supabase SSR client initialization in `route.js`.
- [x] 2.2 Fetch the authenticated user session. If no session, return 401 Unauthorized.
- [x] 2.3 Query the `subjects` table for the user using `user.id`.
- [x] 2.4 Query the `academic_tasks` table for the user using `user.id`.
- [x] 2.5 Handle potential Supabase errors by returning a 500 status.

## 3. Data Processing

- [x] 3.1 Calculate the number of completed tasks versus pending tasks.
- [x] 3.2 Structure the data context (subjects, task metrics) into a concise format for the Gemini model prompt.

## 4. Gemini AI Integration

- [x] 4.1 Initialize the `@google/generative-ai` client using `process.env.GEMINI_API_KEY`.
- [x] 4.2 Construct the request using the `gemini-1.5-flash` model.
- [x] 4.3 Send the specific system prompt: "Aja como um mentor acadêmico sênior. Analise estes dados de desempenho e forneça 3 insights estratégicos curtos (máximo 2 frases cada) sobre o que o aluno deve priorizar." along with user context, enforcing JSON output format.
- [x] 4.4 Parse the response from Gemini.
- [x] 4.5 Return the insights as a 200 JSON response to the client.
- [x] 4.6 Handle Gemini API errors or timeouts gracefully.
