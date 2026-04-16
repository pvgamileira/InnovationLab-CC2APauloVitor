## ADDED Requirements

### Requirement: Subjects Database Table Structure
The backend MUST include a Supabase database table named `subjects`. It MUST strictly contain the columns: `id` (UUID, Primary Key), `user_id` (UUID, Foreign Key referencing `auth.users`), `name` (text), `professor` (text), `workload` (integer), and `created_at` (timestamp with time zone).

#### Scenario: Table structure verification
- **WHEN** the SQL migration is applied
- **THEN** the `subjects` table properly establishes the constrained schema columns

### Requirement: Subjects Row Level Security
The `subjects` table MUST actively enforce Row Level Security (RLS). Valid policies MUST assert that any user can ONLY perform SELECT, INSERT, UPDATE, or DELETE operations when the target row's `user_id` exclusively matches their authenticated session identifier.

#### Scenario: Data isolation execution
- **WHEN** an authenticated user attempts to execute queries on the `subjects` table
- **THEN** the database enforces visibility and interaction solely upon rows mapped to their exact session ID

### Requirement: Dashboard Listing Route
The Next.js application MUST expose an interactive route at `/dashboard`. This route MUST utilize pure JavaScript to fetch and display the subjects directly assigned to the logged-in user via the Supabase Client API.

#### Scenario: User lists subjects
- **WHEN** an authenticated user navigates to `/dashboard`
- **THEN** the application fetches from Supabase and renders a visual list of the user's registered subjects
