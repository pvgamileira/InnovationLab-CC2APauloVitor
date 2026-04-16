## 1. API Route Standardization

- [x] 1.1 Lock down `app/api/generate-report/route.js` using `supabase.auth.getUser()`.
- [x] 1.2 Implement the Supabase fetch operations for `subjects` and `academic_tasks` bound to `user.id`.
- [x] 1.3 Construct the data payload directly within the backend.
- [x] 1.4 Validate that `JSON.stringify(payload)` is explicitly declared before executing `pythonProcess.stdin.write`.
