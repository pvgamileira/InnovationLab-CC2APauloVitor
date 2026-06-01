'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ActivityHeatmap() {
  const [loading, setLoading] = useState(true);
  const [heatmapData, setHeatmapData] = useState([]);

  useEffect(() => {
    async function fetchHeatmapData() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return;

        // Date 30 days ago
        const today = new Date();
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(today.getDate() - 29);

        // Fetch completed tasks within the last 30 days
        const { data: tasks, error } = await supabase
          .from('academic_tasks')
          .select('created_at')
          .eq('user_id', session.user.id)
          .eq('status', 'completed')
          .gte('created_at', thirtyDaysAgo.toISOString());

        if (error) throw error;

        const countsByDate = {};
        if (tasks) {
          tasks.forEach(task => {
            const dateStr = new Date(task.created_at).toISOString().split('T')[0];
            countsByDate[dateStr] = (countsByDate[dateStr] || 0) + 1;
          });
        }

        const dataArray = [];
        for (let i = 29; i >= 0; i--) {
          const d = new Date();
          d.setDate(today.getDate() - i);
          const dateStr = d.toISOString().split('T')[0];
          const count = countsByDate[dateStr] || 0;
          
          let colorClass = 'bg-green-500/10';
          if (count === 1) colorClass = 'bg-green-500/40';
          else if (count === 2) colorClass = 'bg-green-500/70';
          else if (count >= 3) colorClass = 'bg-green-500';

          const displayDate = d.toLocaleDateString('pt-BR');

          dataArray.push({
            dateStr,
            displayDate,
            count,
            colorClass
          });
        }

        setHeatmapData(dataArray);
      } catch (err) {
        console.error("Erro ao buscar heatmap:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchHeatmapData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[120px]">
        <div className="w-6 h-6 border-2 border-t-transparent border-green-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex gap-1.5 flex-wrap">
        {heatmapData.map((day, idx) => (
          <div
            key={idx}
            title={`${day.displayDate}: ${day.count} tarefas concluídas`}
            className={`w-4 h-4 rounded-[3px] border border-white/5 ${day.colorClass} transition-all hover:scale-110 cursor-help`}
          ></div>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-end gap-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
        <span>Menos</span>
        <div className="w-3 h-3 rounded-[2px] bg-green-500/10 border border-white/5"></div>
        <div className="w-3 h-3 rounded-[2px] bg-green-500/40 border border-white/5"></div>
        <div className="w-3 h-3 rounded-[2px] bg-green-500/70 border border-white/5"></div>
        <div className="w-3 h-3 rounded-[2px] bg-green-500 border border-white/5"></div>
        <span>Mais</span>
      </div>
    </div>
  );
}
