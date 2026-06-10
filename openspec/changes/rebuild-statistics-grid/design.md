## Architecture

- **Page**: `app/dashboard/estatisticas/page.jsx`
- **Scope**: Complete structural replacement of the file contents.

## DOM Structure

### 1. Imports and Setup
- Ensure `"use client";` at the very top.
- Import all required icons from `lucide-react`: `Activity`, `PieChart`, `Clock`, `TrendingUp`, `Database`, `BookOpen`, `Target`.

### 2. The Header Component
```jsx
<div className="mb-10">
  <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Estatísticas Operacionais</h1>
  <p className="text-gray-400">Visão tática do seu progresso, cadência e saúde do sistema.</p>
</div>
```

### 3. The Grid Layout
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards go here */}
</div>
```

### 4. The Card Component Structure
Each of the 6 cards will follow this exact glassmorphism design pattern:
```jsx
<div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors relative overflow-hidden group">
  <div className="flex items-start justify-between mb-4">
    <div className="w-10 h-10 rounded-xl bg-[#3a86ff]/20 flex items-center justify-center text-[#3a86ff]">
      <Activity className="w-5 h-5" />
    </div>
  </div>
  <div>
    <h3 className="text-sm font-medium text-gray-400 mb-1">Saúde do Backlog</h3>
    <div className="text-2xl font-bold text-white mb-2">85%</div>
    <p className="text-xs text-gray-500">2 Tarefas em risco nas próximas 48h</p>
  </div>
</div>
```
*(Colors and icons will vary slightly per card to represent their distinct metrics).*

## Constraints

- Pure JS/JSX. NO TypeScript.
- No real state management or Supabase fetches yet. Everything is hardcoded mock data to validate the UI.
- Strict adherence to the `bg-white/5 border border-white/10 rounded-2xl p-6` premium styling.
