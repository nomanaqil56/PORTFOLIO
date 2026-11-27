import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectShowcaseSlot } from '@/components/sections/ProjectShowcaseSlot';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { DISCIPLINES } from '@/data/portfolio';
import { PROJECTS } from '@/data/projects';

interface DisciplinesSectionProps {
  reducedMotion: boolean;
}

export function DisciplinesSection({ reducedMotion }: DisciplinesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !stackRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const items = stackRef.current?.querySelectorAll('[data-discipline-card]');
      if (!items?.length) return;

      gsap.fromTo(
        items,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
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

  return (
    <section
      ref={sectionRef}
      id="disciplines"
      data-section-id="disciplines"
      aria-label="Disciplines and Works"
      className="relative z-20 flex min-h-[100svh] items-center px-4 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        {/* Top breathing space on mobile for centered 3D object */}
        <div className="h-32 sm:h-40 md:hidden" aria-hidden="true" />

        <div ref={stackRef} className="w-full space-y-5 md:ml-auto md:w-[54%] lg:w-[50%]">
          <div data-discipline-card className="space-y-3">
            <SectionEyebrow text="03 / Craft & Works" />
            <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.5rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em] text-white">
              Design Meets Engineering
            </h2>
          </div>

          <div className="grid gap-3.5">
            {DISCIPLINES.map((discipline) => (
              <div key={discipline.id} data-discipline-card>
                <GlassPanel className="p-5 transition-colors duration-300 hover:border-white/20">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[11px] text-[#d6b384]">
                          {discipline.code}
                        </span>
                        <h3 className="font-display text-lg font-medium uppercase tracking-[0.03em] text-white sm:text-xl">
                          {discipline.title}
                        </h3>
                      </div>
                      <p className="text-[13.5px] leading-relaxed text-neutral-300">
                        {discipline.summary}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3.5 flex flex-wrap gap-2">
                    {discipline.keywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </GlassPanel>
              </div>
            ))}
          </div>

          <div data-discipline-card>
            <ProjectShowcaseSlot projects={PROJECTS} />
          </div>
        </div>
      </div>
    </section>
  );
}
