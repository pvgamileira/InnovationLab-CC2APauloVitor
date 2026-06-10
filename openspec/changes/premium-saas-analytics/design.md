## Architecture

- **Page**: `app/dashboard/estatisticas/page.jsx`
- **Scope**: Rebuilding the 6-block grid with `recharts` components and custom UI elements.

## DOM Structure & React Layout

### 1. Imports
Import the Recharts elements alongside Lucide icons:
```jsx
import { Activity, PieChart, Clock, TrendingUp, Database, BookOpen, Target } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line } from 'recharts';
```
*(Note: Alias `PieChart` from recharts to `RePieChart` to avoid conflict with the Lucide `PieChart` icon, if used).*

### 2. Mock Data Definitions
Defined inside `EstatisticasPage` before the return:
```js
const velocityData = [
  { name: 'Seg', xp: 120 }, { name: 'Ter', xp: 250 }, { name: 'Qua', xp: 150 },
  { name: 'Qui', xp: 300 }, { name: 'Sex', xp: 450 }, { name: 'Sáb', xp: 0 }, { name: 'Dom', xp: 0 }
];

const effortData = [
  { name: 'DB Design', value: 300, color: '#3a86ff' },
  { name: 'SQL', value: 250, color: '#10b981' },
  { name: 'Eng. Software', value: 100, color: '#f59e0b' }
];

const backlogData = [
  { name: 'Sem 1', concluidas: 5, criadas: 8 },
  { name: 'Sem 2', concluidas: 12, criadas: 15 },
  { name: 'Sem 3', concluidas: 10, criadas: 10 }
];
```

### 3. Visual Components

**Card 1 (Saúde do Backlog)**
- Requires `<LineChart data={backlogData}>`.
- Hide CartesianGrids. XAxis `stroke="#9ca3af"`.
- `<Line type="monotone" dataKey="concluidas" stroke="#10b981" strokeWidth={2} dot={false} />`
- `<Line type="monotone" dataKey="criadas" stroke="#ef4444" strokeWidth={2} dot={false} />`

**Card 2 (Distribuição de Carga)**
- Requires `<RePieChart>`.
- `<Pie data={effortData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">`.
- Map `<Cell key={index} fill={entry.color} />`.

**Card 3 (Cadência/Velocity)**
- Requires `<BarChart data={velocityData}>`.
- `<Bar dataKey="xp" fill="#8b5cf6" radius={[4, 4, 0, 0]} />`.

**Card 4 (Densidade de Documentação - Custom Progress UI)**
- A flex column of subjects with custom HTML progress bars mapping the percentages explicitly requested.

**Cards 5 & 6 (Tração e Cobertura)**
- Simple layout: large numbers with colored text indicating trends (e.g., `<span className="text-emerald-400">+15%</span>`) mimicking sparkline metric setups.

### Tooltips
For all charts, use a custom tooltip style to ensure visibility on dark mode:
```jsx
<Tooltip 
  contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
  itemStyle={{ color: '#e5e7eb' }}
/>
```

## Constraints

- Pure JS/JSX. NO TypeScript.
- All styles must use strict Tailwind utility classes (`bg-white/5 border border-white/10 rounded-2xl p-6`).
- All charts wrapped in `<ResponsiveContainer width="100%" height={200}>`.
