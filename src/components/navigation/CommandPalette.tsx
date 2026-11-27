import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Box, Command, Compass, FolderGit2, Search, Volume2, VolumeX, X } from 'lucide-react';
import { SECTIONS } from '@/data/navigation';
import { MONOLITH_FINISHES, OWNER_PROFILE } from '@/data/portfolio';
import { FEATURED_PROJECTS } from '@/data/projects';
import type { MonolithFinish, ProjectCaseStudy, SectionId } from '@/types/portfolio';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (section: SectionId) => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  onFinishChange: (finish: MonolithFinish) => void;
  finish: MonolithFinish;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
}

interface PaletteEntry {
  id: string;
  group: string;
  label: string;
  hint: string;
  action: () => void;
}

export function CommandPalette({
  open,
  onClose,
  onNavigate,
  onSelectProject,
  onFinishChange,
  finish,
  soundEnabled,
  onToggleSound,
  reducedMotion,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const entries = useMemo<PaletteEntry[]>(() => {
    const navEntries: PaletteEntry[] = SECTIONS.map((sec) => ({
      id: `sec-${sec.id}`,
      group: 'Sections',
      label: `${sec.index} — ${sec.label}`,
      hint: 'Jump',
      action: () => {
        onNavigate(sec.id);
        onClose();
      },
    }));

    const projectEntries: PaletteEntry[] = FEATURED_PROJECTS.map((proj) => ({
      id: `proj-${proj.id}`,
      group: 'Case Studies',
      label: proj.title,
      hint: proj.domain,
      action: () => {
        onNavigate('projects');
        onSelectProject(proj);
        onClose();
      },
    }));

    const materialEntries: PaletteEntry[] = MONOLITH_FINISHES.map((opt) => ({
      id: `mat-${opt.id}`,
      group: '3D Stage',
      label: `Material: ${opt.label}`,
      hint: finish === opt.id ? 'Active' : 'Apply',
      action: () => {
        onFinishChange(opt.id);
        onClose();
      },
    }));

    const utilEntries: PaletteEntry[] = [
      {
        id: 'util-sound',
        group: 'Controls',
        label: soundEnabled ? 'Mute Ambient Audio' : 'Enable Ambient Audio',
        hint: soundEnabled ? 'On' : 'Off',
        action: () => {
          onToggleSound();
          onClose();
        },
      },
      {
        id: 'util-github',
        group: 'Links',
        label: `GitHub (@${OWNER_PROFILE.githubHandle})`,
        hint: 'External',
        action: () => {
          window.open(OWNER_PROFILE.githubUrl, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
    ];

    return [...navEntries, ...projectEntries, ...materialEntries, ...utilEntries];
  }, [finish, onClose, onFinishChange, onNavigate, onSelectProject, onToggleSound, soundEnabled]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q),
    );
  }, [entries, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
        );
      } else if (e.key === 'Enter' && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [filtered, onClose, open, selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Command Navigation"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/75 px-4 pt-20 backdrop-blur-md sm:pt-28"
        >
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, scale: 0.96, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, scale: 0.97, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-[#0a0a0d] shadow-[0_32px_90px_rgba(0,0,0,0.85)]"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3.5">
              <Search className="h-4 w-4 text-neutral-400" aria-hidden="true" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to section, case study, or 3D material..."
                aria-label="Search navigation commands"
                className="w-full bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close command menu"
                className="rounded-lg border border-white/10 p-1 text-neutral-400 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center font-mono text-xs text-neutral-500">
                  No matching destination found.
                </div>
              ) : (
                filtered.map((entry, idx) => {
                  const active = idx === selectedIndex;
                  const Icon =
                    entry.group === 'Case Studies'
                      ? FolderGit2
                      : entry.group === '3D Stage'
                        ? Box
                        : entry.id === 'util-sound'
                          ? soundEnabled
                            ? Volume2
                            : VolumeX
                          : entry.group === 'Links'
                            ? ArrowUpRight
                            : Compass;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={entry.action}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                        active ? 'bg-white/10 text-white' : 'text-neutral-300 hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-3.5 w-3.5 text-[#d6b384]" aria-hidden="true" />
                        <div>
                          <div className="text-xs font-medium">{entry.label}</div>
                          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
                            {entry.group}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400">
                        {entry.hint}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-500">
              <span className="inline-flex items-center gap-1.5">
                <Command className="h-3 w-3" aria-hidden="true" />
                Navigate with ↑ ↓ &amp; Enter
              </span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
