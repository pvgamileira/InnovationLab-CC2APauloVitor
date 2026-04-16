## ADDED Requirements

### Requirement: Email and Password Authentication
The system MUST provide a secure routing gateway at `/auth` allowing users to perform standard email and password authentication (Registration and Login) using the Supabase API.

#### Scenario: User registers and logs in
- **WHEN** a user fills out the authentication form explicitly via Email/Password
- **THEN** the Supabase Auth creates an `auth.users` entity and generates a valid Session bridging the application to the RLS structures

### Requirement: Session Validation
The `/dashboard` route MUST validate the active session and inherently restrict access to only users with a valid token. If no session exists, the user MUST be redirected or prompted to utilize the `/auth` gateway.

#### Scenario: Unauthorized Access attempt
- **WHEN** an unauthenticated visitor tries to view `/dashboard`
- **THEN** the system denies rendering and forces authentication
