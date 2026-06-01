'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Lock, AlertCircle, CheckCircle2, BrainCircuit } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/auth');
      }
    };
    checkSession();
  }, [router]);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("A senha precisa ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      
      setSuccessMsg("Senha atualizada com sucesso!");
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-gray-100 flex font-sans overflow-hidden relative">
      {/* Background decorativo */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#3a86ff]/8 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full flex items-center justify-center p-6 lg:p-16 relative z-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
        <div className="w-full max-w-md bg-[#0a0c14]/60 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-10 shadow-[0_0_80px_rgba(58,134,255,0.05)]">
          <div className="flex justify-center mb-6">
             <div className="w-12 h-12 rounded-xl bg-[#3a86ff] flex items-center justify-center shadow-[0_0_20px_rgba(58,134,255,0.4)]">
               <BrainCircuit className="w-7 h-7 text-white" />
             </div>
          </div>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Definir Nova Senha
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

          <form onSubmit={handleReset} className="space-y-6">
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white focus:border-[#3a86ff]/80 transition-all outline-none"
                placeholder="Nova Senha"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-white focus:border-[#3a86ff]/80 transition-all outline-none"
                placeholder="Confirmar Senha"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#3a86ff] to-[#2563eb] text-white font-extrabold flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(58,134,255,0.4)] transition-all disabled:opacity-50"
            >
              {loading ? <div className="w-6 h-6 border-2 border-t-transparent border-white rounded-full animate-spin"></div> : "Salvar Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
