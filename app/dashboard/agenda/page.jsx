'use client';

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO
} from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Loader2, CheckCircle2, Clock } from 'lucide-react';

export default function AgendaPage() {
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());

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
        await fetchData(session.user.id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  const fetchData = async (userId) => {
    const { data: tasksData, error } = await supabase
      .from('academic_tasks')
      .select('*, subjects(name)')
      .eq('user_id', userId)
      .order('due_date', { ascending: true });

    if (!error && tasksData) setTasks(tasksData);
  };

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // --- Calendar Date Matrix ---
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale: ptBR });
  const endDate = endOfWeek(monthEnd, { locale: ptBR });

  const dateFormat = "d";
  const days = [];
  let day = startDate;

  // Build the grid array
  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  // --- Group Tasks by Date String ---
  // --- Group Tasks by Date String (COM PROTEÇÃO) ---
  const tasksByDate = useMemo(() => {
    const map = {};
    tasks.forEach(task => {
      // Se não tiver data ou a data for inválida, ignora a tarefa
      if (!task.due_date) return;

      try {
        const parsedDate = new Date(task.due_date);
        // Verifica se a data é realmente válida antes de formatar
        if (isNaN(parsedDate.getTime())) return;

        const dateStr = format(parsedDate, 'yyyy-MM-dd');
        if (!map[dateStr]) map[dateStr] = [];
        map[dateStr].push(task);
      } catch (err) {
        console.warn('Data ignorada:', task.due_date);
      }
    });
    return map;
  }, [tasks]);

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

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
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-3">
            Agenda
          </h1>
          <p className="text-gray-400 font-medium tracking-wide">
            Visão geral mensal dos seus prazos e compromissos.
          </p>
        </div>
      </header>

      {/* Calendar Controls */}
      <div className="flex items-center justify-between mb-8 bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#3a86ff]/20 flex items-center justify-center border border-[#3a86ff]/30 shadow-[0_0_20px_rgba(58,134,255,0.2)]">
            <CalendarIcon className="w-6 h-6 text-[#3a86ff]" />
          </div>
          <h2 className="text-2xl font-bold text-white capitalize tracking-wide">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={prevMonth}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#3a86ff]/50 transition-all text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-5 py-3 text-sm font-bold tracking-wide rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-[#3a86ff] transition-all text-gray-300 uppercase"
          >
            Hoje
          </button>
          <button
            onClick={nextMonth}
            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#3a86ff]/50 transition-all text-gray-400 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden p-2 shadow-[0_0_50px_rgba(58,134,255,0.03)]">

        {/* Days of week header */}
        <div className="grid grid-cols-7 mb-2">
          {weekDays.map(d => (
            <div key={d} className="py-4 text-center font-bold text-sm tracking-widest uppercase text-gray-500">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 border-t border-l border-white/5 rounded-xl overflow-hidden">
          {days.map((dayItem, i) => {
            const dateStr = format(dayItem, 'yyyy-MM-dd');
            const dayTasks = tasksByDate[dateStr] || [];

            const isCurrentMonth = isSameMonth(dayItem, monthStart);
            const isToday = isSameDay(dayItem, new Date());

            return (
              <div
                key={dayItem.toString() + i}
                className={`min-h-[140px] border-r border-b border-white/5 p-2 transition-all p-3 group relative
                  ${!isCurrentMonth ? 'bg-black/40 text-gray-700' : 'bg-transparent text-gray-300 hover:bg-white/[0.02]'}
                `}
              >
                {/* Date indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold tracking-wide
                    ${isToday ? 'bg-[#3a86ff] text-white shadow-[0_0_15px_rgba(58,134,255,0.6)]' : ''}
                    ${!isToday && isCurrentMonth ? 'group-hover:text-white text-gray-400' : ''}
                  `}>
                    {format(dayItem, dateFormat)}
                  </span>

                  {dayTasks.length > 0 && isCurrentMonth && (
                    <span className="text-[10px] text-gray-500 font-bold bg-white/5 px-2 py-0.5 rounded-full">
                      {dayTasks.length} {dayTasks.length === 1 ? 'tarefa' : 'tarefas'}
                    </span>
                  )}
                </div>

                {/* Tasks container */}
                <div className="flex flex-col gap-1.5 overflow-hidden max-h-[80px]">
                  {dayTasks.map(task => {
                    const isCompleted = task.status === 'completed';

                    return (
                      <div
                        key={task.id}
                        className={`truncate text-[10px] font-bold px-2 py-1 rounded-[6px] border backdrop-blur-sm flex items-center gap-1.5 transition-all
                          ${isCompleted
                            ? 'bg-emerald-900/10 border-emerald-500/20 text-emerald-500/70 line-through'
                            : 'bg-[#3a86ff]/10 border-[#3a86ff]/30 text-blue-300 hover:bg-[#3a86ff]/20 cursor-pointer shadow-[0_0_8px_rgba(58,134,255,0.15)]'}
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-2.5 h-2.5 shrink-0 opacity-70" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-[#3a86ff] shrink-0" />
                        )}
                        <span className="truncate">{task.title}</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
