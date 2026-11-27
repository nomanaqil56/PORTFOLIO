import type { ReactNode } from 'react';

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
}

export function GlassPanel({ children, className = '' }: GlassPanelProps) {
  return (
    <div className={`glass-surface rounded-[14px] ${className}`}>
      {children}
    </div>
  );
}
