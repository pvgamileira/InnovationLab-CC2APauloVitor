'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/context/ToastContext';
import {
  FolderOpen, Pencil, Trash2, X, Loader2, Timer
} from 'lucide-react';
import KanbanBoard from '@/components/KanbanBoard';
import Link from 'next/link';

// --- Main Page ---
export default function DisciplinasPage() {
  const { showToast } = useToast();
  const [session, setSession] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all'); // Estado do filtro de disciplinas
  const [isDraggingSubject, setIsDraggingSubject] = useState(false);
  
  // Estados e Funções de CRUD do Editar e Excluir Disciplinas
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState({ id: '', name: '', professor: '', workload: 0 });
  const [submittingEdit, setSubmittingEdit] = useState(false);

  const handleOpenEditModal = (subj) => {
    setEditingSubject({
      id: subj.id,
      name: subj.name,
      professor: subj.professor,
      workload: subj.workload
    });
    setIsEditModalOpen(true);
  };

  const handleSaveEditSubject = async (e) => {
    e.preventDefault();
    setSubmittingEdit(true);
    try {
      const { error } = await supabase
        .from('subjects')
        .update({
          name: editingSubject.name,
          professor: editingSubject.professor,
          workload: parseInt(editingSubject.workload, 10)
        })
        .eq('id', editingSubject.id);

      if (error) throw error;
      setIsEditModalOpen(false);
      showToast("📚 Disciplina editada com sucesso!", "success");
    } catch (err) {
      showToast(`Erro ao editar disciplina: ${err.message}`, "error");
    } finally {
      setSubmittingEdit(false);
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    if (!confirm('Deseja realmente excluir esta disciplina? Todas as tarefas vinculadas a ela serão excluídas.')) return;
    try {
      await supabase.from('academic_tasks').delete().eq('subject_id', subjectId);
      const { error } = await supabase.from('subjects').delete().eq('id', subjectId);
      if (error) throw error;
      
      // OpenSpec: Ensure local state reflects the database deletion to prevent ghost interactions
      setSubjects(prev => prev.filter(s => s.id !== subjectId));
      setIsEditModalOpen(false);
      setIsDraggingSubject(false);

      showToast("🗑️ Disciplina eliminada", "success");
    } catch (err) {
      showToast(`Erro ao excluir disciplina: ${err.message}`, "error");
    }
  };

  useEffect(() => {
    async function initData() {
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  // Smart Alerts
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;
    const now = new Date();
    
    // Find first overdue task
    const overdueTask = tasks.find(t => {
      if (!t.due_date || t.status === 'completed') return false;
      return new Date(t.due_date) < now;
    });

    if (overdueTask) {
      showToast(`⚠️ A tarefa "${overdueTask.title}" está atrasada!`, "error");
      return;
    }

    // Find first upcoming task (< 24h)
    const upcomingTask = tasks.find(t => {
      if (!t.due_date || t.status === 'completed') return false;
      const dueDate = new Date(t.due_date);
      const diffHrs = (dueDate - now) / (1000 * 60 * 60);
      return diffHrs > 0 && diffHrs <= 24;
    });

    if (upcomingTask) {
      showToast(`⏰ A tarefa "${upcomingTask.title}" vence em menos de 24h!`, "warning");
    }
  }, [tasks, showToast]);

  const refetchData = async (userId) => {
    const [subjectsRes, tasksRes] = await Promise.all([
      supabase.from('subjects').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('academic_tasks').select('*, subjects(name)').eq('user_id', userId).order('due_date', { ascending: true })
    ]);

    if (!subjectsRes.error) setSubjects(subjectsRes.data || []);
    if (!tasksRes.error) setTasks(tasksRes.data || []);
  };

  const handleMoveTask = async (taskId, actionOrStatus) => {
    try {
      const task = tasks.find(t => t.id.toString() === taskId.toString());
      if (!task) return;

      let newStatus = actionOrStatus;
      const STATUS_ORDER_LIST = ['pending', 'in_progress', 'completed'];

      if (actionOrStatus === 'forward' || actionOrStatus === 'backward') {
        const currentIndex = STATUS_ORDER_LIST.indexOf(task.status);
        const validIndex = currentIndex === -1 ? 0 : currentIndex;
        const newIndex = actionOrStatus === 'forward'
          ? Math.min(validIndex + 1, STATUS_ORDER_LIST.length - 1)
          : Math.max(validIndex - 1, 0);
        newStatus = STATUS_ORDER_LIST[newIndex];
      }

      if (task.status === newStatus) return;

      // Optimistic update
      setTasks(prev => prev.map(t =>
        t.id.toString() === taskId.toString() ? { ...t, status: newStatus } : t
      ));

      const { error } = await supabase
        .from('academic_tasks')
        .update({ status: newStatus })
        .eq('id', task.id);

      if (error) throw error;
    } catch (err) {
      showToast(`Erro ao mover tarefa: ${err.message}`, "error");
      if (session) await refetchData(session.user.id);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#3a86ff]" />
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-20 animate-in fade-in duration-700">

      {/* Page Header */}
      <header className="mb-10 flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-3">
            Disciplinas
          </h1>
          <p className="text-gray-400 font-medium tracking-wide">
            Visão geral das matérias ativas e quadro interativo de tarefas.
          </p>
        </div>
        <Link 
          href="/dashboard/foco"
          className="bg-[#3a86ff] hover:bg-[#2563eb] text-white py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] shrink-0"
        >
          <Timer className="w-5 h-5" />
          Modo Foco
        </Link>
      </header>

      {/* Subject Context Header */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {subjects.length === 0 ? (
          <div className="w-full bg-[#0a0c14]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 text-center text-gray-500 text-sm">
            Nenhuma disciplina cadastrada.
          </div>
        ) : (
          subjects.map(subj => (
            <div 
              key={subj.id} 
              onDoubleClick={() => handleOpenEditModal(subj)}
              draggable={true}
              onDragStart={(e) => { e.dataTransfer.setData('subjectId', subj.id); setIsDraggingSubject(true); }}
              onDragEnd={() => setIsDraggingSubject(false)}
              className="min-w-[280px] flex-shrink-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 relative group cursor-pointer active:cursor-grabbing"
            >
              <div className="flex items-center gap-3 mb-3 pointer-events-none">
                <div className="w-10 h-10 rounded-full bg-[#3a86ff]/20 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-[#3a86ff]" />
                </div>
                <div>
                  <h3 className="text-white font-bold truncate max-w-[180px]">{subj.name}</h3>
                  <p className="text-xs text-gray-400">Prof. {subj.professor}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                <div className="text-xs font-semibold text-gray-500">
                  {subj.workload}h
                </div>
                <div className="px-2.5 py-1 rounded-md bg-black/40 border border-gray-700/50 text-[10px] text-gray-300 font-mono font-bold tracking-widest">
                  MÉDIA: --
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-10"></div>

      {/* --- BOTÕES DE FILTRO --- */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${activeFilter === 'all' ? 'bg-[#3a86ff] text-white shadow-[0_0_15px_rgba(58,134,255,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
        >
          Todas as Tarefas
        </button>
        {subjects.map(subj => (
          <button
            key={subj.id}
            onClick={() => setActiveFilter(subj.name)}
            className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all ${activeFilter === subj.name ? 'bg-[#3a86ff] text-white shadow-[0_0_15px_rgba(58,134,255,0.4)]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'}`}
          >
            {subj.name}
          </button>
        ))}
      </div>

      {/* DnD Kanban Board */}
      <KanbanBoard
        tasks={tasks.filter(t => activeFilter === 'all' || t.subjects?.name === activeFilter)}
        moveTask={handleMoveTask}
      />

      {/* MODAL EDITAR DISCIPLINA */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-fade-in" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="w-full max-w-lg bg-[#0a0c14] border border-[#3a86ff]/20 rounded-3xl p-8 shadow-[0_0_80px_rgba(58,134,255,0.1)] relative z-10 animate-modal-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Editar Disciplina</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-600 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveEditSubject} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Nome da Disciplina</label>
                <input required type="text" value={editingSubject.name} onChange={(e) => setEditingSubject({ ...editingSubject, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Professor(a)</label>
                <input required type="text" value={editingSubject.professor} onChange={(e) => setEditingSubject({ ...editingSubject, professor: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-700" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Carga Horária (Horas)</label>
                <input required type="number" min="1" value={editingSubject.workload} onChange={(e) => setEditingSubject({ ...editingSubject, workload: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-700" />
              </div>
              <div className="pt-6 flex gap-4">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/10 rounded-xl text-gray-300 font-bold transition-all">Cancelar</button>
                <button type="submit" disabled={submittingEdit} className="flex-[2] py-3 px-4 bg-[#3a86ff] hover:bg-[#2563eb] shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] rounded-xl text-white font-extrabold transition-all disabled:opacity-50 flex justify-center items-center cursor-pointer">
                  {submittingEdit ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TRASH DROPZONE */}
      {isDraggingSubject && (
        <div 
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { 
            e.preventDefault(); 
            const id = e.dataTransfer.getData('subjectId'); 
            if(id) handleDeleteSubject(id); 
            setIsDraggingSubject(false); 
          }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 w-96 h-32 z-50 bg-red-900/40 backdrop-blur-md border-2 border-dashed border-red-500/50 rounded-2xl flex flex-col items-center justify-center text-red-200 transition-all"
        >
          <Trash2 className="w-8 h-8 mb-2 opacity-80" />
          <span className="font-bold text-sm">Solte aqui para excluir</span>
        </div>
      )}

    </div>
  );
}