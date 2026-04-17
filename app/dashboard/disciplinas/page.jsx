'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  FolderOpen, Layers, Loader2, CheckCircle2, Circle, AlertCircle, Calendar, Clock
} from 'lucide-react';
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
  DragOverlay,
  defaultDropAnimationSideEffects,
  useDroppable
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- CONSTANTE DE ORDEM ---
const STATUS_ORDER = ['pending', 'in_progress', 'completed'];

// --- Sortable Task Component ---
function SortableTaskCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { type: 'Task', task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  const now = new Date();
  const dueDate = task.due_date ? new Date(task.due_date) : null;
  const isOverdue = dueDate && dueDate < now && task.status !== 'completed';
  const isUpcoming = dueDate && (dueDate - now <= 48 * 60 * 60 * 1000) && dueDate > now && task.status !== 'completed';
  const isCompleted = task.status === 'completed';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`group bg-white/5 backdrop-blur-sm border ${isDragging ? 'border-[#3a86ff] shadow-[0_0_15px_rgba(58,134,255,0.4)]' : 'border-white/10 hover:border-white/20 hover:bg-white/10'} rounded-2xl p-4 transition-colors cursor-grab active:cursor-grabbing flex flex-col gap-3 relative z-10 touch-none`}
    >
      <h4 className={`text-sm font-bold leading-snug ${isCompleted ? 'line-through text-gray-500' : 'text-gray-100 group-hover:text-white'}`}>
        {task.title}
      </h4>

      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider mt-auto pointer-events-none">
        <span className="px-2 py-0.5 bg-black/50 text-[#3a86ff] rounded-[6px] border border-[#3a86ff]/20 truncate max-w-[110px]">
          {task.subjects?.name || 'Geral'}
        </span>

        {!dueDate ? (
          <span className="text-gray-500 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-[6px] border border-gray-600/20">
            Prazo Indeterminado
          </span>
        ) : (
          <span className="text-orange-300/80 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-[6px] border border-orange-500/10">
            <Calendar className="w-2.5 h-2.5" />
            {dueDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
          </span>
        )}

        {isOverdue && (
          <span className="text-red-400 flex items-center gap-1 bg-red-900/30 px-2 py-0.5 rounded-[6px] border border-red-500/30">
            <AlertCircle className="w-2.5 h-2.5" />
            Atrasada
          </span>
        )}

        {isUpcoming && (
          <span className="text-yellow-400 flex items-center gap-1 bg-yellow-900/30 px-2 py-0.5 rounded-[6px] border border-yellow-500/30">
            <Clock className="w-2.5 h-2.5" />
            Próxima
          </span>
        )}
      </div>
    </div>
  );
}

