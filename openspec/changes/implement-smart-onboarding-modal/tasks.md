# Tarefas: Implementar Modal de Onboarding Inteligente

## 1. Criar o Componente OnboardingModal
- [x] Criar o arquivo `components/OnboardingModal.jsx`.
- [x] Implementar a interface (UI) com ícones da biblioteca `lucide-react` e estilização de glassmorphism.
- [x] Configurar o estado para todos os 5 campos do formulário.
- [x] Implementar a lógica de `upsert` do Supabase dentro de `handleSubmit`.
- [x] Tratar o estado de carregamento (loading) e erros com elegância.

## 2. Integrar na Página do Dashboard
- [x] Abrir o arquivo `app/dashboard/page.jsx`.
- [x] Importar o novo componente `OnboardingModal`.
- [x] Adicionar a variável de estado `needsOnboarding`.
- [x] Consultar a tabela `user_profiles` dentro do fluxo de busca de dados e definir `needsOnboarding(true)` se nenhum perfil for encontrado.
- [x] Renderizar condicionalmente o componente `<OnboardingModal />` na parte inferior do componente.
