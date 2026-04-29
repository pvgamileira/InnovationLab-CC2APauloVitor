# Tasks: Implement Personalized AI Insights

## 1. Update API Route
- [x] Open `app/api/gemini-insights/route.js`.
- [x] Add a query to fetch the user's profile from `user_profiles`.
- [x] Update the `academic_tasks` query to select `title, status` and stringify them for the prompt.
- [x] Update the `prompt` string with the new contextual rules.
- [x] Return `{ insights: jsonResponse.insights, profileName: profile.name }`.

## 2. Refine Frontend UI
- [x] Open `components/GlobalMentor.jsx`.
- [x] Add `profileName` to the component state.
- [x] Update `fetchInsights` to extract and set `profileName`.
- [x] Add the "Personalizado para [Nome]" badge next to the "Mentor IA" title.
