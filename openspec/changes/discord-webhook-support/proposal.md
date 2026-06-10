## Why

The Support Helpdesk currently uses a mock timeout instead of actual ticket submission logic. To make the Helpdesk functional without needing a dedicated ticketing backend, we will integrate a Discord Webhook. This will allow the support team to receive tickets directly in a Discord channel. We must implement this securely via a server-side Next.js API route to protect the webhook URL and avoid CORS issues.

## What Changes

1. **API Route**: Create `app/api/suporte/route.js` with an async POST handler. It will parse the ticket data (category, subject, description), construct a rich Discord embed (with dynamic colors like Red for Bug, Blue for Dúvida), and send it to `process.env.DISCORD_WEBHOOK_URL`.
2. **Frontend Integration**: Update `app/dashboard/suporte/page.jsx` to replace the mock `setTimeout` with a fetch request to `/api/suporte`.
3. **Error Handling**: Add `try/catch` blocks on both the frontend and the backend API to handle and surface errors gracefully.

## Capabilities

### New Capabilities
- `discord-ticket-integration`: Automatically routes new Helpdesk tickets to Discord via a secure server-side webhook.

### Modified Capabilities
- `helpdesk-ui`: Forms now submit actual data to the server instead of displaying a mock delay.

## Impact

- **Affected code**: `app/dashboard/suporte/page.jsx` and the new `app/api/suporte/route.js`.
- **User Experience**: Users will still see a loading state and a toast on success/failure, but the data will now reach the administrators in real time via Discord.
