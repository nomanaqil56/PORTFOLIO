import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import type { MonolithFinish, QualityTier } from '@/types/portfolio';

interface KineticMonolithProps {
  finish: MonolithFinish;
  quality: QualityTier;
  reducedMotion: boolean;
}

export const KineticMonolith = forwardRef<THREE.Group, KineticMonolithProps>(
  function KineticMonolith({ finish, quality, reducedMotion }, ref) {
    const spinGroupRef = useRef<THREE.Group>(null);
    const innerCoreRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);

    const segments = quality === 'low' ? 3 : 5;

    const { outerGeometry, edgeGeometry, coreGeometry, ringGeometry } = useMemo(() => {
      const outer = new RoundedBoxGeometry(1.3, 1.3, 1.3, segments, 0.065);
      const edges = new THREE.EdgesGeometry(outer, 26);
      const core = new RoundedBoxGeometry(0.62, 0.62, 0.62, 3, 0.045);
      const ring = new THREE.TorusGeometry(1.24, 0.005, 8, quality === 'low' ? 64 : 112);

      return {
        outerGeometry: outer,
        edgeGeometry: edges,
        coreGeometry: core,
        ringGeometry: ring,
      };
    }, [segments, quality]);

    useEffect(() => {
      return () => {
        outerGeometry.dispose();
        edgeGeometry.dispose();
        coreGeometry.dispose();
        ringGeometry.dispose();
      };
    }, [outerGeometry, edgeGeometry, coreGeometry, ringGeometry]);

    useFrame((state, rawDelta) => {
      if (reducedMotion) return;
      const delta = Math.min(rawDelta, 0.05);

      if (spinGroupRef.current) {
        spinGroupRef.current.rotation.y += delta * 0.22;
      }

      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.x += delta * 0.34;
        innerCoreRef.current.rotation.y -= delta * 0.28;
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.025;
        innerCoreRef.current.scale.setScalar(pulse);
      }

      if (ringRef.current) {
        ringRef.current.rotation.z += delta * 0.14;
      }
    });

    const isWireframe = finish === 'wireframe';
    const isOptics = finish === 'optics';

    return (
      <group ref={ref}>
        <group ref={spinGroupRef} rotation={[0, -Math.PI / 4, 0]}>
          {/* Outer chamfered architectural cube */}
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
                envMapIntensity={1.6}
              />
            </mesh>
          ) : (
            <mesh geometry={outerGeometry}>
              <meshPhysicalMaterial
                color="#d3d3d3"
                roughness={0.26}
                metalness={0.78}
                clearcoat={0.35}
                clearcoatRoughness={0.2}
                envMapIntensity={1.35}
              />
            </mesh>
          )}

          {/* Crisp bevel edge accent */}
          {!isWireframe && (
            <lineSegments geometry={edgeGeometry}>
              <lineBasicMaterial
                color={isOptics ? '#e2be8f' : '#ffffff'}
                transparent
                opacity={isOptics ? 0.36 : 0.14}
              />
            </lineSegments>
          )}

          {/* Articulated inner core revealed during Wireframe / Optics modes */}
          <mesh ref={innerCoreRef} geometry={coreGeometry} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <meshStandardMaterial
              color={isOptics || isWireframe ? '#d6b384' : '#24252a'}
              emissive={isOptics ? '#b6894e' : isWireframe ? '#8d6d42' : '#000000'}
              emissiveIntensity={isOptics ? 0.95 : isWireframe ? 0.45 : 0}
              metalness={0.88}
              roughness={0.2}
            />
          </mesh>
        </group>

        {/* Minimal orbital meridian ring */}
        <mesh ref={ringRef} geometry={ringGeometry} rotation={[Math.PI / 2.6, 0.35, 0]}>
          <meshStandardMaterial
            color="#a9acb4"
            metalness={0.9}
            roughness={0.25}
            transparent
            opacity={0.32}
          />
        </mesh>
      </group>
    );
  },
);
