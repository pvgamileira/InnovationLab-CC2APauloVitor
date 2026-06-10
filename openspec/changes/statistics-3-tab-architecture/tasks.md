## 1. Setup Tab State and Imports
- [x] 1.1 Open `app/dashboard/estatisticas/page.jsx`.
- [x] 1.2 Ensure `useState` is imported and initialize `const [activeTab, setActiveTab] = useState('produtividade');`.
- [x] 1.3 Add `Bot` to the `lucide-react` imports if not already present.

## 2. Build Tab Navigation
- [x] 2.1 Locate the page header.
- [x] 2.2 Directly below the header, create the flex container for the tabs.
- [x] 2.3 Implement the 3 buttons ("Produtividade", "Esforço Líquido", "✨ Consultoria IA") with their respective active/inactive CSS states and `onClick` handlers.

## 3. Restructure Content into Tabs
- [x] 3.1 Wrap the `LineChart` (Saúde do Backlog) and `BarChart` (Velocity/XP) inside a conditional block `{activeTab === 'produtividade' && (...) }` utilizing a 2-column grid.
- [x] 3.2 Wrap the `PieChart` (Distribuição de Carga) and Custom Progress Bars (Densidade de Documentação) inside a conditional block `{activeTab === 'esforco' && (...) }` utilizing a 2-column grid.

## 4. Implement IA Consultancy Placeholder
- [x] 4.1 Create the conditional block `{activeTab === 'ia' && (...) }`.
- [x] 4.2 Build the hero container with the glowing `Bot` icon.
- [x] 4.3 Add the "Diagnóstico Operacional Profundo" title and description.
- [x] 4.4 Add the "✨ Analisar Meu Semestre" action button.
