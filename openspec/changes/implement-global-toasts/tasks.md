# Tarefas: Implementar Sistema de Notificações Global (Toasts)

## 1. Criar o Contexto Global de Notificação
- [x] Criar a pasta `context/` se ela não existir.
- [x] Criar o arquivo `context/ToastContext.jsx`.
- [x] Implementar o `ToastProvider` gerindo o estado dos toasts e o temporizador de expiração.
- [x] Incorporar as marcações visuais e classes CSS de animação (`animate-slide-in-right`, `animate-fade-in`) e ícones do `lucide-react`.
- [x] Adicionar compatibilidade com eventos do tipo `show-toast` do window para transição segura de qualquer código legado.
- [x] Exportar a função auxiliar/hook `useToast`.

## 2. Injetar o Provedor no Layout do Dashboard
- [x] Abrir `app/dashboard/layout.jsx`.
- [x] Importar `ToastProvider` de `@/context/ToastContext`.
- [x] Envolver a árvore de renderização do DashboardLayout com o `<ToastProvider>`.
- [x] Remover a importação antiga de `ToastContainer` e a tag correspondente `<ToastContainer />`.

## 3. Refatorar os Gatilhos de Notificação no Dashboard e Kanban
- [x] Abrir `components/KanbanBoard.jsx`, importar `useToast` e substituir o `dispatchEvent('show-toast')` por `showToast()`.
- [x] Abrir `app/dashboard/page.jsx`, importar `useToast` e refatorar as criações de disciplinas, tarefas, exportação de PDF e ativação premium para usar `showToast()`.

## 4. Refatorar os Gatilhos de Notificação na Página de Disciplinas
- [x] Abrir `app/dashboard/disciplinas/page.jsx`, importar `useToast` e refatorar as criações, edições, exclusões e salvamento de drag-and-drop para usar `showToast()`.

## 5. Adicionar Alerta de Pomodoro na Sala de Foco
- [x] Abrir `app/dashboard/foco/page.jsx`, importar `useToast` e acionar o toast quando o cronômetro chegar a 0 (`timeLeft === 0`).

## 6. Limpar Arquivos Legados
- [x] Excluir o arquivo antigo de componente `components/Toast.jsx` e remover referências obsoletas.
