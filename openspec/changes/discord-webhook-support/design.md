## Architecture

- **Backend Route**: `app/api/suporte/route.js`. An Edge or Node-based API route responsible for accepting the POST request and bridging communication to the Discord Webhook.
- **Frontend**: `app/dashboard/suporte/page.jsx`. The existing UI form that will now submit a fetch request to the new API.

## API Integration Details

### Discord Webhook Payload
The API will construct a structured embed payload:
- **Username**: "Suporte EduTrack" (or similar).
- **Embed Color**:
  - `Bug`: Red (e.g., decimal `16711680`)
  - `Dúvida`: Blue (e.g., decimal `3447003`)
  - `Sugestão`: Green or Yellow (e.g., decimal `16776960` for yellow, or `5763719` for green)
- **Fields**:
  1. `Categoria`: The selected category.
  2. `Assunto`: The ticket subject.
  3. `Descrição`: The long-form description (can be placed as the embed description or a field).

### Frontend Modifications
- Remove the `await new Promise(r => setTimeout(r, 1000));` inside `handleSubmit`.
- Execute:
  ```javascript
  const res = await fetch('/api/suporte', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, subject, description })
  });
  if (!res.ok) throw new Error('Falha ao enviar chamado.');
  ```
- Wrap the execution in a `try/catch` block. On catch, trigger a toast with the error message.

## Constraints

- Pure JS/JSX. NO TypeScript.
- The webhook URL must strictly be loaded from `process.env.DISCORD_WEBHOOK_URL` to prevent accidental leakage in the client bundle.
- Maintain existing dark mode styling and toast integrations.
