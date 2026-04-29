import Link from 'next/link';
import { MapPinOff } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#02040a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#3a86ff]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col items-center text-center relative z-10 shadow-[0_0_80px_rgba(58,134,255,0.05)]">
        <div className="w-20 h-20 bg-[#3a86ff]/10 rounded-full flex items-center justify-center mb-8 border border-[#3a86ff]/20">
          <MapPinOff className="w-10 h-10 text-[#3a86ff]" />
        </div>

        <h1 className="text-7xl font-black bg-gradient-to-br from-white via-indigo-200 to-[#3a86ff] bg-clip-text text-transparent mb-4 tracking-tighter">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-white mb-3">Página não encontrada</h2>
        <p className="text-gray-400 mb-10 leading-relaxed">
          Parece que você se perdeu no ciberespaço acadêmico. A página que você está procurando não existe ou foi movida.
        </p>

        <Link 
          href="/dashboard"
          className="w-full py-4 bg-[#3a86ff] hover:bg-[#2563eb] text-white font-bold rounded-xl shadow-[0_0_30px_rgba(58,134,255,0.4)] transition-all flex items-center justify-center gap-2"
        >
          Voltar para o Dashboard
        </Link>
      </div>
    </div>
  );
}
