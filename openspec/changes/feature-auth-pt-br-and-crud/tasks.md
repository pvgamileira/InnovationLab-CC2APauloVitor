## 1. Camada de Autenticação

- [x] 1.1 Criar a estrutura da rota `app/auth/page.jsx` imitando os parâmetros estéticos escuros da Premium UI.
- [x] 1.2 Implementar as interações de E-mail/Senha do Supabase (`signUp`, `signInWithPassword`) mapeando nativamente os estados do formulário (carregamento, erros).
- [x] 1.3 Atualizar a lógica principal de `app/dashboard/page.jsx` para impor a validação de sessão, bloqueando ativamente endpoints não autenticados e armazenando o `user.id`.

## 2. Polimento de UI & Tradução (PT-BR)

- [x] 2.1 Refatorar o DOM expurgando sistematicamente todos os emojis nativos presentes no sistema operacional, utilizando opcionalmente traços inline SVG ou bibliotecas que imitem o Lucide React.
- [x] 2.2 Traduzir todas as strings estáticas da UI, cabeçalhos analíticos e placeholders estruturais do `/dashboard` para o Português Brasileiro localizado (pt-BR).

## 3. Engenharia de Modais de CRUD

- [x] 3.1 Construir uma sobreposição de Modal React com Glassmorphism gerenciando explicitamente os estados para "Nova Disciplina" (capturando `name`, `professor`, `workload`).
- [x] 3.2 Construir uma segunda sobreposição de Modal com Glassmorphism para "Nova Tarefa", permitindo a seleção dinâmica de `subject_id` em um menu dropdown.
- [x] 3.3 Garantir que ambos os limites de modal enviem com sucesso os payloads de `INSERT` para o endpoint do Supabase, incorporando `auth.uid()` e reidratando suavemente a visualização ativa.
