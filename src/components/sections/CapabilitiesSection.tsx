import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { KineticText } from '@/components/animations/KineticText';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { CAPABILITY_CATEGORIES } from '@/data/portfolio';

interface CapabilitiesSectionProps {
  reducedMotion: boolean;
  onAudioCue: (pitch?: number) => void;
}

export function CapabilitiesSection({
  reducedMotion,
  onAudioCue,
}: CapabilitiesSectionProps) {
  const [activeId, setActiveId] = useState<string>(CAPABILITY_CATEGORIES[0].id);

  const activeCategory =
    CAPABILITY_CATEGORIES.find((category) => category.id === activeId) ??
    CAPABILITY_CATEGORIES[0];

  return (
    <section
      id="capabilities"
      data-section-id="capabilities"
      aria-label="Capabilities"
      className="relative z-20 flex min-h-[100svh] items-center px-4 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Mobile spacer for centered 3D object */}
        <div className="h-36 sm:h-44 md:hidden" aria-hidden="true" />

        <div className="w-full space-y-6 md:ml-auto md:w-[60%] lg:w-[56%]">
          <div className="space-y-3">
            <SectionEyebrow text="03 / Capabilities" />
            <h2 className="kinetic-headline font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em] text-white">
              <KineticText
                text="SYSTEMS, INTERFACES & EXPLORATIONS"
                mode="words"
                reducedMotion={reducedMotion}
              />
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Organized transparently by hands-on implementation across shipped projects versus areas actively being explored—never arbitrary percentages.
            </p>
          </div>

          {/* Interactive 6-domain selector grid */}
          <div
            role="tablist"
            aria-label="Capability domains"
            className="grid grid-cols-1 gap-2 sm:grid-cols-2"
          >
            {CAPABILITY_CATEGORIES.map((category) => {
              const selected = category.id === activeCategory.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  data-cursor="explore"
                  onClick={() => {
                    onAudioCue(680);
                    setActiveId(category.id);
                  }}
                  className={`relative flex cursor-pointer items-center justify-between rounded-xl border px-3.5 py-2.5 text-left transition-colors ${
                    selected
                      ? 'border-white/25 text-white'
                      : 'border-white/[0.07] bg-white/[0.015] text-neutral-400 hover:border-white/15 hover:text-neutral-200'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId={reducedMotion ? undefined : 'capability-tab-bg'}
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-white/[0.07]"
                    />
                  )}
                  <span className="relative z-10 text-xs font-medium">{category.title}</span>
                  <span className="relative z-10 font-mono text-[10px] text-[#d6b384]">
                    {category.code}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active domain breakdown panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory.id}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <GlassPanel className="space-y-5 p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#79c8e8]">
                      Domain {activeCategory.code}
                    </span>
                    <h3 className="mt-1 font-display text-xl uppercase tracking-[0.02em] text-white sm:text-2xl">
                      {activeCategory.title}
                    </h3>
                  </div>

                  {/* Legend distinguishing applied vs exploring */}
                  <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em]">
                    <span className="inline-flex items-center gap-1.5 text-neutral-300">
                      <span className="h-2 w-2 rounded-full bg-[#79c8e8]" aria-hidden="true" />
                      Applied
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-neutral-400">
                      <span className="h-2 w-2 rounded-full border border-[#d6b384]" aria-hidden="true" />
                      Exploring
                    </span>
                  </div>
                </div>

                <p className="text-[13.5px] leading-relaxed text-neutral-300">
                  {activeCategory.summary}
                </p>

                <div className="grid gap-2.5">
                  {activeCategory.items.map((tech) => {
                    const isApplied = tech.maturity === 'applied';
                    return (
                      <div
                        key={tech.name}
                        className="flex flex-col justify-between gap-1.5 rounded-xl border border-white/[0.07] bg-black/35 px-4 py-3 sm:flex-row sm:items-center sm:gap-4"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 shrink-0 rounded-full ${
                              isApplied
                                ? 'bg-[#79c8e8] shadow-[0_0_8px_rgba(121,200,232,0.55)]'
                                : 'border border-[#d6b384]'
                            }`}
                          />
                          <span className="text-xs font-medium text-white sm:text-[13px]">
                            {tech.name}
                          </span>
                        </div>

                        <div className="flex items-center gap-2.5 sm:text-right">
                          <span className="text-[11.5px] text-neutral-400">{tech.context}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassPanel>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
