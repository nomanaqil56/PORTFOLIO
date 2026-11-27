import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { KineticMonolith } from '@/components/three/KineticMonolith';
import { createSampledStageTargets, sampleStagePose } from '@/components/three/stagePoses';
import type { MonolithFinish, QualityTier, ViewportProfile } from '@/types/portfolio';

interface SceneRigProps {
  scrollProgressRef: MutableRefObject<number>;
  scrollVelocityRef: MutableRefObject<number>;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  accentColorRef: MutableRefObject<THREE.Color>;
  finish: MonolithFinish;
  viewportProfile: ViewportProfile;
  qualityTier: QualityTier;
  reducedMotion: boolean;
  isTouchPrimary: boolean;
}

export function SceneRig({
  scrollProgressRef,
  scrollVelocityRef,
  pointerRef,
  accentColorRef,
  finish,
  viewportProfile,
  qualityTier,
  reducedMotion,
  isTouchPrimary,
}: SceneRigProps) {
  const monolithRef = useRef<THREE.Group>(null);
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const sampledTargets = useMemo(() => createSampledStageTargets(), []);
  const { camera } = useThree();

  useEffect(() => {
    sampleStagePose(scrollProgressRef.current, viewportProfile, sampledTargets);
    camera.position.copy(sampledTargets.cameraPosition);
    lookAtTargetRef.current.copy(sampledTargets.cameraTarget);
    camera.lookAt(lookAtTargetRef.current);
    accentColorRef.current.copy(sampledTargets.accentColor);

    if (monolithRef.current) {
      monolithRef.current.position.copy(sampledTargets.monolithPosition);
      monolithRef.current.rotation.copy(sampledTargets.monolithRotation);
      monolithRef.current.scale.setScalar(sampledTargets.monolithScale);
    }
  }, [accentColorRef, camera, sampledTargets, scrollProgressRef, viewportProfile]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const damping = reducedMotion ? 18 : 6.2;

    sampleStagePose(scrollProgressRef.current, viewportProfile, sampledTargets);
    accentColorRef.current.lerp(sampledTargets.accentColor, Math.min(1, delta * 5));

    const pointerOffsetX = reducedMotion || isTouchPrimary ? 0 : pointerRef.current.x * 0.24;
    const pointerOffsetY = reducedMotion || isTouchPrimary ? 0 : -pointerRef.current.y * 0.16;

    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      sampledTargets.cameraPosition.x + pointerOffsetX * 0.85,
      damping,
      delta,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      sampledTargets.cameraPosition.y + pointerOffsetY * 0.65,
      damping,
      delta,
    );
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      sampledTargets.cameraPosition.z,
      damping,
      delta,
    );

    lookAtTargetRef.current.x = THREE.MathUtils.damp(
      lookAtTargetRef.current.x,
      sampledTargets.cameraTarget.x,
      damping,
      delta,
    );
    lookAtTargetRef.current.y = THREE.MathUtils.damp(
      lookAtTargetRef.current.y,
      sampledTargets.cameraTarget.y,
      damping,
      delta,
    );
    lookAtTargetRef.current.z = THREE.MathUtils.damp(
      lookAtTargetRef.current.z,
      sampledTargets.cameraTarget.z,
      damping,
      delta,
    );
    camera.lookAt(lookAtTargetRef.current);

    if (monolithRef.current) {
      const floatBob = reducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.15) * 0.045;
      const tiltX = reducedMotion || isTouchPrimary ? 0 : pointerRef.current.y * 0.15;
      const tiltZ = reducedMotion || isTouchPrimary ? 0 : -pointerRef.current.x * 0.13;

      monolithRef.current.position.x = THREE.MathUtils.damp(
        monolithRef.current.position.x,
        sampledTargets.monolithPosition.x,
        damping,
        delta,
      );
      monolithRef.current.position.y = THREE.MathUtils.damp(
        monolithRef.current.position.y,
        sampledTargets.monolithPosition.y + floatBob,
        damping,
        delta,
      );
      monolithRef.current.position.z = THREE.MathUtils.damp(
        monolithRef.current.position.z,
        sampledTargets.monolithPosition.z,
        damping,
        delta,
      );

      monolithRef.current.rotation.x = THREE.MathUtils.damp(
        monolithRef.current.rotation.x,
        sampledTargets.monolithRotation.x + tiltX,
        damping,
        delta,
      );
      monolithRef.current.rotation.y = THREE.MathUtils.damp(
        monolithRef.current.rotation.y,
        sampledTargets.monolithRotation.y,
        damping,
        delta,
      );
      monolithRef.current.rotation.z = THREE.MathUtils.damp(
        monolithRef.current.rotation.z,
        sampledTargets.monolithRotation.z + tiltZ,
        damping,
        delta,
      );

      const nextScale = THREE.MathUtils.damp(
        monolithRef.current.scale.x,
        sampledTargets.monolithScale,
        damping,
        delta,
      );
      monolithRef.current.scale.setScalar(nextScale);
    }
  });

  return (
    <KineticMonolith
      ref={monolithRef}
      finish={finish}
      quality={qualityTier}
      reducedMotion={reducedMotion}
      accentColorRef={accentColorRef}
      scrollVelocityRef={scrollVelocityRef}
    />
  );
}
