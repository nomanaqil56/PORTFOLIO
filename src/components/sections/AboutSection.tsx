import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KineticText } from '@/components/animations/KineticText';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { MONOLITH_FINISHES, OWNER_PROFILE } from '@/data/portfolio';
import type { MonolithFinish } from '@/types/portfolio';

interface AboutSectionProps {
  finish: MonolithFinish;
  onFinishChange: (finish: MonolithFinish) => void;
  reducedMotion: boolean;
  isTouchPrimary: boolean;
  onAudioCue: (pitch?: number) => void;
}

export function AboutSection({
  finish,
  onFinishChange,
  reducedMotion,
  isTouchPrimary,
  onAudioCue,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !contentRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const blocks = contentRef.current?.querySelectorAll('[data-about-reveal]');
      if (!blocks?.length) return;

      gsap.fromTo(
        blocks,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.78,
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
      id="about"
      data-section-id="about"
      aria-label="About and Philosophy"
      className="relative z-20 flex min-h-[100svh] items-start px-4 pb-14 pt-20 sm:px-8 md:items-center md:px-12 md:py-16 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div ref={contentRef} className="w-full max-w-xl space-y-4 sm:space-y-5 md:w-[50%]">
          <div data-about-reveal>
            <SectionEyebrow text="02 / About & Philosophy" />
          </div>

          {/* Expressive oversized philosophy quote */}
          <h2
            data-about-reveal
            className="kinetic-headline font-display text-[clamp(2rem,4.1vw,3.35rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em] text-white"
          >
            <KineticText
              text="DON'T JUST USE TECHNOLOGY."
              mode="words"
              reducedMotion={reducedMotion}
            />
            <br />
            <span className="text-[#d6b384]">
              <KineticText
                text="EXPLORE IT, UNDERSTAND IT, AND BUILD SOMETHING WITH IT."
                mode="words"
                reducedMotion={reducedMotion}
                delay={0.14}
              />
            </span>
          </h2>

          <div data-about-reveal className="space-y-2.5 border-l border-white/15 pl-4 sm:pl-5">
            {OWNER_PROFILE.aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[13px] leading-[1.62] text-neutral-300 sm:text-[13.5px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Interactive 3D Material Study preserved from Digital Systems */}
          <div
            data-about-reveal
            className="rounded-2xl border border-white/[0.08] bg-[#0a0a0d]/85 p-4 backdrop-blur-md"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-400">
                Interactive 3D Stage Finish
              </span>
              {!isTouchPrimary && (
                <span className="font-mono text-[10px] text-[#d6b384]">
                  Move pointer to tilt stage
                </span>
              )}
            </div>

            <div
              role="radiogroup"
              aria-label="3D monolith material finish"
              className="mt-3 grid grid-cols-3 gap-1.5 rounded-xl bg-black/55 p-1"
            >
              {MONOLITH_FINISHES.map((option) => {
                const selected = finish === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    data-cursor="magnet"
                    onClick={() => {
                      onAudioCue(720);
                      onFinishChange(option.id);
                    }}
                    className={`relative cursor-pointer rounded-lg px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      selected ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId={reducedMotion ? undefined : 'about-finish-pill'}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-lg border border-white/15 bg-white/10"
                      />
                    )}
                    <span className="relative z-10">{option.label}</span>
                  </button>
                );
              })}
            </div>

            <p className="mt-2.5 text-xs leading-relaxed text-neutral-400">
              {activeFinishMeta.caption}
            </p>
          </div>
        </div>

        <div className="h-56 sm:h-64 md:hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
