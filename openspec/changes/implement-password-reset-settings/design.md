# Design: Lógica de Redefinição de Senha nas Configurações

## Componente: Página de Configurações
**Arquivo:** `app/dashboard/configuracoes/page.jsx`

### Gerenciamento de Estado (State Management)
- `newPassword` (string)
- `confirmPassword` (string)
- `passwordLoading` (boolean)
- `passwordError` (string | null)
- `passwordSuccess` (string | null)

### Lógica do Formulário (`handlePasswordUpdate`)
- Acionada no envio (submit) do formulário.
- **Validação:**
  - Verificar se `newPassword.length < 6`. Se verdadeiro, define o erro.
  - Verificar se `newPassword !== confirmPassword`. Se verdadeiro, define o erro.
- **Execução:**
  - `setPasswordLoading(true)`
  - Chamar `await supabase.auth.updateUser({ password: newPassword })`.
  - Em caso de sucesso: limpa as entradas (inputs), define `passwordSuccess` com uma mensagem de confirmação e limpa eventuais erros.
  - Em caso de exceção: define `passwordError` com a mensagem `err.message`.
  - Bloco `finally`: `setPasswordLoading(false)`.

### Atualizações de Interface (UI)
- Substituir o botão anterior de redefinição de e-mail `handleResetPassword` por um `<form>` estruturado dentro da `ConfigSection` para "Segurança & Acesso".
- Adicionar dois campos `<input type="password">`:
  - "Nova Senha"
  - "Confirmar Nova Senha"
- Aplicar as classes do Tailwind: `bg-[#0a0c14]/50 border border-white/10 focus:border-[#3a86ff]/50 rounded-xl px-4 py-3 text-white outline-none w-full`.
- Exibir mensagens dinâmicas de validação (vermelho para erros, verde esmeralda para sucesso).
- Adicionar um botão de envio contendo o ícone `Loader2` quando `passwordLoading` for verdadeiro.
