'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('edutrack_cookie_consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('edutrack_cookie_consent', 'true');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-[#0a0c14]/90 backdrop-blur-md border-t border-[#3a86ff]/30 p-4 animate-in slide-in-from-bottom-full duration-500">
            <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                    Utilizamos cookies para métricas de desempenho e para aprimorar sua experiência com nossa Inteligência Artificial. Ao continuar, você concorda com nossa Política de Privacidade.
                </p>
                <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
                    <Link 
                        href="/privacidade" 
                        className="text-sm font-medium text-gray-400 hover:text-white underline-offset-4 hover:underline transition-colors w-full sm:w-auto text-center"
                    >
                        Saber mais
                    </Link>
                    <button 
                        onClick={handleAccept}
                        className="px-6 py-2.5 bg-[#3a86ff] hover:bg-[#2563eb] text-white font-bold rounded-xl shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] transition-all w-full sm:w-auto"
                    >
                        Entendi
                    </button>
                </div>
            </div>
        </div>
    );
}
