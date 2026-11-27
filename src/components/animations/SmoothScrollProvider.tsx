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

/**
 * Authoritative layout-measured scroll & section-stage synchronization engine.
 * Computes exact section top offsets via ResizeObserver so 3D choreography arrives
 * at each section pose in lockstep with the DOM regardless of varying section heights.
 */
export function SmoothScrollProvider({
  reducedMotion,
  children,
}: SmoothScrollProviderProps) {
  const [activeSection, setActiveSection] = useState<SectionId>(SECTION_ORDER[0]);
  const scrollProgressRef = useRef(0);
  const stageProgressRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const sectionTopsRef = useRef<number[]>(SECTION_ORDER.map((_, i) => i * 900));

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const stageEase = gsap.parseEase('power2.inOut');

    const measureSections = () => {
      sectionTopsRef.current = SECTION_ORDER.map((id, idx) => {
        const el = document.getElementById(id);
        return el ? el.offsetTop : idx * window.innerHeight;
      });
    };

    const syncProgressAndSection = () => {
      const tops = sectionTopsRef.current;
      const y = window.scrollY;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );

      scrollProgressRef.current = Math.min(1, Math.max(0, y / maxScroll));

      // Compute exact piecewise section-anchored stage float [0 .. lastIndex + exit]
      const lastIdx = tops.length - 1;
      let stageFloat = 0;

      if (y <= tops[0]) {
        stageFloat = 0;
      } else if (y >= tops[lastIdx]) {
        const tailSpan = Math.max(1, maxScroll - tops[lastIdx]);
        const exitT = Math.min(1, (y - tops[lastIdx]) / tailSpan);
        stageFloat = lastIdx + stageEase(exitT) * 0.22;
      } else {
        for (let i = 0; i < lastIdx; i++) {
          const start = tops[i];
          const end = tops[i + 1];
          if (y >= start && y < end) {
            const span = Math.max(1, end - start);
            const rawT = (y - start) / span;
            stageFloat = i + stageEase(rawT);
            break;
          }
        }
      }

      stageProgressRef.current = stageFloat;

      // Determine active section cleanly
      const probeY = y + window.innerHeight * 0.42;
      let nextActive: SectionId = SECTION_ORDER[0];
      for (let i = 0; i < SECTION_ORDER.length; i++) {
        const start = tops[i];
        const nextStart = i < lastIdx ? tops[i + 1] : Infinity;
        if (probeY >= start && probeY < nextStart) {
          nextActive = SECTION_ORDER[i];
          break;
        }
      }
      if (y + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        nextActive = SECTION_ORDER[lastIdx];
      }

      setActiveSection((prev) => (prev === nextActive ? prev : nextActive));
    };

    measureSections();
    syncProgressAndSection();

    const resizeObserver = new ResizeObserver(() => {
      measureSections();
      syncProgressAndSection();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    const handleResize = () => {
      measureSections();
      syncProgressAndSection();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    if (reducedMotion) {
      window.addEventListener('scroll', syncProgressAndSection, { passive: true });
      return () => {
        window.removeEventListener('scroll', syncProgressAndSection);
        window.removeEventListener('resize', handleResize);
        resizeObserver.disconnect();
      };
    }

    const lenis = new Lenis({
      duration: 0.95,
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    const onLenisScroll = ({ velocity }: { velocity: number }) => {
      scrollVelocityRef.current = velocity;
      ScrollTrigger.update();
      syncProgressAndSection();
    };
    lenis.on('scroll', onLenisScroll);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
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
        lenisRef.current.scrollTo(target, { duration: 0.95 });
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
      stageProgressRef,
      scrollVelocityRef,
      scrollToSection,
    }),
    [activeSection, scrollToSection],
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}
