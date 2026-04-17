'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
    Lock, Trash2, HelpCircle, AlertTriangle, X, Loader2, ShieldCheck
} from 'lucide-react';

export default function ConfiguracoesPage() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    // Estados de loading de botões
    const [isResetting, setIsResetting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        async function getUser() {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setLoading(false);
        }
        getUser();
    }, []);

    // Envia e-mail real de redefinição via Supabase
    const handleResetPassword = async () => {
        if (!session?.user?.email) return;
        setIsResetting(true);
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(session.user.email, {
                redirectTo: `${window.location.origin}/auth/update-password`,
            });
            if (error) throw error;
            alert('E-mail de redefinição enviado! Verifique sua caixa de entrada.');
        } catch (error) {
            alert(`Erro: ${error.message}`);
        } finally {
            setIsResetting(false);
        }
    };

    const handleDeleteAccount = async () => {
        setIsDeleting(true);
        try {
            await supabase.auth.signOut();
            window.location.href = '/auth';
        } catch (error) {
            alert(`Erro: ${error.message}`);
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center p-8">
                <Loader2 className="w-10 h-10 animate-spin text-[#3a86ff]" />
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-20 animate-in fade-in duration-700">

            <header className="mb-10 border-b border-white/5 pb-6">
                <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-3">
                    Configurações da Conta
                </h1>
                <p className="text-gray-400 font-medium tracking-wide">Gerencie sua segurança e acesso ao EduTrack AI.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Config Column */}
                <div className="lg:col-span-2 space-y-6">

                    <ConfigSection title="Segurança & Acesso" icon={ShieldCheck}>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h4 className="text-lg font-bold text-white flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-[#3a86ff]" />
                                    Alterar Senha
                                </h4>
                                <p className="text-sm text-gray-400 mt-1">Enviaremos um link seguro para o seu e-mail cadastrado.</p>
                                <p className="text-xs font-mono text-gray-500 mt-3 bg-black/40 inline-block px-3 py-1 rounded-lg border border-white/5">
                                    {session?.user?.email}
                                </p>
                            </div>
                            <button
                                onClick={handleResetPassword}
                                disabled={isResetting}
                                className="px-6 py-3 bg-[#3a86ff]/10 border border-[#3a86ff]/30 rounded-xl text-sm font-bold text-[#3a86ff] hover:bg-[#3a86ff]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 whitespace-nowrap"
                            >
                                {isResetting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Redefinir Senha
                            </button>
                        </div>
                    </ConfigSection>

                    {/* Danger Zone */}
                    <div className="p-8 bg-red-900/10 border border-red-500/20 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                            <div className="flex items-start gap-4">
                                <Trash2 className="w-8 h-8 text-red-500 shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-xl font-bold text-red-500 mb-2">Zona de Perigo</h3>
                                    <p className="text-sm text-red-300/60 max-w-md">Ao excluir sua conta, todos os seus dados, tarefas e histórico serão removidos permanentemente. Esta ação não tem volta.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowDeleteModal(true)}
                                className="px-6 py-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all whitespace-nowrap"
                            >
                                Excluir Minha Conta
                            </button>
                        </div>
                    </div>

                </div>

                {/* Sidebar Help Column */}
                <div className="space-y-6">
                    <div className="bg-[#3a86ff]/10 border border-[#3a86ff]/20 rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute -right-6 -top-6 w-32 h-32 bg-[#3a86ff]/20 rounded-full blur-3xl group-hover:bg-[#3a86ff]/30 transition-all"></div>
                        <HelpCircle className="w-10 h-10 text-[#3a86ff] mb-6 relative z-10" />
                        <h3 className="text-xl font-bold text-white mb-3 relative z-10">Central de Ajuda</h3>
                        <p className="text-sm text-gray-400 mb-8 relative z-10 leading-relaxed">
                            Encontrou um bug ou precisa de suporte técnico com a sua conta? Nossa equipe está pronta para ajudar.
                        </p>
                        <button
                            onClick={() => alert("O suporte será aberto em uma nova aba na versão final.")}
                            className="w-full py-4 bg-[#3a86ff] text-white rounded-xl font-bold text-sm shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:bg-[#2563eb] transition-all relative z-10"
                        >
                            Abrir Chamado de Suporte
                        </button>
                    </div>
                </div>

            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in" onClick={() => setShowDeleteModal(false)}></div>
                    <div className="w-full max-w-md bg-[#0a0c14] border border-red-500/30 rounded-3xl p-8 relative z-10 shadow-[0_0_80px_rgba(239,68,68,0.15)] animate-in zoom-in-95">
                        <div className="flex justify-between items-center mb-6">
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20">
                                <AlertTriangle className="w-6 h-6 text-red-500" />
                            </div>
                            <button onClick={() => setShowDeleteModal(false)} className="text-gray-600 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <h3 className="text-2xl font-extrabold text-white mb-2">Você tem certeza absoluta?</h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Esta ação <span className="text-red-400 font-bold">não pode ser desfeita</span>. Todos os seus dados acadêmicos e tarefas concluídas serão perdidos para sempre.
                        </p>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-transparent rounded-xl text-gray-300 font-bold transition-all"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleDeleteAccount}
                                disabled={isDeleting}
                                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] rounded-xl text-white font-extrabold transition-all disabled:opacity-50 flex justify-center items-center"
                            >
                                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sim, Excluir"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

// Subcomponente da UI
function ConfigSection({ title, icon: Icon, children }) {
    return (
        <div className="bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-xl">
            <div className="flex items-center gap-3 mb-8">
                <Icon className="w-6 h-6 text-[#3a86ff]" />
                <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}