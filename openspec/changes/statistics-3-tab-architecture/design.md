## Architecture

- **State Management**: Inside `app/dashboard/estatisticas/page.jsx`, we will utilize `const [activeTab, setActiveTab] = useState('produtividade');`.
- **UI Structure**:
  1.  **Header Component**: The existing title will remain. Below it, a new horizontal flex container will act as the tab bar.
  2.  **Conditional Rendering Blocks**:
      - `{activeTab === 'produtividade' && (<Grid> ... </Grid>)}`
      - `{activeTab === 'esforco' && (<Grid> ... </Grid>)}`
      - `{activeTab === 'ia' && (<HeroContainer> ... </HeroContainer>)}`

## DOM Structure & React Layout

### 1. Tab Navigation Bar
```jsx
<div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
  <button 
    onClick={() => setActiveTab('produtividade')}
    className={`pb-3 transition-all whitespace-nowrap ${activeTab === 'produtividade' ? 'text-white border-b-2 border-[#3a86ff] font-bold' : 'text-gray-400 hover:text-gray-200'}`}
  >
    Produtividade
  </button>
  <button 
    onClick={() => setActiveTab('esforco')}
    className={`pb-3 transition-all whitespace-nowrap ${activeTab === 'esforco' ? 'text-white border-b-2 border-[#3a86ff] font-bold' : 'text-gray-400 hover:text-gray-200'}`}
  >
    Esforço Líquido
  </button>
  <button 
    onClick={() => setActiveTab('ia')}
    className={`pb-3 transition-all whitespace-nowrap ${activeTab === 'ia' ? 'text-white border-b-2 border-purple-500 font-bold flex items-center gap-2' : 'text-gray-400 hover:text-gray-200 flex items-center gap-2'}`}
  >
    ✨ Consultoria IA
  </button>
</div>
```

### 2. Produtividade & Esforço Grids
The existing Recharts components will be wrapped in `grid grid-cols-1 lg:grid-cols-2 gap-6` containers specific to their respective tabs. No logic inside the charts will change.

### 3. IA Consultancy Placeholder
```jsx
{activeTab === 'ia' && (
  <div className="max-w-2xl mx-auto text-center py-16 animate-in fade-in zoom-in duration-500">
    <div className="mb-8 relative inline-block">
      <div className="absolute inset-0 bg-purple-500 rounded-full blur-[40px] opacity-30 animate-pulse"></div>
      <Bot className="w-24 h-24 text-purple-400 relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]" />
    </div>
    <h2 className="text-3xl font-extrabold text-white mb-4">Diagnóstico Operacional Profundo</h2>
    <p className="text-gray-400 leading-relaxed mb-10">
      Nossa Inteligência Artificial analisará seu histórico de tarefas, velocidade de conclusão e foco para identificar gargalos, prever burnouts e sugerir táticas de estudo personalizadas.
    </p>
    <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all">
      ✨ Analisar Meu Semestre
    </button>
  </div>
)}
```

## Constraints

- Pure JS/JSX. NO TypeScript.
- The Recharts mock data arrays (`velocityData`, `effortData`, etc.) must remain exactly as they are.
- Ensure the `Bot` icon from `lucide-react` is imported.
