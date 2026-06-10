## 1. Setup State and Imports
- [x] 1.1 Open `app/dashboard/estatisticas/page.jsx`.
- [x] 1.2 Import `useState` from `react`.
- [x] 1.3 Add `Bot` to the `lucide-react` imports.
- [x] 1.4 Inside the `EstatisticasPage` component, initialize `const [activeTab, setActiveTab] = useState('geral');`.

## 2. Implement Tab Navigation
- [x] 2.1 Locate the page header `div` (the one containing "Estatísticas Operacionais").
- [x] 2.2 Directly below that header, insert the new Tab Navigation `<div className="flex gap-6 border-b border-white/10 mb-8">`.
- [x] 2.3 Add the "Visão Geral" button, applying conditional styling based on `activeTab === 'geral'`.
- [x] 2.4 Add the "✨ Insights da IA" button, applying conditional styling based on `activeTab === 'ia'`.
- [x] 2.5 Ensure both buttons have `onClick` handlers updating `setActiveTab`.

## 3. Apply Conditional Rendering
- [x] 3.1 Locate the existing CSS Grid container `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">` and wrap it entirely in `{activeTab === 'geral' && ( ... )}`.

## 4. Build AI Insights Skeleton
- [x] 4.1 Below the newly wrapped CSS Grid, create the `{activeTab === 'ia' && ( ... )}` block.
- [x] 4.2 Build the centered layout: `<div className="max-w-3xl mx-auto text-center py-12">`.
- [x] 4.3 Implement the glowing Bot icon container.
- [x] 4.4 Add the `<h2>` title "Diagnóstico Operacional Profundo".
- [x] 4.5 Add the `<p>` description text detailing the data crossing.
- [x] 4.6 Implement the `<button>` "✨ Analisar Meu Desempenho" with the specified purple glassmorphism/shadow effects.
