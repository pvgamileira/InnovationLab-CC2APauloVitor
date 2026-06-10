'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Terminal, Zap, Timer, X, CheckCircle2 } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import ParticleBackground from '@/components/ParticleBackground';

function InteractiveNotebook() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to rotation (-15 to 15 degrees)
  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="relative w-full max-w-lg mx-auto"
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full bg-[#0a0c14]/80 backdrop-blur-3xl border border-white/10 rounded-2xl p-8 shadow-[0_0_80px_rgba(58,134,255,0.1)] relative overflow-hidden"
      >
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <span className="text-xs text-gray-500 font-mono">dashboard.ai</span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
              <div className="w-10 h-10 rounded-lg bg-[#3a86ff]/20 flex items-center justify-center text-[#3a86ff]">
                <Zap size={20} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-2 w-1/3 bg-white/20 rounded"></div>
                <div className="h-2 w-1/2 bg-white/10 rounded"></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 border border-dashed border-[#3a86ff]/30 rounded-xl bg-[#3a86ff]/5 relative">
              <span className="text-xs font-mono text-[#3a86ff]/60 absolute top-2 right-2">AI Preview</span>
              <div className="h-2 w-3/4 bg-[#3a86ff]/30 rounded"></div>
              <div className="h-2 w-1/2 bg-[#3a86ff]/20 rounded"></div>
              <div className="h-2 w-5/6 bg-[#3a86ff]/10 rounded"></div>
            </div>
          </div>
          
          <div className="mt-auto border-t border-white/5 pt-4 flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400">🟢 IA: Monitorando Banco de Dados</span>
          </div>

          {/* Decorative Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#3a86ff]/20 blur-[60px] rounded-full pointer-events-none -z-10"></div>
        </div>
      </motion.div>
    </div>
  );
}

// TAB CONTENT DATA
const TAB_DATA = {
  kanban: {
    title: "Kanban Preditivo",
    description: "Digite o título da tarefa e o sistema calcula o esforço estimado instantaneamente, antes mesmo de você começar a trabalhar. Nossa inteligência utiliza modelos probabilísticos baseados em seu histórico e na complexidade do termo.",
    spec: "Mecânica de Debounce de 800ms para otimização de requisições à API do Gemini, usando um heurístico local como fallback de estabilidade. O cálculo de esforço processa linguagem natural e ajusta as expectativas do usuário em milissegundos."
  },
  caderno: {
    title: "Caderno Inteligente",
    description: "Abandone anotações perdidas. Seu caderno lê o contexto da sua disciplina e sugere tópicos em tempo real enquanto você digita.",
    spec: "Autocompletar assíncrono via WebSockets ou Fetch Server-Side. A análise contextual do Markdown injeta tags invisíveis (Ghost text) para guiar o estudo."
  },
  cronometro: {
    title: "Cronômetro Dinâmico",
    description: "O cronômetro lê a complexidade da disciplina selecionada e ajusta seu tempo de imersão automaticamente para preservar foco e evitar burnout.",
    spec: "Gerenciamento Dinâmico de Carga Cognitiva via Pomodoro State. A IA adapta dinamicamente os ciclos de trabalho (ex: 25m vs 50m) lendo as tags da sessão ativa no banco de dados."
  }
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('kanban');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (specText) => {
    setModalContent(specText);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-gray-100 flex flex-col overflow-hidden relative">
      <ParticleBackground />
      {/* Decorative Global Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#3a86ff]/8 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Hero Section */}
      <main className="flex flex-col lg:flex-row items-center justify-center px-6 pt-32 pb-20 max-w-7xl mx-auto w-full relative z-10 gap-16">
        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-6">
            Domine o Caos do Seu Semestre com Inteligência Artificial.
          </h1>
          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed mx-auto lg:mx-0">
            Não gerencie apenas suas tarefas. Deixe o EduTrack-Ai prever seus gargalos, otimizar seu foco e blindar o seu semestre acadêmico.
          </p>
          
          <Link 
            href="/auth"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-extrabold gap-2 hover:shadow-[0_0_30px_rgba(58,134,255,0.4)] transition-all hover:-translate-y-1 text-lg"
          >
            Começar a Estudar
          </Link>
        </motion.div>

        <motion.div 
          className="flex-1 w-full"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <InteractiveNotebook />
        </motion.div>
      </main>

      {/* Explanatory Tabs System */}
      <div className="max-w-4xl mx-auto w-full px-6 py-20 relative z-10 flex flex-col items-center">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('kanban')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'kanban' ? 'bg-[#3a86ff] text-white shadow-[0_0_20px_rgba(58,134,255,0.4)]' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}
          >
            🗂️ Kanban Preditivo
          </button>
          <button 
            onClick={() => setActiveTab('caderno')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'caderno' ? 'bg-[#3a86ff] text-white shadow-[0_0_20px_rgba(58,134,255,0.4)]' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}
          >
            📖 Caderno Inteligente
          </button>
          <button 
            onClick={() => setActiveTab('cronometro')}
            className={`px-6 py-3 rounded-full font-bold transition-all ${activeTab === 'cronometro' ? 'bg-[#3a86ff] text-white shadow-[0_0_20px_rgba(58,134,255,0.4)]' : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'}`}
          >
            ⏱️ Cronômetro Dinâmico
          </button>
        </div>

        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-[#0a0c14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-10 text-center"
        >
          <h2 className="text-3xl font-extrabold text-white mb-4">{TAB_DATA[activeTab].title}</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            {TAB_DATA[activeTab].description}
          </p>
          <button 
            onClick={() => openModal(TAB_DATA[activeTab].spec)}
            className="px-6 py-3 rounded-xl border border-[#3a86ff]/50 text-[#3a86ff] font-semibold hover:bg-[#3a86ff]/10 transition-colors"
          >
            Ver Especificação Técnica
          </button>
        </motion.div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-6xl mx-auto w-full px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">Planos Simples. Sem Surpresas.</h2>
          <p className="text-gray-400 text-lg">Escolha o nível de inteligência que você precisa para dominar o semestre.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Plano Gratuito */}
          <div className="bg-[#0a0c14]/60 backdrop-blur-xl border border-white/10 rounded-3xl p-10 flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">Plano Gratuito</h3>
            <div className="text-4xl font-extrabold text-white mb-6">R$ 0<span className="text-lg text-gray-500 font-medium">/mês</span></div>
            <p className="text-gray-400 mb-8 pb-8 border-b border-white/5 flex-grow">O essencial para organizar sua rotina universitária com perfeição.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> Kanban Manual</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> Caderno Linear de Anotações</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> Cronômetro Fixo (Pomodoro Clássico)</li>
              <li className="flex items-center gap-3 text-gray-300"><CheckCircle2 className="text-emerald-400 w-5 h-5" /> Histórico Básico de Tarefas</li>
            </ul>
            <Link href="/auth" className="w-full py-4 rounded-xl border border-white/20 text-white font-bold text-center hover:bg-white/5 transition-all">Começar Grátis</Link>
          </div>

          {/* Plano PRO */}
          <div className="bg-gradient-to-b from-[#121c36] to-[#0a0c14] border border-[#3a86ff]/50 rounded-3xl p-10 flex flex-col relative shadow-[0_0_50px_rgba(58,134,255,0.1)]">
            <div className="absolute top-0 right-0 bg-[#3a86ff] text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-3xl uppercase tracking-wider">Mais Popular</div>
            <h3 className="text-2xl font-bold text-[#3a86ff] mb-2">Plano PRO</h3>
            <div className="text-4xl font-extrabold text-white mb-6">R$ 19,90<span className="text-lg text-gray-500 font-medium">/mês</span></div>
            <p className="text-gray-400 mb-8 pb-8 border-b border-white/5 flex-grow">Acelere seus estudos com a Inteligência Artificial acompanhando cada passo.</p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-white"><CheckCircle2 className="text-[#3a86ff] w-5 h-5" /> <span className="font-semibold text-[#3a86ff]">Sistema Nervoso Central Ativo</span></li>
              <li className="flex items-center gap-3 text-gray-200"><CheckCircle2 className="text-[#3a86ff] w-5 h-5" /> Kanban com Estimativas Fantasma</li>
              <li className="flex items-center gap-3 text-gray-200"><CheckCircle2 className="text-[#3a86ff] w-5 h-5" /> Autocompletar Contextual no Caderno</li>
              <li className="flex items-center gap-3 text-gray-200"><CheckCircle2 className="text-[#3a86ff] w-5 h-5" /> Linter de Status Contínuo</li>
            </ul>
            <Link href="/auth" className="w-full py-4 rounded-xl bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-bold text-center hover:shadow-[0_0_20px_rgba(58,134,255,0.4)] transition-all">Assinar PRO</Link>
          </div>
        </div>
      </div>

      {/* Minimalist Legal Footer */}
      <footer className="mt-auto py-8 border-t border-white/5 bg-[#02040a] relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© 2026 EduTrack-Ai. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/termos" className="text-sm text-gray-600 hover:text-white transition-colors cursor-pointer">Termos de Serviço</Link>
            <Link href="/privacidade" className="text-sm text-gray-600 hover:text-white transition-colors cursor-pointer">Política de Privacidade</Link>
          </div>
        </div>
      </footer>

      {/* Technical Specification Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-lg bg-[#0a0c14] border border-white/10 rounded-2xl p-8 shadow-2xl relative"
          >
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Terminal size={20} className="text-[#3a86ff]" />
              Especificação Técnica
            </h3>
            <p className="text-gray-300 leading-relaxed font-mono text-sm bg-white/5 p-4 rounded-xl border border-white/5">
              {modalContent}
            </p>
            <button 
              onClick={closeModal}
              className="mt-8 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold transition-all"
            >
              Fechar
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
