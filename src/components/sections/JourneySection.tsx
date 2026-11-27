import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { KineticText } from '@/components/animations/KineticText';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { JOURNEY_MILESTONES } from '@/data/portfolio';

interface JourneySectionProps {
  reducedMotion: boolean;
  onAudioCue: (pitch?: number) => void;
}

export function JourneySection({ reducedMotion, onAudioCue }: JourneySectionProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeMilestone = JOURNEY_MILESTONES[activeIdx] ?? JOURNEY_MILESTONES[0];

  return (
    <section
      id="journey"
      data-section-id="journey"
      aria-label="Development Journey"
      className="relative z-20 flex min-h-[100svh] items-center px-4 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="w-full space-y-6 md:w-[62%] lg:w-[58%]">
          <div className="space-y-3">
            <SectionEyebrow text="06 / Development Journey" />
            <h2 className="kinetic-headline font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em] text-white">
              <KineticText
                text="EVOLUTION THROUGH BUILDING"
                mode="words"
                reducedMotion={reducedMotion}
              />
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-12">
            {/* Interactive chronological spine */}
            <div
              role="tablist"
              aria-label="Journey milestones"
              className="relative space-y-2 md:col-span-5"
            >
              <div
                aria-hidden="true"
                className="absolute bottom-4 left-3.5 top-4 w-px bg-white/10"
              />
              {JOURNEY_MILESTONES.map((milestone, idx) => {
                const selected = idx === activeIdx;
                return (
                  <button
                    key={milestone.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    data-cursor="explore"
                    onClick={() => {
                      onAudioCue(600 + idx * 35);
                      setActiveIdx(idx);
                    }}
                    className={`relative flex w-full cursor-pointer items-start gap-3.5 rounded-xl py-2.5 pl-1.5 pr-3 text-left transition-colors ${
                      selected ? 'bg-white/[0.06] text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`relative z-10 mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-all ${
                        selected
                          ? 'border-[#d6b384] bg-[#d6b384]/25 shadow-[0_0_12px_rgba(214,179,132,0.5)]'
                          : 'border-white/20 bg-[#070709]'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          selected ? 'bg-[#d6b384]' : 'bg-white/30'
                        }`}
                      />
                    </span>

                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#d6b384]">
                        {milestone.period}
                      </div>
                      <div className="mt-0.5 text-xs font-medium leading-snug sm:text-[13px]">
                        {milestone.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active milestone details */}
            <div className="md:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.id}
                  initial={reducedMotion ? false : { opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, x: -8 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlassPanel className="space-y-4 p-5 sm:p-6">
                    <div className="space-y-1 border-b border-white/[0.08] pb-3.5">
                      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                        <span className="text-[#d6b384]">{activeMilestone.period}</span>
                        <span className="text-neutral-500">Milestone {activeMilestone.code}</span>
                      </div>
                      <h3 className="font-display text-2xl uppercase tracking-[0.02em] text-white">
                        {activeMilestone.title}
                      </h3>
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-neutral-400">
                        {activeMilestone.domain}
                      </p>
                    </div>

                    <p className="text-[13.5px] leading-relaxed text-neutral-200">
                      {activeMilestone.summary}
                    </p>

                    <ul className="space-y-2 text-[12.5px] leading-relaxed text-neutral-300">
                      {activeMilestone.highlights.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#d6b384]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {activeMilestone.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </GlassPanel>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
