# Tasks: Implement Smart Onboarding Modal

## 1. Create OnboardingModal Component
- [x] Create `components/OnboardingModal.jsx`.
- [x] Implement the UI with `lucide-react` icons and glassmorphism styling.
- [x] Set up state for all 5 form fields.
- [x] Implement Supabase `upsert` logic inside `handleSubmit`.
- [x] Handle loading state and errors gracefully.

## 2. Integrate into Dashboard Page
- [x] Open `app/dashboard/page.jsx`.
- [x] Import the new `OnboardingModal` component.
- [x] Add the `needsOnboarding` state variable.
- [x] Query the `user_profiles` table inside the data fetching flow and set `needsOnboarding(true)` if no profile is found.
- [x] Render the `<OnboardingModal />` conditionally at the bottom of the component.
