import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { AtmosphereShader } from '@/components/three/AtmosphereShader';
import { FallbackSculpture } from '@/components/three/FallbackSculpture';
import { OrbitalParticles } from '@/components/three/OrbitalParticles';
import { SceneRig } from '@/components/three/SceneRig';
import { StudioEnvironment } from '@/components/three/StudioEnvironment';
import { WebGLErrorBoundary } from '@/components/three/WebGLErrorBoundary';
import type { MonolithFinish, QualityTier, ViewportProfile } from '@/types/portfolio';

interface PortfolioCanvasProps {
  scrollProgressRef: MutableRefObject<number>;
  scrollVelocityRef: MutableRefObject<number>;
  finish: MonolithFinish;
  dpr: [number, number];
  qualityTier: QualityTier;
  viewportProfile: ViewportProfile;
  reducedMotion: boolean;
  isTouchPrimary: boolean;
  webglSupported: boolean;
}

export default function PortfolioCanvas({
  scrollProgressRef,
  scrollVelocityRef,
  finish,
  dpr,
  qualityTier,
  viewportProfile,
  reducedMotion,
  isTouchPrimary,
  webglSupported,
}: PortfolioCanvasProps) {
  const [contextLost, setContextLost] = useState(false);
  const [canvasElement, setCanvasElement] = useState<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const accentColorRef = useRef(new THREE.Color('#d6b384'));

  useEffect(() => {
    if (reducedMotion || isTouchPrimary) {
      pointerRef.current = { x: 0, y: 0 };
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = THREE.MathUtils.clamp((event.clientX / window.innerWidth) * 2 - 1, -1, 1);
      pointerRef.current.y = THREE.MathUtils.clamp((event.clientY / window.innerHeight) * 2 - 1, -1, 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion, isTouchPrimary]);

  const handleCreated = useCallback(({ gl }: { gl: THREE.WebGLRenderer }) => {
    setCanvasElement(gl.domElement);
  }, []);

  useEffect(() => {
    if (!canvasElement) return;

    const onContextLost = (event: Event) => {
      event.preventDefault();
      setContextLost(true);
    };
    const onContextRestored = () => setContextLost(false);

    canvasElement.addEventListener('webglcontextlost', onContextLost);
    canvasElement.addEventListener('webglcontextrestored', onContextRestored);
    return () => {
      canvasElement.removeEventListener('webglcontextlost', onContextLost);
      canvasElement.removeEventListener('webglcontextrestored', onContextRestored);
    };
  }, [canvasElement]);

  if (!webglSupported || contextLost) {
    return <FallbackSculpture />;
  }

  return (
    <WebGLErrorBoundary fallback={<FallbackSculpture />}>
      <div
        id="canvas-container"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10"
      >
        <Canvas
          dpr={dpr}
          camera={{ fov: 45, near: 0.1, far: 100, position: [3.5, 1.55, 0.25] }}
          gl={{
            alpha: true,
            antialias: qualityTier !== 'low',
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.05,
          }}
          onCreated={handleCreated}
        >
          <Suspense fallback={null}>
            <AtmosphereShader
              quality={qualityTier}
              reducedMotion={reducedMotion}
              pointerRef={pointerRef}
              scrollProgressRef={scrollProgressRef}
              accentColorRef={accentColorRef}
            />
            <StudioEnvironment quality={qualityTier} accentColorRef={accentColorRef} />
            <SceneRig
              scrollProgressRef={scrollProgressRef}
              scrollVelocityRef={scrollVelocityRef}
              pointerRef={pointerRef}
              accentColorRef={accentColorRef}
              finish={finish}
              viewportProfile={viewportProfile}
              qualityTier={qualityTier}
              reducedMotion={reducedMotion}
              isTouchPrimary={isTouchPrimary}
            />
            <OrbitalParticles quality={qualityTier} reducedMotion={reducedMotion} />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
