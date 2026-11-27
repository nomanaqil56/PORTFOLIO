import { createContext, useContext } from 'react';
import type { MutableRefObject } from 'react';
import type { SectionId } from '@/types/portfolio';

export interface ScrollContextValue {
  activeSection: SectionId;
  scrollProgressRef: MutableRefObject<number>;
  scrollVelocityRef: MutableRefObject<number>;
  scrollToSection: (sectionId: SectionId) => void;
}

export const ScrollContext = createContext<ScrollContextValue | null>(null);

export function useScrollController(): ScrollContextValue {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScrollController must be used within SmoothScrollProvider');
  }
  return context;
}
