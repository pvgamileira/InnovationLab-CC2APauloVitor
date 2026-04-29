'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import {
  BookOpen, Plus, Clock, ListTodo, CheckCircle2,
  Circle, X, Search, Calendar, FolderOpen, AlertCircle, Play, BarChart3, Download
} from 'lucide-react';
import XpHudBar from '@/components/XpHudBar';
import KanbanBoard from '@/components/KanbanBoard';

export default function DashboardPage() {
  const [session, setSession] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const [newSubject, setNewSubject] = useState({ name: '', professor: '', workload: 0 });
  const [newTask, setNewTask] = useState({ title: '', subject_id: '', due_date: '' });
  const [submitting, setSubmitting] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  useEffect(() => {
    async function initSessionAndFetchData() {
      try {
        setLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (!session) {
          window.location.href = '/auth';
          return;
        }

        setSession(session);
        await refetchData(session.user.id);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    initSessionAndFetchData();
  }, []);

  const refetchData = async (userId) => {
    try {
      const [subjectsResponse, tasksResponse] = await Promise.all([
        supabase.from('subjects').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
        supabase.from('academic_tasks').select('*, subjects(name)').eq('user_id', userId).order('due_date', { ascending: true })
      ]);

      if (subjectsResponse.error) throw subjectsResponse.error;
      if (tasksResponse.error) throw tasksResponse.error;

      setSubjects(subjectsResponse.data || []);
      setTasks(tasksResponse.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleCreateSubject = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('subjects').insert([
        {
          user_id: session.user.id,
          name: newSubject.name,
          professor: newSubject.professor,
          workload: parseInt(newSubject.workload, 10),
        }
      ]);
      if (error) throw error;

      setIsSubjectModalOpen(false);
      setNewSubject({ name: '', professor: '', workload: 0 });
      await refetchData(session.user.id);
    } catch (err) {
      alert(`Erro: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from('academic_tasks').insert([
        {
          user_id: session.user.id,
          subject_id: newTask.subject_id,
          title: newTask.title,
          due_date: newTask.due_date || null,
          status: 'pending'
        }
      ]);
      if (error) throw error;

      setIsTaskModalOpen(false);
      setNewTask({ title: '', subject_id: '', due_date: '' });
      await refetchData(session.user.id);
    } catch (err) {
      alert(`Erro: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // A LÓGICA MESTRA DO KANBAN (Aceita Clique nas setas E o Drag and Drop)
  const moveTask = async (taskId, actionOrStatus) => {
    try {
      // Converte tudo para string para não dar erro de tipos (Type Mismatch)
      const task = tasks.find(t => t.id.toString() === taskId.toString());
      if (!task) return;

      let newStatus = actionOrStatus;
      const STATUS_ORDER = ['pending', 'in_progress', 'completed'];

      // Se a ação for "forward" ou "backward" (clique nos botões)
      if (actionOrStatus === 'forward' || actionOrStatus === 'backward') {
        const currentIndex = STATUS_ORDER.indexOf(task.status);
        const validIndex = currentIndex === -1 ? 0 : currentIndex;
        const newIndex = actionOrStatus === 'forward'
          ? Math.min(validIndex + 1, STATUS_ORDER.length - 1)
          : Math.max(validIndex - 1, 0);
        newStatus = STATUS_ORDER[newIndex];
      }

      // Se a tarefa já está na coluna certa, não faz nada
      if (task.status === newStatus) return;

      // 1. Atualiza a tela instantaneamente (Optimistic UI)
      setTasks(prev => prev.map(t =>
        t.id.toString() === taskId.toString() ? { ...t, status: newStatus } : t
      ));

      // 2. Salva no banco de dados
      const { error } = await supabase
        .from('academic_tasks')
        .update({ status: newStatus })
        .eq('id', task.id);

      if (error) throw error;

    } catch (err) {
      alert(`Erro ao mover tarefa: ${err.message}`);
      // Se algo falhar no banco, recarrega a tela para não ficar quebrado
      if (session) await refetchData(session.user.id);
    }
  };

  const handleGenerateReport = async () => {
    try {
      setIsGeneratingReport(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const response = await fetch('/api/generate-report', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Falha ao gerar relatório');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio_academico.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert(`Erro: ${err.message}`);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-[#3a86ff] rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative w-16 h-16 border-4 border-t-[#3a86ff] border-white/5 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center p-8">
        <div className="bg-red-900/10 backdrop-blur-xl border border-red-500/30 rounded-3xl p-8 max-w-lg text-center shadow-[0_0_50px_rgba(239,68,68,0.15)]">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Conexão Interrompida</h2>
          <p className="text-red-300/80 mb-8">{error}</p>
          <button onClick={() => window.location.reload()} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all">Tentar Novamente</button>
        </div>
      </div>
    );
  }

  const totalWorkload = subjects.reduce((sum, subject) => sum + subject.workload, 0);
  const pendingTasks = tasks.filter(t => t.status === 'pending').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const chartData = [
    { name: 'Pendentes', value: pendingTasks },
    { name: 'Concluídas', value: completedTasks }
  ];
  const CHART_COLORS = ['#1e293b', '#3a86ff'];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 animate-in fade-in duration-700">

      <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/5">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-3">
            Visão Geral
          </h1>
          <p className="text-gray-400 font-medium tracking-wide">Acompanhe seu desempenho metodicamente.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <XpHudBar completedTasks={completedTasks} />
          <button
            onClick={handleGenerateReport}
            disabled={isGeneratingReport}
            className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 border border-[#3a86ff]/30 text-[#3a86ff] hover:bg-white/10 hover:border-[#3a86ff]/60 transition-all font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isGeneratingReport ? (
              <div className="w-5 h-5 border-2 border-[#3a86ff]/30 border-t-[#3a86ff] rounded-full animate-spin"></div>
            ) : (
              <Download className="w-5 h-5" />
            )}
            {isGeneratingReport ? 'Gerando...' : 'Exportar Relatório PDF'}
          </button>
          <button onClick={() => setIsSubjectModalOpen(true)} className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all font-medium flex items-center justify-center gap-2">
            <FolderOpen className="w-5 h-5 text-gray-400" />
            Nova Disciplina
          </button>
          <button onClick={() => setIsTaskModalOpen(true)} className="w-full sm:w-auto h-12 px-6 rounded-xl bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white hover:shadow-[0_0_30px_rgba(58,134,255,0.4)] hover:brightness-110 border border-[#3a86ff]/50 transition-all font-bold flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Nova Tarefa
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="group relative bg-[#0a0c14]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 overflow-hidden hover:border-[#3a86ff]/40 transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <BookOpen className="w-12 h-12 text-[#3a86ff]" />
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Total de Disciplinas</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">{subjects.length}</span>
            <span className="text-[#3a86ff] font-semibold text-sm mb-2">ativas</span>
          </div>
        </div>

        <div className="group relative bg-[#0a0c14]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 overflow-hidden hover:border-[#3a86ff]/40 transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <Clock className="w-12 h-12 text-indigo-400" />
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Carga Horária Est.</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">{totalWorkload}</span>
            <span className="text-gray-400 font-medium text-sm mb-2">horas globais</span>
          </div>
        </div>

        <div className="group relative bg-[#0a0c14]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 overflow-hidden hover:border-amber-400/30 transition-all duration-300">
          <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
            <ListTodo className="w-12 h-12 text-amber-500" />
          </div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Tarefas Pendentes</p>
          <div className="flex items-end gap-3">
            <span className="text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-amber-100 bg-clip-text text-transparent">{pendingTasks}</span>
            <span className="text-amber-500/70 font-medium text-sm mb-2">para entregar</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-white/5">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Play className="w-4 h-4 text-[#3a86ff] fill-[#3a86ff]" />
              Disciplinas em Curso
            </h2>
          </div>

          {subjects.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-2xl border border-white/5 border-dashed rounded-3xl p-12 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-[#3a86ff]/10 rounded-full flex items-center justify-center mb-5">
                <Search className="w-8 h-8 text-[#3a86ff]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-200">Nenhuma disciplina ativa</h3>
              <p className="text-gray-500 max-w-sm mb-8">O painel está vazio. Cadastre seu primeiro registro para iniciar.</p>
              <button
                onClick={() => setIsSubjectModalOpen(true)}
                className="px-6 py-3 bg-[#3a86ff]/10 hover:bg-[#3a86ff]/20 text-[#3a86ff] border border-[#3a86ff]/30 rounded-xl transition-colors font-semibold"
              >
                Cadastrar Disciplina
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <div key={subject.id} className="group relative bg-[#0a0c14]/40 backdrop-blur-md border border-white/10 rounded-[1.5rem] p-6 transition-all duration-500 hover:bg-[#3a86ff]/10 hover:border-[#3a86ff]/50 hover:shadow-[0_10px_30px_-15px_rgba(58,134,255,0.4)]">
                  <div className="relative">
                    <h3 className="text-lg font-bold text-white mb-5 line-clamp-1 group-hover:text-[#3a86ff] transition-colors">{subject.name}</h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/5">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Docente</span>
                        <span className="text-sm text-gray-300 font-medium truncate ml-2">{subject.professor}</span>
                      </div>
                      <div className="flex items-center justify-between bg-black/40 rounded-xl p-3 border border-white/5">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Carga</span>
                        <span className="text-sm text-[#3a86ff] font-semibold">{subject.workload}h</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-10">
          <div className="bg-[#05070e]/80 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-6 relative overflow-hidden">
            <h2 className="text-lg font-bold flex items-center gap-3 mb-6 pb-3 border-b border-white/5 text-gray-200">
              <BarChart3 className="w-5 h-5 text-[#3a86ff]" />
              Progresso Analítico
            </h2>

            {tasks.length === 0 ? (
              <div className="h-[200px] flex items-center justify-center">
                <p className="text-xs font-semibold text-gray-600 uppercase tracking-widest text-center">Nenhum dado <br />para análise</p>
              </div>
            ) : (
              <div className="h-[240px] w-full flex justify-center items-center relative">
                <PieChart width={250} height={240}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    stroke="none"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0a0c14', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', color: '#fff' }}
                    itemStyle={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}
                  />
                </PieChart>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-extrabold text-white">{completedTasks}</span>
                  <span className="text-[10px] uppercase font-bold text-[#3a86ff] tracking-widest">Feitas</span>
                </div>
              </div>
            )}

            {tasks.length > 0 && (
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#1e293b]"></div>
                  <span className="text-xs font-semibold text-gray-400">Pendentes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#3a86ff] shadow-[0_0_10px_rgba(58,134,255,0.5)]"></div>
                  <span className="text-xs font-semibold text-gray-200">Concluídas</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
          <h2 className="text-xl font-bold flex items-center gap-3">
            <ListTodo className="w-5 h-5 text-[#3a86ff]" />
            Quadro de Tarefas
          </h2>
          <span className="text-xs text-gray-500 font-medium">{tasks.length} tarefa{tasks.length !== 1 ? 's' : ''} no total</span>
        </div>

        {/* A LIGAÇÃO PERFEITA ESTÁ AQUI */}
        <KanbanBoard tasks={tasks} moveTask={moveTask} />

        <button
          onClick={() => setIsTaskModalOpen(true)}
          className="mt-5 w-full py-3 rounded-xl border border-dashed border-white/10 text-gray-500 font-bold tracking-wide hover:text-white hover:border-[#3a86ff]/50 hover:bg-[#3a86ff]/10 transition-all text-xs uppercase"
        >
          + Adicionar Demanda
        </button>
      </div>

      {/* MODAL DISCIPLINA */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in" onClick={() => setIsSubjectModalOpen(false)}></div>
          <div className="w-full max-w-lg bg-[#0a0c14] border border-[#3a86ff]/20 rounded-3xl p-8 shadow-[0_0_80px_rgba(58,134,255,0.1)] relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Nova Disciplina</h3>
              <button onClick={() => setIsSubjectModalOpen(false)} className="text-gray-600 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubject} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nome da Disciplina</label>
                <input required type="text" value={newSubject.name} onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-700" placeholder="Ex: Engenharia de Software" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Professor(a)</label>
                <input required type="text" value={newSubject.professor} onChange={(e) => setNewSubject({ ...newSubject, professor: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-700" placeholder="Dr. Nome do Professor" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Carga Horária (Horas)</label>
                <input required type="number" min="1" value={newSubject.workload} onChange={(e) => setNewSubject({ ...newSubject, workload: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-700" placeholder="60" />
              </div>
              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setIsSubjectModalOpen(false)} className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl text-gray-300 font-bold transition-all">Cancelar</button>
                <button type="submit" disabled={submitting} className="flex-[2] py-3 px-4 bg-[#3a86ff] hover:bg-[#2563eb] shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] rounded-xl text-white font-extrabold transition-all disabled:opacity-50 flex justify-center items-center">
                  {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Confirmar Criação"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAREFA */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in" onClick={() => setIsTaskModalOpen(false)}></div>
          <div className="w-full max-w-lg bg-[#0a0c14] border border-indigo-500/20 rounded-3xl p-8 shadow-[0_0_80px_rgba(99,102,241,0.1)] relative z-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Nova Tarefa</h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-gray-600 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {subjects.length === 0 ? (
              <div className="bg-amber-900/10 border border-amber-500/20 rounded-xl p-5 text-amber-200 flex gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-relaxed">Você precisa cadastrar uma <span className="font-bold text-amber-400">disciplina</span> primeiro para poder vincular esta tarefa.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateTask} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Título da Tarefa</label>
                  <input required type="text" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 outline-none transition-all placeholder:text-gray-700" placeholder="Ex: Lista de Exercícios 3" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Disciplina Vinculada</label>
                  <select required value={newTask.subject_id} onChange={(e) => setNewTask({ ...newTask, subject_id: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 outline-none transition-all appearance-none cursor-pointer">
                    <option value="" disabled className="bg-[#0a0c14] text-gray-600">Selecione uma base...</option>
                    {subjects.map(sub => (
                      <option key={sub.id} value={sub.id} className="bg-[#0a0c14] text-white font-medium">{sub.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Data de Entrega (Opcional)</label>
                  <input
                    type="date"
                    value={newTask.due_date}
                    onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                    style={{ colorScheme: 'dark' }}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-gray-300 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/80 outline-none transition-all"
                  />
                </div>
                <div className="pt-6 flex gap-4">
                  <button type="button" onClick={() => setIsTaskModalOpen(false)} className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl text-gray-300 font-bold transition-all">Cancelar</button>
                  <button type="submit" disabled={submitting} className="flex-[2] py-3 px-4 bg-indigo-600 hover:bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] rounded-xl text-white font-extrabold transition-all disabled:opacity-50 flex justify-center items-center">
                    {submitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Adicionar Demanda"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}