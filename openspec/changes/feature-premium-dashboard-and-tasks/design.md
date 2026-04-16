## Context
We are upgrading the MVP dashboard to a fully Premium UI while introducing a new critical data vector: `academic_tasks`. The operational payload now encompasses both subject definition and individual granular task tracking.

## Goals / Non-Goals

**Goals:**
- Architect a new SQL schema `academic_tasks` firmly linking to `subjects`.
- Architect an advanced visual dashboard dividing metrics into a tri-pane structure: Overview Cards, Subjects Grid, and Tasks List.
- Force explicit Glassmorphism styling with `backdrop-blur`, deep rich backgrounds, and precise metallic blue highlights.

**Non-Goals:**
- Creating interactive CRUD task creation modals functionality yet (handled in future implementations, this design focuses mostly on schemas and the high-end listing environments).
- Using third-party component libraries for the UI.

## Decisions
- **Data Model Architecture:** `academic_tasks` will hold `id`, `user_id`, `subject_id` (foreign key to `subjects(id)` with explicit constraints), `title`, `status` (pending/completed flags), `due_date` (date), and `created_at`.
- **UI Toolkit:** Pure Javascript + CSS via Tailwind (Next.js App Router). We will construct manual utility combinations for the glassmorphism strictly relying on `bg-white/5 backdrop-blur-xl border border-white/10` paradigms over generic solid blocks.

## Risks / Trade-offs
- [Complex DOM Render on Mobile] → Trade-off: Maintaining dense glassmorphism across varied architectures may cause performance lag on low-end hardware. Mitigation: Limiting excessive stacking of blur opacities.
