# Tarefas: Implementar Lógica de Redefinição de Senha nas Configurações

## 1. Preparar Variáveis de Estado (State Variables)
- [x] Abrir o arquivo `app/dashboard/configuracoes/page.jsx`.
- [x] Adicionar as seguintes variáveis de estado: `newPassword`, `confirmPassword`, `passwordLoading`, `passwordError` e `passwordSuccess`.

## 2. Implementar Lógica de Atualização
- [x] Criar a função `handlePasswordUpdate(e)`.
- [x] Adicionar validação de tamanho (mínimo de 6 caracteres) e validação de igualdade (`newPassword === confirmPassword`).
- [x] Implementar a chamada `supabase.auth.updateUser({ password: newPassword })` dentro de um bloco `try/catch`.
- [x] Tratar atualizações de estado para limpar os inputs, definir erros e exibir mensagens de sucesso.

## 3. Atualizar o Formulário na Interface (UI)
- [x] Localizar a seção "Segurança & Acesso" dentro do componente `ConfiguracoesPage`.
- [x] Substituir a lógica do botão antigo por um `<form onSubmit={handlePasswordUpdate}>`.
- [x] Adicionar dois campos de entrada de senha estilizados para a nova senha e a confirmação.
- [x] Adicionar renderização condicional para alertas de `passwordError` e `passwordSuccess`.
- [x] Garantir que o botão "Salvar Nova Senha" exiba um spinner de carregamento e fique desativado (disabled) enquanto `passwordLoading` for verdadeiro.
