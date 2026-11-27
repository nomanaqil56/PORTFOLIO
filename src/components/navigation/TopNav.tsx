import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { SECTIONS } from '@/data/navigation';
import { OWNER_PROFILE } from '@/data/portfolio';
import { useScrollController } from '@/hooks/useScrollState';
import type { SectionId } from '@/types/portfolio';

interface TopNavProps {
  reducedMotion: boolean;
}

export function TopNav({ reducedMotion }: TopNavProps) {
  const { activeSection, scrollToSection } = useScrollController();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (sectionId: SectionId) => {
    setMobileMenuOpen(false);
    scrollToSection(sectionId);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      <div className="bg-gradient-to-b from-[#050505]/90 via-[#050505]/45 to-transparent px-4 pb-5 pt-4 sm:px-8 sm:pt-5">
        <nav
          aria-label="Primary Navigation"
          className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between sm:justify-center"
        >
          {/* Compact mobile brand anchor */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-300 transition-colors hover:text-white sm:hidden"
          >
            NA // 01
          </button>

          {/* Desktop centered minimal navigation preserving original spacing */}
          <div className="hidden items-center gap-7 sm:flex">
            {SECTIONS.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => handleNavigate(section.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative cursor-pointer py-1 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-100'
                  }`}
                >
                  {section.navLabel}
                  {isActive && (
                    <motion.span
                      layoutId={reducedMotion ? undefined : 'top-nav-underline'}
                      transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                      className="absolute inset-x-0 -bottom-0.5 h-px bg-white/85"
                    />
                  )}
                </button>
              );
            })}

            <span className="h-3 w-px bg-white/15" aria-hidden="true" />

            <a
              href={OWNER_PROFILE.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 py-1 text-[12px] font-medium uppercase tracking-[0.16em] text-neutral-400 transition-colors duration-300 hover:text-white"
            >
              GITHUB
              <ArrowUpRight className="h-3.5 w-3.5 text-neutral-500" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile drawer trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neutral-200 backdrop-blur-md transition-colors hover:border-white/25 hover:text-white sm:hidden"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {/* Mobile navigation drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={reducedMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto mt-3 rounded-2xl border border-white/10 bg-[#0b0b0d]/95 p-4 backdrop-blur-xl sm:hidden"
            >
              <div className="flex flex-col gap-2">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => handleNavigate(section.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-neutral-400 hover:bg-white/[0.04] hover:text-white'
                      }`}
                    >
                      <span>{section.navLabel}</span>
                      <span className="font-mono text-[10px] text-neutral-500">{section.index}</span>
                    </button>
                  );
                })}
                <a
                  href={OWNER_PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-1 flex items-center justify-between rounded-xl border border-white/10 px-3 py-2.5 text-xs uppercase tracking-[0.18em] text-neutral-300 hover:text-white"
                >
                  <span>GITHUB</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
