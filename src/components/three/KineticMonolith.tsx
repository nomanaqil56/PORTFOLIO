import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { MonolithFinish, QualityTier } from '@/types/portfolio';

interface KineticMonolithProps {
  finish: MonolithFinish;
  quality: QualityTier;
  reducedMotion: boolean;
  spinMultiplier: number;
  accentColorRef: MutableRefObject<THREE.Color>;
  scrollVelocityRef: MutableRefObject<number>;
}

function createSoftShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const c = size / 2;
    const grad = ctx.createRadialGradient(c, c, 4, c, c, c);
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.55)');
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.18)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Evolved beveled 3D centerpiece with isolated idle-spin subgroup so parent scroll/GSAP
 * transforms and cursor-drag offsets never conflict over the same matrix properties.
 */
export const KineticMonolith = forwardRef<THREE.Group, KineticMonolithProps>(
  function KineticMonolith(
    { finish, quality, reducedMotion, spinMultiplier, accentColorRef, scrollVelocityRef },
    ref,
  ) {
    const spinGroupRef = useRef<THREE.Group>(null);
    const innerCoreRef = useRef<THREE.Mesh>(null);
    const innerCoreMatRef = useRef<THREE.MeshStandardMaterial>(null);
    const edgeMatRef = useRef<THREE.LineBasicMaterial>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const secondaryRingRef = useRef<THREE.Mesh>(null);

    const segments = quality === 'low' ? 3 : 5;

    const {
      outerGeometry,
      edgeGeometry,
      coreGeometry,
      ringGeometry,
      secondaryRingGeometry,
      shadowTexture,
    } = useMemo(() => {
      const outer = new RoundedBoxGeometry(1.3, 1.3, 1.3, segments, 0.07);
      const edges = new THREE.EdgesGeometry(outer, 26);
      const core = new RoundedBoxGeometry(0.62, 0.62, 0.62, 3, 0.045);
      const ring = new THREE.TorusGeometry(1.24, 0.005, 8, quality === 'low' ? 64 : 112);
      const secondaryRing = new THREE.TorusGeometry(1.42, 0.0028, 6, quality === 'low' ? 48 : 88);

      return {
        outerGeometry: outer,
        edgeGeometry: edges,
        coreGeometry: core,
        ringGeometry: ring,
        secondaryRingGeometry: secondaryRing,
        shadowTexture: createSoftShadowTexture(),
      };
    }, [segments, quality]);

    useEffect(() => {
      return () => {
        outerGeometry.dispose();
        edgeGeometry.dispose();
        coreGeometry.dispose();
        ringGeometry.dispose();
        secondaryRingGeometry.dispose();
        shadowTexture.dispose();
      };
    }, [
      outerGeometry,
      edgeGeometry,
      coreGeometry,
      ringGeometry,
      secondaryRingGeometry,
      shadowTexture,
    ]);

    const isWireframe = finish === 'wireframe';
    const isOptics = finish === 'optics';

    useFrame((state, rawDelta) => {
      if (reducedMotion) return;
      const delta = Math.min(rawDelta, 0.05);
      const velocityBoost = Math.min(Math.abs(scrollVelocityRef.current) * 0.012, 0.65);

      if (spinGroupRef.current) {
        spinGroupRef.current.rotation.y += delta * (0.2 * spinMultiplier + velocityBoost);
      }

      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.x += delta * 0.34 * spinMultiplier;
        innerCoreRef.current.rotation.y -= delta * 0.28 * spinMultiplier;
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.45) * 0.025;
        innerCoreRef.current.scale.setScalar(pulse);
      }

      if (ringRef.current) {
        ringRef.current.rotation.z += delta * (0.14 * spinMultiplier + velocityBoost * 1.3);
      }

      if (secondaryRingRef.current) {
        secondaryRingRef.current.rotation.z -= delta * 0.09 * spinMultiplier;
      }

      if (innerCoreMatRef.current && (isOptics || isWireframe)) {
        innerCoreMatRef.current.color.copy(accentColorRef.current);
        innerCoreMatRef.current.emissive.copy(accentColorRef.current);
      }

      if (edgeMatRef.current && isOptics) {
        edgeMatRef.current.color.copy(accentColorRef.current);
      }
    });

    return (
      <group ref={ref}>
        <group ref={spinGroupRef} rotation={[0, -Math.PI / 4, 0]}>
          {isWireframe ? (
            <mesh geometry={outerGeometry}>
              <meshStandardMaterial
                color="#e5e5e5"
                wireframe
                roughness={0.32}
                metalness={0.55}
                transparent
                opacity={0.72}
              />
            </mesh>
          ) : isOptics ? (
            <mesh geometry={outerGeometry}>
              <meshPhysicalMaterial
                color="#1c1e24"
                roughness={0.08}
                metalness={0.08}
                clearcoat={1}
                clearcoatRoughness={0.06}
                ior={1.52}
                thickness={quality === 'low' ? 0 : 0.85}
                transmission={quality === 'low' ? 0 : 0.78}
                transparent
                opacity={quality === 'low' ? 0.48 : 0.94}
                envMapIntensity={1.65}
              />
            </mesh>
          ) : (
            <mesh geometry={outerGeometry}>
              <meshPhysicalMaterial
                color="#d3d3d3"
                roughness={0.24}
                metalness={0.8}
                clearcoat={0.38}
                clearcoatRoughness={0.18}
                envMapIntensity={1.4}
              />
            </mesh>
          )}

          {!isWireframe && (
            <lineSegments geometry={edgeGeometry}>
              <lineBasicMaterial
                ref={edgeMatRef}
                color={isOptics ? '#e2be8f' : '#ffffff'}
                transparent
                opacity={isOptics ? 0.38 : 0.16}
              />
            </lineSegments>
          )}

          <mesh ref={innerCoreRef} geometry={coreGeometry} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <meshStandardMaterial
              ref={innerCoreMatRef}
              color={isOptics || isWireframe ? '#d6b384' : '#24252a'}
              emissive={isOptics || isWireframe ? '#b6894e' : '#000000'}
              emissiveIntensity={isOptics ? 0.86 : isWireframe ? 0.45 : 0}
              metalness={0.88}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Primary orbital meridian ring */}
        <mesh ref={ringRef} geometry={ringGeometry} rotation={[Math.PI / 2.6, 0.35, 0]}>
          <meshStandardMaterial
            color="#a9acb4"
            metalness={0.9}
            roughness={0.24}
            transparent
            opacity={0.34}
          />
        </mesh>

        {/* Outer secondary hair-thin orbit */}
        {quality !== 'low' && (
          <mesh ref={secondaryRingRef} geometry={secondaryRingGeometry} rotation={[Math.PI / 3.4, -0.48, 0]}>
            <meshStandardMaterial
              color="#d6b384"
              metalness={0.85}
              roughness={0.3}
              transparent
              opacity={0.18}
            />
          </mesh>
        )}

        {/* Depth-aware radial ground contact shadow */}
        <mesh position={[0, -1.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[2.5, 2.5]} />
          <meshBasicMaterial
            map={shadowTexture}
            transparent
            opacity={0.42}
            depthWrite={false}
          />
        </mesh>
      </group>
    );
  },
);
