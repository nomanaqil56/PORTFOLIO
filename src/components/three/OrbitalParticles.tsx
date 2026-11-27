import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { QualityTier } from '@/types/portfolio';

interface OrbitalParticlesProps {
  quality: QualityTier;
  reducedMotion: boolean;
}

function createSoftParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    gradient.addColorStop(0.35, 'rgba(225, 225, 232, 0.45)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function OrbitalParticles({ quality, reducedMotion }: OrbitalParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);

  const count = quality === 'high' ? 84 : quality === 'medium' ? 48 : 24;

  const { geometry, spriteTexture } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const coolSilver = new THREE.Color('#c9ced6');
    const warmAmber = new THREE.Color('#d6b384');

    for (let i = 0; i < count; i++) {
      // Deterministic golden-angle spherical distribution avoids chaotic clumping
      const t = (i + 0.5) / count;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 3.1 + (i % 5) * 0.72;

      positions[i * 3] = radius * Math.sin(inclination) * Math.cos(azimuth);
      positions[i * 3 + 1] = radius * Math.cos(inclination) * 0.65;
      positions[i * 3 + 2] = radius * Math.sin(inclination) * Math.sin(azimuth);

      const swatch = i % 6 === 0 ? warmAmber : coolSilver;
      colors[i * 3] = swatch.r;
      colors[i * 3 + 1] = swatch.g;
      colors[i * 3 + 2] = swatch.b;
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    buffer.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return {
      geometry: buffer,
      spriteTexture: createSoftParticleTexture(),
    };
  }, [count]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      spriteTexture.dispose();
    };
  }, [geometry, spriteTexture]);

  useFrame((_, rawDelta) => {
    if (reducedMotion || !pointsRef.current) return;
    const delta = Math.min(rawDelta, 0.05);
    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  if (reducedMotion) return null;

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        map={spriteTexture}
        size={0.085}
        sizeAttenuation
        transparent
        opacity={0.42}
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
