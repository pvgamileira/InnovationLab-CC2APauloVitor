## Architecture

- **`contexts/AiContext.jsx`**: We will introduce a dependency on `useUserContext` from `@/context/UserContext`. The `useEffect` will change from a `[]` dependency to `[tarefas]`. Inside the effect, date normalization will be used to correctly identify tasks due today or earlier.
- **`components/GlobalStatusBar.jsx`**: The component structure will be simplified by removing the right flex container. The text span will receive `truncate max-w-full block`.

## DOM Structure & React Layout

### 1. `AiContext.jsx` Modifications
```jsx
// Imports
import { useUserContext } from '@/context/UserContext';

export function AiProvider({ children }) {
  // ... existing states ...
  const { userData } = useUserContext();
  const tarefas = userData?.tarefas; // safely access tarefas

  useEffect(() => {
    let isMounted = true;
    
    if (!tarefas) {
       // Graceful degradation if user context is missing or still loading
       if (isMounted) {
         setAiStatus('offline');
         setGlobalInsight('IA Offline: Aguardando sincronização de dados...');
       }
       return;
    }

    try {
      // Date normalization logic to avoid timezone edge cases
      const now = new Date();
      now.setHours(0, 0, 0, 0);

      const activeTasks = tarefas.filter(t => t.status !== 'completed');
      
      const overdueTasksCount = activeTasks.filter(t => {
        if (!t.due_date) return false;
        const dueDate = new Date(t.due_date);
        dueDate.setHours(0, 0, 0, 0);
        return dueDate <= now; // Matches today or earlier
      }).length;

      if (isMounted) {
        if (overdueTasksCount > 0) {
          setAiStatus('warning');
          setGlobalInsight(`⚠️ Alerta Tático: Você tem ${overdueTasksCount} tarefa(s) pendente(s) ou atrasada(s). Foco total no Kanban.`);
        } else if (activeTasks.length > 0) {
          setAiStatus('online');
          setGlobalInsight('✨ Fluxo limpo. Selecione a próxima tarefa para manter a ofensiva.');
        } else {
          setAiStatus('online');
          setGlobalInsight('✨ Backlog zerado. Excelente dia de foco.');
        }
      }
    } catch (err) {
      if (isMounted) {
        setAiStatus('offline');
        setGlobalInsight('IA Offline: Falha na análise tática.');
      }
    }

    return () => { isMounted = false; };
  }, [tarefas]);
  // ... rest
```

### 2. `GlobalStatusBar.jsx` Modifications
```jsx
// Removed the static <div className="flex items-center gap-4 text-gray-500">
// Modified the left container to handle full width and truncation:

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#0f0f16] border-t border-white/5 flex items-center px-4 text-xs font-mono z-50 overflow-hidden">
      <div className="flex items-center gap-2 w-full">
        <div className="shrink-0">
          {ui.icon}
        </div>
        <span className={`${ui.color} font-bold truncate block max-w-full`} title={ui.text}>
          {ui.text}
        </span>
      </div>
    </div>
  );
```

## Constraints
- Pure JS/JSX. NO TypeScript.
- Strict date normalization (`setHours(0,0,0,0)`) must be used so tasks due *today* are correctly flagged for action.
- The `GlobalStatusBar` must use `truncate` and `overflow-hidden` correctly to ensure very long messages don't break the layout or push the bar out of its 8px height constraint.
