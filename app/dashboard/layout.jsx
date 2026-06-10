'use client';
import { usePathname, useRouter } from 'next/navigation'; // <-- useRouter adicionado
import { supabase } from '@/lib/supabase';
// Importação limpa, sem BarChart3 duplicado!
import {
  LayoutDashboard, BookOpen, BarChart3, LogOut,
  Calendar, User, Settings, BookText, Timer
} from 'lucide-react';

import Link from 'next/link';
import { useState, useEffect } from 'react'; // <-- imports adicionados
import { UserProvider, useUserContext } from '@/context/UserContext';
import { AiProvider } from '@/contexts/AiContext';
import GlobalStatusBar from '@/components/GlobalStatusBar';

function DashboardContent({ children }) {
  const pathname = usePathname();
  const router = useRouter(); // <-- Roteador instanciado

  const { userData } = useUserContext();
  const { xp, level, premium: isPremium } = userData;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/auth'); // <-- Correção do redirect
  };

  const menuGroups = [
    {
      title: 'Principal',
      links: [
        { name: 'Painel', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Disciplinas', href: '/dashboard/disciplinas', icon: BookOpen },
        { name: 'Agenda', href: '/dashboard/agenda', icon: Calendar },
        { name: 'Caderno', href: '/dashboard/caderno', icon: BookText },
        { name: 'Foco', href: '/dashboard/foco', icon: Timer },
        { name: 'Estatísticas', href: '/dashboard/estatisticas', icon: BarChart3 },
      ]
    },
    {
      title: 'Conta',
      links: [
        { name: 'Perfil', href: '/dashboard/perfil', icon: User },
        { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings },
      ]
    }
  ];

  const allLinks = [...menuGroups[0].links, ...menuGroups[1].links];
  const mobileLinks = allLinks.filter(l => ['Painel', 'Disciplinas', 'Caderno', 'Estatísticas'].includes(l.name));

  return (
      <div className="flex h-screen bg-[#02040a] text-gray-100 font-sans selection:bg-[#3a86ff]/30 overflow-hidden">

        <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#3a86ff]/5 blur-[150px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-[#433aff]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

        <aside className="hidden md:flex flex-col w-[280px] h-full bg-[#0a0c14]/60 backdrop-blur-3xl border-r border-white/5 relative z-20">
          <div className="p-8 flex flex-col gap-4 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3a86ff]/20 to-[#3a86ff]/5 rounded-xl flex items-center justify-center border border-[#3a86ff]/30 shadow-[0_0_15px_rgba(58,134,255,0.2)]">
                <LayoutDashboard className="w-5 h-5 text-[#3a86ff]" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                EduTrack AI
              </span>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-2">
                 <span className="text-xs font-bold text-gray-300 flex items-center gap-1.5"><span className="text-amber-400">🌟</span> Nível {level}</span>
                 <span className="text-[10px] font-bold text-[#3a86ff] uppercase tracking-wider">{xp} XP</span>
              </div>
              {isPremium ? (
                <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-black uppercase tracking-wider rounded-lg text-center select-none">
                  👑 Plano Pro Ativo
                </div>
              ) : (
                <Link 
                  href="/dashboard/premium" 
                  className="flex items-center justify-center gap-1.5 py-1.5 px-3 bg-gradient-to-r from-[#3a86ff]/10 to-purple-500/10 hover:from-[#3a86ff]/20 hover:to-purple-500/20 border border-[#3a86ff]/35 hover:border-[#3a86ff] text-white hover:text-[#3a86ff] text-[11px] font-extrabold rounded-lg shadow-sm hover:shadow-[0_0_15px_rgba(58,134,255,0.15)] transition-all cursor-pointer select-none text-center"
                >
                  ✨ Fazer Upgrade (R$ 9,90)
                </Link>
              )}
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar-hide px-4 py-6 space-y-8">
            {menuGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <p className="px-4 text-[10px] font-black uppercase tracking-widest text-gray-600 mb-3">
                  {group.title}
                </p>
                {group.links.map((link) => {
                  const isActive = pathname === link.href;
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium group ${isActive ? 'bg-[#3a86ff]/10 text-[#3a86ff] border border-[#3a86ff]/20 shadow-[0_0_15px_rgba(58,134,255,0.1)]' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
                    >
                      <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#3a86ff]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                      <span className="text-sm tracking-wide">{link.name}</span>
                    </Link>
                  );
                })}
              </div>
            ))}

            {/* Removed duplicated Premium Pathway Button */}
          </nav>

          <div className="p-4 border-t border-white/5 bg-black/20">
            <button
              onClick={handleLogout}
              className="flex items-center gap-4 px-4 py-3 w-full rounded-xl text-gray-500 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all font-medium group"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm tracking-wide">Encerrar Sessão</span>
            </button>
          </div>
        </aside>

        <main className="flex-1 h-full overflow-y-auto relative z-10 pb-24 md:pb-8 scrollbar-hide">
          {children}
        </main>

        <nav className="md:hidden fixed bottom-0 left-0 w-full h-[85px] bg-[#0a0c14]/95 backdrop-blur-2xl border-t border-white/5 z-50 flex items-center justify-around px-2 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          {mobileLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors ${isActive ? 'text-[#3a86ff]' : 'text-gray-500'}`}
              >
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-[#3a86ff]/15 shadow-[0_0_15px_rgba(58,134,255,0.2)] border border-[#3a86ff]/20' : 'border border-transparent hover:bg-white/5'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[9px] font-bold tracking-wider uppercase">{link.name}</span>
              </Link>
            );
          })}
          <Link href="/dashboard/perfil" className={`flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors ${pathname === '/dashboard/perfil' ? 'text-[#3a86ff]' : 'text-gray-500'}`}>
            <div className={`p-2 rounded-xl transition-all ${pathname === '/dashboard/perfil' ? 'bg-[#3a86ff]/15 shadow-[0_0_15px_rgba(58,134,255,0.2)] border border-[#3a86ff]/20' : 'border border-transparent hover:bg-white/5'}`}>
              <User className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold tracking-wider uppercase">Conta</span>
          </Link>
        </nav>
      </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <UserProvider>
      <AiProvider>
        <DashboardContent>{children}</DashboardContent>
        <GlobalStatusBar />
      </AiProvider>
    </UserProvider>
  );
}