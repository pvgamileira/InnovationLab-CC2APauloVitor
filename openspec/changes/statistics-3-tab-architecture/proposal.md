## Why

As the Statistics dashboard expands, placing all data visualizations and upcoming AI features onto a single view creates cognitive overload. The user needs a clear mental model to distinguish between Task/XP performance ("Produtividade"), Time/Category tracking ("Esforço Líquido"), and the future AI-driven insights ("Consultoria IA").

## What Changes

1. **State Management**: We will introduce a 3-state tab system (`activeTab`) in `app/dashboard/estatisticas/page.jsx`.
2. **Tab Header UI**: We will build a sleek, horizontal navigation bar just below the page title. The tabs will be "Produtividade", "Esforço Líquido", and "✨ Consultoria IA".
3. **Tab 1 (Produtividade)**: This view will exclusively house the `LineChart` (Saúde do Backlog) and the `BarChart` (Velocity/XP) within a responsive 2-column grid.
4. **Tab 2 (Esforço Líquido)**: This view will house the `PieChart` (Distribuição de Carga) and the custom progress bars (Densidade de Documentação) within a similar grid.
5. **Tab 3 (Consultoria IA)**: This view will act as a placeholder for the upcoming AI agent. It will feature a massive, glowing `Bot` icon and a hero call-to-action to "Analisar Meu Semestre".

## Capabilities

### Modified Capabilities
- `statistics-dashboard`: Transformed from a static scrollable page to a modular, tabbed application.

### New Capabilities
- `ai-consultancy-placeholder`: A dedicated workspace prepared for future AI integrations.

## Impact

- **Affected code**: `app/dashboard/estatisticas/page.jsx`.
- **User Experience**: The analytics experience becomes highly focused. Users can isolate their performance metrics from their workload distribution, reducing clutter. The glowing AI tab creates excitement and clear real-estate for the upcoming feature without breaking existing charts.
