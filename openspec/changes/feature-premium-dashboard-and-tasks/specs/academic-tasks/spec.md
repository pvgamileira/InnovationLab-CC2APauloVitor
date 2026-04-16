## ADDED Requirements

### Requirement: Academic Tasks Database Structure
The backend MUST include a Supabase table named `academic_tasks`. Columns MUST explicitly include: `id` (UUID, Primary Key), `user_id` (UUID, Foreign Key referencing `auth.users`), `subject_id` (UUID, Foreign Key strictly referencing `subjects.id`), `title` (text), `status` (text, default 'pending'), `due_date` (date), and `created_at` (timestamp with time zone).

#### Scenario: Table instantiation logic
- **WHEN** the SQL migration applies
- **THEN** the `academic_tasks` data structure correctly resolves its foreign keys towards `subjects` and `auth.users`

### Requirement: Academic Tasks Target Security
The `academic_tasks` table MUST firmly enforce Row Level Security, isolating all valid CRUD interactions natively to rows where the `user_id` matches exactly the requested `auth.uid()`.

#### Scenario: Task data query isolation
- **WHEN** an authenticated user selects active tasks
- **THEN** the platform returns solely rows securely tagged with their specific session identifier
