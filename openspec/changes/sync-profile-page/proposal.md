# Proposal: Sync Profile Page with `user_profiles` table

## Problem
The Profile page currently reads from `session.user.user_metadata` and uses placeholders (`name`, `role`, `education`, `university`). This is disconnected from the Progressive Profiling data we collect during onboarding into the `user_profiles` table (`name`, `institution`, `course`, `study_shift`, `occupation`).

## Proposed Solution
Refactor the Profile page (`app/dashboard/perfil/page.jsx`) to fetch its initial data from the `user_profiles` Supabase table. If the data is updated via the "Editar Perfil" modal, it should save the new information back to `user_profiles` using an `upsert` operation. The UI will be updated to display the specific fields: Nome, Instituição, Curso, Turno e Ocupação.

## Benefits
- Centralized truth for user data in the database.
- Consistency between the onboarding modal and the profile page.
- AI features can rely entirely on `user_profiles` without fragmentation.
