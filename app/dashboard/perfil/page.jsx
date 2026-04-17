'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
    User, Briefcase, GraduationCap, Shield,
    Trophy, Target, Zap, BookOpen, Edit3, X, Loader2, Download
} from 'lucide-react';

export default function PerfilPage() {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [isExporting, setIsExporting] = useState(false);

    const [profileMeta, setProfileMeta] = useState({
        name: 'Estudante',
        role: 'Defina seu cargo',
        education: 'Defina seu curso',
        university: 'Defina sua instituição'
    });

    const [stats, setStats] = useState({
        level: 1,
        xp: 0,
        nextLevelXp: 500,
        tasksCompleted: 0,
        focusHours: 0,
        streak: 1
    });

    const [mastery, setMastery] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editForm, setEditForm] = useState(profileMeta);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        try {
            setLoading(true);
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError || !session) {
                window.location.href = '/auth';
                return;
            }
            setSession(session);

            if (session.user.user_metadata) {
                const meta = session.user.user_metadata;
                const currentMeta = {
                    name: meta.name || 'Estudante',
                    role: meta.role || 'Defina seu cargo',
                    education: meta.education || 'Defina seu curso',
                    university: meta.university || 'Defina sua instituição'
                };
                setProfileMeta(currentMeta);
                setEditForm(currentMeta);
            }

            const [subjectsRes, tasksRes] = await Promise.all([
                supabase.from('subjects').select('*').eq('user_id', session.user.id),
                supabase.from('academic_tasks').select('*').eq('user_id', session.user.id)
            ]);

            const subjects = subjectsRes.data || [];
            const tasks = tasksRes.data || [];

            const completed = tasks.filter(t => t.status === 'completed').length;
            const calculatedXp = completed * 50;
            const calculatedLevel = Math.floor(calculatedXp / 500) + 1;
            const nextXp = calculatedLevel * 500;

            setStats(prev => ({
                ...prev,
                tasksCompleted: completed,
                xp: calculatedXp,
                level: calculatedLevel,
                nextLevelXp: nextXp
            }));

            const masteryData = subjects.map(sub => {
                const subTasks = tasks.filter(t => t.subject_id === sub.id);
                const subCompleted = subTasks.filter(t => t.status === 'completed').length;
                const percentage = subTasks.length === 0 ? 0 : Math.round((subCompleted / subTasks.length) * 100);

                return {
                    id: sub.id,
                    name: sub.name,
                    percentage: percentage,
                    color: percentage === 100 ? 'bg-emerald-400 text-emerald-400' :
                        percentage > 50 ? 'bg-[#3a86ff] text-[#3a86ff]' : 'bg-amber-400 text-amber-400'
                };
            }).sort((a, b) => b.percentage - a.percentage);

            setMastery(masteryData);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleExportProfile = async () => {
        try {
            setIsExporting(true);
            // Aqui usamos a mesma API de relatório, mas você pode criar uma específica para o Perfil
            const response = await fetch('/api/generate-report', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${session.access_token}`
                }
            });

            if (!response.ok) throw new Error('Falha ao exportar');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Perfil_Academico_${profileMeta.name.replace(' ', '_')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert(`Erro: ${err.message}`);
        } finally {
            setIsExporting(false);
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    name: editForm.name,
                    role: editForm.role,
                    education: editForm.education,
                    university: editForm.university
                }
            });
            if (error) throw error;
            setProfileMeta(editForm);
            setIsEditModalOpen(false);
        } catch (error) {
            alert(`Erro: ${error.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    if (loading) return <div className="flex h-full items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-[#3a86ff]" /></div>;

    const xpPercentage = Math.min(100, Math.round((stats.xp / stats.nextLevelXp) * 100));

    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-10 pb-20 animate-in fade-in duration-700">
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
                <div>
                    <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-br from-white via-blue-50 to-[#3a86ff] bg-clip-text text-transparent mb-3">
                        Perfil do Usuário
                    </h1>
                    <p className="text-gray-400 font-medium tracking-wide">Identidade e conquistas integradas.</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleExportProfile}
                        disabled={isExporting}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#3a86ff]/10 hover:bg-[#3a86ff]/20 border border-[#3a86ff]/30 rounded-xl text-[#3a86ff] font-bold transition-all disabled:opacity-50"
                    >
                        {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                        Exportar Conquistas
                    </button>
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 font-bold transition-all"
                    >
                        <Edit3 className="w-4 h-4" />
                        Editar
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-8">
                    <div className="bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 text-center relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#3a86ff]/10 to-transparent"></div>
                        <div className="relative z-10">
                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-800 to-black border-4 border-[#3a86ff]/30 rounded-full flex items-center justify-center mb-6">
                                <span className="text-4xl font-black text-gray-400 uppercase">{profileMeta.name.charAt(0)}</span>
                            </div>
                            <h2 className="text-2xl font-black text-white tracking-tight mb-2">{profileMeta.name}</h2>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#3a86ff]/10 border border-[#3a86ff]/20 text-[#3a86ff] text-xs font-bold uppercase tracking-widest mb-6"><Shield className="w-3 h-3" />Membro</div>
                            <div className="space-y-4 text-left mt-4 border-t border-white/5 pt-6">
                                <div className="flex items-center gap-3 text-gray-400"><Briefcase className="w-5 h-5 text-gray-500" /><span className="text-sm font-medium">{profileMeta.role}</span></div>
                                <div className="flex items-center gap-3 text-gray-400"><GraduationCap className="w-5 h-5 text-gray-500" /><span className="text-sm font-medium leading-snug">{profileMeta.education}<br />{profileMeta.university}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#05070e]/80 backdrop-blur-xl border border-indigo-500/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                        <div className="flex justify-between items-end mb-4">
                            <div><p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Nível</p><h3 className="text-4xl font-black text-white">{stats.level}</h3></div>
                            <div className="text-right"><p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">XP</p><p className="text-sm font-medium text-gray-400">{stats.xp} / {stats.nextLevelXp}</p></div>
                        </div>
                        <div className="w-full h-3 bg-black/50 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-[#3a86ff] to-indigo-500 rounded-full" style={{ width: `${xpPercentage}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center"><Target className="w-8 h-8 text-emerald-400 mb-3" /><h4 className="text-4xl font-black text-white mb-1">{stats.tasksCompleted}</h4><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Entregas</p></div>
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col items-center justify-center text-center"><Trophy className="w-8 h-8 text-amber-400 mb-3" /><h4 className="text-4xl font-black text-white mb-1">{stats.level * 50}</h4><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Capacidade Est.</p></div>
                    </div>

                    <div className="bg-[#05070e]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] p-8 shadow-2xl">
                        <h3 className="text-xl font-bold text-white mb-8 pb-4 border-b border-white/5">Domínio por Disciplina</h3>
                        <div className="space-y-6">
                            {mastery.map(sub => (
                                <div key={sub.id}>
                                    <div className="flex justify-between text-sm mb-2 font-medium"><span className="text-gray-300">{sub.name}</span><span className={sub.color.split(' ')[1]}>{sub.percentage}%</span></div>
                                    <div className="w-full h-2.5 bg-black/50 rounded-full overflow-hidden border border-white/5">
                                        <div className={`h-full ${sub.color.split(' ')[0]} rounded-full transition-all duration-1000`} style={{ width: `${sub.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)}></div>
                    <div className="w-full max-w-lg bg-[#0a0c14] border border-[#3a86ff]/20 rounded-3xl p-8 relative z-10 animate-in zoom-in-95">
                        <h3 className="text-2xl font-extrabold text-white mb-6">Atualizar Perfil</h3>
                        <form onSubmit={handleSaveProfile} className="space-y-5">
                            <input required type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Nome" />
                            <input required type="text" value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Cargo" />
                            <input required type="text" value={editForm.education} onChange={(e) => setEditForm({ ...editForm, education: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Curso" />
                            <input required type="text" value={editForm.university} onChange={(e) => setEditForm({ ...editForm, university: e.target.value })} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none" placeholder="Instituição" />
                            <div className="pt-6 flex gap-4">
                                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 bg-white/5 rounded-xl text-gray-300">Cancelar</button>
                                <button type="submit" disabled={isSaving} className="flex-[2] py-3 bg-[#3a86ff] rounded-xl text-white font-bold">{isSaving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Salvar"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}