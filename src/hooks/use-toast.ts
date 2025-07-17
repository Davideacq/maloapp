// Converted from malohr-platform/hooks/use-toast.ts
// Toast hook for React Native using Alert and simple state management
import React from 'react';
import { Alert } from 'react-native';

export interface ToastProps {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

type ToasterToast = ToastProps & {
  id: string;
};

const TOAST_LIMIT = 3;
const TOAST_REMOVE_DELAY = 3000;

interface State {
  toasts: ToasterToast[];
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: { type: string; toast?: ToasterToast; toastId?: string }) {
  switch (action.type) {
    case 'ADD_TOAST':
      if (action.toast) {
        memoryState = {
          ...memoryState,
          toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
        };
      }
      break;
    case 'REMOVE_TOAST':
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.filter((t) => t.id !== action.toastId),
      };
      break;
  }
  
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

function toast({ title, description, variant = 'default' }: Toast) {
  const id = genId();

  // Use React Native Alert for immediate feedback
  if (title || description) {
    Alert.alert(
      title || 'Notifica',
      description || '',
      [{ text: 'OK', style: variant === 'destructive' ? 'destructive' : 'default' }]
    );
  }

  // Also add to state for components that might want to display toasts differently
  const toastObj: ToasterToast = {
    id,
    title,
    description,
    variant,
  };

  dispatch({
    type: 'ADD_TOAST',
    toast: toastObj,
  });

  // Auto-remove after delay
  setTimeout(() => {
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: id,
    });
  }, TOAST_REMOVE_DELAY);

  return {
    id,
    dismiss: () => dispatch({ type: 'REMOVE_TOAST', toastId: id }),
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: 'REMOVE_TOAST', toastId }),
  };
}

export { toast, useToast };
