## Why

As part of Step 2 in the Statistics page rebuild, we need to move away from the current abstract visual metrics (like heatmaps and burnout meters) and transition toward a highly actionable, 6-block tactical grid. To validate this new layout and ensure the UI/UX aligns with the EduTrack dark mode and glassmorphism standards, we will first implement this grid using hardcoded mock data tailored to the user's specific context (e.g., SQL Fundamentals, Engenharia de Software). This allows us to perfect the visual design before wiring up the real Supabase backend logic in a subsequent step.

## What Changes

1. **Clear Existing UI**: Remove all current statistical components and charts from `app/dashboard/estatisticas/page.jsx`.
2. **Layout Foundation**: Introduce a new header titled "Estatísticas Operacionais" and construct a responsive CSS grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`).
3. **Tactical Metric Cards**: Create 6 distinct metric cards using our premium glassmorphism styling (`bg-white/5 border border-white/10 rounded-2xl p-6`). The cards will represent:
   - Saúde do Backlog (Taxa de Eficácia)
   - Distribuição de Carga (Esforço por Disciplina)
   - Cadência / Velocity (Velocidade de XP)
   - Cobertura de Dados (Índice de Rastreamento)
   - Densidade de Documentação (Saúde do Caderno)
   - Micro-Progresso (Tração de Estudo)

## Capabilities

### Modified Capabilities
- `tactical-statistics-view`: A new, actionable 6-block grid replaces the old abstract charts, providing immediate operational insights.

## Impact

- **Affected code**: Entire replacement of the `app/dashboard/estatisticas/page.jsx` UI.
- **User Experience**: The user will see a clean, data-dense, and highly relevant statistics dashboard that provides immediate tactical value rather than abstract visualizations.
