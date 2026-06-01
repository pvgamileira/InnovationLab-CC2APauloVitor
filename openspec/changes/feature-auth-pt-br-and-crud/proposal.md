## Por que

Para transformar o protótipo estático em uma aplicação totalmente funcional e segura, devemos implementar Autenticação para que os usuários possam acessar com segurança seus dados isolados, conforme definido pelas nossas políticas de RLS. Simultaneamente, para localizar a plataforma para o público-alvo, todo o Dashboard deve ser traduzido para o Português Brasileiro (pt-BR). Por fim, os usuários precisam da capacidade de realmente preencher seu dashboard por meio de modais de CRUD funcionais.

## O que muda

- **Autenticação:** Implementação de uma página `/auth` (ou `/login`) utilizando Next.js com Pure JavaScript e `@supabase/supabase-js` para lidar com operações de cadastro (Sign-Up) e login (Sign-In) via E-mail/Senha.
- **Tradução e Polimento em PT-BR:** Tradução completa de todas as strings de texto da interface do usuário do `/dashboard` para o português (pt-BR). Aplicação rigorosa da iconografia: todos os emojis nativos do sistema operacional serão eliminados e substituídos por ícones SVG (ex: Lucide React). A interface manterá rigorosamente a estilização de "Rich Black" e Glassmorphism.
- **Ações de CRUD:** Arquitetura de formulários modais acionados pelos botões "Nova Disciplina" e "Nova Tarefa". Esses formulários executarão operações explícitas de `INSERT` nas tabelas `subjects` e `academic_tasks` do Supabase, anexando estritamente o `user.id` autenticado para satisfazer as restrições de RLS.

## Funcionalidades

### Novas Funcionalidades
- `authentication`: A capacidade de registrar, autenticar e gerenciar sessões de usuários com segurança.
- `crud-operations`: A capacidade de inserir, atualizar e gerenciar registros de disciplinas e tarefas de forma integrada por meio de interfaces modais.

### Funcionalidades Modificadas
- `premium-dashboard-ui`: Modificada para refletir a localização em PT-BR e iconografia estritamente baseada em SVG, removendo todos os emojis nativos enquanto preserva as metas estéticas do layout.

## Impacto

- **Banco de Dados:** O Supabase Auth será ativamente utilizado; inserções no banco de dados agora refletirão dinamicamente a identidade do usuário ativo.
- **Frontend:** Uma nova camada de roteamento `/auth` será estabelecida. O `/dashboard` receberá adições significativas no DOM, incluindo gerenciamento de estado de formulários e modais.
- **Segurança:** O RLS passará de um isolamento teórico para o uso ativo, uma vez que as requisições finalmente carregarão tokens reais de sessão do Supabase Authentication.
