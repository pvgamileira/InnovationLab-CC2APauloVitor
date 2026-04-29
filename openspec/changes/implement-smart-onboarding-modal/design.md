# Design: Implement Smart Onboarding Modal

## Database Assumption
Assume the `user_profiles` table exists in Supabase with columns: `user_id`, `name`, `institution`, `course`, `study_shift`, `occupation`. We do not need to create the table structure here, only the frontend and integration logic.

## Component: Onboarding Modal
**File**: `components/OnboardingModal.jsx`
- Use a full-screen fixed overlay (`fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4`).
- Main modal container: `bg-[#0a0c14] border border-[#3a86ff]/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_80px_rgba(58,134,255,0.15)]`.
- Form state: `formData` object containing `name`, `institution`, `course`, `study_shift`, `occupation`.
- Standard dark theme inputs with `bg-black/50`, `border-white/10`, `focus:border-[#3a86ff]`.
- Submit button: `bg-[#3a86ff] hover:bg-[#2563eb] text-white font-extrabold rounded-xl py-4 transition-all`. Shows a spinner when submitting.
- On submit: call Supabase `upsert` on `user_profiles`. On success, trigger the `onClose` callback.

## Component: Dashboard Page
**File**: `app/dashboard/page.jsx`
- Import `OnboardingModal`.
- Add state: `const [needsOnboarding, setNeedsOnboarding] = useState(false);`
- In `initSessionAndFetchData` (or `refetchData`), query `user_profiles` right after checking the session.
  ```javascript
  const { data: profile } = await supabase.from('user_profiles').select('*').eq('user_id', session.user.id).single();
  if (!profile) {
    setNeedsOnboarding(true);
  }
  ```
- At the bottom of the JSX, just before the final `</div>`:
  ```javascript
  {needsOnboarding && (
    <OnboardingModal onClose={() => setNeedsOnboarding(false)} session={session} />
  )}
  ```
- **Constraint**: Must NOT break the Kanban logic or any Recharts elements.
