# Tarefas: Implementar Fluxo de Recuperação de Senha na Página de Autenticação

- [x] **Atualizar a UI e a Lógica da Página de Autenticação**
  - [x] Abrir o arquivo `app/auth/page.jsx`.
  - [x] Localizar o campo de entrada (input) de senha no método de renderização.
  - [x] Adicionar o botão "Esqueceu a senha?" abaixo do input de senha, utilizando a estilização `text-sm text-[#3a86ff] hover:text-[#2563eb] transition-colors`.
  - [x] Implementar o manipulador de clique onClick `handleForgotPassword`.
  - [x] No manipulador, verificar se o estado de e-mail está preenchido. Se não estiver, disparar `alert("Digite seu e-mail acima primeiro!")`.
  - [x] No manipulador, chamar `await supabase.auth.resetPasswordForEmail(email, { redirectTo: \`\${window.location.origin}/dashboard/configuracoes\` })`.
  - [x] Adicionar tratamento de erro: se houver erro, exibir `alert(error.message)`.
  - [x] Adicionar tratamento de sucesso: se bem-sucedido, exibir `alert("Link de recuperação enviado para o seu e-mail!")`.
