# Proposta: Enhance Statistics Dashboard with Timeline Chart

## Contexto
The statistics dashboard currently shows broad metrics, but it lacks a visual timeline to help users understand their upcoming workload over time. Adding a timeline chart will serve as a "Burnout/Overload Radar", showing the accumulation of task deadlines.

## Motivation
- Provide visual insights into upcoming task density to prevent student burnout.
- Improve the analytical value of the dashboard page by introducing a chronological perspective.
- Enhance the premium, data-driven feel of EduTrack AI.

## Scope
- Update `app/dashboard/estatisticas/page.jsx` to parse and group tasks by their `due_date`.
- Add a new state property `timelineData` inside the metrics object.
- Integrate Recharts components (`LineChart`, `Line`, etc.) to render this data.
- Add a new "Radar de Sobrecarga (Prazos)" UI card below the existing charts.

## Success Criteria
- The dashboard successfully groups tasks by `due_date` (formatted as `DD/MM`) and sorts them chronologically.
- A responsive LineChart displays the data, using a monotone amber line (`#f59e0b`).
- The UI handles empty states gracefully with a subtle message ("Nenhum prazo próximo detectado") when there is no timeline data.
