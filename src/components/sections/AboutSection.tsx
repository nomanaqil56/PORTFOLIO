import { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [activePillar, setActivePillar] = useState(0);

  const activeFinishMeta =
    MONOLITH_FINISHES.find((item) => item.id === finish) ?? MONOLITH_FINISHES[0];

  return (
    <section
      id="about"
      data-section-id="about"
      aria-label="About and Philosophy"
      className="relative z-20 flex min-h-[100svh] items-start px-4 pb-12 pt-20 sm:px-8 md:items-center md:px-12 md:py-16 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="w-full max-w-xl space-y-4 sm:space-y-5 md:w-[52%]">
          <SectionEyebrow text="02 / About & Philosophy" />

          {/* Expressive masked philosophy centerpiece */}
          <h2 className="kinetic-headline font-display text-[clamp(2rem,3.9vw,3.15rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em] text-white">
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
                delay={0.12}
              />
            </span>
          </h2>

          {/* Interactive storytelling pillar selector */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0d]/75 p-4 backdrop-blur-md">
            <div className="flex flex-wrap gap-1.5">
              {OWNER_PROFILE.aboutPillars.map((pillar, idx) => (
                <button
                  key={pillar.label}
                  type="button"
                  data-cursor="explore"
                  onClick={() => {
                    onAudioCue(660 + idx * 30);
                    setActivePillar(idx);
                  }}
                  className={`cursor-pointer rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors ${
                    activePillar === idx
                      ? 'border-[#d6b384]/55 bg-[#d6b384]/15 text-white'
                      : 'border-white/10 text-neutral-400 hover:border-white/25 hover:text-neutral-200'
                  }`}
                >
                  0{idx + 1} · {pillar.label.split(' ')[0]}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-neutral-200">
              <span className="font-mono text-[#d6b384]">
                {OWNER_PROFILE.aboutPillars[activePillar].label}:{' '}
              </span>
              {OWNER_PROFILE.aboutPillars[activePillar].detail}
            </p>
          </div>

          <div className="space-y-2.5 rounded-2xl border border-white/[0.06] bg-[#060609]/80 p-4 backdrop-blur-sm md:rounded-none md:border-0 md:border-l md:border-white/15 md:bg-transparent md:p-0 md:pl-5 md:backdrop-blur-none">
            {OWNER_PROFILE.aboutParagraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[12.5px] leading-[1.6] text-neutral-300 sm:text-[13px]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Interactive 3D Stage Finish Controls */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0a0a0d]/85 p-3.5 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
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
              className="mt-2.5 grid grid-cols-3 gap-1.5 rounded-xl bg-black/55 p-1"
            >
              {MONOLITH_FINISHES.map((option) => {
                const selected = finish === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    data-cursor="explore"
                    onClick={() => {
                      onAudioCue(720);
                      onFinishChange(option.id);
                    }}
                    className={`relative cursor-pointer rounded-lg px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors ${
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

            <p className="mt-2 text-[11.5px] text-neutral-400">{activeFinishMeta.caption}</p>
          </div>
        </div>

        <div className="h-52 sm:h-64 md:hidden" aria-hidden="true" />
      </div>
    </section>
  );
}
