# Proposta: Implementar Sistema de Notificações Global (Toasts)

## Problema
Atualmente, as notificações de XP e de sucesso só aparecem na página principal `/dashboard`. Isso ocorre porque o escopo do listener e do container de toast está limitado, dependendo de eventos customizados disparados na página atual ou limitados à raiz do layout de forma frágil. Ao navegar para outras sub-rotas como `/dashboard/disciplinas` ou `/dashboard/foco`, o estado e exibição das notificações podem não persistir corretamente ou falhar se não houver um barramento de estado React adequado. Além disso, eventos como a conclusão do Pomodoro não exibem alertas nativos elegantes e o sistema de eventos globais do window não é a abordagem mais robusta para gerenciar toasts no React.

## Solução Proposta
Propomos elevar o estado das notificações para um nível verdadeiramente global dentro da área do painel usando a Context API do React.
1. **Toast Context & Provider**: Criar um arquivo `context/ToastContext.jsx` contendo `ToastProvider` e um hook customizado `useToast`. O provider irá armazenar a lista de toasts ativos na árvore de estado do React.
2. **Layout Wrap**: Envolver o layout em `app/dashboard/layout.jsx` com o novo `<ToastProvider>`, centralizando a exibição e removendo o componente antigo `ToastContainer`.
3. **Refatoração dos Triggers**: Substituir chamadas do `CustomEvent` e do antigo helper `showToast` pelo hook `useToast()` nos componentes e páginas do Dashboard (`KanbanBoard`, `DashboardPage`, `DisciplinasPage`, `FocusRoomPage`).
4. **Alerta de Pomodoro**: Acionar um toast de sucesso elegante quando o contador de foco atingir `0` em `app/dashboard/foco/page.jsx`.

## Benefícios
- **Consistência de UI/UX**: Notificações e ganhos de XP serão visíveis independentemente de qual página do dashboard o usuário esteja.
- **Robustez técnica**: Migração de ouvintes de eventos globais do `window` para a Context API do React, prevenindo vazamentos de memória e comportamentos imperfeitos de renderização.
- **Aderência aos Padrões**: Uso de Tailwind CSS (`animate-slide-in-right`, `animate-fade-in`) para manter as transições fluidas e premium.
