'use client';

import {
  Circle, CheckCircle2, Clock, Calendar, AlertCircle,
  ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';

const COLUMNS = [
  {
    key: 'pending',
    label: 'Backlog',
    icon: Circle,
    accentColor: 'text-gray-400',
    borderColor: 'border-gray-500/20',
    badgeBg: 'bg-gray-700/40 text-gray-300 border-gray-500/20',
    emptyMsg: 'Nenhuma tarefa pendente.',
  },
  {
    key: 'in_progress',
    label: 'Em Progresso',
    icon: Loader2,
    accentColor: 'text-[#3a86ff]',
    borderColor: 'border-[#3a86ff]/20',
    badgeBg: 'bg-[#3a86ff]/10 text-[#3a86ff] border-[#3a86ff]/20',
    emptyMsg: 'Nenhuma tarefa em andamento.',
  },
  {
    key: 'completed',
    label: 'Concluídas',
    icon: CheckCircle2,
    accentColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20',
    badgeBg: 'bg-emerald-900/20 text-emerald-400 border-emerald-500/20',
    emptyMsg: 'Nenhuma tarefa concluída ainda.',
  },
];

const STATUS_ORDER = ['pending', 'in_progress', 'completed'];

function TaskCard({ task, colIndex, moveTask }) {
  const isFirst = colIndex === 0;
  const isLast = colIndex === STATUS_ORDER.length - 1;

  const now = new Date();
  const dueDate = task.due_date ? new Date(task.due_date) : null;
  const isOverdue = dueDate && dueDate < now && task.status !== 'completed';
  const isUpcoming = dueDate && (dueDate - now <= 48 * 60 * 60 * 1000) && dueDate > now && task.status !== 'completed';
  const isCompleted = task.status === 'completed';

  return (
    <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-white/20 transition-all duration-200 flex flex-col gap-3">

      {/* Title */}
      <h4 className={`text-sm font-bold leading-snug ${isCompleted ? 'line-through text-gray-500' : 'text-gray-100 group-hover:text-white'} transition-colors`}>
        {task.title}
      </h4>

      {/* Tags row */}
      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider">
        {/* Subject tag */}
        <span className="px-2 py-0.5 bg-black/50 text-[#3a86ff] rounded-[6px] border border-[#3a86ff]/20 truncate max-w-[110px]">
          {task.subjects?.name || 'Geral'}
        </span>

        {/* Due date */}
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

        {/* Overdue */}
        {isOverdue && (
          <span className="text-red-400 flex items-center gap-1 bg-red-900/30 px-2 py-0.5 rounded-[6px] border border-red-500/30">
            <AlertCircle className="w-2.5 h-2.5" />
            Atrasada
          </span>
        )}

        {/* Upcoming */}
        {isUpcoming && (
          <span className="text-yellow-400 flex items-center gap-1 bg-yellow-900/30 px-2 py-0.5 rounded-[6px] border border-yellow-500/30">
            <Clock className="w-2.5 h-2.5" />
            Próxima
          </span>
        )}
      </div>

      {/* Move controls */}
      <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-white/5">
        <button
          onClick={() => !isFirst && moveTask(task.id, 'backward')}
          disabled={isFirst}
          aria-label="Mover para coluna anterior"
          className={`p-1 rounded-lg transition-all ${isFirst ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white/10 text-gray-400 hover:text-white'}`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => !isLast && moveTask(task.id, 'forward')}
          disabled={isLast}
          aria-label="Mover para próxima coluna"
          className={`p-1 rounded-lg transition-all ${isLast ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#3a86ff]/20 text-gray-400 hover:text-[#3a86ff]'}`}
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

function KanbanColumn({ column, tasks, colIndex, moveTask }) {
  const Icon = column.icon;

  return (
    <div className="flex flex-col bg-[#05070e]/60 backdrop-blur-xl border border-white/5 rounded-[1.5rem] overflow-hidden">

      {/* Column header */}
      <div className={`flex items-center justify-between px-5 py-4 border-b border-white/5`}>
        <div className="flex items-center gap-2.5">
          <Icon className={`w-4 h-4 ${column.accentColor} ${column.key === 'in_progress' ? 'animate-spin' : ''}`}
            style={column.key === 'in_progress' ? { animationDuration: '3s' } : {}} />
          <h3 className="text-sm font-bold text-gray-200 tracking-wide">{column.label}</h3>
        </div>
        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${column.badgeBg}`}>
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 p-4 flex flex-col gap-3 min-h-[180px]">
        {tasks.length === 0 ? (
          <div className={`flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed ${column.borderColor} rounded-xl py-8 px-4`}>
            <Icon className={`w-8 h-8 ${column.accentColor} opacity-20 mb-2`} />
            <p className="text-xs text-gray-600 font-medium">{column.emptyMsg}</p>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} colIndex={colIndex} moveTask={moveTask} />
          ))
        )}
      </div>
    </div>
  );
}

export default function KanbanBoard({ tasks = [], moveTask }) {
  const grouped = STATUS_ORDER.reduce((acc, key) => {
    acc[key] = tasks.filter(t => (t.status === key) || (key === 'pending' && !STATUS_ORDER.includes(t.status)));
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {COLUMNS.map((col, idx) => (
        <KanbanColumn
          key={col.key}
          column={col}
          tasks={grouped[col.key] || []}
          colIndex={idx}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
}
