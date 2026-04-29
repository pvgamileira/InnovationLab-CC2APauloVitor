# Tasks: Sync Profile Page

## 1. Update State and Fetch Logic
- [x] Open `app/dashboard/perfil/page.jsx`.
- [x] Update `profileMeta` and `editForm` state defaults to match `user_profiles` columns (`name`, `occupation`, `course`, `institution`, `study_shift`).
- [x] Modify `fetchProfileData` to query the `user_profiles` table and set the state.

## 2. Update Save Logic
- [x] Modify `handleSaveProfile` to perform an `upsert` on the `user_profiles` table instead of `supabase.auth.updateUser`.

## 3. Update UI Display
- [x] Import `Clock` from `lucide-react` if not already imported.
- [x] Update the profile display card to show `occupation`, `course`, `institution`, and `study_shift` with corresponding icons.

## 4. Update Edit Modal
- [x] Change the input fields in the edit modal to match the new state (`name`, `course`, `institution`).
- [x] Add `<select>` dropdowns for `study_shift` and `occupation` with the correct options.
