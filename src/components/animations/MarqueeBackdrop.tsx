import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface MarqueeBackdropProps {
  reducedMotion: boolean;
}

const WORD_REPEATS = Array.from({ length: 8 });

function MarqueeTrack({ word, direction }: { word: string; direction: 'left' | 'right' }) {
  const animClass = direction === 'left' ? 'marquee-track-left' : 'marquee-track-right';

  return (
    <div className={`flex w-max ${animClass}`}>
      {[0, 1].map((half) => (
        <div key={half} className="flex shrink-0 items-center">
          {WORD_REPEATS.map((_, idx) => (
            <span
              key={idx}
              className="select-none pr-[0.16em] font-display text-[clamp(6.5rem,17.5vw,16rem)] font-bold leading-[0.86] tracking-[-0.065em] text-[#d0d0d0]"
            >
              {word}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export function MarqueeBackdrop({ reducedMotion }: MarqueeBackdropProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topRibbonRef = useRef<HTMLDivElement>(null);
  const bottomRibbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !containerRef.current || !topRibbonRef.current || !bottomRibbonRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        opacity: 0.065,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '36% top',
          scrub: true,
        },
      });

      gsap.to(topRibbonRef.current, {
        yPercent: -14,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });

      gsap.to(bottomRibbonRef.current, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="marquee-edge-mask pointer-events-none fixed inset-0 z-[1] overflow-hidden opacity-[0.21]"
    >
      {/* Top WEB ribbon */}
      <div
        ref={topRibbonRef}
        className="absolute -left-[8vw] -right-[8vw] -top-[6%] -rotate-[3deg]"
      >
        <MarqueeTrack word="WEB" direction="left" />
      </div>

      {/* Bottom DEV ribbon */}
      <div
        ref={bottomRibbonRef}
        className="absolute -left-[8vw] -right-[8vw] top-[61%] rotate-[3deg]"
      >
        <MarqueeTrack word="DEV" direction="right" />
      </div>
    </div>
  );
}
