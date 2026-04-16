## Why

To transform the static prototype into a fully functional and secure application, we must implement Authentication so users can securely access their isolated data as defined by our RLS policies. Simultaneously, to localize the platform for the target audience, the entire Dashboard must be translated to Brazilian Portuguese (pt-BR). Finally, users need the ability to actually populate their dashboard via functional CRUD modals. 

## What Changes

- **Authentication:** Implementation of an `/auth` (or `/login`) page utilizing pure JavaScript Next.js and `@supabase/supabase-js` to handle Email/Password Sign-Up and Sign-In operations.
- **PT-BR Translation & Polish:** Complete translation of all `/dashboard` UI text strings to Portuguese (pt-BR). Strict enforcement of iconography: all native OS emojis will be purged and replaced with SVG icons (e.g., Lucide React). The UI will rigorously maintain the "Rich Black" and Glassmorphism styling.
- **CRUD Actions:** Architecture of modal forms triggered by the "Nova Disciplina" and "Nova Tarefa" buttons. These forms will execute explicit `INSERT` operations into the Supabase `subjects` and `academic_tasks` tables, strictly attaching the authenticated `user.id` to satisfy RLS constraints.

## Capabilities

### New Capabilities
- `authentication`: The capability to register, authenticate, and manage user sessions securely.
- `crud-operations`: The capability to insert, update, and manage subject and task records seamlessly via modal interfaces.

### Modified Capabilities
- `premium-dashboard-ui`: Modified to reflect PT-BR localization and strict SVG-based iconography, stripping all OS emojis while preserving aesthetic layout goals.

## Impact

- **Database:** Supabase Auth will be actively leveraged; DB inserts will now dynamically reflect the active user identity.
- **Frontend:** A new `/auth` routing layer will be established. The `/dashboard` will see significant DOM additions including form state management and modals.
- **Security:** RLS will move from theoretical isolation to active use since requests will finally carry real Supabase Authentication session tokens.
