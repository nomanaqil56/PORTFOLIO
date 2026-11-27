import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';

interface ScrollProgressBarProps {
  scrollProgressRef: MutableRefObject<number>;
}

/**
 * Hairline top scroll-progress bar driven directly via RAF to avoid React re-renders.
 */
export function ScrollProgressBar({ scrollProgressRef }: ScrollProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      if (barRef.current) {
        const clamped = Math.min(1, Math.max(0, scrollProgressRef.current));
        barRef.current.style.transform = `scaleX(${clamped})`;
      }
      rafId = window.requestAnimationFrame(update);
    };

    rafId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(rafId);
  }, [scrollProgressRef]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[1.5px] bg-white/[0.06]"
    >
      <div
        ref={barRef}
        className="h-full origin-left bg-gradient-to-r from-[#d6b384] via-white to-[#79c8e8]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
