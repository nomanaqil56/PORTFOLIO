import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { KineticMonolith } from '@/components/three/KineticMonolith';
import { createSampledStageTargets, sampleStagePose } from '@/components/three/stagePoses';
import type { MonolithFinish, QualityTier, ViewportProfile } from '@/types/portfolio';

interface SceneRigProps {
  scrollProgressRef: MutableRefObject<number>;
  finish: MonolithFinish;
  viewportProfile: ViewportProfile;
  qualityTier: QualityTier;
  reducedMotion: boolean;
  isTouchPrimary: boolean;
}

export function SceneRig({
  scrollProgressRef,
  finish,
  viewportProfile,
  qualityTier,
  reducedMotion,
  isTouchPrimary,
}: SceneRigProps) {
  const monolithRef = useRef<THREE.Group>(null);
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const sampledTargets = useMemo(() => createSampledStageTargets(), []);
  const { camera } = useThree();

  // Initialize camera cleanly on first mount to match Slide 1 immediately
  useEffect(() => {
    sampleStagePose(scrollProgressRef.current, viewportProfile, sampledTargets);
    camera.position.copy(sampledTargets.cameraPosition);
    lookAtTargetRef.current.copy(sampledTargets.cameraTarget);
    camera.lookAt(lookAtTargetRef.current);

    if (monolithRef.current) {
      monolithRef.current.position.copy(sampledTargets.monolithPosition);
      monolithRef.current.rotation.copy(sampledTargets.monolithRotation);
      monolithRef.current.scale.setScalar(sampledTargets.monolithScale);
    }
  }, [camera, sampledTargets, scrollProgressRef, viewportProfile]);

  useEffect(() => {
    if (reducedMotion || isTouchPrimary) {
      pointerRef.current = { x: 0, y: 0 };
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1;
      const ny = (event.clientY / window.innerHeight) * 2 - 1;
      pointerRef.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      pointerRef.current.y = THREE.MathUtils.clamp(ny, -1, 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [reducedMotion, isTouchPrimary]);

  useFrame((state, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05);
    const damping = reducedMotion ? 18 : 6.5;

    sampleStagePose(scrollProgressRef.current, viewportProfile, sampledTargets);

    const pointerOffsetX = reducedMotion || isTouchPrimary ? 0 : pointerRef.current.x * 0.22;
    const pointerOffsetY = reducedMotion || isTouchPrimary ? 0 : -pointerRef.current.y * 0.14;

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
      const tiltX = reducedMotion || isTouchPrimary ? 0 : pointerRef.current.y * 0.14;
      const tiltZ = reducedMotion || isTouchPrimary ? 0 : -pointerRef.current.x * 0.12;

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
    />
  );
}
