## Why

To provide students with a structured and holistic overview of their academic responsibilities, we must introduce the capability to manage individual academic tasks organically linked to their subjects. At the same time, standardizing the `/dashboard` to a highly polished premium aesthetic (incorporating Glassmorphism and a Deep Rich Black theme) ensures optimal user engagement while fulfilling the overarching high-end directives of EduTrack AI.

## What Changes

- Creation of the `academic_tasks` table in Supabase via a new SQL migration.
- Implementation of rigorous Row Level Security (RLS) policies on the new `academic_tasks` table strictly filtering via `user_id`.
- Total aesthetic structural architecture on the Next.js `/dashboard` mapping to a complex wireframe (Overview Cards, Subjects Grid, Tasks List).
- Enforcement of Premium UI/UX standards: Deep "Rich Black" backgrounds, Metallic blue accents, translucent Glassmorphism for data cards, and clean, hierarchical sans-serif typography.

## Capabilities

### New Capabilities
- `academic-tasks`: Allowing users to define and track assignments or to-do items linked directly to specific subjects.
- `premium-dashboard-ui`: A robust layout orchestrating data visualizations, task lists, and subject grids under high-end glassmorphism principles.

### Modified Capabilities
- `subjects-management`: Visual display requirements modified to adhere strictly to the Premium Dashboard UI/UX standards.

## Impact

- **Database:** A new migration script will augment the schema by adding the `academic_tasks` table with established foreign key dependencies.
- **Frontend:** The primary `/dashboard` file (`page.jsx`) will be radically expanded into a complex, premium responsive layout.
- **Security:** RLS will be verified on `academic_tasks`.
