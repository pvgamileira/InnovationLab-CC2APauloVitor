# Design: Implementar Modal de Onboarding Inteligente

## Premissa do Banco de Dados
Assume-se que a tabela `user_profiles` existe no Supabase com as colunas: `user_id`, `name`, `institution`, `course`, `study_shift`, `occupation`. Não precisamos criar a estrutura da tabela aqui, apenas a lógica de frontend e integração.

## Componente: Onboarding Modal
**Arquivo:** `components/OnboardingModal.jsx`
- Usar uma sobreposição (overlay) fixa em tela cheia (`fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4`).
- Container principal do modal: `bg-[#0a0c14] border border-[#3a86ff]/30 rounded-3xl p-8 max-w-lg w-full shadow-[0_0_80px_rgba(58,134,255,0.15)]`.
- Estado do formulário: objeto `formData` contendo `name`, `institution`, `course`, `study_shift`, `occupation`.
- Campos de entrada com tema escuro padrão utilizando `bg-black/50`, `border-white/10`, `focus:border-[#3a86ff]`.
- Botão de envio (submit): `bg-[#3a86ff] hover:bg-[#2563eb] text-white font-extrabold rounded-xl py-4 transition-all`. Exibe um spinner de carregamento ao enviar.
- No envio: chamar a operação `upsert` do Supabase na tabela `user_profiles`. Em caso de sucesso, acionar o callback `onClose`.

## Componente: Página do Dashboard
**Arquivo:** `app/dashboard/page.jsx`
- Importar `OnboardingModal`.
- Adicionar o estado: `const [needsOnboarding, setNeedsOnboarding] = useState(false);`
- Em `initSessionAndFetchData` (ou `refetchData`), consultar `user_profiles` logo após verificar a sessão.
  ```javascript
  const { data: profile } = await supabase.from('user_profiles').select('*').eq('user_id', session.user.id).single();
  if (!profile) {
    setNeedsOnboarding(true);
  }
  ```
- Na parte inferior do JSX, logo antes da tag final `</div>`:
  ```javascript
  {needsOnboarding && (
    <OnboardingModal onClose={() => setNeedsOnboarding(false)} session={session} />
  )}
  ```
- **Restrição:** NÃO deve quebrar a lógica do Kanban ou quaisquer elementos do Recharts.
