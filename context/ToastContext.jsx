'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success', duration = 4000) => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Backwards compatibility for window-level custom events
  useEffect(() => {
    const handleShowToastEvent = (e) => {
      const { message, type = 'success', duration = 4000 } = e.detail || {};
      showToast(message, type, duration);
    };

    window.addEventListener('show-toast', handleShowToastEvent);
    return () => window.removeEventListener('show-toast', handleShowToastEvent);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
          {toasts.map((toast) => {
            const isSuccess = toast.type === 'success';
            return (
              <div
                key={toast.id}
                className="pointer-events-auto flex items-start gap-3 bg-[#0a0c14]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] animate-slide-in-right select-none transition-all duration-300 hover:border-[#3a86ff]/40"
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {isSuccess ? (
                    <CheckCircle2 className="w-5 h-5 text-[#3a86ff] drop-shadow-[0_0_8px_rgba(58,134,255,0.5)]" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                  )}
                </div>

                {/* Message */}
                <div className="flex-1 text-sm font-semibold text-gray-200 leading-relaxed pr-2">
                  {toast.message}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 text-gray-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
