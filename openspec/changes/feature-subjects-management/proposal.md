## Why

We need a central way for students (users) to register and manage their academic subjects within the system. This allows the core tracking feature of EduTrack AI to map learning progress against specific courses, establishing the foundation of the platform.

## What Changes

- Creation of `subjects` table in Supabase via SQL migration.
- Implementation of Row Level Security (RLS) policies on the `subjects` table bound to the session `user_id`.
- Creation of a new `/dashboard` route in Next.js to list a user's subjects using pure JavaScript to fetch data from the Supabase API.

## Capabilities

### New Capabilities
- `subjects-management`: The capability to securely store, retrieve, update, and delete academic subjects tied strictly to the authenticated user, complete with a UI dashboard for listing.

### Modified Capabilities


## Impact

- **Database:** Supabase will require a new migration script to create tables and RLS policies.
- **Frontend:** A new primary route `/dashboard` will be added to the Next.js app to handle fetching and displaying.
- **Security:** RLS will enforce strict data isolation between users for all `subjects` queries.
