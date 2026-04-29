'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Mail, Lock, LogIn, UserPlus, AlertCircle, BrainCircuit, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

export default function AuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    // Validação de segurança básica antes de mandar pro banco
    if (password.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Fluxo de LOGIN
        const { error: loginErr } = await supabase.auth.signInWithPassword({ email, password });
        if (loginErr) throw loginErr;
        router.push('/dashboard');
      } else {
        // Fluxo de CADASTRO REAL
        const { data, error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`
          }
        });

        if (signUpErr) throw signUpErr;

        // Se o Supabase retornou o usuário mas não logou, é porque precisa confirmar e-mail
        setSuccessMsg('Registro enviado! Verifique seu e-mail para confirmar a conta e poder fazer login.');
        setIsLogin(true); // Volta pro login para ele entrar após confirmar
        setPassword('');
      }
    } catch (err) {
      // Aqui o "invalid API key" vai ser capturado e mostrado na tela
      setError(err.message === 'Invalid API key'
        ? 'Erro de Configuração: As chaves do Supabase não foram encontradas no servidor.'
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
      if (error) throw error;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-gray-100 flex font-sans overflow-hidden relative">
      {/* Background decorativo mantido conforme seu original */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#3a86ff]/8 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Pane Esquerda (Seu Branding Premium) */}
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
            {isLogin ? "Bem-vindo de volta." : "Comece sua jornada."}
          </h1>
          <p className="text-gray-400 text-lg max-w-md leading-relaxed">
            {isLogin
              ? "Acesse seu painel para gerenciar suas metas acadêmicas."
              : "Crie sua conta gratuita e comece a rastrear seu desempenho hoje mesmo."}
          </p>
        </div>
        <div className="text-sm font-semibold text-gray-600 uppercase tracking-widest">&copy; 2026 EduTrack AI Lab</div>
      </div>

      {/* Pane Direita (Formulário) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-16 relative z-10 animate-in fade-in slide-in-from-right duration-700">
        <div className="w-full max-w-md bg-[#0a0c14]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-[0_0_80px_rgba(58,134,255,0.05)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              {isLogin ? "Acesso ao Sistema" : "Cadastro de Usuário"}
            </h2>
          </div>

          {error && (
            <div className="mb-6 bg-red-900/10 border border-red-500/30 rounded-2xl p-4 flex gap-3 text-red-200 shadow-inner">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 bg-emerald-900/10 border border-emerald-500/30 rounded-2xl p-4 flex gap-3 text-emerald-200 shadow-inner">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{successMsg}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white focus:border-[#3a86ff]/80 transition-all outline-none"
                placeholder="seu-email@exemplo.com"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white focus:border-[#3a86ff]/80 transition-all outline-none"
                placeholder="Sua senha (min. 6 caracteres)"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-extrabold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(58,134,255,0.4)] transition-all disabled:opacity-50"
            >
              {loading ? <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : (isLogin ? "Entrar agora" : "Finalizar Cadastro")}
            </button>
          </form>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full mt-4 py-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold flex items-center justify-center gap-3 transition-all"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            Continuar com Google
          </button>

          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(null); setSuccessMsg(null); }}
              className="text-[#3a86ff] hover:underline font-bold text-sm"
            >
              {isLogin ? "Não tem conta? Crie aqui" : "Já tem conta? Faça login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}