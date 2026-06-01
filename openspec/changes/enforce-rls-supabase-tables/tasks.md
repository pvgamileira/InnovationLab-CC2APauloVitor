# Tarefas: Forçar Segurança a Nível de Linha (RLS) em Todas as Tabelas do Supabase

## 1. Criar Migração SQL de Segurança
- [x] Criar o arquivo de migração `supabase/migrations/0003_enforce_rls_security.sql`.
- [x] Implementar a instrução de ativação do RLS (`ALTER TABLE ENABLE ROW LEVEL SECURITY`) para `user_profiles` e `academic_tasks`.
- [x] Escrever as políticas de controle de acesso (`CREATE POLICY`) para a tabela `user_profiles` utilizando o filtro `auth.uid() = user_id`.

## 2. Validação
- [x] Garantir que o script PostgreSQL compile sem erros de sintaxe ou de permissões.
- [x] Validar a integridade lógica comparando com as migrações anteriores de tabelas.
