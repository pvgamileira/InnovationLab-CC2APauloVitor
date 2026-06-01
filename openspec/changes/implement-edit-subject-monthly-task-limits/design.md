# Design: Editar Disciplina e Limites Mensais de Tarefas

## Componente: Edição e Exclusão de Disciplinas (`app/dashboard/disciplinas/page.jsx`)
- Adicionar botões de ação absolutos no canto superior direito de cada card de disciplina:
  - Botão Editar: Ícone `Pencil` de `lucide-react`.
  - Botão Deletar: Ícone `Trash2` de `lucide-react`.
  - Estilização com opacidade zero por padrão (`opacity-0`) e exibição no hover (`group-hover:opacity-100`) para manter o visual limpo do painel.
- Adicionar modal flutuante com campos para `name`, `professor` e `workload`, preenchidos a partir da disciplina selecionada.
- Implementar as funções assíncronas `handleOpenEditModal`, `handleSaveEditSubject` e `handleDeleteSubject` integradas com a API do Supabase.

---

## Componente: Limites de Tarefas no Dashboard (`app/dashboard/page.jsx`)
- Computar dinamicamente o número de tarefas criadas no mês atual:
  ```javascript
  const now = new Date();
  const currentMonthTasksCount = tasks.filter(t => {
    if (!t.created_at) return false;
    const taskDate = new Date(t.created_at);
    return taskDate.getMonth() === now.getMonth() && taskDate.getFullYear() === now.getFullYear();
  }).length;
  ```
- Desabilitar as ações de abertura do modal de tarefas caso `currentMonthTasksCount >= 20`.
- Inserir um card explicativo de upsell premium diretamente no topo do formulário do modal caso a barreira de 20 tarefas do mês seja atingida, oferecendo link amigável de upgrade para `/dashboard/premium`.
