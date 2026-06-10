## 1. Fix Layout Provider Nesting

- [x] 1.1 Open `app/dashboard/layout.jsx` (or `app/layout.jsx` if that's where the providers are located).
- [x] 1.2 Locate the `<UserProvider>` and `<AiProvider>` in the return statement.
- [x] 1.3 Swap their order so that `<UserProvider>` is the outer wrapper and `<AiProvider>` is nested directly inside it.
- [x] 1.4 Ensure that the rest of the layout (e.g., `{children}`) remains safely inside `<AiProvider>`.
