import { useEffect, useMemo, useRef, useState } from "react";

interface UseScrollRevealOptions {
  initialClassName?: string;
  once?: boolean;
  revealClassName?: string;
  rootMargin?: string;
  threshold?: number;
}

interface UseScrollRevealResult<T extends HTMLElement> {
  className: string;
  isRevealed: boolean;
  ref: React.RefObject<T | null>;
}

const defaultInitialClassName =
  "opacity-0 translate-y-10 transform-gpu transition-all duration-700 ease-out will-change-transform";

const defaultRevealClassName = "opacity-100 translate-y-0";

export default function useScrollReveal<T extends HTMLElement = HTMLElement>({
  initialClassName = defaultInitialClassName,
  once = true,
  revealClassName = defaultRevealClassName,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0.12,
}: UseScrollRevealOptions = {}): UseScrollRevealResult<T> {
  const ref = useRef<T | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);

          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [once, rootMargin, threshold]);

  const className = useMemo(
    () =>
      `${initialClassName} ${
        isRevealed ? revealClassName : ""
      }`.trim(),
    [initialClassName, isRevealed, revealClassName],
  );

  return {
    className,
    isRevealed,
    ref,
  };
}
