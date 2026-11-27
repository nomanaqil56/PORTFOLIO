import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { SECTION_ORDER } from '@/data/navigation';
import { ScrollContext } from '@/hooks/useScrollState';
import type { SectionId } from '@/types/portfolio';

interface SmoothScrollProviderProps {
  reducedMotion: boolean;
  children: ReactNode;
}

export function SmoothScrollProvider({
  reducedMotion,
  children,
}: SmoothScrollProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTION_ORDER[0]);
  const scrollProgressRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updateProgressAndSection = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const y = window.scrollY;
      scrollProgressRef.current = Math.min(1, Math.max(0, y / maxScroll));

      const viewportMid = y + window.innerHeight * 0.45;
      let nextActive: SectionId = SECTION_ORDER[0];

      for (const id of SECTION_ORDER) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (viewportMid >= top && viewportMid < bottom) {
          nextActive = id;
          break;
        }
      }

      // Guard bottom-of-page edge case
      if (y + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        nextActive = SECTION_ORDER[SECTION_ORDER.length - 1];
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    if (reducedMotion) {
      updateProgressAndSection();
      window.addEventListener('scroll', updateProgressAndSection, { passive: true });
      window.addEventListener('resize', updateProgressAndSection, { passive: true });
      return () => {
        window.removeEventListener('scroll', updateProgressAndSection);
        window.removeEventListener('resize', updateProgressAndSection);
      };
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    const onLenisScroll = ({ velocity }: { velocity: number }) => {
      scrollVelocityRef.current = velocity;
      ScrollTrigger.update();
      updateProgressAndSection();
    };

    lenis.on('scroll', onLenisScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    updateProgressAndSection();
    window.addEventListener('resize', updateProgressAndSection, { passive: true });

    return () => {
      window.removeEventListener('resize', updateProgressAndSection);
      gsap.ticker.remove(tick);
      lenis.off('scroll', onLenisScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollToSection = useCallback(
    (sectionId: SectionId) => {
      const target = document.getElementById(sectionId);
      if (!target) return;

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(target, { duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    },
    [reducedMotion],
  );

  const value = useMemo(
    () => ({
      activeSection,
      scrollProgressRef,
      scrollVelocityRef,
      scrollToSection,
    }),
    [activeSection, scrollToSection],
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
