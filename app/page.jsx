'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Layout, BookOpen, HeartPulse } from 'lucide-react';

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
          <motion.div variants={itemVariants}>
            <Link href="/auth" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-bold rounded-xl shadow-[0_0_30px_rgba(58,134,255,0.4)] hover:shadow-[0_0_50px_rgba(58,134,255,0.6)] hover:scale-105 transition-all duration-300">
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </Link>
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
