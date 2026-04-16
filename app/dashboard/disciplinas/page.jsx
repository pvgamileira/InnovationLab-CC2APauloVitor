import { FolderOpen, Layers } from 'lucide-react';

export default function DisciplinasPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 animate-in fade-in duration-700">
      <div className="bg-[#0a0c14]/40 backdrop-blur-xl border border-white/5 rounded-[2rem] p-12 max-w-2xl w-full text-center shadow-[0_0_80px_rgba(58,134,255,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
          <Layers className="w-48 h-48 text-[#3a86ff]" />
        </div>
        
        <div className="w-20 h-20 bg-[#3a86ff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#3a86ff]/20">
          <FolderOpen className="w-10 h-10 text-[#3a86ff]" />
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent mb-4">
          Gerenciamento de Disciplinas
        </h1>
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
          Módulo em desenvolvimento. Em breve você poderá criar trilhas de aprendizado e estruturar currículos avançados.
        </p>
        
        <button disabled className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 font-bold uppercase tracking-widest text-sm cursor-not-allowed">
          Módulo Indisponível
        </button>
      </div>
    </div>
  );
}
