import { CheckCircle2, XCircle } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-white px-4 py-3 rounded-lg shadow-xl border border-gray-200 animate-in slide-in-from-top-4 fade-in duration-300">
      {type === "success" ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500" />
      )}
      <span className="text-sm font-medium text-gray-800">{message}</span>
    </div>
  );
}
