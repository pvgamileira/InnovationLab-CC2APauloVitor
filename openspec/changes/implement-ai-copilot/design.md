# Design: Implement AI Copilot

## Component: API Route
**File**: `app/api/gemini-copilot/route.js`
- Must include `export const dynamic = 'force-dynamic';`.
- Authenticate via Supabase Authorization header (`createClient` passing the header).
- Extract `noteContent` from `await request.json()`.
- Validate environment variable `GEMINI_API_KEY`.
- Initialize `GoogleGenerativeAI` with model `gemini-2.5-flash`.
- Use the System Prompt: "Atue como um tutor acadêmico sênior. O aluno enviou anotações de aula brutas. 1) Corrija erros e reescreva o texto em um resumo estruturado por tópicos. 2) Crie 3 perguntas curtas de revisão (Flashcards) no final. Retorne em Markdown limpo."
- Return `{ content: generatedText }` as JSON (status 200) or `{ error: err.message }` (status 500).

## Component: Frontend (Caderno Page)
**File**: `app/dashboard/caderno/page.jsx`
- Add UI state: `isCopilotLoading` (boolean) and `aiResponse` (string or null).
- In the Editor Toolbar (`<div className="px-6 py-4 border-b border-white/5...">`), add an "Aprimorar com IA" button.
- Button styling: features the Sparkles icon (`lucide-react`) and gradient background (`bg-gradient-to-r from-[#3a86ff] to-[#2563eb]`), rounded-full or rounded-xl, with hover effects.
- Create `handleCopilotEnhance` function to make the POST request to `/api/gemini-copilot` passing the `notesText`.
- Add a new block below the `<textarea>` to display the AI response.
- The block should use glassmorphism: `bg-[#0a0c14]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-6 mt-4`.
- The block will render the Markdown response (since React Markdown might not be available, we can render the text cleanly preserving newlines via `whitespace-pre-wrap` or similar).
- Must adhere strictly to existing dashboard styles and dark theme constraints.
