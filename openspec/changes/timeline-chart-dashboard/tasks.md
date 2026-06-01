# Tarefas: Enhance Statistics Dashboard with Timeline Chart

- [x] **Update Imports**
  - [x] Open `app/dashboard/estatisticas/page.jsx`.
  - [x] Add `LineChart`, `Line`, `CartesianGrid`, `XAxis`, `YAxis`, `Tooltip` to the `recharts` import.
  - [x] Add `Activity` (or `Clock`) to the `lucide-react` import if not present.

- [x] **Calculate Data**
  - [x] Initialize `timelineData: []` in the `metrics` state object.
  - [x] Inside `fetchStats`, filter the `tasks` array for items with `due_date`.
  - [x] Group by date formatted as `DD/MM` and count the number of tasks per date.
  - [x] Map the grouped data into an array of objects: `[{ date: string, Tarefas: number }]`.
  - [x] Sort the array chronologically by date.
  - [x] Assign this array to `metrics.timelineData`.

- [x] **Render UI**
  - [x] Below the existing charts section, add a new full-width wrapper: `<div className="bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mt-8">`.
  - [x] Add the title "Radar de Sobrecarga (Prazos)" using the chosen icon.
  - [x] Render the timeline data conditionally:
    - [x] If `metrics.timelineData.length > 0`, render the `ResponsiveContainer` (height 250) with `LineChart`.
    - [x] Add `CartesianGrid`, `XAxis`, `YAxis`, `Tooltip`, and the `Line` component (monotone, dataKey "Tarefas", stroke #f59e0b, strokeWidth 3).
    - [x] If empty, render the empty state: `<div className="h-[250px] flex items-center justify-center text-gray-500">Nenhum prazo próximo detectado</div>`.
