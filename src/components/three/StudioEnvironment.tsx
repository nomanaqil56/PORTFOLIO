import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import type { MutableRefObject } from 'react';
import * as THREE from 'three';
import type { QualityTier } from '@/types/portfolio';

interface StudioEnvironmentProps {
  quality: QualityTier;
  accentColorRef: MutableRefObject<THREE.Color>;
}

/**
 * Self-contained procedural studio IBL rig with dynamic section-responsive accent lighting.
 */
export function StudioEnvironment({ quality, accentColorRef }: StudioEnvironmentProps) {
  const resolution = quality === 'high' ? 256 : 128;
  const accentLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    if (accentLightRef.current) {
      accentLightRef.current.color.copy(accentColorRef.current);
    }
  });

  return (
    <>
      <ambientLight intensity={0.28} color="#d8d8dc" />

      <directionalLight position={[5, 10, 5]} intensity={2.5} color="#f5f4f0" />

      <directionalLight position={[-6, -3, -4]} intensity={0.78} color="#8fa4c4" />

      <pointLight
        ref={accentLightRef}
        position={[4.2, 2.4, -2.5]}
        intensity={quality === 'low' ? 1.8 : 2.7}
        distance={15}
        decay={2}
        color="#d6b384"
      />

      <Environment resolution={resolution} frames={1}>
        <color attach="background" args={['#050505']} />
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#f7f7f7"
          scale={[10, 5, 1]}
          position={[0, 7, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={2.3}
          color="#e2be8f"
          scale={[4, 8, 1]}
          position={[7, 1.5, -2]}
          rotation={[0, -Math.PI / 2.3, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.35}
          color="#b7c6db"
          scale={[5, 8, 1]}
          position={[-7, 0, 2]}
          rotation={[0, Math.PI / 2.2, 0]}
        />
        <Lightformer
          form="ring"
          intensity={0.6}
          color="#666a73"
          scale={8}
          position={[0, -6, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
      </Environment>
    </>
  );
}
