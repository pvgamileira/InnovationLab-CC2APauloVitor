'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-[#0a0c14]/80 backdrop-blur-xl border border-red-500/20 rounded-3xl p-10 flex flex-col items-center text-center relative z-10 shadow-[0_0_80px_rgba(239,68,68,0.1)]">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/30">
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-3">Erro de Sistema</h1>
        <p className="text-red-300/70 mb-10 leading-relaxed">
          Nossos servidores tropeçaram. Tente novamente ou retorne à página inicial se o problema persistir.
        </p>

        <div className="flex flex-col w-full gap-3">
          <button
            onClick={() => reset()}
            className="w-full py-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-500 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
          >
            Tentar Novamente
          </button>
          
          <Link 
            href="/"
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-gray-300 font-bold rounded-xl border border-transparent hover:border-white/10 transition-all flex items-center justify-center gap-2"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}
