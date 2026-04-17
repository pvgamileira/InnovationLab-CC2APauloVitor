'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

// ─── Animation Variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-white overflow-hidden">

      {/* ── Navbar ── */}
      <nav className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-14 py-6">

        {/* Left: Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            href="/auth"
            className="text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200"
          >
            Login
          </Link>
          <Link
            href="/auth"
            className="text-sm font-bold px-5 py-2 rounded-lg bg-[#3a86ff]/10 border border-[#3a86ff]/30 text-[#3a86ff] hover:bg-[#3a86ff]/20 hover:border-[#3a86ff]/60 transition-all duration-200"
          >
            Cadastrar-se
          </Link>
        </div>

        {/* Right: Logo */}
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#3a86ff]" />
          <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-white to-[#3a86ff] bg-clip-text text-transparent">
            EduTrack<span className="text-[#3a86ff]">AI</span>
          </span>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="flex min-h-screen">

        {/* ── Left Column (50%) ── */}
        <div className="w-1/2 flex items-center justify-center px-10 md:px-16 lg:px-24 relative">

          {/* Ambient glow */}
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#3a86ff]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          <motion.div
            className="relative z-10 flex flex-col max-w-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full bg-[#3a86ff]/10 border border-[#3a86ff]/20 text-[#3a86ff]">
                <Sparkles className="w-3.5 h-3.5" />
                Powered by Inteligência Artificial
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.08] tracking-tight mb-7"
            >
              Eleve sua{' '}
              <span className="bg-gradient-to-r from-[#3a86ff] via-blue-400 to-purple-400 bg-clip-text text-transparent">
                eficiência
              </span>{' '}
              acadêmica
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-gray-400 leading-relaxed mb-10 max-w-md"
            >
              Rotinas inteligentes geradas por IA que se adaptam ao seu ritmo.
              Gerencie disciplinas, tarefas e prazos com clareza e precisão —
              tudo em um só lugar.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
              <Link
                href="/auth"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-bold rounded-xl shadow-[0_0_30px_rgba(58,134,255,0.35)] hover:shadow-[0_0_45px_rgba(58,134,255,0.55)] hover:brightness-110 transition-all duration-300 text-sm"
              >
                Vamos começar
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/pvgamileira/InnovationLab-CC2APauloVitor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 border border-white/10 text-gray-300 font-semibold rounded-xl hover:bg-white/10 hover:border-white/25 hover:text-white transition-all duration-300 text-sm"
              >
                Conheça nosso projeto!
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right Column (50%) ── */}
        <div className="w-1/2 relative">
          <div className="w-full h-full relative">
            {/* SPLINE 3D ROBOT GOES HERE */}
          </div>
        </div>

      </main>
    </div>
  );
}
