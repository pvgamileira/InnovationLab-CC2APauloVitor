'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, LogIn, UserPlus, AlertCircle, BrainCircuit, ShieldCheck, Zap } from 'lucide-react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/dashboard';
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Registro concluído. Você já pode acessar o sistema.');
        window.location.href = '/dashboard';
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-gray-100 flex font-sans overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#3a86ff]/8 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#433aff]/8 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Left Pane - Branding & Features */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-16 relative z-10 animate-in fade-in slide-in-from-left duration-700">
        <div>
          <div className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3a86ff] flex items-center justify-center shadow-[0_0_20px_rgba(58,134,255,0.4)]">
              <BrainCircuit className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">EduTrack AI</span>
          </div>
        </div>
        
        <div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-6">
            Eleve sua jornada<br />acadêmica.
          </h1>
          <p className="text-gray-400 text-lg max-w-md mb-12 leading-relaxed">
            Organize suas disciplinas, rastreie tarefas complexas e libere seu verdadeiro potencial através do nosso sistema impulsionado por insights detalhados.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                <ShieldCheck className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-200">Segurança de Dados</h3>
                <p className="text-sm text-gray-500">Isolamento reforçado no nível do banco.</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                <Zap className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-200">Velocidade Extrema</h3>
                <p className="text-sm text-gray-500">Desempenho fluído e interface focada.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm font-semibold text-gray-600 uppercase tracking-widest">
          &copy; 2026 EduTrack AI Lab
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative z-10 animate-in fade-in slide-in-from-right duration-700">
        <div className="w-full max-w-md bg-[#0a0c14]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-[0_0_80px_rgba(58,134,255,0.05)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              {isLogin ? "Bem-vindo de volta" : "Crie sua conta livre"}
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Acesso portal de Autenticação Segura
            </p>
          </div>

          {error && (
            <div className="mb-8 bg-red-900/10 border border-red-500/30 rounded-2xl p-4 flex gap-3 text-red-200 shadow-inner">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">E-mail Corporativo ou Pessoal</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-gray-700 focus:outline-none focus:border-[#3a86ff]/80 focus:ring-1 focus:ring-[#3a86ff]/80 transition-all shadow-inner"
                  placeholder="nome@universidade.edu.br"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Senha de Acesso</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white placeholder-gray-700 focus:outline-none focus:border-[#3a86ff]/80 focus:ring-1 focus:ring-[#3a86ff]/80 transition-all shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-2xl bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-extrabold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(58,134,255,0.4)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : isLogin ? (
                <>
                  <LogIn className="w-5 h-5" />
                  Entrar no Sistema
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Concluir Registro
                </>
              )}
            </button>
          </form>

          <div className="relative mt-10 border-t border-white/5 pt-10 text-center">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#0a0c14] px-4 text-xs font-bold text-gray-600 uppercase tracking-widest">
              Ou Autentique Via
            </span>
            <button
              type="button"
              onClick={handleGoogleAuth}
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Login Automático do Google
            </button>
          </div>

          <div className="mt-8 text-center bg-black/20 rounded-2xl p-4 border border-white/5">
            <p className="text-gray-400 text-sm font-medium">
              {isLogin ? "Primeira vez aqui?" : "Já possui vínculo ativo?"}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-[#3a86ff] hover:text-[#5e9eff] font-bold transition-colors"
              >
                {isLogin ? "Crie sua conta agora" : "Retornar ao Login"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
