# Tarefas: Implementar Página Exclusiva e Segura para Redefinição de Senha

- [x] **Atualizar o Redirecionamento da Autenticação**
  - [x] Abrir o arquivo `app/auth/page.jsx`.
  - [x] Localizar a função `handleForgotPassword`.
  - [x] Alterar a URL `redirectTo` em `resetPasswordForEmail` para `` \`${window.location.origin}/auth/reset-password\` ``.

- [x] **Criar a Página de Redefinição de Senha**
  - [x] Criar um novo arquivo `app/auth/reset-password/page.jsx`.
  - [x] Estruturar o componente com estilização de glassmorphism escuro e ícones do `lucide-react`.
  - [x] Implementar `useEffect` para verificar se existe uma sessão ativa do Supabase, redirecionando para `/auth` caso não exista.
  - [x] Criar variáveis de estado: `newPassword`, `confirmPassword`, `loading`, `error`, `successMsg`.
  - [x] Adicionar o formulário na interface com os inputs "Nova Senha" e "Confirmar Senha", e o botão "Salvar Senha".
  - [x] Implementar a função `handleReset`.
  - [x] Adicionar validação para garantir que as senhas coincidam e tenham pelo menos 6 caracteres.
  - [x] Chamar o método `await supabase.auth.updateUser({ password: newPassword })`.
  - [x] Tratar erros e exibir uma mensagem de sucesso ("Senha atualizada com sucesso!"), seguida de redirecionamento para `/dashboard`.
