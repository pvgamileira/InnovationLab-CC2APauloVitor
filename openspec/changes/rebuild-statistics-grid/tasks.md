## 1. Setup Page Foundation
- [x] 1.1 Open `app/dashboard/estatisticas/page.jsx`.
- [x] 1.2 Delete all existing code in the file.
- [x] 1.3 Add `"use client";` at the top.
- [x] 1.4 Import `Activity, PieChart, Clock, TrendingUp, Database, BookOpen, Target` from `lucide-react`.
- [x] 1.5 Export a default function `EstatisticasPage()`.
- [x] 1.6 Add the page wrapper: `<div className="p-6 max-w-7xl mx-auto">`.
- [x] 1.7 Add the Header: `<h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Estatísticas Operacionais</h1>` and its subtitle.

## 2. Build the Grid Layout
- [x] 2.1 Below the header, add the grid container: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`.

## 3. Implement the 6 Tactical Cards
- [x] 3.1 Implement Card 1 (Saúde do Backlog): Title "Taxa de Eficácia", Stat "85%", Subtext "2 Tarefas em risco nas próximas 48h", Icon `Activity`.
- [x] 3.2 Implement Card 2 (Distribuição de Carga): Title "Esforço por Disciplina", Stat "12h 30m Foco Líquido", Subtext "Maior carga: DataBase Design (5h)", Icon `PieChart` or `Clock`.
- [x] 3.3 Implement Card 3 (Cadência/Velocity): Title "Velocidade de XP", Stat "+15%", Subtext "Em relação à semana passada. Ofensiva: 5 dias", Icon `TrendingUp`.
- [x] 3.4 Implement Card 4 (Cobertura de Dados): Title "Índice de Rastreamento", Stat "100%", Subtext "Nenhum ponto cego. Todas as disciplinas possuem tarefas ativas.", Icon `Database`.
- [x] 3.5 Implement Card 5 (Densidade de Documentação): Title "Saúde do Caderno", Stat "66%", Subtext "2 de 3 matérias com resumos atualizados (Falta Engenharia de Software)", Icon `BookOpen`.
- [x] 3.6 Implement Card 6 (Micro-Progresso): Title "Tração de Estudo", Stat "SQL Fundamentals", Subtext "Disciplina que mais gerou XP nesta semana (+450 XP)", Icon `Target`.
