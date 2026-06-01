# Proposta: Implementar Lógica de Redefinição de Senha nas Configurações

## Problema
Atualmente, a seção "Redefinir Senha" na página de `Configurações` tenta enviar um e-mail para redefinição de senha por meio do método `resetPasswordForEmail`, mas não fornece um mecanismo dentro do próprio aplicativo para que os usuários atualizem sua senha diretamente do seu perfil de maneira integrada. Isso cria um obstáculo desnecessário para usuários autenticados que desejam apenas alterar sua senha em tempo real.

## Solução Proposta
Refatorar a seção "Segurança & Acesso" em `app/dashboard/configuracoes/page.jsx` para incluir um formulário inline para atualizações de senha. O formulário coletará com segurança a nova senha e sua confirmação, validará o tamanho mínimo e a igualdade entre ambas, e utilizará o método `supabase.auth.updateUser` para aplicar a alteração imediatamente. Os estados de sucesso e erro serão comunicados claramente ao usuário.

## Benefícios
- Otimiza a experiência do usuário mantendo as atualizações de senha dentro da aplicação.
- Elimina a dependência de fluxos de e-mail externos para usuários que já possuem sessões ativas.
- Mantém uma interface gráfica coesa utilizando a linguagem de design glassmorphism escura já estabelecida.
