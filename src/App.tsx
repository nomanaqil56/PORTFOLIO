import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { IntroCurtain } from '@/components/animations/IntroCurtain';
import { MarqueeBackdrop } from '@/components/animations/MarqueeBackdrop';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';
import { CustomCursor } from '@/components/interactions/CustomCursor';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import { ScrollProgressBar } from '@/components/navigation/ScrollProgressBar';
import { SideNavDots } from '@/components/navigation/SideNavDots';
import { TopNav } from '@/components/navigation/TopNav';
import { AboutSection } from '@/components/sections/AboutSection';
import { CapabilitiesSection } from '@/components/sections/CapabilitiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ExperimentsSection } from '@/components/sections/ExperimentsSection';
import { IntroSection } from '@/components/sections/IntroSection';
import { JourneySection } from '@/components/sections/JourneySection';
import { ProjectCaseStudyModal } from '@/components/sections/ProjectCaseStudyModal';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { FallbackSculpture } from '@/components/three/FallbackSculpture';
import { FEATURED_PROJECTS } from '@/data/projects';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollController } from '@/hooks/useScrollState';
import type { MonolithFinish, ProjectCaseStudy } from '@/types/portfolio';

const LazyPortfolioCanvas = lazy(() => import('@/scenes/PortfolioCanvas'));

const FINISH_CYCLE: MonolithFinish[] = ['monolith', 'wireframe', 'optics'];

function PortfolioShell() {
  const [finish, setFinish] = useState<MonolithFinish>('monolith');
  const [commandOpen, setCommandOpen] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState<ProjectCaseStudy | null>(null);

  const reducedMotion = useReducedMotion();
  const { viewportProfile, qualityTier, dpr, webglSupported, isTouchPrimary } =
    useDeviceCapabilities();
  const { scrollProgressRef, scrollVelocityRef, scrollToSection } = useScrollController();
  const { soundEnabled, toggleSound, playCue } = useAudioFeedback(reducedMotion);

  const handleCycleFinish = useCallback(() => {
    setFinish((prev) => FINISH_CYCLE[(FINISH_CYCLE.indexOf(prev) + 1) % FINISH_CYCLE.length]);
  }, []);

  const handleStepCaseStudy = useCallback(
    (direction: 'prev' | 'next') => {
      if (!activeCaseStudy) return;
      const idx = FEATURED_PROJECTS.findIndex((p) => p.id === activeCaseStudy.id);
      if (idx === -1) return;
      const delta = direction === 'next' ? 1 : -1;
      const nextIdx = (idx + delta + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length;
      setActiveCaseStudy(FEATURED_PROJECTS[nextIdx]);
    },
    [activeCaseStudy],
  );

  // Global Ctrl+K / Cmd+K shortcut for Command Palette
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5]">
      <IntroCurtain reducedMotion={reducedMotion} />

      <CustomCursor disabled={reducedMotion || isTouchPrimary} />
      <ScrollProgressBar scrollProgressRef={scrollProgressRef} />

      <a
        href="#intro"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      {/* Atmospheric layered grid & vignette */}
      <div aria-hidden="true" className="architectural-grid pointer-events-none fixed inset-0 z-0 opacity-60" />
      <div aria-hidden="true" className="studio-vignette pointer-events-none fixed inset-0 z-0" />

      {/* Evolved WEB / DEV kinetic background */}
      <MarqueeBackdrop reducedMotion={reducedMotion} />

      {/* Lazy-loaded interactive WebGL stage */}
      <Suspense fallback={<FallbackSculpture />}>
        <LazyPortfolioCanvas
          scrollProgressRef={scrollProgressRef}
          scrollVelocityRef={scrollVelocityRef}
          finish={finish}
          dpr={dpr}
          qualityTier={qualityTier}
          viewportProfile={viewportProfile}
          reducedMotion={reducedMotion}
          isTouchPrimary={isTouchPrimary}
          webglSupported={webglSupported}
        />
      </Suspense>

      <TopNav
        reducedMotion={reducedMotion}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        onOpenCommandPalette={() => setCommandOpen(true)}
        onAudioCue={playCue}
      />

      <SideNavDots onAudioCue={playCue} />

      <main>
        <IntroSection
          reducedMotion={reducedMotion}
          isTouchPrimary={isTouchPrimary}
          onAudioCue={playCue}
        />
        <AboutSection
          finish={finish}
          onFinishChange={setFinish}
          reducedMotion={reducedMotion}
          isTouchPrimary={isTouchPrimary}
          onAudioCue={playCue}
        />
        <CapabilitiesSection reducedMotion={reducedMotion} onAudioCue={playCue} />
        <ProjectsSection
          reducedMotion={reducedMotion}
          isTouchPrimary={isTouchPrimary}
          onOpenProject={setActiveCaseStudy}
          onAudioCue={playCue}
        />
        <ExperimentsSection
          finish={finish}
          onCycleFinish={handleCycleFinish}
          onOpenCommandPalette={() => setCommandOpen(true)}
          reducedMotion={reducedMotion}
          onAudioCue={playCue}
        />
        <JourneySection reducedMotion={reducedMotion} onAudioCue={playCue} />
        <ContactSection
          reducedMotion={reducedMotion}
          isTouchPrimary={isTouchPrimary}
          onOpenCommandPalette={() => setCommandOpen(true)}
          onAudioCue={playCue}
        />
      </main>

      <ProjectCaseStudyModal
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onStepProject={handleStepCaseStudy}
        reducedMotion={reducedMotion}
      />

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={scrollToSection}
        onSelectProject={setActiveCaseStudy}
        onFinishChange={setFinish}
        finish={finish}
        soundEnabled={soundEnabled}
        onToggleSound={toggleSound}
        reducedMotion={reducedMotion}
      />
    </div>
  );
}

export function App() {
  const reducedMotion = useReducedMotion();

  return (
    <SmoothScrollProvider reducedMotion={reducedMotion}>
      <PortfolioShell />
    </SmoothScrollProvider>
  );
}

export default App;
