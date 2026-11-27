import { useState } from 'react';
import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from 'lucide-react';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { OWNER_PROFILE } from '@/data/portfolio';
import { useScrollController } from '@/hooks/useScrollState';

export function ContactSection() {
  const { scrollToSection } = useScrollController();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback: focus mailto action if clipboard access is denied
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
              <SectionEyebrow text="04 / Connect" />
              <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-bold uppercase leading-[0.96] tracking-[-0.02em] text-white">
                Let&apos;s Build Something Intentional
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                Open to connecting around creative web engineering, 3D graphics, and AI &amp; Data Science collaborations.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/35 p-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${OWNER_PROFILE.email}`}
                    className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#d6b384]"
                  >
                    <Mail className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                    <span className="truncate">{OWNER_PROFILE.email}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex cursor-pointer items-center gap-1.5 self-start rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-neutral-200 transition-colors hover:border-white/30 hover:text-white"
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
              </div>

              <a
                href={OWNER_PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/35 p-4 transition-colors hover:border-white/25"
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                    GitHub
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
                  View Source &amp; Experiments
                </span>
              </a>
            </div>
          </div>
        </GlassPanel>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500">
          <span>
            {OWNER_PROFILE.name} &middot; {new Date().getFullYear()}
          </span>
          <button
            type="button"
            onClick={() => scrollToSection('home')}
            className="inline-flex cursor-pointer items-center gap-1.5 text-neutral-400 transition-colors hover:text-white"
          >
            <span>Back to Top</span>
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </footer>
      </div>
    </section>
  );
}
