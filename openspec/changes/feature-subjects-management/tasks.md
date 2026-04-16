## 1. Database Setup

- [x] 1.1 Create SQL migration script to establish the `subjects` table with the requested schema (`id`, `user_id`, `name`, `professor`, `workload`, `created_at`).
- [x] 1.2 Formulate Row Level Security (RLS) policies in the SQL script enforcing all valid operations to filter where `user_id = auth.uid()`.
- [x] 1.3 Apply the SQL migration explicitly to the Supabase instance.

## 2. Frontend Interface

- [x] 2.1 Create the basic Next.js structure for `/dashboard` via `app/dashboard/page.jsx`.
- [x] 2.2 Lay out the subjects interface visually mapping the EduTrack AI strict dark mode styling (Rich Black background, Metallic Blue accents, glassmorphism cards).
- [x] 2.3 Plug in client-side data fetching directly utilizing pure JavaScript via `@supabase/supabase-js` client.
- [x] 2.4 Render the subjects data effectively, verifying that the isolation correctly bounds rows exclusively to the logged-in user.
