import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { KineticMonolith } from '@/components/three/KineticMonolith';
import { createSampledStageTargets, sampleStagePose } from '@/components/three/stagePoses';
import type { MonolithFinish, QualityTier, ViewportProfile } from '@/types/portfolio';

interface SceneRigProps {
  stageProgressRef: MutableRefObject<number>;
  scrollVelocityRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  dragOffsetRef: MutableRefObject<{ yaw: number; pitch: number }>;
  accentColorRef: MutableRefObject<THREE.Color>;
  accentOverrideHex: string | null;
  spinMultiplier: number;
  finish: MonolithFinish;
  viewportProfile: ViewportProfile;
  qualityTier: QualityTier;
  reducedMotion: boolean;
  isTouchPrimary: boolean;
}

/**
 * Authoritative 3D synchronization rig:
 * - `stageGroupRef` is driven directly (zero exponential chasing lag) from layout-anchored `stageProgressRef`
 *   plus a one-shot GSAP entrance timeline on initial mount.
 * - `interactionGroupRef` isolates cursor parallax, user drag rotation, and subtle idle float so
 *   secondary interactions never overwrite authoritative stage positioning.
 */
export function SceneRig({
  stageProgressRef,
  scrollVelocityRef,
  pointerRef,
  dragOffsetRef,
  accentColorRef,
  accentOverrideHex,
  spinMultiplier,
  finish,
  viewportProfile,
  qualityTier,
  reducedMotion,
  isTouchPrimary,
}: SceneRigProps) {
  const stageGroupRef = useRef<THREE.Group>(null);
  const interactionGroupRef = useRef<THREE.Group>(null);
  const smoothPointerRef = useRef({ x: 0, y: 0 });
  const overrideColor = useMemo(() => new THREE.Color(), []);
  const sampledTargets = useMemo(() => createSampledStageTargets(), []);
  const entranceRef = useRef({
    scaleMult: reducedMotion ? 1 : 0.72,
    yOffset: reducedMotion ? 0 : -0.35,
    rotOffset: reducedMotion ? 0 : -0.55,
  });

  const { camera, size } = useThree();

  // Single authoritative GSAP entrance choreography synchronized with IntroCurtain exit
  useEffect(() => {
    if (reducedMotion) {
      entranceRef.current.scaleMult = 1;
      entranceRef.current.yOffset = 0;
      entranceRef.current.rotOffset = 0;
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        entranceRef.current,
        { scaleMult: 0.72, yOffset: -0.35, rotOffset: -0.55 },
        {
          scaleMult: 1,
          yOffset: 0,
          rotOffset: 0,
          duration: 1.05,
          delay: 0.28,
          ease: 'power3.out',
        },
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const fovDeg = camera instanceof THREE.PerspectiveCamera ? camera.fov : 45;
    const aspect = size.width / Math.max(1, size.height);

    // 1. Sample exact frustum-projected pose for the current layout stage (ZERO chasing lag!)
    sampleStagePose(stageProgressRef.current, viewportProfile, fovDeg, aspect, sampledTargets);

    if (accentOverrideHex) {
      overrideColor.set(accentOverrideHex);
      accentColorRef.current.copy(overrideColor);
    } else {
      accentColorRef.current.copy(sampledTargets.accentColor);
    }

    // Smooth only subtle pointer micro-parallax, never the scroll choreography
    const pointerTargetX = reducedMotion || isTouchPrimary ? 0 : pointerRef.current.x;
    const pointerTargetY = reducedMotion || isTouchPrimary ? 0 : pointerRef.current.y;
    smoothPointerRef.current.x = THREE.MathUtils.damp(
      smoothPointerRef.current.x,
      pointerTargetX,
      10,
      delta,
    );
    smoothPointerRef.current.y = THREE.MathUtils.damp(
      smoothPointerRef.current.y,
      pointerTargetY,
      10,
      delta,
    );

    camera.position.set(
      sampledTargets.cameraPosition.x + smoothPointerRef.current.x * 0.18,
      sampledTargets.cameraPosition.y - smoothPointerRef.current.y * 0.12,
      sampledTargets.cameraPosition.z,
    );
    camera.lookAt(sampledTargets.cameraTarget);

    // 2. Apply authoritative stage transform directly to stageGroupRef
    if (stageGroupRef.current) {
      stageGroupRef.current.position.set(
        sampledTargets.monolithPosition.x,
        sampledTargets.monolithPosition.y + entranceRef.current.yOffset,
        sampledTargets.monolithPosition.z,
      );
      stageGroupRef.current.rotation.set(
        sampledTargets.monolithRotation.x,
        sampledTargets.monolithRotation.y + entranceRef.current.rotOffset,
        sampledTargets.monolithRotation.z,
      );
      stageGroupRef.current.scale.setScalar(
        sampledTargets.monolithScale * entranceRef.current.scaleMult,
      );
    }

    // 3. Apply interactive pointer tilt, user drag spin, and subtle breathing on isolated child group
    if (interactionGroupRef.current) {
      const floatY = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.15) * 0.042;
      const tiltX = smoothPointerRef.current.y * 0.14 + dragOffsetRef.current.pitch;
      const tiltZ = -smoothPointerRef.current.x * 0.11;
      const dragYaw = dragOffsetRef.current.yaw;

      interactionGroupRef.current.position.y = floatY;
      interactionGroupRef.current.rotation.set(tiltX, dragYaw, tiltZ);
    }
  });

  return (
    <group ref={stageGroupRef}>
      <group ref={interactionGroupRef}>
        <KineticMonolith
          finish={finish}
          quality={qualityTier}
          reducedMotion={reducedMotion}
          spinMultiplier={spinMultiplier}
          accentColorRef={accentColorRef}
          scrollVelocityRef={scrollVelocityRef}
        />
      </group>
    </group>
  );
}
