'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Sparkles, X, ChevronUp, Loader2 } from 'lucide-react';

export default function GlobalMentor() {
    const [isOpen, setIsOpen] = useState(false);
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchInsights = async () => {
        if (insights.length > 0) return; // Se já buscou, não gasta cota da API de novo

        setLoading(true);
        setError(null);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error('Sessão inválida');

            const res = await fetch('/api/gemini-insights', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${session.access_token}` }
            });

            if (!res.ok) throw new Error('Falha no motor da IA');

            const data = await res.json();
            setInsights(data.insights || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        fetchInsights();
    };

    return (
        <div className="fixed bottom-24 md:bottom-8 right-6 z-50">
            {/* Botão Flutuante */}
            {!isOpen && (
                <button
                    onClick={handleOpen}
                    className="w-14 h-14 bg-gradient-to-r from-[#3a86ff] to-[#2563eb] rounded-full shadow-[0_0_30px_rgba(58,134,255,0.4)] flex items-center justify-center text-white hover:scale-110 transition-transform group"
                >
                    <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
                </button>
            )}

            {/* Janela de Insights (Glassmorphism) */}
            {isOpen && (
                <div className="w-[320px] bg-[#0a0c14]/90 backdrop-blur-2xl border border-[#3a86ff]/30 rounded-2xl p-5 shadow-[0_10px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-5">
                    <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                        <h3 className="font-bold text-white flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#3a86ff]" />
                            Mentor IA
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="min-h-[150px] flex flex-col justify-center">
                        {loading && (
                            <div className="flex flex-col items-center justify-center text-[#3a86ff]">
                                <Loader2 className="w-8 h-8 animate-spin mb-2" />
                                <span className="text-xs font-semibold uppercase tracking-widest">Analisando dados...</span>
                            </div>
                        )}

                        {error && (
                            <p className="text-red-400 text-sm text-center font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>
                        )}

                        {!loading && !error && insights.length > 0 && (
                            <ul className="space-y-4">
                                {insights.map((insight, idx) => (
                                    <li key={idx} className="text-sm text-gray-300 leading-relaxed flex gap-3 items-start bg-white/5 p-3 rounded-xl border border-white/5">
                                        <ChevronUp className="w-4 h-4 text-[#3a86ff] flex-shrink-0 mt-0.5" />
                                        <span>{insight}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}