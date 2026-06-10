## Architecture

- **Page**: `app/dashboard/estatisticas/page.jsx`
- **Scope**: Adding React state, a new tab menu UI, and conditional rendering for the existing charts and the new AI skeleton.

## DOM Structure & React Layout

### 1. State Management
At the top of the `EstatisticasPage` component:
```jsx
import { useState } from 'react';
// ... other imports

export default function EstatisticasPage() {
  const [activeTab, setActiveTab] = useState('geral');
  // ... existing data
```

### 2. Tab Navigation UI
Directly below the `<div className="mb-10">...</div>` header block, insert the tabs:
```jsx
<div className="flex gap-6 border-b border-white/10 mb-8">
  <button
    onClick={() => setActiveTab('geral')}
    className={`pb-3 transition-all ${
      activeTab === 'geral'
        ? 'text-white border-b-2 border-[#3a86ff] font-bold'
        : 'text-gray-400 hover:text-gray-200'
    }`}
  >
    Visão Geral
  </button>
  <button
    onClick={() => setActiveTab('ia')}
    className={`pb-3 transition-all ${
      activeTab === 'ia'
        ? 'text-white border-b-2 border-purple-500 font-bold'
        : 'text-gray-400 hover:text-gray-200'
    }`}
  >
    ✨ Insights da IA
  </button>
</div>
```

### 3. Conditional Wrappers
Wrap the entire `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">...</div>` block in:
```jsx
{activeTab === 'geral' && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* All existing cards stay here unchanged */}
  </div>
)}
```

### 4. AI Insights Skeleton
Below the `geral` block, add the `ia` block:
```jsx
{activeTab === 'ia' && (
  <div className="max-w-3xl mx-auto text-center py-12">
    <div className="w-24 h-24 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-8 border border-purple-500/30">
      <Bot className="w-12 h-12 text-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
    </div>
    <h2 className="text-3xl font-extrabold text-white mb-4">Diagnóstico Operacional Profundo</h2>
    <p className="text-gray-400 text-lg mb-10 leading-relaxed">
      Nossa IA cruza seus dados de foco, entregas e documentação para revelar gargalos e sugerir o próximo passo exato para o seu semestre.
    </p>
    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)]">
      ✨ Analisar Meu Desempenho
    </button>
  </div>
)}
```

## Constraints

- Pure JS/JSX. NO TypeScript.
- Ensure `useState` is imported from React.
- Ensure `Bot` (or `Brain`) is imported from `lucide-react`.
- DO NOT alter or remove any of the existing Recharts code; simply nest it inside the conditional block.
