import { Environment, Lightformer } from '@react-three/drei';
import type { QualityTier } from '@/types/portfolio';

interface StudioEnvironmentProps {
  quality: QualityTier;
}

/**
 * Self-contained procedural studio IBL rig using Lightformers.
 * Avoids external HDR CDN fetches so reflections render reliably offline and behind strict CSP.
 */
export function StudioEnvironment({ quality }: StudioEnvironmentProps) {
  const resolution = quality === 'high' ? 256 : 128;

  return (
    <>
      <ambientLight intensity={0.28} color="#d8d8dc" />

      <directionalLight
        position={[5, 10, 5]}
        intensity={2.6}
        color="#f5f4f0"
      />

      <directionalLight
        position={[-6, -3, -4]}
        intensity={0.75}
        color="#8fa4c4"
      />

      <pointLight
        position={[4.2, 2.4, -2.5]}
        intensity={quality === 'low' ? 1.8 : 2.6}
        distance={14}
        decay={2}
        color="#d6b384"
      />

      <Environment resolution={resolution} frames={1}>
        <color attach="background" args={['#050505']} />
        {/* Overhead softbox */}
        <Lightformer
          form="rect"
          intensity={2.2}
          color="#f7f7f7"
          scale={[10, 5, 1]}
          position={[0, 7, 1]}
          rotation={[Math.PI / 2, 0, 0]}
        />
        {/* Warm champagne rim panel echoing portrait lighting */}
        <Lightformer
          form="rect"
          intensity={2.4}
          color="#e2be8f"
          scale={[4, 8, 1]}
          position={[7, 1.5, -2]}
          rotation={[0, -Math.PI / 2.3, 0]}
        />
        {/* Cool architectural fill */}
        <Lightformer
          form="rect"
          intensity={1.3}
          color="#b7c6db"
          scale={[5, 8, 1]}
          position={[-7, 0, 2]}
          rotation={[0, Math.PI / 2.2, 0]}
        />
        {/* Subtle ground bounce */}
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
