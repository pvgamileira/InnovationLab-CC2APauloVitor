'use client';

import { useAi } from '@/contexts/AiContext';
import { CheckCircle2, AlertTriangle, Loader2, WifiOff, Terminal } from 'lucide-react';

export default function GlobalStatusBar() {
  const { aiStatus, globalInsight } = useAi();

  const getStatusUI = () => {
    switch (aiStatus) {
      case 'scanning':
        return { icon: <Loader2 className="w-4 h-4 animate-spin text-blue-400" />, text: 'Analisando carga...', color: 'text-blue-400' };
      case 'online':
        return { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: 'EduTrack-Ai: Online', color: 'text-emerald-500' };
      case 'warning':
        return { icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />, text: globalInsight, color: 'text-yellow-500' };
      case 'critical':
        return { icon: <AlertTriangle className="w-4 h-4 text-red-500" />, text: 'CRITICAL ERROR', color: 'text-red-500' };
      case 'offline':
      default:
        return { icon: <WifiOff className="w-4 h-4 text-gray-500" />, text: 'Fallback: Modo Manual', color: 'text-gray-500' };
    }
  };

  const ui = getStatusUI();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#0f0f16] border-t border-white/5 flex items-center px-4 text-xs font-mono z-50 overflow-hidden">
      <div className="flex items-center gap-2 w-full">
        <div className="shrink-0">
          {ui.icon}
        </div>
        <span className={`${ui.color} font-bold truncate block max-w-full`} title={ui.text}>
          {ui.text}
        </span>
      </div>
    </div>
  );
}
