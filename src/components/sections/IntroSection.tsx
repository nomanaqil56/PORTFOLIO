import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';
import { KineticText } from '@/components/animations/KineticText';
import { Magnetic } from '@/components/interactions/MagneticButton';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { ProfilePortrait } from '@/components/ui/ProfilePortrait';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { OWNER_PROFILE } from '@/data/portfolio';
import { useScrollController } from '@/hooks/useScrollState';

interface IntroSectionProps {
  reducedMotion: boolean;
  isTouchPrimary: boolean;
  onAudioCue: (pitch?: number) => void;
}

export function IntroSection({
  reducedMotion,
  isTouchPrimary,
  onAudioCue,
}: IntroSectionProps) {
  const { scrollToSection } = useScrollController();
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !panelRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.95, ease: 'power3.out', delay: 0.25 },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="intro"
      data-section-id="intro"
      aria-label="Introduction"
      className="relative z-20 flex min-h-[100svh] flex-col justify-between px-4 pb-5 pt-16 sm:px-6 md:block md:h-[100svh] md:min-h-[650px] md:p-0"
    >
      {/* Signature tall vertical left glass plaque preserved from Slide1.html */}
      <div
        ref={panelRef}
        className="w-full max-w-md md:absolute md:bottom-5 md:left-4 md:top-16 md:w-[clamp(278px,27vw,356px)] md:max-w-none lg:left-6"
      >
        <GlassPanel className="flex h-full flex-col justify-between gap-4 p-4 sm:gap-5 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-2 border-b border-white/[0.08] pb-3.5 sm:pb-4">
              <SectionEyebrow text="01 / Introduction" />
              <h1 className="kinetic-headline font-display text-3xl font-bold uppercase tracking-[0.03em] text-white sm:text-4xl">
                <KineticText
                  text={OWNER_PROFILE.name}
                  mode="chars"
                  reducedMotion={reducedMotion}
                  immediate
                  delay={0.35}
                />
              </h1>
              <p className="font-mono text-[10.5px] uppercase leading-relaxed tracking-[0.14em] text-[#d6b384]">
                {OWNER_PROFILE.roleHeadline}
              </p>
            </div>

            <div className="space-y-2.5">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-neutral-400">
                {OWNER_PROFILE.degree}
              </h2>
              <p className="text-[13.5px] leading-[1.6] text-neutral-200/95 sm:text-[14px]">
                {OWNER_PROFILE.introHook}
              </p>
            </div>
          </div>

          <div className="space-y-3.5 border-t border-white/[0.08] pt-3.5 sm:pt-4">
            <p className="font-mono text-[11px] leading-relaxed text-neutral-400">
              &ldquo;{OWNER_PROFILE.philosophy}&rdquo;
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Magnetic disabled={reducedMotion || isTouchPrimary} cursor="explore">
                <button
                  type="button"
                  onClick={() => {
                    onAudioCue(660);
                    scrollToSection('about');
                  }}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d6b384]/60 hover:bg-white/10"
                >
                  <span>Enter Experience</span>
                  <ArrowDownRight
                    className="h-3.5 w-3.5 text-[#d6b384] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </Magnetic>
            </div>
          </div>
        </GlassPanel>
      </div>

      {/* Bottom-center subtle scroll cue on desktop */}
      <div className="pointer-events-none hidden md:absolute md:bottom-6 md:left-1/2 md:flex md:-translate-x-1/2 md:flex-col md:items-center md:gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-neutral-500">
          Scroll to Explore
        </span>
        <span className="h-5 w-px bg-gradient-to-b from-white/40 to-transparent" />
      </div>

      {/* Bottom-right circular portrait preserved from Slide1.html */}
      <div className="mt-4 flex items-end justify-end md:mt-0 md:block">
        <div
          data-cursor="view"
          className="md:absolute md:bottom-5 md:right-12 lg:right-16"
        >
          <ProfilePortrait
            reducedMotion={reducedMotion}
            className="h-36 w-36 sm:h-48 sm:w-48 md:h-[clamp(200px,22vw,300px)] md:w-[clamp(200px,22vw,300px)]"
          />
        </div>
      </div>
    </section>
  );
}
