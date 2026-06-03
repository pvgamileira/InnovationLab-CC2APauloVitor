# Design: Implementar Sistema de Notificações Global (Toasts)

## Contexto e Estrutura do Estado
Criaremos um contexto React (`ToastContext`) para centralizar a criação, renderização e destruição automática de alertas/toasts.

## Provedor Global: `ToastContext.jsx`
**Arquivo:** `context/ToastContext.jsx`
- O provedor (`ToastProvider`) manterá um array de objetos de notificação no estado `toasts`.
- Cada notificação terá a estrutura: `{ id: string, message: string, type: 'success' | 'error', duration: number }`.
- Uma função `showToast(message, type, duration)` será fornecida pelo contexto para adicionar itens ao array.
- Um `setTimeout` removerá cada toast após a expiração do tempo (duração padrão de 4000ms).
- Uma função `removeToast(id)` permitirá ao usuário fechar manualmente um toast.
- Renderizará a lista de toasts ativos em um contêiner flutuante absoluto (`fixed top-6 right-6 z-[9999]`), preservando as classes de animação `animate-slide-in-right` e `animate-fade-in`.
- Exportará o hook customizado `useToast()`.
- **Compatibilidade Retroativa:** Adicionaremos um listener para o evento `show-toast` do window dentro de um `useEffect` no `ToastProvider` para garantir que qualquer chamada legada ou externa para `window.dispatchEvent` ainda seja capturada e convertida em um toast gerenciado pelo contexto.

## Integração de Layout: `app/dashboard/layout.jsx`
- Importar `<ToastProvider>` de `@/context/ToastContext`.
- Remover a importação de `ToastContainer` de `@/components/Toast`.
- Envolver a renderização principal com `<ToastProvider>`.
- Remover a tag `<ToastContainer />` da raiz do JSX.

## Refatoração de Gatilhos de Toast
Os gatilhos serão atualizados para consumir `useToast()` do contexto React.

### 1. Painel Principal: `app/dashboard/page.jsx`
- Importar `useToast` e obter `const { showToast } = useToast()`.
- Substituir todas as chamadas de `window.dispatchEvent(new CustomEvent('show-toast', ...))` por `showToast(...)`.

### 2. Kanban Board: `components/KanbanBoard.jsx`
- Importar `useToast` e invocar o hook dentro do componente.
- Atualizar a lógica do `handleMoveTaskWithGamification` para disparar a notificação de XP via `showToast` do contexto.

### 3. Sub-rota de Disciplinas: `app/dashboard/disciplinas/page.jsx`
- Importar `useToast` e obter `showToast`.
- Substituir todos os disparos imperativos de eventos customizados por chamadas diretas a `showToast`.

### 4. Sala de Foco (Pomodoro): `app/dashboard/foco/page.jsx`
- Importar `useToast` e instanciar `showToast`.
- Quando `timeLeft === 0` dentro do `useEffect` de contagem regressiva, acionar:
  ```javascript
  showToast("🍅 Sessão de foco concluída! Ótimo trabalho.", "success");
  ```
