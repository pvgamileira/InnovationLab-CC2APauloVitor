# Design: Fix Gemini API Route

## Component: API Route
**File**: `app/api/gemini-insights/route.js`
- Add `export const dynamic = 'force-dynamic';` at the top.
- Update model parameter: `genAI.getGenerativeModel({ model: "gemini-1.5-flash" });`.
- Update the `catch (error)` block: `return NextResponse.json({ error: error.message, name: error.name, stack: error.stack }, { status: 500 });`.

## Component: Global Mentor Frontend
**File**: `components/GlobalMentor.jsx`
- Find the `if (!res.ok) throw new Error('Falha no motor da IA');` condition.
- Replace with logic to extract JSON data:
  ```javascript
  if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || 'Falha no motor da IA');
  }
  ```

## Rules and Constraints
- Strictly JS only (No TypeScript).
- Keep all Supabase auth logic intact.
