# Design: Update Deprecated Gemini Model String to 3.5-Flash

## Component Tweak: `app/api/ai/consultoria/route.js`

1. **Locate URL:** Find the `fetch` call string: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`
2. **String Swap:** Change `gemini-1.5-flash` strictly to `gemini-3.5-flash`.
3. **Constraint:** Do not touch the payload, headers, or error handling. Ensure this is a pure 1-line string substitution.
