# Design: Sync Profile Page

## Component: Profile Page
**File**: `app/dashboard/perfil/page.jsx`

### Data Fetching
In the `fetchProfileData` function, right after validating the session, perform a `.select('*').eq('user_id', session.user.id).single()` on `user_profiles`.
- If data exists, map it to `profileMeta` and `editForm`.
- If not, use sensible defaults.
- The `profileMeta` state should be structured as: `{ name: '', occupation: '', course: '', institution: '', study_shift: '' }`.

### Save Logic
In `handleSaveProfile`, instead of calling `supabase.auth.updateUser`, perform an `upsert` to `user_profiles`:
```javascript
const { error } = await supabase.from('user_profiles').upsert([
    {
        user_id: session.user.id,
        name: editForm.name,
        occupation: editForm.occupation,
        course: editForm.course,
        institution: editForm.institution,
        study_shift: editForm.study_shift,
        updated_at: new Date().toISOString()
    }
]);
```

### UI Adjustments
- Update the display section (lines ~198-200) to show the new fields using icons like `Briefcase` (Occupation), `GraduationCap` (Course / Institution), and `Clock` (Study Shift).
- Update the `<form>` inside the edit modal to use the correct fields and add `<select>` dropdowns for `study_shift` and `occupation` matching the Onboarding Modal.
- Maintain existing `lucide-react` imports and glassmorphism styling (`bg-[#05070e]/80`, `backdrop-blur-xl`, `border-white/5`).
