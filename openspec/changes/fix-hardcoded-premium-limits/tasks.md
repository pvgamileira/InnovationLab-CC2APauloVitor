## 1. Modificar Limites do Modal de Disciplina

- [x] 1.1 Localizar o botão de submissão ("Confirmar Criação") dentro do modal "Nova Disciplina" em `app/dashboard/page.jsx` e alterar o atributo disabled para `disabled={submitting || (!isPremium && subjects.length >= 3)}`.
- [x] 1.2 Atualizar o texto do botão para utilizar a lógica condicional: `{submitting ? (...) : (!isPremium && subjects.length >= 3) ? "Limite de 3 atingido - Faça Upgrade" : "Confirmar Criação"}`.
- [x] 1.3 Atualizar a exibição da mensagem de aviso abaixo do botão de submissão para renderizar somente se `!isPremium && subjects.length >= 3`.

## 2. Modificar Limites do Modal de Tarefas

- [x] 2.1 Localizar o botão "Nova Tarefa" (cabeçalho) e o botão "Adicionar Demanda" (rodapé) em `app/dashboard/page.jsx` e alterar o atributo disabled para `disabled={!isPremium && currentMonthTasksCount >= 20}`.
- [x] 2.2 Localizar a condicional de aviso de limite de tarefas no Modal de Tarefa e atualizá-la para iniciar com `{!isPremium && currentMonthTasksCount >= 20 ? (...) : subjects.length === 0 ? (...) : (...)}`.
