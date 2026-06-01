# Tarefas: Sincronizar Página de Perfil

## 1. Atualizar Estado e Lógica de Busca (Fetch Logic)
- [x] Abrir o arquivo `app/dashboard/perfil/page.jsx`.
- [x] Atualizar os valores padrão de estado para `profileMeta` e `editForm` correspondendo às colunas da tabela `user_profiles` (`name`, `occupation`, `course`, `institution`, `study_shift`).
- [x] Modificar `fetchProfileData` para consultar a tabela `user_profiles` e atualizar o estado da aplicação.

## 2. Atualizar Lógica de Salvamento
- [x] Modificar `handleSaveProfile` para realizar um `upsert` na tabela `user_profiles` em vez de chamar `supabase.auth.updateUser`.

## 3. Atualizar Exibição na Interface (UI)
- [x] Importar o ícone `Clock` da biblioteca `lucide-react` se ainda não estiver importado.
- [x] Atualizar o cartão de exibição de perfil para mostrar `occupation`, `course`, `institution` e `study_shift` com os respectivos ícones.

## 4. Atualizar Modal de Edição
- [x] Alterar os campos de entrada (input fields) no modal de edição para corresponder ao novo estado (`name`, `course`, `institution`).
- [x] Adicionar menus dropdown `<select>` para `study_shift` e `occupation` com as opções corretas.
