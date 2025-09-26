import { useEffect, useState } from "react";

interface ToastProps {
  id: number;
  message: string;
  onClose: (id: number) => void;
  duration?: number;
  isError: boolean;
}

export function Toast({ id, message, onClose, duration = 3000, isError }: ToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const interval = 10;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    const timeout = setTimeout(() => onClose(id), duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [id, onClose, duration]);

  return (
    isError ? (
      <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg mb-2 animate-fade-in relative overflow-hidden">
      {message}
      <div
        className="absolute bottom-0 left-0 h-1 bg-red-300"
        style={{ width: `${progress}%`, transition: "width 0.01s linear" }}
      />
    </div>
    ) : (
      <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg mb-2 animate-fade-in relative overflow-hidden">
      {message}
      <div
        className="absolute bottom-0 left-0 h-1 bg-green-300"
        style={{ width: `${progress}%`, transition: "width 0.01s linear" }}
      />
    </div>
    )
  );
}
