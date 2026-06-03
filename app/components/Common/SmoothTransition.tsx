import { useState, useEffect } from "react";
import type { ReactNode } from "react";

export type TransitionDirection = "up" | "down" | "none";

export interface SmoothTransitionProps {
  children: ReactNode;
  delay?: number;
  duration?: string;
  direction?: TransitionDirection;
}

export default function SmoothTransition({
  children,
  delay = 0,
  duration = "500ms",
  direction = "up",
}: SmoothTransitionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const opacityClass = isMounted ? "opacity-100" : "opacity-0";

  let transformClass = "translate-y-0";
  if (!isMounted) {
    if (direction === "up") {
      transformClass = "translate-y-4";
    } else if (direction === "down") {
      transformClass = "-translate-y-4";
    }
  }

  const animationStyle = {
    transitionDuration: duration,
  };

  return (
    <div
      className={`transition-[transform,opacity] ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-[transform,opacity] ${opacityClass} ${transformClass}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
}
