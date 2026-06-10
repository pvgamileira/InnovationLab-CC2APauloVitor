'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

import { useUserContext } from '@/context/UserContext';

const AiContext = createContext();

export function AiProvider({ children }) {
  const [aiStatus, setAiStatus] = useState('scanning'); // online, offline, scanning, warning, critical
  const [globalInsight, setGlobalInsight] = useState('Sincronizando ambiente...');
  
  const { userData } = useUserContext();
  const tarefas = userData?.tarefas;

  useEffect(() => {
    let isMounted = true;
    
    if (!tarefas) {
       if (isMounted) {
         setAiStatus('offline');
         setGlobalInsight('IA Offline: Aguardando sincronização de dados...');
       }
       return;
    }

    try {
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const activeTasks = tarefas.filter(t => t.status !== 'completed');
      
      const overdueTasksCount = activeTasks.filter(t => {
        if (!t.due_date) return false;
        // The date parsing depends on the format, but assuming YYYY-MM-DD or similar
        const dueDate = new Date(t.due_date);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate <= now;
      }).length;

      if (isMounted) {
        if (overdueTasksCount > 0) {
          setAiStatus('warning');
          setGlobalInsight(`⚠️ Alerta Tático: Você tem ${overdueTasksCount} tarefa(s) pendente(s) ou atrasada(s). Foco total no Kanban.`);
        } else if (activeTasks.length > 0) {
          setAiStatus('online');
          setGlobalInsight('✨ Fluxo limpo. Selecione a próxima tarefa para manter a ofensiva.');
        } else {
          setAiStatus('online');
          setGlobalInsight('✨ Backlog zerado. Excelente dia de foco.');
        }
      }
    } catch (err) {
      if (isMounted) {
        setAiStatus('offline');
        setGlobalInsight('IA Offline: Falha na análise tática.');
      }
    }

    return () => { isMounted = false; };
  }, [tarefas]);

  return (
    <AiContext.Provider value={{ aiStatus, setAiStatus, globalInsight, setGlobalInsight }}>
      {children}
    </AiContext.Provider>
  );
}

export const useAi = () => useContext(AiContext);
