'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// Toast Types & Context
// ============================================================================

export type ToastType = 'success' | 'error' | 'warning' | 'info';
export type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined);

// ============================================================================
// Toast Provider
// ============================================================================

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = 'top-right',
  maxToasts = 5,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 11);
    
    setToasts((prev) => {
      const newToasts = [...prev, { ...toast, id }];
      // Remove oldest if exceeding max
      if (newToasts.length > maxToasts) {
        return newToasts.slice(-maxToasts);
      }
      return newToasts;
    });

    return id;
  }, [maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const positionClasses: Record<ToastPosition, string> = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      
      {mounted && createPortal(
        <div
          className={cn(
            'fixed z-[100] flex flex-col gap-2 pointer-events-none',
            positionClasses[position]
          )}
          role="region"
          aria-label="Notifications"
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <ToastItem
                key={toast.id}
                toast={toast}
                onDismiss={() => removeToast(toast.id)}
                position={position}
              />
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

// ============================================================================
// Toast Item Component
// ============================================================================

interface ToastItemProps {
  toast: Toast;
  onDismiss: () => void;
  position: ToastPosition;
}

function ToastItem({ toast, onDismiss, position }: ToastItemProps) {
  const { type, title, message, duration = 5000, dismissible = true, action } = toast;
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (duration && !isPaused) {
      timerRef.current = setTimeout(onDismiss, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, onDismiss, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const borderColors = {
    success: 'border-l-green-500',
    error: 'border-l-red-500',
    warning: 'border-l-amber-500',
    info: 'border-l-blue-500',
  };

  const getAnimationOrigin = () => {
    if (position.includes('left')) return { x: -100 };
    if (position.includes('right')) return { x: 100 };
    if (position.includes('top')) return { y: -100 };
    return { y: 100 };
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...getAnimationOrigin() }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'pointer-events-auto w-80 max-w-[calc(100vw-2rem)]',
        'bg-white rounded-lg shadow-lg border-l-4',
        'overflow-hidden',
        borderColors[type]
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="alert"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">{icons[type]}</div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-hampstead-charcoal">{title}</h3>
            {message && (
              <p className="mt-1 text-sm text-hampstead-charcoal/70">{message}</p>
            )}
            
            {action && (
              <button
                onClick={action.onClick}
                className="mt-2 text-sm font-medium text-hampstead-sage hover:text-hampstead-sage/80 transition-colors"
              >
                {action.label}
              </button>
            )}
          </div>

          {dismissible && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 p-1 hover:bg-hampstead-grey/30 rounded transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4 text-hampstead-charcoal/50" />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {duration && !isPaused && (
        <motion.div
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: duration / 1000, ease: 'linear' }}
          className={cn(
            'h-1 origin-left',
            type === 'success' && 'bg-green-500',
            type === 'error' && 'bg-red-500',
            type === 'warning' && 'bg-amber-500',
            type === 'info' && 'bg-blue-500'
          )}
        />
      )}
    </motion.div>
  );
}

// ============================================================================
// useToast Hook
// ============================================================================

export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast, clearToasts, toasts } = context;

  return {
    toasts,
    toast: addToast,
    dismiss: removeToast,
    clearAll: clearToasts,
    
    // Convenience methods
    success: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
      addToast({ type: 'success', title, ...options }),
    
    error: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
      addToast({ type: 'error', title, ...options }),
    
    warning: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
      addToast({ type: 'warning', title, ...options }),
    
    info: (title: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'title'>>) => 
      addToast({ type: 'info', title, ...options }),
  };
}

// ============================================================================
// Standalone Toast Function (for use outside React components)
// ============================================================================

// This creates a simple toast container for use outside of React context
let toastContainerElement: HTMLElement | null = null;
let toastRoot: any = null;
let standaloneToasts: Toast[] = [];

function renderStandaloneToasts() {
  if (!toastContainerElement) {
    toastContainerElement = document.createElement('div');
    toastContainerElement.id = 'standalone-toast-container';
    document.body.appendChild(toastContainerElement);
  }
  // Note: This is a simplified version. For full standalone support,
  // you would need to render a React component here
}

export function showToast(options: Omit<Toast, 'id'>) {
  const id = Math.random().toString(36).substring(2, 11);
  standaloneToasts.push({ ...options, id });
  renderStandaloneToasts();
  
  // Auto-remove after duration
  if (options.duration !== 0) {
    setTimeout(() => {
      standaloneToasts = standaloneToasts.filter(t => t.id !== id);
      renderStandaloneToasts();
    }, options.duration || 5000);
  }
  
  return id;
}
