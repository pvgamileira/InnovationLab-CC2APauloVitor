'use client';

import { useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import { supabase } from '@/lib/supabase';

export default function SmartNotifier() {
  const { showToast } = useToast();

  useEffect(() => {
    let isMounted = true;

    async function checkNotifications() {
      if (!isMounted) return;

      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const now = Date.now();
      const lastActivity = parseInt(localStorage.getItem('smart_last_activity') || '0', 10);
      const lastTaskCheck = parseInt(localStorage.getItem('smart_last_task_check') || '0', 10);

      // Inactivity Check: 2 days (48 hours)
      const TWO_DAYS_MS = 2 * 24 * 60 * 60 * 1000;
      if (lastActivity > 0 && (now - lastActivity > TWO_DAYS_MS)) {
        setTimeout(() => {
          showToast("👋 Bem-vindo de volta! Sentimos sua falta. Que tal revisar suas metas hoje?", "success");
        }, 1500); // Small delay to let the page load
      }
      
      // Update activity timestamp since they are here now
      localStorage.setItem('smart_last_activity', now.toString());

      // Task Reminder Check: 12 hours
      const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
      if (now - lastTaskCheck > TWELVE_HOURS_MS) {
        // Fetch pending tasks
        try {
          const { data, error } = await supabase
            .from('academic_tasks')
            .select('id')
            .eq('user_id', session.user.id)
            .neq('status', 'completed');
            
          if (!error && data && data.length > 0) {
            setTimeout(() => {
              showToast(`🎯 Lembrete: Você tem ${data.length} tarefa(s) pendente(s) aguardando!`, "success");
            }, 3000); // Delay slightly longer to not overlap
          }
          
          localStorage.setItem('smart_last_task_check', now.toString());
        } catch (err) {
          console.error("SmartNotifier error fetching tasks:", err);
        }
      }
    }

    // Initial check on mount
    checkNotifications();

    // Re-check when user returns to the tab (e.g. was away for hours but left tab open)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkNotifications();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isMounted = false;
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [showToast]);

  return null; // This component is invisible and only manages logic
}
