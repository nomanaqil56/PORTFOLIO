import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProfilePortrait } from '@/components/ui/ProfilePortrait';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { OWNER_PROFILE } from '@/data/portfolio';
import { useScrollController } from '@/hooks/useScrollState';

interface HomeSectionProps {
  reducedMotion: boolean;
}

export function HomeSection({ reducedMotion }: HomeSectionProps) {
  const { scrollToSection } = useScrollController();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="home"
      data-section-id="home"
      aria-label="Home and About"
      className="relative z-20 flex min-h-[100svh] flex-col justify-between px-4 pb-5 pt-14 sm:px-6 md:block md:h-[100svh] md:min-h-[640px] md:p-0"
    >
      {/* Left vertical glass panel preserving Slide1.html's signature composition */}
      <div
        ref={panelRef}
        className="w-full max-w-md md:absolute md:bottom-5 md:left-4 md:top-16 md:w-[clamp(268px,26vw,336px)] md:max-w-none lg:left-6"
      >
        <GlassPanel className="flex h-full flex-col justify-between gap-4 p-4 sm:gap-6 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1.5 border-b border-white/[0.08] pb-3 sm:space-y-2 sm:pb-4">
              <SectionEyebrow text="01 / Identity" />
              <h1 className="font-display text-2xl font-semibold uppercase tracking-[0.04em] text-white sm:text-3xl">
                {OWNER_PROFILE.name}
              </h1>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#d6b384]">
                {OWNER_PROFILE.eyebrow}
              </p>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400">
                {OWNER_PROFILE.aboutTitle}
              </h2>
              {OWNER_PROFILE.aboutParagraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[13px] leading-[1.55] text-neutral-200/90 sm:text-[14px] sm:leading-[1.6]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="space-y-3 border-t border-white/[0.08] pt-3 sm:space-y-4 sm:pt-4">
            <p className="text-xs leading-relaxed text-neutral-400">
              {OWNER_PROFILE.manifesto}
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('systems')}
              className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-neutral-200 transition-colors hover:text-white"
            >
              <span>Explore Systems</span>
              <ArrowDownRight
                className="h-3.5 w-3.5 text-[#d6b384] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </GlassPanel>
      </div>

      {/* Bottom composition on mobile: left space stays open for 3D monolith beside circular portrait */}
      <div className="mt-4 flex items-end justify-end md:mt-0 md:block">
        <div className="md:absolute md:bottom-5 md:right-12 lg:right-16">
          <ProfilePortrait
            reducedMotion={reducedMotion}
            className="h-36 w-36 sm:h-48 sm:w-48 md:h-[clamp(200px,22vw,300px)] md:w-[clamp(200px,22vw,300px)]"
          />
        </div>
      </div>
    </section>
  );
}
