## 1. Setup Environment
- [x] 1.1 Verify or document that `DISCORD_WEBHOOK_URL` needs to be present in `.env.local`.

## 2. Implement API Route
- [x] 2.1 Create a new file: `app/api/suporte/route.js`.
- [x] 2.2 Export an `async function POST(request)` within the file.
- [x] 2.3 Add a `try/catch` block.
- [x] 2.4 Parse the request body: `const { category, subject, description } = await request.json();`.
- [x] 2.5 Determine embed color based on `category` (e.g., Red for Bug, Blue for Dúvida).
- [x] 2.6 Construct the Discord payload object containing `embeds` with `title`, `description`, `color`, and `fields`.
- [x] 2.7 Call `fetch(process.env.DISCORD_WEBHOOK_URL, { method: 'POST', body: JSON.stringify(payload) })`.
- [x] 2.8 Return `NextResponse.json({ success: true })` on success, or an error response on failure.

## 3. Update Frontend Integration
- [x] 3.1 Open `app/dashboard/suporte/page.jsx`.
- [x] 3.2 Locate the `handleSubmit` function.
- [x] 3.3 Add a `try/catch` block around the submission logic.
- [x] 3.4 Remove the fake `setTimeout` delay.
- [x] 3.5 Implement `fetch('/api/suporte', ...)` sending the stringified JSON body (`category`, `subject`, `description`).
- [x] 3.6 Check `if (!res.ok) throw new Error('...')`.
- [x] 3.7 In the `catch` block, call `showToast(error.message, "error")` and make sure `setIsSubmitting(false)` runs in a `finally` block or at the end of execution.
- [x] 3.8 Ensure the success toast and form clearing logic only run if the fetch was successful.
