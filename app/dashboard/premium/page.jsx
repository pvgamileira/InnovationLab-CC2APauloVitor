'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Check, Crown, Loader2, CreditCard, ShieldCheck } from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [simulationStep, setSimulationStep] = useState(1); // 1: Card Input, 2: Processing, 3: Success

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.fallback) {
        // Stripe não configurado (Offline/Sandbox) - Exibe simulação graciosa
        setShowSimulateModal(true);
        setSimulationStep(1);
      } else if (data.url) {
        // Redireciona para o checkout oficial do Stripe
        window.location.href = data.url;
      }
    } catch (err) {
      console.warn("Erro ao iniciar Stripe. Ativando modal de simulação.", err);
      setShowSimulateModal(true);
      setSimulationStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatePayment = () => {
    setSimulationStep(2);
    // Simula tempo de transação
    setTimeout(() => {
      setSimulationStep(3);
    }, 2000);
  };

  const handleCompleteSimulation = () => {
    setShowSimulateModal(false);
    // Redireciona para o dashboard com o parâmetro de sucesso
    router.push('/dashboard?success=true');
  };

  return (
    <div className="min-h-screen bg-[#030408] text-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#3a86ff]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl w-full text-center z-10">
        <Crown className="w-16 h-16 text-[#3a86ff] mx-auto mb-4 animate-bounce" />
        <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-[#3a86ff] bg-clip-text text-transparent mb-4">
          Eleve seus estudos ao próximo nível
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Desbloqueie o poder absoluto da Inteligência Artificial do EduTrack e estude sem restrições ou interrupções.
        </p>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Free Plan Card */}
          <div className="bg-white/[0.02] backdrop-blur-md border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-white/10 transition-all hover:translate-y-[-4px] duration-300">
            <div>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider">Básico</span>
              <h3 className="text-2xl font-bold mt-2">Plano Gratuito</h3>
              <p className="text-gray-400 text-sm mt-2">Perfeito para começar e organizar sua rotina inicial.</p>
              
              <div className="my-8">
                <span className="text-4xl font-extrabold">R$ 0</span>
                <span className="text-gray-500 text-sm"> / sempre</span>
              </div>

              <ul className="space-y-4 text-left border-t border-white/5 pt-8">
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <Check className="w-5 h-5 text-gray-500 shrink-0" />
                  <span>Gerenciamento de 3 Disciplinas</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <Check className="w-5 h-5 text-gray-500 shrink-0" />
                  <span>Quadro Kanban Acadêmico</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 text-sm">
                  <Check className="w-5 h-5 text-gray-500 shrink-0" />
                  <span>Até 5 insights de IA por semana</span>
                </li>
              </ul>
            </div>

            <button 
              disabled 
              className="w-full mt-12 py-4 bg-white/5 border border-white/5 text-gray-400 font-bold rounded-2xl cursor-not-allowed text-sm"
            >
              Plano Atual
            </button>
          </div>

          {/* Pro Plan Card */}
          <div className="relative bg-black/40 backdrop-blur-lg border border-[#3a86ff]/40 rounded-3xl p-8 flex flex-col justify-between hover:border-[#3a86ff]/80 transition-all hover:translate-y-[-4px] duration-300 shadow-[0_0_50px_rgba(58,134,255,0.1)]">
            {/* Pop Badge */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#3a86ff] text-white px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider flex items-center gap-1 shadow-lg">
              <Sparkles className="w-3.5 h-3.5" /> RECOMENDADO
            </div>

            <div>
              <span className="text-[#3a86ff] text-xs font-bold uppercase tracking-wider">Premium</span>
              <h3 className="text-2xl font-bold mt-2">EduTrack Pro</h3>
              <p className="text-gray-400 text-sm mt-2">Sua mentoria de estudos de alta performance com IA.</p>
              
              <div className="my-8">
                <span className="text-4xl font-extrabold text-[#3a86ff]">R$ 19,90</span>
                <span className="text-gray-400 text-sm"> / mês</span>
              </div>

              <ul className="space-y-4 text-left border-t border-[#3a86ff]/20 pt-8">
                <li className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="w-5 h-5 text-[#3a86ff] shrink-0" />
                  <span className="font-semibold">IA Sem Limites (Mentor & Copiloto)</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="w-5 h-5 text-[#3a86ff] shrink-0" />
                  <span>Prioridade Máxima no Suporte</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="w-5 h-5 text-[#3a86ff] shrink-0" />
                  <span>Tiers Exclusivos no Mapa de Calor</span>
                </li>
                <li className="flex items-center gap-3 text-gray-200 text-sm">
                  <Check className="w-5 h-5 text-[#3a86ff] shrink-0" />
                  <span>Disciplinas e Tarefas Ilimitadas</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={handleUpgrade}
              disabled={loading}
              className="w-full mt-12 py-4 bg-[#3a86ff] hover:bg-[#2563eb] text-white font-extrabold rounded-2xl shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] transition-all flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processando...
                </>
              ) : (
                <>
                  Fazer Upgrade Agora
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Simulated Interactive Checkout Modal (Fallback) */}
      {showSimulateModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a0c14] border border-[#3a86ff]/30 rounded-3xl p-8 max-w-md w-full shadow-[0_0_60px_rgba(58,134,255,0.2)]">
            
            {simulationStep === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#3a86ff]/10 rounded-full flex items-center justify-center mb-4">
                    <CreditCard className="w-6 h-6 text-[#3a86ff]" />
                  </div>
                  <h3 className="text-xl font-bold">Simular Checkout Pro</h3>
                  <p className="text-gray-400 text-xs mt-1">
                    Stripe está rodando em modo simulação offline no ambiente local.
                  </p>
                </div>

                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 text-left">
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
                    <span>PRODUTO</span>
                    <span>PREÇO</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span>EduTrack Pro - Assinatura Mensal</span>
                    <span className="text-[#3a86ff]">R$ 19,90</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1 text-left">NÚMERO DO CARTÃO (MOCK)</label>
                    <input 
                      disabled
                      type="text" 
                      value="4242 4242 4242 4242"
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] outline-none text-sm text-center"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 text-left">VALIDADE</label>
                      <input 
                        disabled
                        type="text" 
                        value="12/29"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] outline-none text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1 text-left">CVC</label>
                      <input 
                        disabled
                        type="text" 
                        value="123"
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#3a86ff] outline-none text-sm text-center"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleSimulatePayment}
                  className="w-full py-4 bg-[#3a86ff] hover:bg-[#2563eb] text-white font-extrabold rounded-xl shadow-lg transition-all text-sm"
                >
                  Confirmar Pagamento Simulado
                </button>
              </div>
            )}

            {simulationStep === 2 && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                <Loader2 className="w-12 h-12 text-[#3a86ff] animate-spin" />
                <h3 className="text-lg font-bold">Processando Transação...</h3>
                <p className="text-gray-400 text-xs max-w-xs">
                  A mentoria de estudos de alta performance está sendo ativada para você.
                </p>
              </div>
            )}

            {simulationStep === 3 && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="w-10 h-10 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-extrabold text-white">Assinatura Ativa!</h3>
                <p className="text-gray-300 text-sm max-w-xs mx-auto">
                  Parabéns! Sua conta foi atualizada para o <span className="text-[#3a86ff] font-bold">Plano Pro</span> com sucesso.
                </p>

                <button 
                  onClick={handleCompleteSimulation}
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all text-sm"
                >
                  Acessar Painel Pro
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
