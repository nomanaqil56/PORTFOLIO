import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { MONOLITH_FINISHES, OWNER_PROFILE } from '@/data/portfolio';
import type { MonolithFinish } from '@/types/portfolio';

interface SystemsSectionProps {
  finish: MonolithFinish;
  onFinishChange: (finish: MonolithFinish) => void;
  reducedMotion: boolean;
  isTouchPrimary: boolean;
}

export function SystemsSection({
  finish,
  onFinishChange,
  reducedMotion,
  isTouchPrimary,
}: SystemsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const children = contentRef.current?.querySelectorAll('[data-reveal]');
      if (!children?.length) return;

      gsap.fromTo(
        children,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 72%',
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const activeFinishMeta =
    MONOLITH_FINISHES.find((item) => item.id === finish) ?? MONOLITH_FINISHES[0];

  return (
    <section
      ref={sectionRef}
      id="systems"
      data-section-id="systems"
      aria-label="Digital Systems"
      className="relative z-20 flex min-h-[100svh] items-start px-4 pb-16 pt-20 sm:px-8 md:items-center md:px-12 md:py-24 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div ref={contentRef} className="w-full max-w-xl md:w-[46%]">
          <div data-reveal>
            <SectionEyebrow text="02 / Digital Systems" />
          </div>

          <h2
            data-reveal
            className="mt-4 font-display text-[clamp(2.75rem,6.5vw,5.25rem)] font-bold uppercase leading-[0.94] tracking-[-0.02em] text-white sm:mt-5"
          >
            {OWNER_PROFILE.systemsHeadline[0]}
            <br />
            <span className="text-neutral-300">{OWNER_PROFILE.systemsHeadline[1]}</span>
          </h2>

          <p
            data-reveal
            className="mt-4 max-w-md text-[14.5px] leading-[1.6] text-neutral-300 sm:mt-5 sm:text-base sm:leading-[1.65]"
          >
            {OWNER_PROFILE.systemsSubtitle}
          </p>

          {/* Interactive 3D material finish selector */}
          <div
            data-reveal
            className="mt-6 rounded-2xl border border-white/[0.08] bg-[#0a0a0d]/80 p-4 backdrop-blur-md sm:mt-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-400">
                3D Material Study
              </span>
              {!isTouchPrimary && (
                <span className="font-mono text-[10.5px] text-[#d6b384]">
                  Move pointer to tilt
                </span>
              )}
            </div>

            <div
              role="radiogroup"
              aria-label="3D monolith material finish"
              className="mt-3 grid grid-cols-3 gap-1.5 rounded-xl bg-black/50 p-1"
            >
              {MONOLITH_FINISHES.map((option) => {
                const selected = finish === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onFinishChange(option.id)}
                    className={`relative cursor-pointer rounded-lg px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      selected ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId={reducedMotion ? undefined : 'finish-pill'}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-lg border border-white/15 bg-white/10"
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="mt-3 text-xs leading-relaxed text-neutral-400">
              {activeFinishMeta.caption}
            </p>
          </div>
        </div>

        {/* Dedicated mobile viewport window below controls so 3D centerpiece sits cleanly */}
        <div className="h-56 sm:h-64 md:hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
