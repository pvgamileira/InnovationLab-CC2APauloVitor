'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { LifeBuoy, Send, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Como o XP funciona?",
    answer: "O XP é a sua pontuação de experiência. Você ganha XP ao completar tarefas. A cada 500 XP você sobe de nível!"
  },
  {
    question: "Como resetar a senha?",
    answer: "Você pode resetar a sua senha na página de Configurações, clicando na aba 'Segurança' e selecionando 'Alterar Senha'."
  },
  {
    question: "Como reportar um erro crítico?",
    answer: "Use o formulário ao lado e selecione 'Reportar Bug'. Nossa equipe dará prioridade ao seu chamado."
  }
];

function FAQAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
      >
        <span className="font-bold text-gray-200">{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-white/5 text-gray-400 text-sm leading-relaxed bg-black/20">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function SupportPage() {
  const { showToast } = useToast();
  
  const [category, setCategory] = useState("Dúvida");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      showToast("Por favor, preencha todos os campos.", "error");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/suporte', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, subject, description })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Falha ao enviar chamado.');
      }

      showToast("✅ Chamado aberto com sucesso!", "success");
      setCategory("Dúvida");
      setSubject("");
      setDescription("");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-20 animate-in fade-in duration-700">
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#3a86ff]/20 to-purple-500/20 border border-[#3a86ff]/30 rounded-2xl flex items-center justify-center">
            <LifeBuoy className="w-7 h-7 text-[#3a86ff]" />
          </div>
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-2">
              Central de Ajuda
            </h1>
            <p className="text-gray-400 font-medium tracking-wide">
              Precisa de ajuda? Tire suas dúvidas ou entre em contato.
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <FAQAccordion key={index} question={item.question} answer={item.answer} />
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-br from-[#3a86ff]/10 to-transparent border border-[#3a86ff]/20 rounded-2xl">
            <h3 className="text-[#3a86ff] font-bold mb-2">Ainda precisa de ajuda?</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nossa equipe de suporte Premium está disponível para resolver qualquer problema. Use o formulário ao lado e responderemos o mais rápido possível.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <LifeBuoy className="w-32 h-32 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Abrir Chamado</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Categoria
                </label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] transition-all appearance-none cursor-pointer"
                >
                  <option value="Dúvida" className="bg-[#0a0c14] text-white">Dúvida</option>
                  <option value="Bug" className="bg-[#0a0c14] text-white">Bug</option>
                  <option value="Sugestão" className="bg-[#0a0c14] text-white">Sugestão</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Assunto
                </label>
                <input 
                  type="text" 
                  value={subject} 
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Não consigo acessar minhas métricas"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] transition-all placeholder:text-gray-700"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Descrição detalhada
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descreva seu problema com o máximo de detalhes possível..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] transition-all placeholder:text-gray-700 resize-y min-h-[150px]"
                />
              </div>
              
              <div className="pt-4 border-t border-white/5">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-[#3a86ff] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] rounded-xl text-white font-extrabold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Enviar
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
