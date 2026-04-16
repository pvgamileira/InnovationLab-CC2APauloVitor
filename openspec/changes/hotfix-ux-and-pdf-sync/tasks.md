## 1. Auth & Routings Expansion

- [x] 1.1 Override `app/page.jsx` with a client-side Supabase session check wrapper enforcing `/dashboard` or `/auth` redirection.
- [x] 1.2 Refactor `app/auth/page.jsx`. Establish the left brand pane and the right floating Glassmorphism form using Deep Space/Rich Black palettes.
- [x] 1.3 Ensure zero emojis exist globally; strictly convert all visual helpers to Lucide SVGs.

## 2. Interactive Task Badges

- [x] 2.1 Access `app/dashboard/page.jsx` task rendering loop.
- [x] 2.2 Identify tasks with `due_date: null` to map the "Prazo Indeterminado" visual.
- [x] 2.3 Implement the "Atrasada" (red, overdue) and "Próxima" (yellow, < 48h) checks leveraging standard JS `new Date()` evaluation.

## 3. PDF Generator Route Sync

- [x] 3.1 Trace the backend logic in `app/api/generate-report/route.js`.
- [x] 3.2 Guarantee `await` lines are fully resolving Supabase datasets securely.
- [x] 3.3 Solidify `const jsonString = JSON.stringify(payload)` prior to `pythonProcess.stdin.write` mapping to assure structural integrity inside `sys.stdin`.
