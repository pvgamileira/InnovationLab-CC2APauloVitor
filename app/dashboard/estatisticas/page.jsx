import { BarChart3, TrendingUp } from 'lucide-react';

export default function EstatisticasPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 animate-in fade-in duration-700">
      <div className="bg-[#0a0c14]/40 backdrop-blur-xl border border-indigo-500/10 rounded-[2rem] p-12 max-w-2xl w-full text-center shadow-[0_0_80px_rgba(99,102,241,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <TrendingUp className="w-48 h-48 text-indigo-500" />
        </div>
        
        <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-indigo-500/20">
          <BarChart3 className="w-10 h-10 text-indigo-400" />
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
          Insights & Estatísticas Avançadas
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Preparando visualizações preditivas e matrizes de desempenho utilizando inteligência artificial.
        </p>
        
        <button disabled className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 font-bold uppercase tracking-widest text-sm cursor-not-allowed">
          Módulo Indisponível
        </button>
      </div>
    </div>
  );
}
