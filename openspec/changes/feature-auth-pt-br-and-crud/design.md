## Contexto
Estamos implementando as operações reais do ciclo de vida da aplicação. Como os esquemas e designs são estritamente configurados para isolar dados via Row Level Security (RLS) com base na sessão ativa do usuário, precisamos criticamente do Gateway de Autenticação para emitir esses tokens. Simultaneamente, a interface do usuário (UI) deve ser localizada para PT-BR, eliminando inconsistências visuais (emojis) e fornecendo os canais de entrada (modais) para inserção real de dados.

## Objetivos / Não-Objetivos

**Objetivos:**
- Implementar um componente `/auth` puramente via Next.js e `@supabase/supabase-js`.
- Localizar todas as frases do dashboard para o Português Brasileiro (pt-BR) adequado.
- Construir interfaces de modais gerenciadas por estado no React para "Nova Disciplina" e "Nova Tarefa", executando mutações de `insert` do Supabase de forma nativa.
- Impor a pureza da iconografia: restringir o uso exclusivamente a formatos SVG (como Lucide React).

**Não-Objetivos:**
- Implementar OAuth de terceiros (Google/Github/Apple). Focaremos estritamente nos métodos fundamentais de E-mail/Senha.
- Matriz completa de interações de CRUD. Esta especificação específica foca fortemente na capacidade de `CREATE/INSERT`.

## Decisões
- **Estratégia de Autenticação:** Utilizaremos métodos client-side do `@supabase/supabase-js` (`signUp` e `signInWithPassword`) hospedados em uma página `/auth` que atua como portal. O estado é sincronizado via `supabase.auth.getSession()`.
- **Arquitetura de UI para Modais:** Os modais de entrada de dados existirão estruturalmente dentro de `app/dashboard/page.jsx` ou em um irmão estrutural paralelo, governados por hooks explícitos de Estado do React (`isSubjectModalOpen`). Os fundos utilizarão camadas densas de `bg-black/80 backdrop-blur-sm`.
- **Limpeza de Iconografia:** Emojis mapeiam-se de forma diferente entre ecossistemas de sistemas operacionais, quebrando fundamentalmente a visão "Premium". Todos os emojis serão removidos obrigatoriamente e substituídos por gráficos vetoriais determinísticos SVG.

## Riscos / Trade-offs
- [Transição de Autenticação Client-side] → Trade-off: O roteamento client-side entre a autenticação e o dashboard pode apresentar atrasos padrão de ciclo de vida do React. Mitigação: Uso de Suspense robusto ou estados de carregamento unificados (como `carregando disciplinas...`).
