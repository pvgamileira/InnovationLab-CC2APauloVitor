# Design: Implementar Página Exclusiva e Segura para Redefinição de Senha

## Abordagem Técnica

### 1. Atualizar o Redirecionamento da Autenticação
- **Alvo:** `app/auth/page.jsx`
- **Alteração:** Na função `handleForgotPassword`, modificar a opção `redirectTo` do `resetPasswordForEmail`. Mudar de `\${window.location.origin}/dashboard/configuracoes` para `\${window.location.origin}/auth/reset-password`.

### 2. Criar a Página de Redefinição de Senha
- **Alvo:** `app/auth/reset-password/page.jsx`
- **Alteração:** Criar um novo componente React para a página de redefinição.
- **Interface (UI):** 
  - Usar a estilização de glassmorphism escuro estabelecida (`bg-[#02040a]`, `backdrop-blur-3xl`, `bg-[#0a0c14]/60`, etc.).
  - Título: "Definir Nova Senha".
  - Dois campos de entrada de senha: "Nova Senha" e "Confirmar Senha". Usar ícones da biblioteca `lucide-react` (ex: `Lock`).
  - Botão de envio (submit): "Salvar Senha".
- **Lógica:**
  - `useEffect`: Verificar se existe uma sessão ativa (`supabase.auth.getSession()`). Se não for encontrada, redirecionar via `router.push('/auth')`.
  - `handleReset`: Prevenir o comportamento padrão do form, definir o estado de carregamento.
  - Validação: Verificar se as senhas coincidem e se `newPassword.length >= 6`. Exibir alertas ou mensagens na UI se forem inválidas.
  - Chamada de API: `await supabase.auth.updateUser({ password: newPassword })`.
  - Sucesso: Exibir mensagem/alerta de sucesso ("Senha atualizada com sucesso!") e redirecionar via `router.push('/dashboard')`.

### 3. Restrições (Constraints)
- Usar estritamente JavaScript.
- Garantir que o layout combine com a estética da `AuthPage` principal.
- Design responsivo.
