# Design: Sincronizar Página de Perfil

## Componente: Página de Perfil
**Arquivo:** `app/dashboard/perfil/page.jsx`

### Busca de Dados (Data Fetching)
Na função `fetchProfileData`, logo após validar a sessão, execute uma consulta `.select('*').eq('user_id', session.user.id).single()` na tabela `user_profiles`.
- Se os dados existirem, mapeie-os para `profileMeta` e `editForm`.
- Se não existirem, utilize valores padrão sensíveis.
- O estado de `profileMeta` deve ser estruturado como: `{ name: '', occupation: '', course: '', institution: '', study_shift: '' }`.

### Lógica de Salvamento (Save Logic)
No `handleSaveProfile`, em vez de chamar `supabase.auth.updateUser`, execute uma operação de `upsert` na tabela `user_profiles`:
```javascript
const { error } = await supabase.from('user_profiles').upsert([
    {
        user_id: session.user.id,
        name: editForm.name,
        occupation: editForm.occupation,
        course: editForm.course,
        institution: editForm.institution,
        study_shift: editForm.study_shift,
        updated_at: new Date().toISOString()
    }
]);
```

### Ajustes na Interface (UI)
- Atualizar a seção de exibição (linhas ~198-200) para mostrar os novos campos utilizando ícones como `Briefcase` (Ocupação), `GraduationCap` (Curso / Instituição) e `Clock` (Turno).
- Atualizar o `<form>` dentro do modal de edição para usar os campos corretos e adicionar menus dropdown `<select>` para `study_shift` e `occupation` correspondentes ao Modal de Onboarding.
- Manter as importações do `lucide-react` existentes e a estilização de glassmorphism (`bg-[#05070e]/80`, `backdrop-blur-xl`, `border-white/5`).
