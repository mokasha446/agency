import { useEffect, useState } from "react";

interface PreloaderProps {
  duration?: number;
  fadeDuration?: number;
  onComplete?: () => void;
}

interface TechSymbol {
  label: string;
  path: string;
}

const techSymbols: TechSymbol[] = [
  {
    label: "Code brackets",
    path: "M8.7 7.3 4 12l4.7 4.7 1.4-1.4L6.8 12l3.3-3.3-1.4-1.4Zm6.6 0-1.4 1.4 3.3 3.3-3.3 3.3 1.4 1.4L20 12l-4.7-4.7ZM12.7 6l-2.4 12h2l2.4-12h-2Z",
  },
  {
    label: "Processor chip",
    path: "M9 3h2v3h2V3h2v3h1a2 2 0 0 1 2 2v1h3v2h-3v2h3v2h-3v1a2 2 0 0 1-2 2h-1v3h-2v-3h-2v3H9v-3H8a2 2 0 0 1-2-2v-1H3v-2h3v-2H3V9h3V8a2 2 0 0 1 2-2h1V3Zm-1 5v8h8V8H8Zm2 2h4v4h-4v-4Z",
  },
  {
    label: "Data stack",
    path: "M12 3C7.6 3 4 4.3 4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6c0-1.7-3.6-3-8-3Zm0 2c3.5 0 5.7.8 6 1-.3.2-2.5 1-6 1s-5.7-.8-6-1c.3-.2 2.5-1 6-1Zm6 5c-.9.6-3.1 1-6 1s-5.1-.4-6-1V8.6C7.4 9.5 9.9 10 12 10s4.6-.5 6-1.4V10Zm0 4c-.9.6-3.1 1-6 1s-5.1-.4-6-1v-1.4c1.4.9 3.9 1.4 6 1.4s4.6-.5 6-1.4V14Zm-6 5c-3.5 0-5.7-.8-6-1v-1.4c1.4.9 3.9 1.4 6 1.4s4.6-.5 6-1.4V18c-.3.2-2.5 1-6 1Z",
  },
  {
    label: "Cloud network",
    path: "M18.7 10.1A6.7 6.7 0 0 0 5.8 8.8 5.1 5.1 0 0 0 6.1 19H18a4.5 4.5 0 0 0 .7-8.9ZM18 17H6.1a3.1 3.1 0 0 1-.4-6.2l1.3-.2.3-1.3a4.7 4.7 0 0 1 9.1.9l.2 1.5 1.5.3A2.5 2.5 0 0 1 18 17Z",
  },
];

export default function Preloader({
  duration = 1500,
  fadeDuration = 400,
  onComplete,
}: PreloaderProps) {
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setIsLeaving(true);
    }, duration);

    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration + fadeDuration);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, [duration, fadeDuration, onComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      aria-label="Loading"
      aria-live="polite"
      className={`fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#05070d] text-white transition-opacity duration-500 ${
        isLeaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(135deg,rgba(99,102,241,0.14),transparent_45%),linear-gradient(225deg,rgba(16,185,129,0.12),transparent_40%)]" />
      <div className="absolute h-72 w-72 rounded-full border border-cyan-300/10 shadow-[0_0_80px_rgba(34,211,238,0.22)]" />

      <div className="relative flex flex-col items-center gap-8">
        <div className="relative h-28 w-28">
          <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl shadow-cyan-950/40 backdrop-blur-xl" />
          <div className="absolute inset-3 rounded-2xl border border-cyan-300/20" />

          {techSymbols.map((symbol, index) => (
            <svg
              aria-hidden="true"
              className="absolute inset-0 m-auto h-12 w-12 animate-[symbolPulse_1.5s_steps(1,end)_infinite] fill-cyan-200 opacity-0 drop-shadow-[0_0_18px_rgba(103,232,249,0.7)]"
              key={symbol.label}
              style={{ animationDelay: `${index * 0.375}s` }}
              viewBox="0 0 24 24"
            >
              <path d={symbol.path} />
            </svg>
          ))}
        </div>

        <div className="h-1 w-52 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full origin-left animate-[loadBar_1.5s_ease-in-out_forwards] rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,0.75)]" />
        </div>
      </div>

      <style>{`
        @keyframes symbolPulse {
          0%, 24% { opacity: 1; transform: scale(1); }
          25%, 100% { opacity: 0; transform: scale(0.92); }
        }

        @keyframes loadBar {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
