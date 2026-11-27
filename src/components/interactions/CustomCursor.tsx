import { useEffect, useRef, useState } from 'react';
import type { CursorState } from '@/types/portfolio';

interface CustomCursorProps {
  disabled: boolean;
}

const LABEL_MAP: Record<CursorState, string> = {
  default: '',
  magnet: '',
  view: 'VIEW',
  explore: 'EXPLORE',
  open: 'OPEN',
  copy: 'COPY',
};

/**
 * Hardware-accelerated RAF cursor controller.
 * Keeps positional tracking strictly off React state to eliminate pointer-move re-renders.
 */
export function CustomCursor({ disabled }: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (disabled || typeof window === 'undefined') {
      document.body.classList.remove('has-custom-cursor');
      return;
    }

    document.body.classList.add('has-custom-cursor');

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: pointer.x, y: pointer.y };
    let rafId = 0;
    let activeMode: CursorState = 'default';

    const resolveCursorMode = (target: EventTarget | null): CursorState => {
      if (!(target instanceof Element)) return 'default';
      const customEl = target.closest('[data-cursor]');
      if (customEl) {
        const attr = customEl.getAttribute('data-cursor') as CursorState | null;
        if (attr && attr in LABEL_MAP) return attr;
      }
      if (target.closest('a, button, [role="button"], [role="radio"]')) {
        return 'magnet';
      }
      return 'default';
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (!visible) setVisible(true);

      const nextMode = resolveCursorMode(e.target);
      if (nextMode !== activeMode) {
        activeMode = nextMode;
        setCursorState(nextMode);
      }
    };

    const onPointerLeave = () => setVisible(false);

    const tick = () => {
      ringPos.x += (pointer.x - ringPos.x) * 0.22;
      ringPos.y += (pointer.y - ringPos.y) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }
      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [disabled, visible]);

  if (disabled) return null;

  const label = LABEL_MAP[cursorState];
  const isLabeled = Boolean(label);
  const isInteractive = cursorState !== 'default';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[120] transition-opacity duration-200 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Trailing context-aware ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 -ml-5 -mt-5 will-change-transform"
      >
        <div
          className={`flex items-center justify-center rounded-full border transition-all duration-200 ease-out ${
            isLabeled
              ? 'h-12 w-12 border-white/60 bg-white/12 backdrop-blur-md'
              : isInteractive
                ? 'h-10 w-10 border-[#d6b384]/65 bg-white/[0.04]'
                : 'h-7 w-7 translate-x-1.5 translate-y-1.5 border-white/30 bg-transparent'
          }`}
        >
          {isLabeled && (
            <span className="font-mono text-[8.5px] font-medium tracking-[0.16em] text-white">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Precision focal dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 -ml-[2.5px] -mt-[2.5px] will-change-transform"
      >
        <div
          className={`rounded-full bg-white transition-transform duration-150 ${
            isLabeled ? 'h-1 w-1 scale-0' : 'h-[5px] w-[5px] scale-100'
          }`}
        />
      </div>
    </div>
  );
}
