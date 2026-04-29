import Link from 'next/link';
import { FileText, ArrowLeft } from 'lucide-react';

export default function TermosPage() {
  return (
    <div className="min-h-screen bg-[#02040a] text-gray-300 py-20 px-6">
      <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
        <Link href="/" className="inline-flex items-center gap-2 text-[#3a86ff] hover:text-white transition-colors mb-8 text-sm font-bold">
          <ArrowLeft className="w-4 h-4" />
          Voltar para o Início
        </Link>
        
        <div className="flex items-center gap-4 mb-10">
          <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/30 rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Termos de Uso</h1>
        </div>

        <div className="space-y-8 text-base md:text-lg leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Uso Aceitável</h2>
            <p>
              O EduTrack AI é uma plataforma desenvolvida exclusivamente para auxiliar estudantes na gestão e otimização de suas rotinas acadêmicas. O uso da plataforma deve ser estritamente educacional, pessoal e não-comercial.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Responsabilidade do Usuário</h2>
            <p>
              Você é inteiramente responsável por todo o conteúdo que insere na plataforma, incluindo tarefas, anotações de aulas e dados pessoais. A plataforma serve como uma ferramenta de apoio, mas a execução acadêmica e os prazos são de sua total responsabilidade.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Aviso sobre Inteligência Artificial (Disclaimer)</h2>
            <p>
              Os insights de mentoria, quebras de tarefas e resumos são gerados através de Inteligência Artificial (Google Gemini). Embora a IA seja projetada para ser precisa e útil, ela pode ocasionalmente gerar informações incompletas ou equivocadas (alucinações). <strong>Os usuários devem sempre exercer seu próprio julgamento acadêmico. O EduTrack AI não se responsabiliza por notas baixas, reprovações ou quaisquer falhas acadêmicas.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Restrições Não-Comerciais</h2>
            <p>
              É estritamente proibido revender, distribuir ou monetizar o acesso às ferramentas ou conteúdos gerados pelo EduTrack AI. A infraestrutura e as cotas da API de IA são mantidas para uso estudantil individual.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
