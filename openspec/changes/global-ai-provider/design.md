## Architecture

- **`contexts/AiContext.jsx`**: Provides the AI operational state to the application tree. Uses React Context. Implements an initial mount scan.
- **`components/GlobalStatusBar.jsx`**: A purely presentational component that consumes `AiContext`. Fixed to the viewport bottom.
- **`app/dashboard/layout.jsx`**: Orchestrates the injection of the provider and the status bar into the existing layout wrapper.

## DOM Structure & React Layout

### 1. `AiContext.jsx`
```jsx
'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

const AiContext = createContext();

export function AiProvider({ children }) {
  const [aiStatus, setAiStatus] = useState('scanning'); // online, offline, scanning, warning, critical
  const [globalInsight, setGlobalInsight] = useState('Sincronizando ambiente...');

  useEffect(() => {
    let isMounted = true;
    
    const initAi = async () => {
      try {
        // Simulate health check / system scan
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (isMounted) {
          setAiStatus('online');
          setGlobalInsight('IA Ativa: Tudo limpo');
        }
      } catch (err) {
        if (isMounted) {
          setAiStatus('offline');
          setGlobalInsight('IA Offline: Modo de execução manual ativo');
        }
      }
    };
    
    initAi();
    
    return () => { isMounted = false; };
  }, []);

  return (
    <AiContext.Provider value={{ aiStatus, setAiStatus, globalInsight, setGlobalInsight }}>
      {children}
    </AiContext.Provider>
  );
}

export const useAi = () => useContext(AiContext);
```

### 2. `GlobalStatusBar.jsx`
```jsx
'use client';

import { useAi } from '@/contexts/AiContext';
import { CheckCircle2, AlertTriangle, Loader2, WifiOff, Terminal } from 'lucide-react';

export default function GlobalStatusBar() {
  const { aiStatus, globalInsight } = useAi();

  const getStatusUI = () => {
    switch (aiStatus) {
      case 'scanning':
        return { icon: <Loader2 className="w-4 h-4 animate-spin text-blue-400" />, text: 'Analisando carga...', color: 'text-blue-400' };
      case 'online':
        return { icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />, text: 'EduTrack-Ai: Online', color: 'text-emerald-500' };
      case 'warning':
        return { icon: <AlertTriangle className="w-4 h-4 text-yellow-500" />, text: globalInsight, color: 'text-yellow-500' };
      case 'critical':
        return { icon: <AlertTriangle className="w-4 h-4 text-red-500" />, text: 'CRITICAL ERROR', color: 'text-red-500' };
      case 'offline':
      default:
        return { icon: <WifiOff className="w-4 h-4 text-gray-500" />, text: 'Fallback: Modo Manual', color: 'text-gray-500' };
    }
  };

  const ui = getStatusUI();

  return (
    <div className="fixed bottom-0 left-0 right-0 h-8 bg-[#0f0f16] border-t border-white/5 flex items-center justify-between px-4 text-xs font-mono z-50">
      <div className="flex items-center gap-2">
        {ui.icon}
        <span className={`${ui.color} font-bold`}>{ui.text}</span>
      </div>
      
      <div className="flex items-center gap-4 text-gray-500">
        <span className="hidden sm:inline-block">UTF-8</span>
        <span className="hidden sm:inline-block">JS/JSX</span>
        <span className="flex items-center gap-1"><Terminal className="w-3 h-3" /> React</span>
      </div>
    </div>
  );
}
```

### 3. `layout.jsx` modifications
- Wrap `{children}` in `<AiProvider>`.
- Render `<GlobalStatusBar />` at the end of the provider block.
- Adjust the main `div` containing `children` to have `pb-8` to prevent the fixed status bar from obscuring bottom content.

## Constraints
- Pure JS/JSX. NO TypeScript.
- Ensure proper use of `use client` where hooks are used.
- Ensure the status bar z-index is high enough (`z-50`) to overlay all scrollable content.
