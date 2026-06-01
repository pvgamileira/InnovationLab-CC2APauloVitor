# Proposta: Implementar Fluxo de Recuperação de Senha na Página de Autenticação

## Contexto
A página de autenticação (`app/auth/page.jsx`) atualmente permite que os usuários façam login ou cadastro, mas carece de um recurso de "Esqueceu a senha?". Sem isso, os usuários que esquecerem suas senhas não conseguirão recuperar o acesso às suas contas.

## Motivação
- Melhorar a experiência do usuário fornecendo um fluxo de autoatendimento para recuperação de senha.
- Reduzir solicitações de suporte para senhas perdidas.
- Manter a segurança da aplicação e a retenção de usuários.

## Escopo
- Adicionar um link/botão "Esqueceu a senha?" na interface de autenticação.
- Implementar a lógica de redefinição de senha utilizando o método `resetPasswordForEmail` do Supabase.
- Adicionar validação básica (verificar se o campo de e-mail está preenchido) e feedback para o usuário (alertas de sucesso/erro).

## Critérios de Sucesso
- O botão "Esqueceu a senha?" está visível abaixo do input de senha.
- Clicar no botão sem digitar um e-mail dispara um alerta de aviso.
- Clicar no botão com um e-mail válido envia um e-mail de recuperação via Supabase e exibe um alerta de sucesso.
- A interface gráfica mantém a estética de glassmorphism escuro existente.
