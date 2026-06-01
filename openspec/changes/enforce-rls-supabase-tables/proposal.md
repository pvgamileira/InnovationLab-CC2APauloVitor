# Proposta: Forçar Segurança a Nível de Linha (RLS) em Todas as Tabelas do Supabase

## Problema
Para garantir a segurança dos dados da plataforma em nível de produção e evitar a raspagem de dados (data scraping) via DevTools ou chamadas diretas REST API utilizando a chave anônima exposta (`anon key`), é imperativo que o banco de dados PostgreSQL do Supabase restrinja o acesso a dados apenas para o respectivo usuário autenticado. Atualmente, embora a tabela `subjects` e `academic_tasks` tenham migrações com RLS ativo, a tabela `user_profiles` pode estar vulnerável ou desprotegida se não possuir uma migração de segurança explícita para RLS.

## Solução Proposta
Criar um arquivo de migração SQL dedicado (`supabase/migrations/0003_enforce_rls_security.sql`) para ativar explicitamente o Row Level Security (RLS) nas tabelas críticas do sistema e declarar as políticas de isolamento de dados com base na sessão autenticada do usuário (`auth.uid() = user_id`).

As tabelas afetadas serão:
- `user_profiles` (Isolamento de Nome, Curso, Instituição, Turno e Ocupação do Estudante).
- `academic_tasks` (Garantia de isolamento e regras de CRUD apenas para o criador da tarefa).

## Benefícios
- **Isolamento de Dados Absoluto:** Um estudante nunca poderá acessar ou modificar perfis ou tarefas de outros estudantes.
- **Segurança de Produção:** Proteção contra manipulações maliciosas via APIs REST públicas expondo a chave `anon` do Supabase.
- **Conformidade com a LGPD:** Alinhamento estrito com os princípios de segurança técnica exigidos pela legislação de proteção de dados.
