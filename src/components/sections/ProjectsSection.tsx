import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { KineticText } from '@/components/animations/KineticText';
import { Magnetic } from '@/components/interactions/MagneticButton';
import {
  AssistantOrbPreview,
  CueDropWidgetPreview,
  NovaHudPreview,
} from '@/components/sections/ProjectInteractivePreviews';
import { GlassPanel } from '@/components/ui/GlassPanel';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { FEATURED_PROJECTS } from '@/data/projects';
import type { ProjectCaseStudy } from '@/types/portfolio';

interface ProjectsSectionProps {
  reducedMotion: boolean;
  isTouchPrimary: boolean;
  onOpenProject: (project: ProjectCaseStudy) => void;
  onAudioCue: (pitch?: number) => void;
}

type FilterKey = 'all' | 'ai-3d' | 'android' | 'web';

const FILTERS: { id: FilterKey; label: string }[] = [
  { id: 'all', label: 'All (6)' },
  { id: 'ai-3d', label: 'AI & 3D' },
  { id: 'android', label: 'Android' },
  { id: 'web', label: 'Web & HUD' },
];

function matchesFilter(project: ProjectCaseStudy, filter: FilterKey): boolean {
  if (filter === 'all') return true;
  if (filter === 'ai-3d') {
    return project.id === 'blender-ai-studio' || project.id === 'nova-ui';
  }
  if (filter === 'android') {
    return project.id === 'minehost' || project.id === 'assistant-x' || project.id === 'cuedrop';
  }
  return project.id === 'nova-ui' || project.id === 'duaen-foundation';
}

export function ProjectsSection({
  reducedMotion,
  isTouchPrimary,
  onOpenProject,
  onAudioCue,
}: ProjectsSectionProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selectedId, setSelectedId] = useState<string>(FEATURED_PROJECTS[0].id);

  const visibleProjects = useMemo(
    () => FEATURED_PROJECTS.filter((proj) => matchesFilter(proj, filter)),
    [filter],
  );

  const activeProject =
    visibleProjects.find((proj) => proj.id === selectedId) ?? visibleProjects[0];

  const handleSelectFilter = (next: FilterKey) => {
    onAudioCue(650);
    setFilter(next);
    const firstMatch = FEATURED_PROJECTS.find((p) => matchesFilter(p, next));
    if (firstMatch) setSelectedId(firstMatch.id);
  };

  return (
    <section
      id="projects"
      data-section-id="projects"
      aria-label="Selected Projects"
      className="relative z-20 flex min-h-[100svh] items-center px-4 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl space-y-8">
        {/* Header & Category filter */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="space-y-3">
            <SectionEyebrow text="04 / Selected Works" />
            <h2 className="kinetic-headline font-display text-[clamp(2.35rem,5vw,4.1rem)] font-bold uppercase leading-[0.96] tracking-[-0.02em] text-white">
              <KineticText
                text="ENGINEERED CASE STUDIES"
                mode="words"
                reducedMotion={reducedMotion}
              />
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter projects by discipline"
            className="inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-[#0a0a0d]/85 p-1 backdrop-blur-md"
          >
            {FILTERS.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleSelectFilter(item.id)}
                  className={`relative cursor-pointer rounded-full px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors sm:px-3.5 sm:text-[10.5px] sm:tracking-[0.14em] ${
                    active ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={reducedMotion ? undefined : 'project-filter-pill'}
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-0 rounded-full border border-white/15 bg-white/10"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Split Case-Study Explorer */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left architectural project index */}
          <div className="space-y-2.5 lg:col-span-5">
            {visibleProjects.map((project) => {
              const isSelected = activeProject?.id === project.id;
              return (
                <button
                  key={project.id}
                  type="button"
                  data-cursor="explore"
                  onClick={() => {
                    onAudioCue(690);
                    setSelectedId(project.id);
                  }}
                  className={`group flex w-full cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? 'border-white/25 bg-white/[0.06] shadow-[0_16px_42px_rgba(0,0,0,0.45)]'
                      : 'border-white/[0.07] bg-[#09090c]/75 hover:border-white/20 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em]">
                      <span style={{ color: project.accentHex }}>{project.index}</span>
                      <span className="text-neutral-500">/</span>
                      <span className="text-neutral-400">{project.domain}</span>
                    </div>
                    <h3 className="font-display text-xl uppercase tracking-[0.02em] text-white sm:text-2xl">
                      {project.title}
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-neutral-400">
                      {project.subtitle}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wider ${
                      isSelected
                        ? 'border-white/25 bg-white/10 text-white'
                        : 'border-white/10 text-neutral-400'
                    }`}
                  >
                    {project.statusLabel}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right interactive spotlight pane */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? undefined : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <GlassPanel className="space-y-5 p-5 sm:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/[0.08] pb-4">
                      <div>
                        <span
                          className="font-mono text-[10.5px] uppercase tracking-[0.2em]"
                          style={{ color: activeProject.accentHex }}
                        >
                          {activeProject.timeframe} &middot; {activeProject.statusLabel}
                        </span>
                        <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-[0.02em] text-white sm:text-3xl">
                          {activeProject.title}
                        </h3>
                      </div>

                      <Magnetic disabled={reducedMotion || isTouchPrimary} cursor="open">
                        <button
                          type="button"
                          onClick={() => {
                            onAudioCue(760);
                            onOpenProject(activeProject);
                          }}
                          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-white transition-colors hover:border-[#d6b384]/60 hover:bg-white/15"
                        >
                          <span>Read Case Study</span>
                          <ArrowUpRight className="h-3.5 w-3.5 text-[#d6b384]" aria-hidden="true" />
                        </button>
                      </Magnetic>
                    </div>

                    <p className="text-[14px] leading-[1.68] text-neutral-200">
                      {activeProject.summary}
                    </p>

                    {/* Live interactive preview or authentic capture */}
                    {activeProject.interactivePreview === 'nova-hud' && (
                      <NovaHudPreview reducedMotion={reducedMotion} />
                    )}
                    {activeProject.interactivePreview === 'assistant-orb' && (
                      <AssistantOrbPreview reducedMotion={reducedMotion} />
                    )}
                    {activeProject.interactivePreview === 'cuedrop-widget' && (
                      <CueDropWidgetPreview />
                    )}

                    {activeProject.media && activeProject.media.length > 0 && (
                      <div className="grid gap-3 sm:grid-cols-2">
                        {activeProject.media.map((item) => (
                          <div
                            key={item.caption}
                            data-cursor="view"
                            onClick={() => onOpenProject(activeProject)}
                            className="group cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-black/50"
                          >
                            <div className="aspect-[16/10] w-full overflow-hidden bg-[#050507]">
                              <img
                                src={item.src}
                                alt={item.alt}
                                loading="lazy"
                                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeProject.id === 'duaen-foundation' && (
                      <div className="rounded-xl border border-[#e07a5f]/25 bg-black/35 p-4">
                        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#e07a5f]">
                          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Production Delivery Highlights</span>
                        </div>
                        <p className="mt-2 text-xs leading-relaxed text-neutral-300">
                          11-route React Router v7 architecture, custom Tailwind v4 palette (`#24324A` / `#C45D42` / `#F7F1E8`), extracted brand emblem from `Logo.pdf`, and transparent `CONTENT_VERIFICATION.md` launch audit.
                        </p>
                      </div>
                    )}

                    {/* Tech chips + Pipeline snapshot */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] pt-4">
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {activeProject.repoUrl && (
                        <a
                          href={activeProject.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="open"
                          className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-neutral-300 hover:text-white"
                        >
                          <span>Source</span>
                          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </GlassPanel>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
