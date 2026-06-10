## Why

The current Recharts-based statistics page provides a visually stunning SaaS analytics view, but it is densely packed. As we prepare to inject AI-driven analytical capabilities, dumping more text and buttons into the existing 6-block grid will create cognitive overload. To resolve this and establish a foundation for the AI engine, we must implement a Tab Navigation System—similar to the one on the Profile page—separating the raw data ("Visão Geral") from the actionable AI diagnosis ("Inteligência Artificial").

## What Changes

1. **State Management**: Introduce an `activeTab` React state within `app/dashboard/estatisticas/page.jsx` to handle view switching.
2. **Tab UI Component**: Build a sleek, dark-mode optimized tab navigation bar directly below the page header featuring two tabs: "Visão Geral" and "✨ Insights da IA".
3. **Conditional Rendering**: Wrap the existing 6-block CSS Grid inside a conditional block ensuring it only renders when `activeTab === 'geral'`.
4. **AI Insights Skeleton**: Create the foundation for the `'ia'` tab. This will be a centered, polished container featuring a glowing Bot/Brain icon, a descriptive "Diagnóstico Operacional Profundo" header, and a primary CTA button to trigger the future AI analysis.

## Capabilities

### Modified Capabilities
- `tactical-statistics-view`: Upgraded from a static dashboard into a tabbed interface, separating raw metric visualization from AI-driven operational diagnosis.

## Impact

- **Affected code**: `app/dashboard/estatisticas/page.jsx`.
- **User Experience**: The user will immediately notice a cleaner, tabbed interface that logically separates the consumption of raw metrics from the upcoming interactive AI diagnosis flow.
