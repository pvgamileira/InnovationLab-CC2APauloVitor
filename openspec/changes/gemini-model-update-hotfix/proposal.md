# Proposal: Update Deprecated Gemini Model String to 3.5-Flash

## What are we doing?
We are updating the Gemini REST API endpoint in `app/api/ai/consultoria/route.js` from the deprecated `gemini-1.5-flash` model string to the active `gemini-3.5-flash` version.

## Why are we doing this?
Google has deprecated the 1.5-flash string on the v1beta endpoint, resulting in a 404 Not Found error when the "Consultoria IA" tab fetches the diagnosis. Pointing it to `gemini-3.5-flash` immediately restores AI functionality without requiring any logic changes.
