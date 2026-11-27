import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Layers,
  X,
} from 'lucide-react';
import { ProjectVisualStage } from '@/components/sections/ProjectVisualStage';
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
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/82 p-3 backdrop-blur-lg sm:p-6"
        >
          <motion.article
            data-lenis-prevent
            initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/15 bg-[#08080b] p-5 shadow-[0_32px_100px_rgba(0,0,0,0.92)] sm:p-8"
          >
            {/* 1–4. Number, Title, Category, Status & Short Intro */}
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 pb-5">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em]">
                  <span style={{ color: project.accentHex }}>
                    PROJECT {project.index} // {project.category}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2
                    id="case-study-title"
                    className="font-display text-3xl font-bold uppercase tracking-[0.02em] text-white sm:text-4xl"
                  >
                    {project.title}
                  </h2>
                  <span className="rounded-full border border-white/20 bg-white/[0.05] px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-200">
                    {project.status}
                  </span>
                </div>
                <p className="text-sm text-neutral-300">{project.shortIntro}</p>
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
              {/* Custom generative / diagrammatic visual composition (zero stock/project photos) */}
              <ProjectVisualStage project={project} reducedMotion={reducedMotion} />

              {/* 5. Detailed Overview */}
              <div className="space-y-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                <h3 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-neutral-400">
                  Overview
                </h3>
                {project.overview.map((p) => (
                  <p key={p} className="text-[13.5px] leading-[1.68] text-neutral-200">
                    {p}
                  </p>
                ))}
              </div>

              {/* 6 & 9. Motivation & Challenges */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/35 p-4">
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#d6b384]">
                    Motivation &amp; Problem
                  </h3>
                  <p className="text-[13px] leading-relaxed text-neutral-300">
                    {project.motivation}
                  </p>
                </div>

                <div className="space-y-2 rounded-xl border border-white/[0.08] bg-black/35 p-4">
                  <h3 className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber-300">
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                    Challenges
                  </h3>
                  <ul className="space-y-2 text-[13px] leading-relaxed text-neutral-300">
                    {project.challenges.map((c) => (
                      <li key={c} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 7 & 8. Technical Exploration & Architecture */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2.5 rounded-xl border border-white/[0.08] bg-black/35 p-4">
                  <h3 className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-[#79c8e8]">
                    <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                    Technical Exploration
                  </h3>
                  <ul className="space-y-2 text-[13px] leading-relaxed text-neutral-300">
                    {project.technicalExploration.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#79c8e8]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 10 & 12. Current Status & Next Development Direction */}
                <div className="flex flex-col justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/35 p-4">
                  <div className="space-y-2">
                    <h3 className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-neutral-200">
                      Current Status: {project.status}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-neutral-300">
                      {project.statusNote}
                    </p>
                  </div>

                  <div className="space-y-1.5 border-t border-white/[0.07] pt-3">
                    <h4 className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#d6b384]">
                      <Compass className="h-3 w-3" aria-hidden="true" />
                      Next Direction
                    </h4>
                    <p className="text-[12.5px] leading-relaxed text-neutral-400">
                      {project.nextDirection}
                    </p>
                  </div>
                </div>
              </div>

              {/* 11. Technologies & Verified Links */}
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
                      data-cursor="open"
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
                      data-cursor="open"
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#d6b384]/40 bg-[#d6b384]/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#d6b384]/25"
                    >
                      <span>Organization Site</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              {/* Prev / Next Navigation */}
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
