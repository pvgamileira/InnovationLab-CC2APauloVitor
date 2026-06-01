# Tarefas: Editar Disciplina e Limites Mensais de Tarefas

## 1. Editar e Excluir Disciplinas (`app/dashboard/disciplinas/page.jsx`)
- [x] Abrir `app/dashboard/disciplinas/page.jsx`.
- [x] Importar os ícones `Pencil`, `Trash2` e `X` de `lucide-react`.
- [x] Adicionar os botões flutuantes de ação (Editar e Deletar) no canto superior direito de cada card de disciplina.
- [x] Implementar a função `handleDeleteSubject` para remover a disciplina e suas tarefas vinculadas no Supabase.
- [x] Criar os estados `isEditModalOpen` e `editingSubject` e as funções `handleOpenEditModal` e `handleSaveEditSubject`.
- [x] Implementar o modal flutuante de edição pré-preenchido integrado com a ação assíncrona de atualização.

## 2. Limite Mensal de Tarefas Kanban (`app/dashboard/page.jsx`)
- [x] Abrir `app/dashboard/page.jsx`.
- [x] Computar o número de tarefas criadas pelo usuário logado no mês/ano atual utilizando a propriedade `created_at`.
- [x] Desabilitar condicionalmente os botões "Nova Tarefa" e "+ Adicionar Demanda" caso o limite mensal de 20 tarefas seja atingido.
- [x] Inserir um contêiner estilizado de aviso de upsell no topo do modal de tarefas (`isTaskModalOpen`) caso o usuário atinja o limite do plano Padrão, fornecendo o link para `/dashboard/premium`.

## 3. Validação
- [x] Validar a edição completa de campos em disciplinas criadas anteriormente.
- [x] Confirmar que o limite mensal de 20 tarefas barra a inserção de novos registros e direciona corretamente ao upgrade.
