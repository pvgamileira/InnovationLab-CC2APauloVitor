## ADDED Requirements

### Requirement: Google Identity OAuth
The `/auth` interface MUST structurally provide a dedicated and clearly labeled "Login com Google" module. Activating this module MUST leverage explicitly the pure client `supabase.auth.signInWithOAuth({ provider: 'google' })` method forwarding the identity loop outward.

#### Scenario: OAuth Domain Dispatch
- **WHEN** the user interacts with the specialized Google button
- **THEN** the platform successfully transmits parameters connecting to Google authorization domains seamlessly returning a valid RLS-friendly session
