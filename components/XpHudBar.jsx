'use client';

import { Zap } from 'lucide-react';

export default function XpHudBar({ completedTasks = 0 }) {
  const totalXP = completedTasks * 50;
  const level = Math.floor(totalXP / 500) + 1;
  const currentLevelXP = totalXP % 500;
  const progress = (currentLevelXP / 500) * 100;

  return (
    <div className="hidden sm:flex items-center gap-3 min-w-[160px]">
      {/* Level badge */}
      <div className="flex items-center gap-1.5 shrink-0">
        <Zap className="w-3 h-3 text-[#3a86ff] fill-[#3a86ff]/30" />
        <span className="text-xs font-bold text-[#3a86ff] tracking-wide whitespace-nowrap">
          Lv. {level}
        </span>
      </div>

      {/* Progress track */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-[#3a86ff] to-purple-500 transition-all duration-700 ease-out"
            style={{
              width: `${progress}%`,
              boxShadow: progress > 0 ? '0 0 6px rgba(58,134,255,0.9), 0 0 2px rgba(168,85,247,0.6)' : 'none',
            }}
          />
        </div>
        <span className="text-[10px] text-gray-500 font-mono leading-none tracking-tight">
          {currentLevelXP}/500 XP
        </span>
      </div>
    </div>
  );
}
