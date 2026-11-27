import { useRef } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import type { CursorState } from '@/types/portfolio';

interface MagneticProps {
  children: ReactNode;
  disabled?: boolean;
  strength?: number;
  cursor?: CursorState;
  className?: string;
}

export function Magnetic({
  children,
  disabled = false,
  strength = 0.28,
  cursor = 'magnet',
  className = '',
}: MagneticProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (disabled || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) * strength;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) * strength;
    wrapperRef.current.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
  };

  const handlePointerLeave = () => {
    if (!wrapperRef.current) return;
    wrapperRef.current.style.transform = 'translate3d(0px, 0px, 0px)';
  };

  return (
    <div
      ref={wrapperRef}
      data-cursor={cursor}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-flex transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
