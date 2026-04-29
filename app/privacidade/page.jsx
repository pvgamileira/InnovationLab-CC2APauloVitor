import Link from 'next/link';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-gray-300 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[#3a86ff] hover:text-white transition-colors mb-8 text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Início
        </Link>
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-[#3a86ff]/10 border border-[#3a86ff]/30 rounded-2xl flex items-center justify-center">
            <ShieldCheck className="w-8 h-8 text-[#3a86ff]" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Política de Privacidade</h1>
        </div>

        <div className="space-y-8 text-base md:text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Coleta de Dados</h2>
            <p>
              No EduTrack AI, coletamos dados limitados estritamente necessários para personalizar sua experiência acadêmica. Isso inclui informações básicas de perfil (como nome, curso, turno e ocupação) fornecidas durante o onboarding, além das tarefas acadêmicas e disciplinas que você gerencia na plataforma.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Armazenamento de Dados</h2>
            <p>
              Todos os seus dados são armazenados de forma segura utilizando o Supabase (PostgreSQL), garantindo que apenas você, através da sua sessão autenticada, tenha acesso às suas informações pessoais e registros acadêmicos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Processamento via Inteligência Artificial</h2>
            <p>
              Para fornecer insights ultra-personalizados, utilizamos a API do Google Gemini. Seus dados (tarefas, perfil, curso) são enviados temporariamente para o motor do Gemini exclusivamente para gerar dicas de estudos, análises de produtividade e alertas de burnout. <strong>Ressaltamos que seus dados não são utilizados para treinar modelos genéricos da IA.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Finalidade Estrita</h2>
            <p>
              Garantimos que todas as informações coletadas são usadas única e exclusivamente para a finalidade de mentoria acadêmica dentro da plataforma EduTrack AI. Não vendemos, compartilhamos ou distribuímos seus dados para terceiros com fins comerciais.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
