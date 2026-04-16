# EduTrack AI - Agent Directives

## 1. Core Architecture
- Frontend: Next.js (App Router, Pure JavaScript, Tailwind CSS). **DO NOT USE TYPESCRIPT.**
- Backend: Supabase (PostgreSQL, Auth).
- Methodology: Spec-Driven Development (OpenSpec).

## 2. UI/UX Guidelines
- Theme: Strict Dark Mode.
- Color Palette: "Rich Black" for backgrounds, "Metallic Blue" for accents and primary buttons.
- Style: Modern, glassmorphism effects for cards.

## 3. Security & Database Rules
- All Supabase queries must strictly filter by the authenticated session `user_id`.
- Tables and columns must use `snake_case`.
