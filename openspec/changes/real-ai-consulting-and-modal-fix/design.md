# Design: Real AI Consulting via Native REST and Modal State Fix

## 1. Modal Deletion State Fix
- **File:** `app/dashboard/disciplinas/page.jsx`
- **Location:** Inside `handleDeleteSubject` (or similar deletion handler).
- **Change:** Ensure that exactly after `setSubjects(prev => prev.filter(...))` the modal flags are forced to `false` (`setIsEditModalOpen(false)`, `setIsDraggingSubject(false)`). Include an OpenSpec comment explaining the render tree cleanup.

## 2. Dependency-Free AI API Route
- **File:** `app/api/ai/consultoria/route.js` (NEW)
- **Implementation:**
  - Export an `async function POST(req)`.
  - Extract `{ tarefas, xp }` from the request JSON.
  - Native `fetch` call to `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`.
  - Body payload matches the exact Gemini REST spec (`contents: [{ parts: [{ text: "..." }] }]`).
  - Instruct the model precisely as specified: "Você é o assistente neural... XP Atual: {xp}...".
  - Parse the JSON response safely and return `NextResponse.json({ diagnosis: text })`. 
  - Wrap in a `try/catch` and return a silent/fallback response on error. No external SDKs.

## 3. Consultoria IA Dashboard UI
- **File:** `app/dashboard/estatisticas/page.jsx`
- **Location:** The `ia` tab block.
- **Change:**
  - Add state handlers: `[isLoading, setIsLoading]`, `[aiData, setAiData]`, `[error, setError]`.
  - Build a structured dashboard widget. Replace the static/skeleton UI with a premium dark theme layout.
  - Action Button: `<button>` with "🧠 Gerar Diagnóstico Neural" using accent colors (`bg-purple-600 hover:bg-purple-700`) and hover scale transition.
  - Loading State: A beautiful pulsing shimmer effect (`animate-pulse bg-white/5 rounded-xl h-32`).
  - Result State: Render `aiData` dynamically inside a clean glassmorphism card (`bg-black/40 border border-white/10 p-6 rounded-2xl`).
  - OpenSpec comments detailing the REST contract and state handling.

## Constraints
- Pure JS/JSX. NO TypeScript.
- Absolutely NO imports of `@google/genai` or `@google/generative-ai` in the API route.
- Use only existing Tailwind classes for styling (glassmorphism, `bg-white/5`, etc).
