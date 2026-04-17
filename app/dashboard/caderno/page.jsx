'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { BookText, Loader2, CheckCircle2, Clock, FolderOpen, AlertCircle } from 'lucide-react';

export default function CadernoPage() {
  const [session, setSession] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeSubjectId, setActiveSubjectId] = useState('general');
  const [notesText, setNotesText] = useState('');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  
  const typingTimeoutRef = useRef(null);

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
        await fetchSubjects(session.user.id);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, []);

  const fetchSubjects = async (userId) => {
    const { data: subjectsData, error } = await supabase
      .from('subjects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && subjectsData) {
      setSubjects(subjectsData);
    }
  };

  // Switch tabs and load from LocalStorage
  useEffect(() => {
    if (loading) return;
    
    // Attempt to read from DB (Mocked via localstorage for this MVP)
    const storageKey = `edutrack_notes_${session?.user?.id}_${activeSubjectId}`;
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData !== null) {
      setNotesText(savedData);
    } else {
      setNotesText('');
    }
    setSaveStatus('saved');
  }, [activeSubjectId, loading, session]);

  // Handle typing and autosave
  const handleTextChange = (e) => {
    const newVal = e.target.value;
    setNotesText(newVal);
    setSaveStatus('saving');

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      saveNote(newVal);
    }, 1500); // 1.5s debounce
  };

  const saveNote = (val) => {
    try {
      const storageKey = `edutrack_notes_${session?.user?.id}_${activeSubjectId}`;
      localStorage.setItem(storageKey, val);
      setSaveStatus('saved');
    } catch (err) {
      setSaveStatus('error');
      console.error('Error auto-saving:', err);
    }
  };

  const allTabs = [
    { id: 'general', name: 'Anotações Gerais', icon: BookText },
    ...subjects.map(s => ({ id: s.id, name: s.name, icon: FolderOpen }))
  ];

  if (loading) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-[#3a86ff]" />
      </div>
    );
  }

  const activeTabDetails = allTabs.find(t => t.id === activeSubjectId) || allTabs[0];

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-20 animate-in fade-in duration-700 h-full flex flex-col">
      
      {/* Header */}
      <header className="mb-8 shrink-0">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-indigo-50 to-[#3a86ff] bg-clip-text text-transparent mb-3">
          Caderno
        </h1>
        <p className="text-gray-400 font-medium tracking-wide">
          Sua central de rascunhos e anotações rápidas por disciplina.
        </p>
      </header>

      {/* Tabs / Pills */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide shrink-0">
        {allTabs.map(tab => {
          const isActive = activeSubjectId === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubjectId(tab.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl whitespace-nowrap transition-all font-bold tracking-wide text-sm border
                ${isActive 
                  ? 'bg-[#3a86ff]/10 border-[#3a86ff]/30 text-white shadow-[0_0_20px_rgba(58,134,255,0.15)]' 
                  : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                }
              `}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#3a86ff]' : 'text-gray-500'}`} />
              {tab.name}
            </button>
          );
        })}
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(58,134,255,0.02)]">
        
        {/* Editor Toolbar / Status Bar */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02] shrink-0">
          <div className="flex items-center gap-3">
            <activeTabDetails.icon className="w-5 h-5 text-[#3a86ff]" />
            <h2 className="text-lg font-bold text-gray-200">{activeTabDetails.name}</h2>
          </div>
          
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {saveStatus === 'saving' && (
                <motion.div 
                  key="saving"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-wider"
                >
                  <Clock className="w-3 h-3 animate-pulse" />
                  Salvando...
                </motion.div>
              )}
              {saveStatus === 'saved' && (
                <motion.div 
                  key="saved"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wider"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Salvo Localmente
                </motion.div>
              )}
              {saveStatus === 'error' && (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider"
                >
                  <AlertCircle className="w-3 h-3" />
                  Erro ao salvar
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Area */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeSubjectId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex-1 p-6 relative"
          >
            <textarea
              value={notesText}
              onChange={handleTextChange}
              placeholder={`Comece a digitar em ${activeTabDetails.name}...`}
              className="w-full h-full bg-transparent resize-none outline-none text-gray-200 leading-relaxed placeholder-gray-600/50 scrollbar-hide text-lg"
              spellCheck="false"
            />
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
