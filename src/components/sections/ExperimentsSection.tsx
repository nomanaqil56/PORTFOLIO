import { ArrowUpRight, FlaskConical, Sparkles } from 'lucide-react';
import { KineticText } from '@/components/animations/KineticText';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { EXPERIMENTS } from '@/data/portfolio';
import type { MonolithFinish } from '@/types/portfolio';

interface ExperimentsSectionProps {
  finish: MonolithFinish;
  onCycleFinish: () => void;
  onOpenCommandPalette: () => void;
  reducedMotion: boolean;
  onAudioCue: (pitch?: number) => void;
}

export function ExperimentsSection({
  finish,
  onCycleFinish,
  onOpenCommandPalette,
  reducedMotion,
  onAudioCue,
}: ExperimentsSectionProps) {
  return (
    <section
      id="experiments"
      data-section-id="experiments"
      aria-label="Experiments"
      className="relative z-20 flex min-h-[100svh] items-center px-4 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="h-36 sm:h-44 md:hidden" aria-hidden="true" />

        <div className="w-full space-y-6 md:ml-auto md:w-[60%] lg:w-[58%]">
          <div className="space-y-3">
            <SectionEyebrow text="05 / Experiments & Lab" />
            <h2 className="kinetic-headline font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em] text-white">
              <KineticText
                text="PROTOTYPES, SHADERS & SANDBOXES"
                mode="words"
                reducedMotion={reducedMotion}
              />
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Focused explorations outside full product builds—testing browser agent security boundaries, real-time shaders, and experimental typography.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {EXPERIMENTS.map((exp, idx) => (
              <div
                key={exp.id}
                className={`flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[#08080c]/85 p-5 backdrop-blur-md transition-colors hover:border-white/25 ${
                  idx % 2 === 1 ? 'sm:translate-y-3' : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                    <span className="inline-flex items-center gap-1.5 text-[#c4b5fd]">
                      <FlaskConical className="h-3 w-3" aria-hidden="true" />
                      {exp.code}
                    </span>
                    <span className="text-neutral-500">{exp.status}</span>
                  </div>

                  <div>
                    <h3 className="font-display text-xl uppercase tracking-[0.02em] text-white">
                      {exp.title}
                    </h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      {exp.domain}
                    </p>
                  </div>

                  <p className="text-[13px] leading-relaxed text-neutral-300">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 border-t border-white/[0.07] pt-3 text-[12px] text-neutral-400">
                    {exp.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#c4b5fd]/70" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {exp.repoUrl && (
                    <a
                      href={exp.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="open"
                      className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-200 hover:text-white"
                    >
                      <span>Repo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}

                  {exp.interactiveTrigger === 'cycle-finish' && (
                    <button
                      type="button"
                      data-cursor="explore"
                      onClick={() => {
                        onAudioCue(740);
                        onCycleFinish();
                      }}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#c4b5fd]/35 bg-[#c4b5fd]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#c4b5fd]/20"
                    >
                      <Sparkles className="h-3 w-3 text-[#c4b5fd]" aria-hidden="true" />
                      <span>Cycle Finish ({finish})</span>
                    </button>
                  )}

                  {exp.interactiveTrigger === 'open-command' && (
                    <button
                      type="button"
                      data-cursor="open"
                      onClick={() => {
                        onAudioCue(700);
                        onOpenCommandPalette();
                      }}
                      className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                    >
                      <span>Open ⌘K Index</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
