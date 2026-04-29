# Design: Implement Personalized AI Insights

## Component: API Route
**File**: `app/api/gemini-insights/route.js`
- Fetch `user_profiles` using `session.user.id`.
- Extract `name`, `course`, `institution`, `study_shift`, and `occupation`.
- Fetch `academic_tasks` using `session.user.id`. Map them to a simple string of titles and statuses so the AI knows exactly what the user is working on.
- Update the Prompt string exactly as requested: "Você é o Mentor IA do EduTrack. O usuário se chama [Name], estuda [Course] na [Institution] no turno [Shift] e trabalha como [Occupation]. Analise as tarefas dele [Tasks] e dê 3 insights curtos e ultra-personalizados. Se houver tarefas acumuladas e o usuário trabalha/estuda em turnos opostos, inclua um 'Radar de Burnout' com conselhos de saúde mental. Dê dicas técnicas de TI baseadas no curso dele. Retorne EXATAMENTE um objeto JSON: {\"insights\": [\"dica 1\", \"dica 2\", \"dica 3\"]}".
- Return `{ insights, profileName: profile.name }`.

## Component: Global Mentor UI
**File**: `components/GlobalMentor.jsx`
- Add a new state `profileName`.
- Update `fetchInsights` to also `setProfileName(data.profileName)`.
- In the UI header (where it says "Mentor IA"), add a small badge `bg-[#3a86ff]/20 text-[#3a86ff] px-2 py-0.5 rounded-full text-[10px]` that says `Personalizado para {profileName}` (only rendered if `profileName` exists).
