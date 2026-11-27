import { ArrowUpRight, FolderGit2 } from 'lucide-react';
import { OWNER_PROFILE } from '@/data/portfolio';
import type { ProjectEntry } from '@/types/portfolio';

interface ProjectShowcaseSlotProps {
  projects: ProjectEntry[];
}

/**
 * Future-ready works container.
 * Renders interactive project cards once real `ProjectEntry` data is supplied,
 * or displays an authentic GitHub repository archive card when empty.
 */
export function ProjectShowcaseSlot({ projects }: ProjectShowcaseSlotProps) {
  if (projects.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#d6b384]">
              <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Selected Works Archive</span>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-neutral-300">
              Project case studies are being curated. Explore source experiments and ongoing work directly on GitHub.
            </p>
          </div>

          <a
            href={OWNER_PROFILE.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white transition-all hover:border-white/35 hover:bg-white/10 sm:self-center"
          >
            <span>@{OWNER_PROFILE.githubHandle}</span>
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      {projects.map((project) => (
        <article
          key={project.id}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-md transition-colors hover:border-white/20"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl uppercase tracking-wide text-white">
              {project.title}
            </h3>
            <span className="font-mono text-[11px] text-neutral-400">{project.year}</span>
          </div>
          <p className="mt-2 text-sm text-neutral-300">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
