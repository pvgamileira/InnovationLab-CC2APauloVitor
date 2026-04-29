'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { BookText, Loader2, CheckCircle2, Clock, FolderOpen, AlertCircle, Sparkles, X } from 'lucide-react';

export default function CadernoPage() {
  const [session, setSession] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [activeSubjectId, setActiveSubjectId] = useState('general');
  const [notesText, setNotesText] = useState('');
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'error'
  const [isCopilotLoading, setIsCopilotLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  
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

  const handleCopilotEnhance = async () => {
    if (!notesText.trim()) return;
    setIsCopilotLoading(true);
    setAiResponse(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Sem sessão ativa');

      const response = await fetch('/api/gemini-copilot', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ noteContent: notesText })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Erro no Copilot');
      }

      const data = await response.json();
      setAiResponse(data.content);
    } catch (err) {
      console.error(err);
      setAiResponse(`**Erro**: ${err.message}`);
    } finally {
      setIsCopilotLoading(false);
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
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleCopilotEnhance}
              disabled={isCopilotLoading || !notesText.trim()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-bold text-sm shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCopilotLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              Aprimorar com IA
            </button>

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

        {/* Text Area and AI Response */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeSubjectId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`p-6 relative flex flex-col ${aiResponse ? 'lg:w-1/2 border-r border-white/5' : 'w-full'} transition-all duration-300`}
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

          {aiResponse && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 p-6 bg-[#0a0c14]/80 backdrop-blur-xl overflow-y-auto relative"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#3a86ff] font-bold flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Copilot IA
                </h3>
                <button onClick={() => setAiResponse(null)} className="text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
                {aiResponse}
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
}
