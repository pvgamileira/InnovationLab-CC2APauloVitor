## 1. Setup Data and Imports
- [x] 1.1 Open `app/dashboard/estatisticas/page.jsx`.
- [x] 1.2 Import the required `recharts` components alongside `lucide-react`. Remember to alias `PieChart` to `RePieChart` to avoid conflicts if you use the Lucide icon `PieChart`.
- [x] 1.3 Inside the `EstatisticasPage` component, define the mock data arrays: `velocityData`, `effortData`, and `backlogData`.

## 2. Implement Recharts Cards
- [x] 2.1 Refactor **Card 1 (Saúde do Backlog)**: Replace static numbers with a `<ResponsiveContainer width="100%" height={200}>` wrapping a `<LineChart>`. Add two lines for "concluidas" and "criadas". Use custom dark-mode tooltips.
- [x] 2.2 Refactor **Card 2 (Distribuição de Carga)**: Replace static numbers with a `<ResponsiveContainer width="100%" height={200}>` wrapping a `<RePieChart>`. Implement a donut chart using `innerRadius={60}` and `outerRadius={80}` mapped to `effortData`.
- [x] 2.3 Refactor **Card 3 (Cadência/Velocity)**: Replace static numbers with a `<ResponsiveContainer width="100%" height={200}>` wrapping a `<BarChart>`. Map the `velocityData` using a purple bar (`#8b5cf6`).

## 3. Implement Custom UI Cards
- [x] 3.1 Refactor **Card 4 (Densidade de Documentação)**: Remove the static numbers. Build a sleek UI list mapping DB Design (100%), SQL (75%), and Eng. Soft (0%). Each should have a label and a visual progress bar (e.g., `<div className="w-full bg-white/5 h-2 rounded-full">...`).
- [x] 3.2 Refactor **Card 5 (Índice de Rastreamento)**: Convert into a Minimal "Metric + Sparkline" card. Show the large "100%" stat with a small positive graphical/text indicator.
- [x] 3.3 Refactor **Card 6 (Tração de Estudo)**: Convert into a Minimal "Metric + Sparkline" card showing the "SQL Fundamentals" tractions with an XP visual indicator.
