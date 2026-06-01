# Proposta: Editar Disciplina e Limites Mensais de Tarefas

## Problema
Para fornecer uma experiência de CRUD completa e de alta usabilidade acadêmica, o usuário precisa conseguir atualizar (Editar) e apagar disciplinas diretamente na tela do painel. Além disso, precisamos incentivar de forma mais forte as conversões para o plano **EduTrack Pro** limitando de forma transparente a criação de tarefas Kanban para usuários do plano Gratuito (máximo de 20 tarefas por mês).

## Solução Proposta
1. **Completar o CRUD de Disciplinas:**
   - Adicionar botões de ação para Editar (`Pencil`) e Deletar (`Trash2`) no topo direito dos cards de disciplinas em `app/dashboard/disciplinas/page.jsx`. Os botões aparecem com suavidade no hover do card.
   - Criar um modal flutuante de edição pré-preenchido e o endpoint correspondente Supabase `UPDATE` para consolidar as alterações na base de dados em tempo real.
2. **Limite Mensal de Tarefas (Kanban):**
   - No dashboard principal (`app/dashboard/page.jsx`), filtrar as tarefas criadas pelo estudante no mês corrente.
   - Caso o total de tarefas criadas no mês seja igual ou superior a 20, desabilitar os botões de criação ("Nova Tarefa" e "+ Adicionar Demanda").
   - Expor uma mensagem explicativa de upsell integrada diretamente no modal flutuante de criação de tarefas caso o limite mensal seja atingido, com link direto de upgrade para a página `/dashboard/premium`.

## Benefícios
- **Ciclo CRUD Completo:** Facilidade para renomear, corrigir cargas horárias ou professores de disciplinas.
- **Monetização Inteligente:** Usuários que gerenciam grandes volumes de demandas acadêmicas serão incentivados a migrar para o plano ilimitado Pro sem barreiras intrusivas fora do contexto de uso.
