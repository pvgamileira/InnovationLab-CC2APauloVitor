"use client";

import { useState, useEffect } from 'react';
import { Activity, PieChart as PieChartIcon, Clock, TrendingUp, Database, BookOpen, Target, Bot, Terminal } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart as RePieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { supabase } from '@/lib/supabase';
import { useUserContext } from '@/context/UserContext';

export default function EstatisticasPage() {
  const [activeTab, setActiveTab] = useState('produtividade');
  const { userData } = useUserContext();
  const [tasks, setTasks] = useState([]);

  // OpenSpec: Handlers for live AI diagnostics
  const [isLoading, setIsLoading] = useState(false);
  const [aiData, setAiData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      const { data } = await supabase.from('academic_tasks').select('*').eq('user_id', session.user.id);
      if (data) setTasks(data);
    }
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const pendingTasks = tasks.filter(t => t.status !== 'completed').length;

  const handleGenerateDiagnosis = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/consultoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tarefas: tasks, xp: userData?.xp || 0 })
      });
      if (!response.ok) throw new Error('SISTEMA OFFLINE. Incapaz de processar diagnóstico neural.');
      const data = await response.json();
      setAiData(data.diagnosis);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // OpenSpec: Heuristic mapping evaluating local user context for cognitive overload warning
  const isOverloaded = (userData?.xp < 100) || (pendingTasks > completedTasks);
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

  const customTooltipStyle = {
    backgroundColor: '#0f172a',
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: '0.5rem',
    color: '#e5e7eb'
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">Estatísticas Operacionais</h1>
        <p className="text-gray-400">Visão tática do seu progresso, cadência e saúde do sistema.</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-6 border-b border-white/10 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('produtividade')}
          className={`pb-3 transition-all whitespace-nowrap ${
            activeTab === 'produtividade'
              ? 'text-white border-b-2 border-[#3a86ff] font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Produtividade
        </button>
        <button
          onClick={() => setActiveTab('esforco')}
          className={`pb-3 transition-all whitespace-nowrap ${
            activeTab === 'esforco'
              ? 'text-white border-b-2 border-[#3a86ff] font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          Esforço Líquido
        </button>
        <button
          onClick={() => setActiveTab('ia')}
          className={`pb-3 transition-all whitespace-nowrap flex items-center gap-2 ${
            activeTab === 'ia'
              ? 'text-white border-b-2 border-purple-500 font-bold'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          ✨ Consultoria IA
        </button>
      </div>

      {/* Produtividade Layout */}
      {activeTab === 'produtividade' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Saúde do Backlog */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors relative overflow-hidden group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#3a86ff]/20 flex items-center justify-center text-[#3a86ff]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 text-right">Taxa de Eficácia</h3>
              <div className="text-xl font-bold text-white text-right">85%</div>
            </div>
          </div>
          <div className="flex-1 -mx-2 -mb-2 mt-4">
            <ResponsiveContainer width="100%" height={160}>
              <LineChart data={backlogData}>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#e5e7eb' }} />
                <Line type="monotone" dataKey="concluidas" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="criadas" stroke="#ef4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 3: Cadência/Velocity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors relative overflow-hidden group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 text-right">Velocidade de XP</h3>
              <div className="text-xl font-bold text-white text-right">+15%</div>
            </div>
          </div>
          <div className="flex-1 -mx-2 -mb-2 mt-4">
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={velocityData}>
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#e5e7eb' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                <Bar dataKey="xp" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 5: Índice de Rastreamento (Metric + Sparkline) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors relative overflow-hidden group justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <Database className="w-5 h-5" />
            </div>
            <div className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Perfeito
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Índice de Rastreamento</h3>
            <div className="text-4xl font-extrabold text-white mb-2">100%</div>
            <p className="text-xs text-gray-500">Nenhum ponto cego. Todas as disciplinas possuem tarefas ativas.</p>
          </div>
        </div>

        {/* Card 6: Tração de Estudo (Metric + Sparkline) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors relative overflow-hidden group justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-500">
              <Target className="w-5 h-5" />
            </div>
            <div className="px-2.5 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +450 XP
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-1">Tração de Estudo</h3>
            <div className="text-3xl font-extrabold text-white mb-2 truncate">SQL Fund.</div>
            <p className="text-xs text-gray-500">Disciplina que mais gerou XP e avanço tático nesta semana.</p>
          </div>
        </div>

        </div>
      )}

      {/* Esforço Líquido Layout */}
      {activeTab === 'esforco' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Card 2: Distribuição de Carga */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors relative overflow-hidden group">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500">
              <PieChartIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 text-right">Esforço por Disciplina</h3>
              <div className="text-xl font-bold text-white text-right">12h 30m Foco</div>
            </div>
          </div>
          <div className="flex-1 -mx-2 -mb-2 mt-4">
            <ResponsiveContainer width="100%" height={160}>
              <RePieChart>
                <Pie data={effortData} innerRadius={50} outerRadius={70} paddingAngle={5} dataKey="value" stroke="none">
                  {effortData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} itemStyle={{ color: '#e5e7eb' }} />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Card 4: Densidade de Documentação */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:bg-white/[0.07] transition-colors relative overflow-hidden group">
          <div className="flex items-start justify-between mb-6">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex items-center justify-center text-pink-500">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 text-right">Saúde do Caderno</h3>
              <div className="text-xl font-bold text-white text-right">66% Cobertura</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-400 mb-1">
                <span>DataBase Design</span>
                <span className="text-white">100%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#3a86ff] h-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-400 mb-1">
                <span>SQL Fundamentals</span>
                <span className="text-white">75%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-[#10b981] h-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-400 mb-1">
                <span>Eng. Software</span>
                <span className="text-gray-500">0%</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-gray-600 h-full" style={{ width: '0%' }}></div>
              </div>
            </div>
          </div>
        </div>

        </div>
      )}

      {/* AI Insights Panel */}
      {activeTab === 'ia' && (
        <div className="max-w-3xl mx-auto py-10 animate-in fade-in zoom-in duration-500">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-purple-500/20 flex items-center justify-center text-purple-400">
              <Bot className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-white">Consultoria IA</h2>
              <p className="text-gray-400">Análise tática e diagnóstico operacional profundo.</p>
            </div>
          </div>
          
          <div className="bg-[#0a0c14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.1)]">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-400" />
              Métrica de Queima de Backlog
            </h3>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center">
                <div className="text-gray-400 text-sm font-medium mb-2">Tarefas Concluídas</div>
                <div className="text-4xl font-extrabold text-[#10b981]">{completedTasks}</div>
              </div>
              <div className="bg-white/5 border border-white/5 rounded-2xl p-6 text-center">
                <div className="text-gray-400 text-sm font-medium mb-2">Tarefas Pendentes</div>
                <div className="text-4xl font-extrabold text-[#ef4444]">{pendingTasks}</div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-purple-400" />
              Terminal de Insights
            </h3>
            
            {!aiData && !isLoading && !error && (
              <div className="flex flex-col items-center py-8">
                <button 
                  onClick={handleGenerateDiagnosis}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2"
                >
                  <Bot className="w-5 h-5" />
                  🧠 Gerar Diagnóstico Neural
                </button>
              </div>
            )}

            {isLoading && (
              <div className="bg-white/5 animate-pulse rounded-xl h-32 w-full border border-white/10 flex items-center justify-center">
                <p className="text-purple-400 font-mono text-sm tracking-widest animate-bounce">Processando matriz neural...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-900/20 border border-red-500/20 p-6 rounded-xl text-red-400 font-mono text-sm">
                [ERRO DO SISTEMA]: {error}
              </div>
            )}

            {aiData && !isLoading && (
              <div className="bg-black/40 font-mono text-sm border border-white/5 p-6 rounded-xl flex flex-col gap-3">
                <div className="text-gray-500 flex items-center gap-2 mb-2">
                  <span className="text-purple-500">➜</span> analise_heuristica --user={userData?.xp || 0}xp
                </div>
                <div className="text-[#e2e8f0] leading-relaxed border-l-2 border-purple-500/50 pl-4 whitespace-pre-wrap">
                  {aiData}
                </div>
                <button onClick={() => { setAiData(null); setError(null); }} className="text-xs text-gray-500 hover:text-white self-end mt-4 underline decoration-gray-700 underline-offset-4">Resetar Terminal</button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}