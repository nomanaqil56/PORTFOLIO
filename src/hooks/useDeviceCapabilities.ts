import { useEffect, useState } from 'react';
import type { QualityTier, ViewportProfile } from '@/types/portfolio';

export interface DeviceCapabilities {
  viewportProfile: ViewportProfile;
  qualityTier: QualityTier;
  dpr: [number, number];
  webglSupported: boolean;
  isTouchPrimary: boolean;
}

function detectWebGLSupport(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return false;
  }

  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('webgl', { failIfMajorPerformanceCaveat: false }) ||
      canvas.getContext('experimental-webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

function getViewportProfile(width: number): ViewportProfile {
  if (width < 768) return 'mobile';
  if (width < 1100) return 'tablet';
  return 'desktop';
}

function resolveQualityTier(viewport: ViewportProfile): QualityTier {
  if (typeof navigator === 'undefined') return 'medium';

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;

  if (viewport === 'mobile' || cores <= 2 || memory <= 2) {
    return 'low';
  }
  if (viewport === 'tablet' || cores <= 4 || memory <= 4) {
    return 'medium';
  }
  return 'high';
}

function resolveDpr(quality: QualityTier): [number, number] {
  if (quality === 'low') return [1, 1.25];
  if (quality === 'medium') return [1, 1.5];
  return [1, 1.75];
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities>(() => {
    const width = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const viewportProfile = getViewportProfile(width);
    const qualityTier = resolveQualityTier(viewportProfile);
    const isTouchPrimary =
      typeof window !== 'undefined' && typeof window.matchMedia === 'function'
        ? window.matchMedia('(pointer: coarse)').matches
        : false;

    return {
      viewportProfile,
      qualityTier,
      dpr: resolveDpr(qualityTier),
      webglSupported: detectWebGLSupport(),
      isTouchPrimary,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const nextViewport = getViewportProfile(window.innerWidth);
      const nextQuality = resolveQualityTier(nextViewport);
      const nextTouch =
        typeof window.matchMedia === 'function'
          ? window.matchMedia('(pointer: coarse)').matches
          : false;

      setCapabilities((prev) => {
        if (
          prev.viewportProfile === nextViewport &&
          prev.qualityTier === nextQuality &&
          prev.isTouchPrimary === nextTouch
        ) {
          return prev;
        }
        return {
          ...prev,
          viewportProfile: nextViewport,
          qualityTier: nextQuality,
          dpr: resolveDpr(nextQuality),
          isTouchPrimary: nextTouch,
        };
      });
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return capabilities;
}
