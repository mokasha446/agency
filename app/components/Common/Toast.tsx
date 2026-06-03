import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type ToastType = "success" | "error" | "info";
export type ToastPosition = "top-right" | "bottom-right";

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastProviderProps {
  children: React.ReactNode;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<
  ToastType,
  {
    accent: string;
    bar: string;
    label: string;
    shadow: string;
  }
> = {
  error: {
    accent: "border-rose-300/45 text-rose-100",
    bar: "bg-rose-300",
    label: "Error",
    shadow: "shadow-[0_0_34px_rgba(251,113,133,0.18)]",
  },
  info: {
    accent: "border-cyan-300/45 text-cyan-100",
    bar: "bg-cyan-300",
    label: "Info",
    shadow: "shadow-[0_0_34px_rgba(34,211,238,0.18)]",
  },
  success: {
    accent: "border-emerald-300/45 text-emerald-100",
    bar: "bg-emerald-300",
    label: "Success",
    shadow: "shadow-[0_0_34px_rgba(110,231,183,0.18)]",
  },
};

function ToastCard({
  duration,
  onDismiss,
  toast,
}: {
  duration: number;
  onDismiss: (id: number) => void;
  toast: ToastItem;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const styles = toastStyles[toast.type];

  useEffect(() => {
    const enterTimer = window.setTimeout(() => setIsVisible(true), 20);
    const exitTimer = window.setTimeout(() => setIsVisible(false), duration);
    const removeTimer = window.setTimeout(() => {
      onDismiss(toast.id);
    }, duration + 280);

    return () => {
      window.clearTimeout(enterTimer);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, [duration, onDismiss, toast.id]);

  return (
    <div
      aria-live={toast.type === "error" ? "assertive" : "polite"}
      className={`relative overflow-hidden rounded-xl border bg-slate-950/90 p-4 text-white backdrop-blur-xl transition-all duration-300 ${
        styles.accent
      } ${styles.shadow} ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-8 opacity-0"
      }`}
      role={toast.type === "error" ? "alert" : "status"}
    >
      <div className="flex items-start gap-3">
        <span className={`mt-1 h-2.5 w-2.5 rounded-full ${styles.bar}`} />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.2em]">
            {styles.label}
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-200">
            {toast.message}
          </p>
        </div>
        <button
          aria-label="Dismiss notification"
          className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          onClick={() => {
            setIsVisible(false);
            window.setTimeout(() => onDismiss(toast.id), 220);
          }}
          type="button"
        >
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path
              d="M6 6l12 12M18 6 6 18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
        <div
          className={`h-full ${styles.bar}`}
          style={{
            animation: `toast-countdown ${duration}ms linear forwards`,
            transformOrigin: "left",
          }}
        />
      </div>
    </div>
  );
}

export function ToastProvider({
  children,
  duration = 4000,
  position = "bottom-right",
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    setToasts((current) => [
      ...current,
      {
        id: Date.now() + Math.random(),
        message,
        type,
      },
    ]);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className={`fixed z-[120] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 ${
          position === "top-right" ? "right-4 top-4" : "bottom-4 right-4"
        }`}
      >
        {toasts.map((toast) => (
          <ToastCard
            duration={duration}
            key={toast.id}
            onDismiss={removeToast}
            toast={toast}
          />
        ))}
      </div>
      <style>{`
        @keyframes toast-countdown {
          from { transform: scaleX(1); }
          to { transform: scaleX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider.");
  }

  return context;
}
