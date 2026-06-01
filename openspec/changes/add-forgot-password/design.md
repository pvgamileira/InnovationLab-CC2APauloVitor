# Design: Implementar Fluxo de Recuperação de Senha na Página de Autenticação

## Abordagem Técnica

### 1. Integração da Interface (UI)
- Adicionar um novo botão "Esqueceu a senha?" diretamente abaixo do campo de entrada de senha.
- **Estilização:** O botão deve utilizar as classes do Tailwind: `text-sm text-[#3a86ff] hover:text-[#2563eb] transition-colors`. Deve ser alinhado à direita ou posicionado de forma lógica próximo ao campo de senha, mantendo o layout de glassmorphism escuro existente.

### 2. Integração da Lógica
- Adicionar uma função assíncrona `handleForgotPassword` dentro do componente `Auth`.
- A função verificará se o estado do `email` está vazio. Se estiver, disparará um `alert("Digite seu e-mail acima primeiro!")`.
- Se um e-mail for fornecido, chamará `await supabase.auth.resetPasswordForEmail(email, { redirectTo: \`\${window.location.origin}/dashboard/configuracoes\` })`.
- Capturar quaisquer erros da chamada da API e exibir um `alert(error.message)`.
- Se a chamada for bem-sucedida (nenhum erro retornado), exibir um `alert("Link de recuperação enviado para o seu e-mail!")`.

### 3. Restrições (Constraints)
- Usar estritamente JavaScript (sem TypeScript).
- Manter exatamente o layout existente e a estilização de glassmorphism escuro.
- Não modificar a lógica de login/cadastro existente; apenas acrescentar a nova funcionalidade.
