# Proposta: Sincronizar Página de Perfil com a Tabela `user_profiles`

## Problema
A página de Perfil lê atualmente de `session.user.user_metadata` e utiliza placeholders (`name`, `role`, `education`, `university`). Isso está desconectado dos dados de Perfil Progressivo (Progressive Profiling) que coletamos durante o onboarding e salvamos na tabela `user_profiles` (`name`, `institution`, `course`, `study_shift`, `occupation`).

## Solução Proposta
Refatorar a página de Perfil (`app/dashboard/perfil/page.jsx`) para buscar seus dados iniciais na tabela `user_profiles` do Supabase. Se os dados forem atualizados por meio do modal "Editar Perfil", a nova informação deve ser salva de volta na tabela `user_profiles` usando uma operação de `upsert`. A UI será atualizada para exibir os campos específicos: Nome, Instituição, Curso, Turno e Ocupação.

## Benefícios
- Fonte de verdade centralizada para os dados do usuário no banco de dados.
- Consistência entre o modal de onboarding e a página de perfil.
- As funcionalidades de IA podem depender inteiramente da tabela `user_profiles` sem fragmentação de dados.
