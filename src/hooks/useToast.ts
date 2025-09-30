import { useState, useCallback } from "react";

interface ToastMessage {
  id: number;
  message: string;
}

export const useToast = () => {
  const [successToasts, setSuccessToasts] = useState<ToastMessage[]>([]);
  const [errorToasts, setErrorToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, isError = false, duration = 3000) => {
    const id = new Date().getTime();
    const newToast = { id, message };

    if (isError) {
      setErrorToasts((prev) => [...prev, newToast]);
    } else {
      setSuccessToasts((prev) => [...prev, newToast]);
    }

    setTimeout(() => {
      if (isError) {
        removeErrorToast(id);
      } else {
        removeSuccessToast(id);
      }
    }, duration);
  }, []);

  const removeSuccessToast = (id: number) => {
    setSuccessToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const removeErrorToast = (id: number) => {
    setErrorToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    successToasts,
    errorToasts,
    addToast,
    removeSuccessToast,
    removeErrorToast,
  };
};
