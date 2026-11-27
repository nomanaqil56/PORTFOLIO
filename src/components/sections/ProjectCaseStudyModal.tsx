import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Info, Layers, X } from 'lucide-react';
import {
  AssistantOrbPreview,
  CueDropWidgetPreview,
  NovaHudPreview,
} from '@/components/sections/ProjectInteractivePreviews';
import type { ProjectCaseStudy } from '@/types/portfolio';

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
  onStepProject: (direction: 'prev' | 'next') => void;
  reducedMotion: boolean;
}

export function ProjectCaseStudyModal({
  project,
  onClose,
  onStepProject,
  reducedMotion,
}: ProjectCaseStudyModalProps) {
  useEffect(() => {
    if (!project) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        onStepProject('next');
      } else if (e.key === 'ArrowLeft') {
        onStepProject('prev');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose, onStepProject, project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-3 backdrop-blur-lg sm:p-6"
        >
          <motion.article
            data-lenis-prevent
            initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#09090c] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.9)] sm:p-8"
          >
            {/* Header bar */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em]">
                  <span style={{ color: project.accentHex }}>{project.index} // {project.domain}</span>
                  <span className="text-neutral-600">&middot;</span>
                  <span className="text-neutral-400">{project.timeframe}</span>
                  <span className="rounded-full border border-white/15 bg-white/[0.04] px-2.5 py-0.5 text-[9.5px] text-neutral-200">
                    {project.statusLabel}
                  </span>
                </div>
                <h2
                  id="case-study-title"
                  className="font-display text-3xl font-bold uppercase tracking-[0.02em] text-white sm:text-4xl"
                >
                  {project.title}
                </h2>
                <p className="text-sm text-neutral-300">{project.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-neutral-300 transition-colors hover:border-white/35 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Interactive widget or verified project captures */}
              {project.interactivePreview === 'nova-hud' && (
                <NovaHudPreview reducedMotion={reducedMotion} />
              )}
              {project.interactivePreview === 'assistant-orb' && (
                <AssistantOrbPreview reducedMotion={reducedMotion} />
              )}
              {project.interactivePreview === 'cuedrop-widget' && <CueDropWidgetPreview />}

              {project.media && project.media.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.media.map((item) => (
                    <figure
                      key={item.caption}
                      className="overflow-hidden rounded-xl border border-white/10 bg-black/50"
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#050507]">
                        <img
                          src={item.src}
                          alt={item.alt}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <figcaption className="border-t border-white/[0.06] px-3.5 py-2.5 font-mono text-[10.5px] leading-relaxed text-neutral-400">
                        {item.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              )}

              {/* Architecture pipeline */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
                  <Layers className="h-3.5 w-3.5 text-[#d6b384]" aria-hidden="true" />
                  <span>System Pipeline</span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-4">
                  {project.architecturePipeline.map((step, i) => (
                    <div
                      key={step}
                      className="rounded-lg border border-white/[0.07] bg-black/45 px-3 py-2 font-mono text-[11px] text-neutral-200"
                    >
                      <span className="mr-1.5 text-neutral-500">0{i + 1}</span>
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* Problem & Technical Approach */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/30 p-4">
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#d6b384]">
                    Problem &amp; Motivation
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-neutral-300">
                    {project.motivation}
                  </p>
                </div>

                <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/30 p-4">
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#79c8e8]">
                    Technical Approach
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-neutral-300">
                    {project.approach}
                  </p>
                </div>
              </div>

              {/* Implemented vs Scope / Limitations */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2.5 rounded-xl border border-white/[0.08] bg-black/30 p-4">
                  <h3 className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-neutral-200">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                    Implemented &amp; Verified
                  </h3>
                  <ul className="space-y-2 text-[13px] leading-relaxed text-neutral-300">
                    {project.implementedDetails.map((detail) => (
                      <li key={detail} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2.5 rounded-xl border border-white/[0.08] bg-black/30 p-4">
                  <h3 className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-neutral-200">
                    <Info className="h-3.5 w-3.5 text-[#d6b384]" aria-hidden="true" />
                    Scope, Constraints &amp; Open Work
                  </h3>
                  <ul className="space-y-2 text-[13px] leading-relaxed text-neutral-400">
                    {project.limitationsOrScope.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#d6b384]/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech tags & External links */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/[0.06] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:border-white/40 hover:bg-white/12"
                    >
                      <span>GitHub Repo</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#d6b384]/40 bg-[#d6b384]/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#d6b384]/25"
                    >
                      <span>Organization Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              {/* Prev / Next case study footer */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400">
                <button
                  type="button"
                  onClick={() => onStepProject('prev')}
                  className="inline-flex cursor-pointer items-center gap-1.5 hover:text-white"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Previous Project</span>
                </button>
                <button
                  type="button"
                  onClick={() => onStepProject('next')}
                  className="inline-flex cursor-pointer items-center gap-1.5 hover:text-white"
                >
                  <span>Next Project</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
