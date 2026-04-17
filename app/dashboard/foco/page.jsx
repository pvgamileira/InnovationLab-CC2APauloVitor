'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Timer, ChevronDown, CheckCircle2, 
  BrainCircuit, Coffee, Loader2
} from 'lucide-react';

const MODES = {
  pomodoro: { id: 'pomodoro', label: 'Foco Profundo', time: 25 * 60, icon: BrainCircuit, color: '#3a86ff', hex: '58,134,255' },
  shortBreak: { id: 'shortBreak', label: 'Pausa Curta', time: 5 * 60, icon: Coffee, color: '#10b981', hex: '16,185,129' },
  longBreak: { id: 'longBreak', label: 'Pausa Longa', time: 15 * 60, icon: Timer, color: '#059669', hex: '5,150,105' },
};

export default function FocusRoomPage() {
  const [session, setSession] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Timer State
  const [currentMode, setCurrentMode] = useState('pomodoro');
  const [timeLeft, setTimeLeft] = useState(MODES.pomodoro.time);
  const [isActive, setIsActive] = useState(false);
  
  // Dropdown & Task State
  const [selectedTask, setSelectedTask] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  
  // Refs
  const intervalRef = useRef(null);

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
        await fetchTasks(session.user.id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  const fetchTasks = async (userId) => {
    const { data: pendingTasks, error } = await supabase
      .from('academic_tasks')
      .select('id, title, subjects(name)')
      .eq('user_id', userId)
      .neq('status', 'completed')
      .order('created_at', { ascending: false });

    if (!error && pendingTasks) {
      setTasks(pendingTasks);
    }
  };

  // Timer Tick Logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      clearInterval(intervalRef.current);
      // Aqui poderíamos engatilhar um alerta ou som
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  // Handlers
  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(MODES[currentMode].time);
  };

  const switchMode = (modeId) => {
    setCurrentMode(modeId);
    setIsActive(false);
    setTimeLeft(MODES[modeId].time);
  };

  // Formatting
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const activeTheme = MODES[currentMode];

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#3a86ff]" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-10 pb-20 animate-in fade-in duration-700 min-h-full flex flex-col">
      
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent mb-3">
          Sala de Foco
        </h1>
        <p className="text-gray-400 font-medium tracking-wide max-w-lg mx-auto">
          Mergulhe em modo de trabalho profundo sem distrações. Defina uma tarefa e inicie o ciclo.
        </p>
      </header>

      {/* Main Focus Area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        
        {/* Mode Selector */}
        <div className="flex p-1.5 bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-2xl relative z-20">
          {Object.values(MODES).map((mode) => {
            const isSelected = currentMode === mode.id;
            const Icon = mode.icon;
            
            return (
              <button
                key={mode.id}
                onClick={() => switchMode(mode.id)}
                className={`relative px-6 py-3 rounded-xl flex items-center gap-2 text-sm font-bold tracking-wide transition-colors ${
                  isSelected ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white/10 rounded-xl border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" style={{ color: isSelected ? mode.color : undefined }} />
                <span className="relative z-10">{mode.label}</span>
              </button>
            );
          })}
        </div>

        {/* Timer Display */}
        <motion.div 
          className="relative w-72 h-72 md:w-96 md:h-96 rounded-full flex items-center justify-center bg-[#05070e]/40 backdrop-blur-3xl border z-10"
          animate={{
            borderColor: isActive ? `rgba(${activeTheme.hex}, 0.5)` : 'rgba(255,255,255,0.05)',
            boxShadow: isActive 
              ? [`0 0 20px rgba(${activeTheme.hex}, 0.1)`, `0 0 80px rgba(${activeTheme.hex}, 0.3)`, `0 0 20px rgba(${activeTheme.hex}, 0.1)`]
              : '0 0 0px rgba(0,0,0,0)'
          }}
          transition={{
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            borderColor: { duration: 0.5 }
          }}
        >
          {/* Inner Glow depending on mode */}
          <div 
            className="absolute inset-2 rounded-full opacity-20 blur-2xl transition-colors duration-1000"
            style={{ backgroundColor: activeTheme.color }}
          />

          <div className="relative z-20 text-center">
            <span className="font-mono text-7xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl tabular-nums">
              {formatTime(timeLeft)}
            </span>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center gap-6 z-20">
          <button 
            onClick={toggleTimer}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
              isActive 
                ? 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                : 'bg-[#3a86ff]/10 border border-[#3a86ff]/30 text-[#3a86ff] hover:bg-[#3a86ff]/20 shadow-[0_0_20px_rgba(58,134,255,0.2)]'
            }`}
          >
            {isActive ? <Pause className="w-6 h-6" fill="currentColor" /> : <Play className="w-6 h-6 ml-1" fill="currentColor" />}
          </button>
          
          <button 
            onClick={resetTimer}
            className="w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/5 text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all shadow-lg"
            title="Zerar Temporizador"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Task Selector Overlay */}
        <div className="w-full max-w-sm mt-4 relative z-50">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">
            O que você está focando agora?
          </label>
          
          <div className="relative">
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full bg-[#05070e]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl px-5 py-4 flex items-center justify-between transition-all"
            >
              <div className="flex flex-col items-start truncate overflow-hidden pr-4">
                {selectedTask ? (
                  <>
                    <span className="text-white text-sm font-bold truncate max-w-full">{selectedTask.title}</span>
                    <span className="text-[#3a86ff] text-[10px] font-bold uppercase tracking-wider mt-0.5">
                      {selectedTask.subjects?.name || 'Geral'}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400 text-sm font-medium">Selecionar uma pendência...</span>
                )}
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-full mb-3 left-0 w-full bg-[#0a0c14]/95 backdrop-blur-3xl border border-white/15 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-60 z-50"
                >
                  <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Suas Tarefas</span>
                  </div>
                  <div className="flex-1 overflow-y-auto p-2 scrollbar-hide">
                    {tasks.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-xs">Nenhuma tarefa pendente.</div>
                    ) : (
                      tasks.map(t => (
                        <button
                          key={t.id}
                          onClick={() => { setSelectedTask(t); setDropdownOpen(false); }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors flex items-center justify-between group ${
                            selectedTask?.id === t.id ? 'bg-[#3a86ff]/10' : 'hover:bg-white/5'
                          }`}
                        >
                          <div className="flex flex-col truncate pr-3">
                            <span className={`text-sm font-bold truncate ${selectedTask?.id === t.id ? 'text-[#3a86ff]' : 'text-gray-200 group-hover:text-white'}`}>
                              {t.title}
                            </span>
                            <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mt-0.5 truncate">
                              {t.subjects?.name || 'Geral'}
                            </span>
                          </div>
                          {selectedTask?.id === t.id && <CheckCircle2 className="w-4 h-4 text-[#3a86ff] shrink-0" />}
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
