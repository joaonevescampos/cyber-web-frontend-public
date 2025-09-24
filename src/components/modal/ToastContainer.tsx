// components/modal/ToastContainer.tsx
interface ToastContainerProps {
  toasts: { id: number; message: string }[];
  removeToast: (id: number) => void;
  isError: boolean;
}

import { Toast } from "./Toast";

export function ToastContainer({ toasts, removeToast, isError }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={removeToast} isError={isError}/>
      ))}
    </div>
  );
}
