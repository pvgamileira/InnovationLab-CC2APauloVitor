## Why

The application crashed with an error stating `useUserContext must be used within a UserProvider`. This happened because `AiProvider` calls `useUserContext`, but it was placed outside/above `UserProvider` in the component tree. We need to invert the wrapping order in the layout to ensure `AiProvider` is correctly nested inside `UserProvider`.

## What Changes

- **Fix Provider Nesting**: Open `app/dashboard/layout.jsx` and reorder the component tree. Ensure that `<UserProvider>` is the absolute outer wrapper that wraps `<AiProvider>`.

## Capabilities

### New Capabilities
- `provider-nesting`: Fixes the provider nesting issue to ensure context consumers are properly nested within their providers.

### Modified Capabilities

## Impact

- **Affected code**: `app/dashboard/layout.jsx` (or `app/layout.jsx` depending on where the providers are).
- **Application Stability**: The application will no longer crash due to the incorrect nesting order of context providers.
