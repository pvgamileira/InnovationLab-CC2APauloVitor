## Why

To establish the foundational infrastructure for the "Alive AI" architecture, we need a persistent, global intelligence layer. Rather than treating AI as a conversational chatbot, it should act as an ambient background process (similar to an IDE linter) that constantly analyzes user data and provides operational insights. This requires a global context provider (`AiProvider`) to manage state and graceful degradation, paired with a permanent IDE-style `GlobalStatusBar` to display the AI's health and immediate insights.

## What Changes

1. **Global AI Context**: We will create `contexts/AiContext.jsx` to house the `AiProvider`. This will manage states like `aiStatus` (`online`, `offline`, `scanning`, `warning`, `critical`) and `globalInsight`. It will include an initial mock scan simulating API connectivity checks and establishing graceful degradation fallback if the system is offline.
2. **IDE Status Bar**: We will create `components/GlobalStatusBar.jsx`. This component will consume the `AiContext` and render an ultra-compact, fixed status bar at the absolute bottom of the screen (`bottom-0`). It will dynamically change icons and colors based on the `aiStatus` and mimic professional IDE interfaces (e.g., displaying UTF-8 encoding and tech stack).
3. **Layout Injection**: We will modify `app/dashboard/layout.jsx` to wrap the entire dashboard architecture inside `<AiProvider>` and append `<GlobalStatusBar/>` directly inside the body. This guarantees the AI status is visible across every dashboard page without overlapping existing content.

## Capabilities

### New Capabilities
- `ambient-ai-context`: Provides global AI health state and graceful degradation fallback.
- `ide-status-bar`: A persistent bottom bar that communicates system health and AI insights globally.

## Impact

- **Affected code**: `app/dashboard/layout.jsx`, `contexts/AiContext.jsx` (new), `components/GlobalStatusBar.jsx` (new).
- **User Experience**: Users will immediately feel a shift toward a more professional, premium IDE aesthetic. The status bar provides constant feedback on the system's operational health and AI capabilities without being intrusive.
