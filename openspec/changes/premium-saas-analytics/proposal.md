## Why

The current text-heavy statistics mockup lacks the visual impact necessary for a premium application. Users need immediate, visceral understanding of their operational cadences, effort distribution, and throughput trends. To achieve this, we will upgrade the dashboard to a high-end SaaS analytics view by replacing static numbers with interactive, modern data visualizations built on `recharts`.

## What Changes

1. **Recharts Integration**: Import and implement `BarChart`, `PieChart`, and `LineChart` from the newly installed `recharts` library inside `app/dashboard/estatisticas/page.jsx`.
2. **Mock Data Injection**: Define standardized, context-aware mock data (`velocityData`, `effortData`, `backlogData`) to populate the visualizations.
3. **Chart Implementations**:
   - Card 1 (Saúde do Backlog): `LineChart` showing throughput (Concluídas vs Criadas).
   - Card 2 (Distribuição de Carga): `PieChart` (Donut configuration) displaying effort by discipline.
   - Card 3 (Cadência/Velocity): `BarChart` tracking daily XP generation in purple.
4. **Custom Progress UI**: Convert Card 4 (Densidade de Documentação) into a custom sleek progress bar list tailored to subject coverage.
5. **Sparkline Upgrades**: Refine Cards 5 & 6 into "Metric + Sparkline" style widgets for micro-progress traction.
6. **Premium Styling Rules**: Wrap all charts in `<ResponsiveContainer width="100%" height={200}>`. Clean up grids, use muted gray text for axes (`#9ca3af`), and ensure all borders and backgrounds adhere strictly to the dark-mode glassmorphism specs (`bg-white/5 border border-white/10 rounded-2xl p-6`).

## Capabilities

### Modified Capabilities
- `tactical-statistics-view`: Transformed from a static numeric grid into an interactive, visually rich, SaaS-grade analytics dashboard.

## Impact

- **Affected code**: Complete rewrite of the content inside the `EstatisticasPage` layout in `app/dashboard/estatisticas/page.jsx`.
- **User Experience**: Drastically improved visual aesthetics, providing instantaneous pattern recognition through charting rather than requiring the user to read text stats.
