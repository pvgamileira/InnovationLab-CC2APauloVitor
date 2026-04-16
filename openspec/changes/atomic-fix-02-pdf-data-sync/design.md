## Context

This atomic proposal concentrates solely on stabilizing `app/api/generate-report/route.js`. The ecosystem uses Next.js server routes interacting securely with Supabase before spawning a Python child process. We are focusing purely on the data bridge without any aesthetic, frontend, or script modifications.

## Goals / Non-Goals

**Goals:**
- Validating the `Authorization` bearer token against `supabase.auth.getUser()`.
- Performing the RLS-secure queries to `subjects` and `academic_tasks`.
- Assembling the `payload` object securely.
- Enforcing standard `JSON.stringify()` on the payload before streaming it via `stdin`.

**Non-Goals:**
- Modification of `generate_report.py`.
- Modifications of any `page.jsx` or layout elements.

## Decisions

- **Data Origin:** We completely discard any external JSON input from the client (other than the token). The API route becomes the single source of truth for the PDF content.
- **Serialization Strategy:** Using `JSON.stringify()` ensures that special characters inside user data (e.g., Portuguese names) are properly encoded before traveling through the `child_process.spawn` pipe.

## Risks / Trade-offs

- Increased backend execution time by adding sequential `await` queries before spawning the process. However, the integrity gain completely justifies this minor temporal tradeoff on report exports.
