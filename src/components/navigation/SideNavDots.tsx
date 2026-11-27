import type { KeyboardEvent } from 'react';
import { SECTIONS } from '@/data/navigation';
import { useScrollController } from '@/hooks/useScrollState';

export function SideNavDots() {
  const { activeSection, scrollToSection } = useScrollController();

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      const next = SECTIONS[(index + 1) % SECTIONS.length];
      scrollToSection(next.id);
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const prev = SECTIONS[(index - 1 + SECTIONS.length) % SECTIONS.length];
      scrollToSection(prev.id);
    }
  };

  return (
    <nav
      aria-label="Section progress navigation"
      className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 sm:block md:right-6"
    >
      <div className="side-pill-surface flex flex-col items-center justify-evenly gap-3.5 rounded-full px-2 py-3.5">
        {SECTIONS.map((section, idx) => {
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              onKeyDown={(event) => handleKeyDown(event, idx)}
              aria-label={`Jump to ${section.label}`}
              aria-current={isActive ? 'step' : undefined}
              className="group relative flex h-4 w-4 cursor-pointer items-center justify-center rounded-full"
            >
              {/* Hover label tooltip */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-7 whitespace-nowrap rounded-md border border-white/10 bg-[#0b0b0e]/90 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-200 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 translate-x-1"
              >
                {section.navLabel}
              </span>

              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-2 w-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.75)]'
                    : 'h-1.5 w-1.5 bg-neutral-400/50 group-hover:bg-neutral-200/85'
                }`}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
