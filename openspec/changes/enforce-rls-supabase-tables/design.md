# Design: Forçar Segurança a Nível de Linha (RLS) em Todas as Tabelas do Supabase

## Componente: Migração de Banco de Dados PostgreSQL
**Arquivo:** `supabase/migrations/0003_enforce_rls_security.sql`

Escrever as seguintes instruções PostgreSQL puras e nativas do Supabase:

### 1. Habilitação de RLS
Ativar Row Level Security nas tabelas alvo:
```sql
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_tasks ENABLE ROW LEVEL SECURITY;
```

### 2. Políticas de Acesso para `user_profiles`
- **Leitura (SELECT):** Permitir leitura apenas para o respectivo usuário autenticado.
- **Inserção (INSERT):** Permitir inserção apenas se o `user_id` for equivalente a `auth.uid()`.
- **Atualização (UPDATE):** Permitir edição apenas de registros próprios.
```sql
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
```

### 3. Políticas de Acesso para `academic_tasks`
A tabela `academic_tasks` já possui as políticas individuais declaradas em `0002_create_academic_tasks_table.sql`. No entanto, para garantir compatibilidade e conformidade total com a diretiva de segurança, o script de migração aplicará a ativação redundante e segura para assegurar a consistência dos dados do Kanban:
```sql
ALTER TABLE academic_tasks ENABLE ROW LEVEL SECURITY;
```

---

## Restrições e Boas Práticas
- **Puramente SQL:** Fornecer apenas comandos PostgreSQL nativos e limpos.
- **Filtro user_id:** Toda política de isolamento deve utilizar estritamente a variável de sessão autenticada `auth.uid() = user_id`.
