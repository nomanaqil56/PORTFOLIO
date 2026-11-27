import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MutableRefObject } from 'react';
import type { QualityTier } from '@/types/portfolio';

interface AtmosphereShaderProps {
  quality: QualityTier;
  reducedMotion: boolean;
  pointerRef: MutableRefObject<{ x: number; y: number }>;
  scrollProgressRef: MutableRefObject<number>;
  accentColorRef: MutableRefObject<THREE.Color>;
}

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Place shader at far clip depth (0.999) so hardware depth-testing occludes it cleanly behind opaque 3D geometry
    gl_Position = vec4(position.xy, 0.999, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScroll;
  uniform vec3 uAccent;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec2 uv = vUv;
    vec2 pointerUv = vec2(uPointer.x * 0.5 + 0.5, -uPointer.y * 0.5 + 0.5);

    float flow = noise(uv * 2.8 + vec2(uTime * 0.04, uScroll * 1.4));
    float detail = noise(uv * 6.2 - vec2(uTime * 0.025, uScroll * 0.7));
    float field = flow * 0.65 + detail * 0.35;

    float distPointer = distance(uv, pointerUv);
    float aura = smoothstep(0.55, 0.0, distPointer) * 0.14;

    float radialCenter = smoothstep(0.9, 0.15, distance(uv, vec2(0.52, 0.48)));
    vec3 glow = vec3(0.09, 0.095, 0.12) * field * radialCenter + (uAccent * aura);
    float alpha = clamp(aura * 1.15 + field * radialCenter * 0.16, 0.0, 0.24);

    gl_FragColor = vec4(glow, alpha);
  }
`;

/**
 * Subtle far-plane atmospheric GLSL fog & pointer-aura backdrop.
 * Uses hardware depth testing behind the monolith so metallic surfaces and marquees stay bright.
 */
export function AtmosphereShader({
  quality,
  reducedMotion,
  pointerRef,
  scrollProgressRef,
  accentColorRef,
}: AtmosphereShaderProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uAccent: { value: new THREE.Color('#d6b384') },
    }),
    [],
  );

  useEffect(() => {
    const mat = materialRef.current;
    return () => {
      mat?.dispose();
    };
  }, []);

  useFrame((state) => {
    if (!materialRef.current || reducedMotion || quality === 'low') return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uPointer.value.set(
      pointerRef.current.x,
      pointerRef.current.y,
    );
    materialRef.current.uniforms.uScroll.value = scrollProgressRef.current;
    materialRef.current.uniforms.uAccent.value.copy(accentColorRef.current);
  });

  if (reducedMotion || quality === 'low') return null;

  return (
    <mesh frustumCulled={false} renderOrder={-100}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        uniforms={uniforms}
        depthTest
        depthWrite={false}
        transparent
      />
    </mesh>
  );
}
