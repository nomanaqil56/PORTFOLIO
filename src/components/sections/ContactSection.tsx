import { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Command, Copy, Mail } from 'lucide-react';
import { KineticText } from '@/components/animations/KineticText';
import { Magnetic } from '@/components/interactions/MagneticButton';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { OWNER_PROFILE } from '@/data/portfolio';
import { useScrollController } from '@/hooks/useScrollState';

interface ContactSectionProps {
  reducedMotion: boolean;
  isTouchPrimary: boolean;
  onOpenCommandPalette: () => void;
  onAudioCue: (pitch?: number) => void;
}

export function ContactSection({
  reducedMotion,
  isTouchPrimary,
  onOpenCommandPalette,
  onAudioCue,
}: ContactSectionProps) {
  const { scrollToSection } = useScrollController();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    onAudioCue(780);
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${OWNER_PROFILE.email}`;
    }
  };

  return (
    <section
      id="contact"
      data-section-id="contact"
      aria-label="Contact"
      className="relative z-20 flex min-h-[100svh] flex-col justify-end px-4 pb-10 pt-56 sm:px-8 md:px-12"
    >
      <div className="mx-auto w-full max-w-3xl">
        <GlassPanel className="p-6 sm:p-8 md:p-10">
          <div className="space-y-6">
            <div className="space-y-3">
              <SectionEyebrow text="07 / Connect" />
              <h2 className="kinetic-headline font-display text-[clamp(2.4rem,5.2vw,4.25rem)] font-bold uppercase leading-[0.95] tracking-[-0.02em] text-white">
                <KineticText
                  text="LET'S BUILD SOMETHING INTENTIONAL"
                  mode="words"
                  reducedMotion={reducedMotion}
                />
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                Open to conversations around software engineering, AI workflows, interactive web systems, 3D graphics, and Android development.
              </p>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <div className="flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/40 p-4">
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Verified Email
                  </span>
                  <a
                    href={`mailto:${OWNER_PROFILE.email}`}
                    data-cursor="open"
                    className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#d6b384]"
                  >
                    <Mail className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                    <span className="truncate">{OWNER_PROFILE.email}</span>
                  </a>
                </div>

                <Magnetic disabled={reducedMotion || isTouchPrimary} cursor="copy">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-neutral-200 transition-colors hover:border-[#d6b384]/50 hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#d6b384]" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>

              <a
                href={OWNER_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="open"
                className="group flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/40 p-4 transition-colors hover:border-white/25"
              >
                <div className="space-y-1.5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    GitHub Profile
                  </span>
                  <div className="flex items-center justify-between gap-2 text-sm font-medium text-white">
                    <span>@{OWNER_PROFILE.githubHandle}</span>
                    <ArrowUpRight
                      className="h-4 w-4 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-neutral-400 group-hover:text-neutral-200">
                  Explore Repositories &amp; Source
                </span>
              </a>
            </div>
          </div>
        </GlassPanel>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
          <span>
            {OWNER_PROFILE.name} &middot; {new Date().getFullYear()}
          </span>

          <div className="flex items-center gap-5">
            <button
              type="button"
              data-cursor="magnet"
              onClick={onOpenCommandPalette}
              className="hidden cursor-pointer items-center gap-1.5 text-neutral-400 transition-colors hover:text-white sm:inline-flex"
            >
              <Command className="h-3 w-3" aria-hidden="true" />
              <span>Ctrl+K Index</span>
            </button>

            <button
              type="button"
              data-cursor="magnet"
              onClick={() => {
                onAudioCue(600);
                scrollToSection('intro');
              }}
              className="inline-flex cursor-pointer items-center gap-1.5 text-neutral-400 transition-colors hover:text-white"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </section>
  );
}
