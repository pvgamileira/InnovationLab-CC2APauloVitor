# Design: Enhance Statistics Dashboard with Timeline Chart

## Abordagem Técnica

### 1. Data Calculation
- **Target:** `app/dashboard/estatisticas/page.jsx`
- **Change:** Within the `fetchStats` function, parse the fetched `tasks` array.
- **Logic:**
  - Filter out tasks without a `due_date`.
  - Group tasks by formatted `due_date` (`DD/MM`).
  - Convert the grouped object into an array of format `[{ date: '14/04', Tarefas: 2 }, ...]`.
  - Sort the array chronologically.
  - Update the initial `metrics` state to include `timelineData: []` and set the computed array to this property.

### 2. UI Integration
- **Imports:** Add `LineChart`, `Line`, `CartesianGrid`, `XAxis`, `YAxis`, `Tooltip` to the existing `recharts` import.
- **Render Placement:** Below the existing pie/bar charts, add a full-width glassmorphism container.
- **Styling:** Use `<div className="bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 mt-8">`.
- **Title:** "Radar de Sobrecarga (Prazos)" accompanied by a `Activity` or `Clock` icon from `lucide-react`.
- **Chart Component:**
  - Check `if (metrics.timelineData.length > 0)`.
  - If true, render `<ResponsiveContainer width="100%" height={250}>`.
  - Inside, use `<LineChart data={metrics.timelineData}>`.
  - Use `<Line type="monotone" dataKey="Tarefas" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', strokeWidth: 2 }} activeDot={{ r: 6 }} />`.
  - Add `<CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />`, `<XAxis dataKey="date" stroke="#ffffff50" />`, `<YAxis stroke="#ffffff50" allowDecimals={false} />`, and a custom/styled `<Tooltip />`.
  - If empty, render a generic empty state div: `<div className="h-[250px] flex items-center justify-center text-gray-500 font-medium">Nenhum prazo próximo detectado</div>`.

### 3. Constraints
- Use JavaScript only.
- Match existing dark UI themes precisely.
- Ensure grace handling of empty datasets.
