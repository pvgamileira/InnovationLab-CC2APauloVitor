'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Sparkles, User, BookOpen, GraduationCap, Clock, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function OnboardingModal({ onClose, session }) {
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    course: '',
    study_shift: '',
    occupation: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error: upsertError } = await supabase.from('user_profiles').upsert([
        {
          user_id: session.user.id,
          name: formData.name,
          institution: formData.institution,
          course: formData.course,
          study_shift: formData.study_shift,
          occupation: formData.occupation,
          updated_at: new Date().toISOString()
        }
      ]);

      if (upsertError) throw upsertError;

      onClose();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-[#0a0c14] border border-[#3a86ff]/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_80px_rgba(58,134,255,0.15)] animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-[#3a86ff]/10 rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[#3a86ff]" />
          </div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
            Bem-vindo ao EduTrack AI!
          </h2>
          <p className="text-gray-400 text-sm">
            Para que nossa Inteligência Artificial seja sua mentora perfeita, conte-nos um pouco sobre sua rotina.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required 
                type="text" 
                placeholder="Seu Nome" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required 
                type="text" 
                placeholder="Instituição de Ensino" 
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="relative">
              <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input 
                required 
                type="text" 
                placeholder="Curso" 
                value={formData.course}
                onChange={(e) => setFormData({...formData, course: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select 
                  required
                  value={formData.study_shift}
                  onChange={(e) => setFormData({...formData, study_shift: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-gray-500">Turno</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                  <option value="Integral">Integral</option>
                </select>
              </div>

              <div className="relative">
                <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <select 
                  required
                  value={formData.occupation}
                  onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white focus:border-[#3a86ff] focus:ring-1 focus:ring-[#3a86ff] outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-gray-500">Ocupação</option>
                  <option value="Só Estudo">Só Estudo</option>
                  <option value="Trabalho e Estudo">Trabalho e Estudo</option>
                  <option value="Estágio">Estágio</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 p-3 bg-black/30 border border-white/5 rounded-xl cursor-pointer hover:bg-black/40 transition-colors">
              <input 
                type="checkbox" 
                required 
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 w-4 h-4 rounded bg-black/50 border-white/20 text-[#3a86ff] focus:ring-[#3a86ff]"
              />
              <span className="text-xs text-gray-400 leading-relaxed">
                Li e concordo com os <Link href="/termos" className="text-[#3a86ff] hover:underline" target="_blank">Termos de Uso</Link> e <Link href="/privacidade" className="text-[#3a86ff] hover:underline" target="_blank">Política de Privacidade</Link>, e autorizo o processamento dos meus dados pela IA para mentoria acadêmica.
              </span>
            </label>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading || !consent}
              className="w-full py-4 bg-[#3a86ff] hover:bg-[#2563eb] text-white font-extrabold rounded-xl shadow-[0_0_20px_rgba(58,134,255,0.3)] hover:shadow-[0_0_30px_rgba(58,134,255,0.5)] transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
              Começar Jornada
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
