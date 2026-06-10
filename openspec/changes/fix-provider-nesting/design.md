## Context

The application recently experienced a crash with the message `useUserContext must be used within a UserProvider`. The root cause is a provider nesting order issue in the root dashboard layout. Specifically, the `AiProvider` relies on the `UserProvider` to supply context, but it currently wraps the `UserProvider` instead of being wrapped by it. 

## Goals / Non-Goals

**Goals:**
- Correct the provider nesting order in `app/dashboard/layout.jsx` (or whichever layout orchestrates the providers).
- Ensure `<UserProvider>` wraps `<AiProvider>` allowing `AiProvider` to consume `useUserContext` seamlessly.

**Non-Goals:**
- Modifying the internal logic of either `UserProvider` or `AiProvider`.
- Creating new contexts.

## Decisions

- **Inversion of Providers**: Simply invert the position of the providers in the layout file's return tree. `<UserProvider>` will become the top-level wrapper, containing `<AiProvider>` directly inside it.

## Risks / Trade-offs

- **Risk**: Other components might unexpectedly rely on the current incorrect nesting order.
  - **Mitigation**: The nature of context dictates that moving a provider higher up the tree only broadens its availability, making adverse side-effects highly unlikely.
