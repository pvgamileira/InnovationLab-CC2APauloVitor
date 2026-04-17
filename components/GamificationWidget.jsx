import { Trophy, Zap } from 'lucide-react';

export default function GamificationWidget({ completedTasks = 0 }) {
  // Logic
  const totalXP = completedTasks * 50;
  const level = Math.floor(totalXP / 500) + 1;
  const currentLevelProgress = totalXP % 500;
  const progressPercentage = (currentLevelProgress / 500) * 100;

  return (
    <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 md:p-6 shadow-xl relative overflow-hidden group">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 mix-blend-overlay pointer-events-none group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-500 ease-in-out" />
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between z-10 relative gap-4">
        {/* Level and XP Info */}
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 min-w-[64px] rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)] border border-white/20">
            <Trophy className="text-white h-8 w-8 drop-shadow-md" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 leading-tight">
              Nível {level}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5 opacity-90">
              <Zap className="h-4 w-4 text-purple-400 fill-purple-400/20" />
              <span className="text-sm text-gray-300 font-medium tracking-wide">
                <span className="text-white font-semibold">{totalXP}</span> XP Total
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar Section */}
        <div className="w-full md:w-1/2 lg:w-2/3 flex flex-col justify-center">
          <div className="w-full flex justify-between items-center mb-2 px-1">
            <span className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Progresso</span>
            <span className="text-xs text-blue-300 font-mono bg-blue-900/40 px-2 py-0.5 rounded border border-blue-500/20">
              {currentLevelProgress} / 500 XP
            </span>
          </div>
          
          <div className="h-3 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 relative">
            {/* The progress bar fill */}
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative transition-all duration-700 ease-out"
              style={{ width: `${progressPercentage}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 mix-blend-overlay transform -skew-x-12 hidden animate-[shimmer_2s_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
