## Why

As users accumulate dense academic data, they require immediate, high-level visual feedback on their productivity to stay engaged with the ecosystem. Integrating dynamic data visualization (Analytics Charts) transforms an isolated list of tasks into a meaningful interactive metric of completion. Simultaneously, enforcing a frictionless onboarding process via Google OAuth drastically reduces the barrier to entry while securely maintaining the rigorous Supabase Auth Row Level Security patterns.

## What Changes

- **Analytics (Pie Chart):** Integration of the `recharts` library into the Next.js `/dashboard` to construct a new Pie/Donut Chart visualizing the real-time ratio of 'Completed' versus 'Pending' strings stored in `academic_tasks`.
- **Google OAuth:** Enhancement of the `/auth` page logic, pairing the existing Email/Password layout with a prominent "Login com Google" button mapped directly through Supabase OAuth providers.
- **Aesthetic Enforcement:** Recharts SVGs mapped strictly to the native EduTrack AI Metallic Blue (`#3a86ff`) elements bounding over deep Rich Black transparencies to prevent visual style clashes.

## Capabilities

### New Capabilities
- `data-visualization`: Producing scalable data graphing nodes leveraging task completion payload metadata dynamically.
- `google-oauth`: Authorizing users via external federated identity providers securely bound to native internal Supabase tokens.

### Modified Capabilities
- `premium-dashboard-ui`: Augmenting the UI wireframe grid to encompass the new visual graphic charts.

## Impact

- **Database / Auth:** Supabase Auth Dashboard will require manual toggling to accept Google OAuth routing keys.
- **Frontend / Engine:** Dependencies are augmented to load `recharts`.
- **Security:** RLS validation matrices persist unaltered as OAuth identically maps standard `user.id` identities.
