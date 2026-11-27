import { Suspense, lazy, useState } from 'react';
import { MarqueeBackdrop } from '@/components/animations/MarqueeBackdrop';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';
import { SideNavDots } from '@/components/navigation/SideNavDots';
import { TopNav } from '@/components/navigation/TopNav';
import { ContactSection } from '@/components/sections/ContactSection';
import { DisciplinesSection } from '@/components/sections/DisciplinesSection';
import { HomeSection } from '@/components/sections/HomeSection';
import { SystemsSection } from '@/components/sections/SystemsSection';
import { FallbackSculpture } from '@/components/three/FallbackSculpture';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useScrollController } from '@/hooks/useScrollState';
import type { MonolithFinish } from '@/types/portfolio';

const LazyPortfolioCanvas = lazy(() => import('@/scenes/PortfolioCanvas'));

function PortfolioShell() {
  const [finish, setFinish] = useState<MonolithFinish>('monolith');
  const reducedMotion = useReducedMotion();
  const { viewportProfile, qualityTier, dpr, webglSupported, isTouchPrimary } =
    useDeviceCapabilities();
  const { scrollProgressRef } = useScrollController();

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5]">
      {/* Accessible skip link for keyboard users */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-black"
      >
        Skip to content
      </a>

      {/* Subtle fixed ambient studio glow */}
      <div aria-hidden="true" className="studio-vignette pointer-events-none fixed inset-0 z-0" />

      {/* Background WEB / DEV kinetic typography */}
      <MarqueeBackdrop reducedMotion={reducedMotion} />

      {/* Lazy-loaded 3D stage with hardware-safe fallback */}
      <Suspense fallback={<FallbackSculpture />}>
        <LazyPortfolioCanvas
          scrollProgressRef={scrollProgressRef}
          finish={finish}
          dpr={dpr}
          qualityTier={qualityTier}
          viewportProfile={viewportProfile}
          reducedMotion={reducedMotion}
          isTouchPrimary={isTouchPrimary}
          webglSupported={webglSupported}
        />
      </Suspense>

      <TopNav reducedMotion={reducedMotion} />
      <SideNavDots />

      <main>
        <HomeSection reducedMotion={reducedMotion} />
        <SystemsSection
          finish={finish}
          onFinishChange={setFinish}
          reducedMotion={reducedMotion}
          isTouchPrimary={isTouchPrimary}
        />
        <DisciplinesSection reducedMotion={reducedMotion} />
        <ContactSection />
      </main>
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
