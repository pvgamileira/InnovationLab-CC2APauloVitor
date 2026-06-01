'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layout, BookOpen, HeartPulse, Check, Minus } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white overflow-x-hidden relative selection:bg-[#3a86ff]/30">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#3a86ff] opacity-20 blur-[100px]"></div>
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#3a86ff]" />
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white to-[#3a86ff] bg-clip-text text-transparent">
            EduTrack<span className="text-[#3a86ff]">AI</span>
          </span>
        </div>
        <div className="flex items-center gap-4 md:gap-6">
          <Link href="/auth" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200">
            Login
          </Link>
          <Link href="/auth" className="text-sm font-bold px-4 md:px-5 py-2 rounded-lg bg-[#3a86ff]/10 border border-[#3a86ff]/30 text-[#3a86ff] hover:bg-[#3a86ff]/20 transition-all duration-200">
            Começar
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        
        {/* Hero Section */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-widest uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5 text-[#3a86ff]" />
            O futuro do estudo
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Sua jornada acadêmica, <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-[#3a86ff] to-purple-500 bg-clip-text text-transparent">
              elevada por Inteligência Artificial.
            </span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            O ecossistema definitivo para estudantes de tecnologia organizarem tarefas, notas e desempenho com mentoria proativa.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-bold rounded-xl shadow-[0_0_30px_rgba(58,134,255,0.4)] hover:shadow-[0_0_50px_rgba(58,134,255,0.6)] hover:scale-105 transition-all duration-300 w-full sm:w-auto justify-center">
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#pricing" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 w-full sm:w-auto"
            >
              Ver Planos
            </a>
          </motion.div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1: Mentor IA (Large) */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:bg-white/10 transition-colors">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3a86ff]/10 rounded-full blur-[80px] -mr-20 -mt-20 transition-all group-hover:bg-[#3a86ff]/20"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-[#3a86ff]/10 border border-[#3a86ff]/20 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-[#3a86ff]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">Mentor IA</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                O motor Gemini analisa sua rotina acadêmica em tempo real, fornecendo insights ultra-personalizados, dicas técnicas e estratégias de estudo.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Kanban Inteligente */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
              <Layout className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Kanban Inteligente</h3>
            <p className="text-gray-400 leading-relaxed">
              Gestão visual de tarefas com quebra automática de trabalhos complexos em micro-etapas acionáveis.
            </p>
          </motion.div>

          {/* Card 3: Caderno Copiloto */}
          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Caderno Copiloto</h3>
            <p className="text-gray-400 leading-relaxed">
              Transforme anotações brutas de aula em resumos estruturados e flashcards instantâneos com um clique.
            </p>
          </motion.div>

          {/* Card 4: Insights de Burnout (Large) */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden group hover:bg-white/10 transition-colors flex flex-col md:flex-row md:items-center gap-8">
            <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center shrink-0">
              <HeartPulse className="w-7 h-7 text-rose-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Insights de Burnout</h3>
              <p className="text-gray-400 leading-relaxed">
                Análise preditiva de estresse baseada na sua carga de trabalho, prazos e turno de estudo, priorizando sua saúde mental.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Seção Transparente de Preços (Monetização) */}
        <motion.section 
          id="pricing"
          className="w-full mt-32 py-16 border-t border-white/5 relative z-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-4">
              Escolha o seu nível de produtividade
            </h2>
            <p className="text-gray-400 text-sm">
              Comece sem custos ou impulsione seu aprendizado com inteligência artificial ilimitada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch px-4">
            {/* Card Plano Gratuito */}
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-white/10 hover:bg-white/[0.03] transition-all duration-300">
              <div>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Padrão</span>
                <h3 className="text-xl font-bold mt-2">Plano Gratuito</h3>
                <p className="text-gray-400 text-xs mt-2">Acesso aos recursos essenciais de produtividade.</p>

                <div className="my-6">
                  <span className="text-3xl font-extrabold">R$ 0</span>
                  <span className="text-gray-500 text-xs"> / mês</span>
                </div>

                <ul className="space-y-3.5 text-left border-t border-white/5 pt-6">
                  <li className="flex items-center gap-3 text-gray-300 text-xs">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Até 3 Disciplinas simultâneas</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-xs">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Mapa de Calor Básico (Até Tier Ouro)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-300 text-xs">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>5 Consultas IA/dia</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-500 text-xs">
                    <Minus className="w-4 h-4 text-gray-600 shrink-0" />
                    <span className="line-through">Disciplinas e Kanban ilimitados</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-500 text-xs">
                    <Minus className="w-4 h-4 text-gray-600 shrink-0" />
                    <span className="line-through">Tiers Platina e Diamante (Auras)</span>
                  </li>
                </ul>
              </div>

              <Link 
                href="/auth" 
                className="w-full mt-10 py-3.5 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all text-xs text-center block"
              >
                Começar Grátis
              </Link>
            </div>

            {/* Card Plano Pro */}
            <div className="bg-black/40 backdrop-blur-lg border border-[#3a86ff]/50 rounded-3xl p-8 flex flex-col justify-between hover:border-[#3a86ff] transition-all duration-300 shadow-[0_0_45px_rgba(58,134,255,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 right-6 -translate-y-1/2 bg-[#3a86ff] text-white px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider">
                MAIS POPULAR
              </div>

              <div>
                <span className="text-[#3a86ff] text-xs font-bold uppercase tracking-wider">Premium</span>
                <h3 className="text-xl font-bold mt-2">EduTrack Pro</h3>
                <p className="text-gray-400 text-xs mt-2">Mentoria de estudos avançada e sem interrupções.</p>

                <div className="my-6">
                  <span className="text-3xl font-extrabold text-[#3a86ff]">R$ 9,90</span>
                  <span className="text-gray-400 text-xs"> / mês</span>
                </div>

                <ul className="space-y-3.5 text-left border-t border-[#3a86ff]/20 pt-6">
                  <li className="flex items-center gap-3 text-gray-200 text-xs">
                    <Check className="w-4 h-4 text-[#3a86ff] shrink-0" />
                    <span className="font-semibold">Disciplinas e Kanban Ilimitados</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-200 text-xs">
                    <Check className="w-4 h-4 text-[#3a86ff] shrink-0" />
                    <span className="font-semibold">IA Generativa Ilimitada</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-200 text-xs">
                    <Check className="w-4 h-4 text-[#3a86ff] shrink-0" />
                    <span>Tiers Platina e Diamante (Auras)</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-200 text-xs">
                    <Check className="w-4 h-4 text-[#3a86ff] shrink-0" />
                    <span>Acesso Antecipado a Novas Features</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-200 text-xs">
                    <Check className="w-4 h-4 text-[#3a86ff] shrink-0" />
                    <span>Suporte VIP Prioritário</span>
                  </li>
                </ul>
              </div>

              <Link 
                href="/auth" 
                className="w-full mt-10 py-3.5 bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all text-xs text-center block"
              >
                Conhecer o Pro
              </Link>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-20 py-8 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>EduTrack AI © 2026. Desenvolvido para transformar o aprendizado.</p>
          <div className="flex gap-6">
            <Link href="/termos" className="hover:text-gray-300 transition-colors">Termos</Link>
            <Link href="/privacidade" className="hover:text-gray-300 transition-colors">Privacidade</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
