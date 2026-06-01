# Proposta: Implementar Página Exclusiva e Segura para Redefinição de Senha

## Contexto
Atualmente, o link de redefinição de senha redireciona os usuários para as configurações do dashboard (`/dashboard/configuracoes`). Isso parece inseguro porque o usuário não é forçado a entrar em um fluxo dedicado e restrito, criado especificamente para a atualização de sua senha.

## Motivação
- Aumentar a segurança direcionando os usuários para uma página dedicada de redefinição de senha ao clicar no link de recuperação enviado por e-mail.
- Melhorar a experiência do usuário (UX) isolando a ação de redefinição de senha das configurações gerais do perfil.
- Garantir que o usuário altere sua senha com sucesso antes de continuar a utilizar a aplicação.

## Escopo
- Atualizar a URL de redirecionamento na chamada existente `resetPasswordForEmail` em `app/auth/page.jsx`.
- Criar uma nova página dedicada em `app/auth/reset-password/page.jsx`.
- Implementar validação de sessão para garantir que apenas usuários autenticados com uma sessão válida de recuperação possam acessar a página.
- Implementar a lógica de `supabase.auth.updateUser` para salvar a nova senha.

## Critérios de Sucesso
- O e-mail enviado pelo fluxo "Esqueceu a senha?" direciona os usuários para `/auth/reset-password`.
- A nova página é visualmente consistente com o tema de glassmorphism escuro do EduTrack AI.
- Os usuários conseguem definir e confirmar com sucesso uma nova senha (mínimo de 6 caracteres).
- Usuários não autenticados que tentarem acessar a página de redefinição de senha serão redirecionados para `/auth`.
