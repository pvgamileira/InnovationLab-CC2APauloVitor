'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  BarChart3, TrendingUp, Target, Clock, BrainCircuit, CheckCircle2, AlertCircle
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

export default function EstatisticasPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalTasks: 0,
    completedTasks: 0,
    completionRate: 0,
    totalWorkload: 0,
    subjectData: [],
    workloadData: []
  });

  const COLORS = ['#3a86ff', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'];

  useEffect(() => {
    async function fetchStats() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        const [subjectsRes, tasksRes] = await Promise.all([
          supabase.from('subjects').select('*').eq('user_id', session.user.id),
          supabase.from('academic_tasks').select('*').eq('user_id', session.user.id)
        ]);

        const subjects = subjectsRes.data || [];
        const tasks = tasksRes.data || [];

        // Cálculos Base
        const total = tasks.length;
        const completed = tasks.filter(t => t.status === 'completed').length;
        const rate = total === 0 ? 0 : Math.round((completed / total) * 100);
        const workload = subjects.reduce((acc, curr) => acc + (curr.workload || 0), 0);

        // Dados para o Gráfico de Barras (Tarefas por Matéria)
        const subjectDataMap = {};
        subjects.forEach(s => {
          subjectDataMap[s.id] = { name: s.name, Pendentes: 0, Concluídas: 0 };
        });

        tasks.forEach(t => {
          if (subjectDataMap[t.subject_id]) {
            if (t.status === 'completed') {
              subjectDataMap[t.subject_id].Concluídas += 1;
            } else {
              subjectDataMap[t.subject_id].Pendentes += 1;
            }
          }
        });

        // Dados para o Gráfico de Pizza (Carga Horária)
        const workloadData = subjects.map(s => ({
          name: s.name,
          value: s.workload || 0
        })).filter(s => s.value > 0);

        setMetrics({
          totalTasks: total,
          completedTasks: completed,
          completionRate: rate,
          totalWorkload: workload,
          subjectData: Object.values(subjectDataMap),
          workloadData: workloadData
        });

      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-[#3a86ff]/20 border-t-[#3a86ff] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-20 animate-in fade-in duration-700">

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-indigo-100 to-[#8b5cf6] bg-clip-text text-transparent mb-3">
          Estatísticas & Insights
        </h1>
        <p className="text-gray-400 font-medium tracking-wide">
          Análise preditiva do seu desempenho acadêmico.
        </p>
      </header>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard
          title="Taxa de Conclusão"
          value={`${metrics.completionRate}%`}
          icon={Target}
          color="text-emerald-400"
          bg="bg-emerald-400/10"
        />
        <MetricCard
          title="Tarefas Entregues"
          value={`${metrics.completedTasks} / ${metrics.totalTasks}`}
          icon={CheckCircle2}
          color="text-[#3a86ff]"
          bg="bg-[#3a86ff]/10"
        />
        <MetricCard
          title="Carga Horária Total"
          value={`${metrics.totalWorkload}h`}
          icon={Clock}
          color="text-fuchsia-400"
          bg="bg-fuchsia-400/10"
        />
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl group-hover:bg-amber-500/30 transition-all"></div>
          <div className="flex justify-between items-start relative z-10">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Status do Semestre</p>
              <h3 className="text-2xl font-black text-amber-400">Em Dia</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Bar Chart - 2 columns wide */}
        <div className="lg:col-span-2 bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="w-5 h-5 text-[#3a86ff]" />
            <h2 className="text-lg font-bold text-gray-200">Produtividade por Disciplina</h2>
          </div>

          <div className="h-[300px] w-full">
            {metrics.subjectData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={metrics.subjectData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#02040a', borderColor: '#333', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: '#ffffff05' }}
                  />
                  <Bar dataKey="Concluídas" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Pendentes" stackId="a" fill="#3a86ff" opacity={0.5} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState />
            )}
          </div>
        </div>

        {/* Donut Chart - 1 column */}
        <div className="bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <Layers className="w-5 h-5 text-fuchsia-400" />
            <h2 className="text-lg font-bold text-gray-200">Distribuição de Carga</h2>
          </div>

          <div className="flex-1 min-h-[250px] relative">
            {metrics.workloadData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={metrics.workloadData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {metrics.workloadData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#02040a', borderColor: '#333', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <EmptyChartState />
            )}
            {/* Center Text in Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-black text-white">{metrics.totalWorkload}</span>
              <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Horas</span>
            </div>
          </div>
        </div>

        {/* AI Insights Panel (Full Width Bottom) */}
        <div className="lg:col-span-3 bg-gradient-to-r from-[#0a0c14] to-[#120f1e] border border-indigo-500/20 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>

          <div className="flex items-start gap-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center shrink-0 border border-indigo-500/30">
              <BrainCircuit className="w-7 h-7 text-indigo-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">EduTrack AI Insight</h3>
              <p className="text-gray-400 leading-relaxed max-w-4xl">
                Baseado no seu volume de entregas e carga horária atual, você está mantendo um ritmo sólido.
                Para otimizar o seu tempo durante o período noturno e evitar sobrecarga na reta final do semestre,
                recomendamos focar nas disciplinas com maior carga horária pendente primeiro. A lógica estruturada
                tende a facilitar a fluidez nas entregas mais pesadas.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// Utility Components
function MetricCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-white/20 transition-all">
      <div className={`absolute -right-6 -top-6 w-24 h-24 ${bg} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`}></div>
      <div className="flex justify-between items-start relative z-10">
        <div>
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-black text-white tracking-tight">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
      </div>
    </div>
  );
}

function EmptyChartState() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
      <AlertCircle className="w-8 h-8 opacity-20 mb-2" />
      <p className="text-sm">Dados insuficientes para gerar o gráfico.</p>
    </div>
  );
}

function Layers(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 12 12 17 22 12" />
      <polyline points="2 17 12 22 22 17" />
    </svg>
  );
}