// --- Status Column Component ---
function BoardColumn({ column, tasks }) {
  const Icon = column.icon;
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'Column', column }
  });

  return (
    <div className="flex flex-col bg-[#05070e]/60 backdrop-blur-xl border border-white/5 rounded-[1.5rem] overflow-hidden flex-1 h-[600px] max-h-[70vh]">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 sticky top-0 bg-[#05070e]/90 z-20">
        <div className="flex items-center gap-2.5">
          <Icon className={`w-4 h-4 ${column.accentColor} ${column.id === 'in_progress' ? 'animate-spin' : ''}`}
            style={column.id === 'in_progress' ? { animationDuration: '3s' } : {}} />
          <h3 className="text-sm font-bold text-gray-200 tracking-wide">{column.label}</h3>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${column.badgeBg}`}>
          {tasks.length}
        </span>
      </div>

      <div ref={setNodeRef} className="flex-1 p-4 overflow-y-auto scrollbar-hide flex flex-col gap-3 min-h-[150px]">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className={`flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed ${column.borderColor} rounded-xl py-8 px-4`}>
              <Icon className={`w-8 h-8 ${column.accentColor} opacity-20 mb-2`} />
              <p className="text-xs text-gray-600 font-medium">{column.emptyMsg}</p>
            </div>
          ) : (
            tasks.map(task => (
              <SortableTaskCard key={task.id} task={task} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function DisciplinasPage() {
  const [session, setSession] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // Estado do filtro de disciplinas

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

  const refetchData = async (userId) => {
    const [subjectsRes, tasksRes] = await Promise.all([
      supabase.from('subjects').select('*').eq('user_id', userId).order('created_at', { ascending: false }),
      supabase.from('academic_tasks').select('*, subjects(name)').eq('user_id', userId).order('due_date', { ascending: true })
    ]);

    if (!subjectsRes.error) setSubjects(subjectsRes.data || []);
    if (!tasksRes.error) setTasks(tasksRes.data || []);
  };

  const columns = [
    { id: 'pending', label: 'Backlog', icon: Circle, accentColor: 'text-gray-400', borderColor: 'border-gray-500/20', badgeBg: 'bg-gray-700/40 text-gray-300 border-gray-500/20', emptyMsg: 'Nenhuma tarefa pendente.' },
    { id: 'in_progress', label: 'Em Progresso', icon: Loader2, accentColor: 'text-[#3a86ff]', borderColor: 'border-[#3a86ff]/20', badgeBg: 'bg-[#3a86ff]/10 text-[#3a86ff] border-[#3a86ff]/20', emptyMsg: 'Nenhuma tarefa em andamento.' },
    { id: 'completed', label: 'Concluído', icon: CheckCircle2, accentColor: 'text-emerald-400', borderColor: 'border-emerald-500/20', badgeBg: 'bg-emerald-900/20 text-emerald-400 border-emerald-500/20', emptyMsg: 'Nenhuma tarefa concluída.' },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const getTaskStatus = (id) => tasks.find((t) => t.id === id)?.status;

  const onDragStart = (event) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    setActiveTask(task || null);
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'Task';
    const isOverTask = over.data.current?.type === 'Task';
    const isOverColumn = over.data.current?.type === 'Column';

    if (!isActiveTask) return;

    setTasks((prev) => {
      const activeTaskIndex = prev.findIndex((t) => t.id === activeId);
      const activeTask = prev[activeTaskIndex];
      let newStatus = activeTask.status;
      let newIndex = activeTaskIndex;

      if (isOverTask) {
        const overTaskIndex = prev.findIndex((t) => t.id === overId);
        newStatus = prev[overTaskIndex].status;
        newIndex = overTaskIndex;
      } else if (isOverColumn) {
        newStatus = overId;
        newIndex = prev.length;
      }

      if (activeTask.status === newStatus) {
        const updated = [...prev];
        const [moved] = updated.splice(activeTaskIndex, 1);
        const targetIndex = isOverTask ? updated.findIndex((t) => t.id === overId) : activeTaskIndex;
        updated.splice(targetIndex >= 0 ? targetIndex : updated.length, 0, moved);
        return updated;
      }

      const updated = [...prev];
      updated[activeTaskIndex] = { ...activeTask, status: newStatus };
      return updated;
    });
  };

  const onDragEnd = async (event) => {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    try {
      const { error } = await supabase
        .from('academic_tasks')
        .update({ status: task.status })
        .eq('id', taskId);

      if (error) throw error;
      await refetchData(session.user.id);
    } catch (err) {
      alert(`Erro ao salvar movimento: ${err.message}`);
      await refetchData(session?.user?.id);
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
      <header className="mb-10">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-3">
          Disciplinas
        </h1>
        <p className="text-gray-400 font-medium tracking-wide">
          Visão geral das matérias ativas e quadro interativo de tarefas.
        </p>
      </header>

      {/* Subject Context Header */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {subjects.length === 0 ? (
          <div className="w-full bg-[#0a0c14]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 text-center text-gray-500 text-sm">
            Nenhuma disciplina cadastrada.
          </div>
        ) : (
          subjects.map(subj => (
            <div key={subj.id} className="min-w-[280px] flex-shrink-0 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-3">
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
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
      >
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {columns.map(col => {
            // Aplicação do Filtro
            const filteredTasks = tasks.filter(t => {
              const matchesStatus = t.status === col.id || (col.id === 'pending' && !STATUS_ORDER.includes(t.status));
              const matchesSubject = activeFilter === 'all' || t.subjects?.name === activeFilter;
              return matchesStatus && matchesSubject;
            });

            return (
              <BoardColumn
                key={col.id}
                column={col}
                tasks={filteredTasks}
              />
            );
          })}
        </div>

        <DragOverlay dropAnimation={defaultDropAnimationSideEffects({ duration: 200 })}>
          {activeTask ? <SortableTaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>

    </div>
  );
}