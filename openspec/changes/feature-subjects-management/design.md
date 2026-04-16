## Context

EduTrack AI requires a solid foundation for users to register and view academic subjects dynamically. Currently, the Next.js app has no backend integration. The backend uses Supabase (PostgreSQL, Auth), while the frontend uses Next.js (App Router, Pure JS, Tailwind CSS). Data isolation (RLS) is paramount per system directives. 

## Goals / Non-Goals

**Goals:**
- Establish a `subjects` table in Supabase via an explicitly defined SQL migration (`id`, `user_id`, `name`, `professor`, `workload`, `created_at`).
- Enforce secure data isolation via Row Level Security (RLS) policies tightly bound to `auth.users` taking only `user_id`.
- Provide a simple UI via a Next.js `/dashboard` page fetching the subjects from the Supabase API using pure JS.

**Non-Goals:**
- Implementation of full CRUD interfaces (this spec focuses on data struct, RLS, and the basic list fetching).
- Use of TypeScript (strict pure JS only per agent directives).
- Advanced caching strategies for this MVP phase.

## Decisions

- **Database Architecture:** `id` will utilize UUIDs generated organically via `gen_random_uuid()`. The `user_id` will structurally link as a foreign key to `auth.users` to strictly anchor subjects to accounts.
- **Data Security:** Full RLS policies will be codified explicitly asserting that the operation's executing user `auth.uid()` strictly equals the row's `user_id` for SELECT, INSERT, UPDATE, and DELETE.
- **Frontend Fetch Strategy:** We'll implement a clean Client Component dashboard (`/dashboard`) that utilizes `@supabase/supabase-js`, establishing the baseline request-response cycle from frontend to Db and back.

## Risks / Trade-offs

- [Client-side data fetching latency] → Trade-off is acceptable early on for UI simplicity vs SSR patterns. Mitigation: we will implement loading state skeletons or basic UI indicators.
