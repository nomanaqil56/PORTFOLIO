import * as THREE from 'three';
import type { StagePose, ViewportProfile } from '@/types/portfolio';

const POSE_BY_VIEWPORT: Record<ViewportProfile, StagePose[]> = {
  desktop: [
    // 01 HOME — preserves Slide1.html camera (3.5, 1.5, 0) & centered hero poise
    {
      camera: { position: [3.5, 1.55, 0.25], target: [0, 0, 0] },
      monolith: { position: [0.05, 0, 0], rotation: [0, -Math.PI / 4, 0], scale: 1.0 },
    },
    // 02 SYSTEMS — evolves Slide2.html elevated camera & right-shifted enlarged monolith
    {
      camera: { position: [0, 4.1, 7.8], target: [0, 0, 0] },
      monolith: { position: [2.25, 0.05, 0], rotation: [-0.26, Math.PI * 0.2, 0.08], scale: 1.56 },
    },
    // 03 DISCIPLINES & ARCHIVE — left showcase stage counter-balanced against right list
    {
      camera: { position: [-1.1, 2.2, 6.4], target: [0, 0, 0] },
      monolith: { position: [-2.15, -0.05, 0], rotation: [0.22, Math.PI * 0.55, -0.1], scale: 1.32 },
    },
    // 04 CONTACT — poised centered architectural centerpiece behind direct links
    {
      camera: { position: [0, 1.4, 5.6], target: [0, -0.1, 0] },
      monolith: { position: [0, 1.05, -0.9], rotation: [0.16, Math.PI * 0.85, 0], scale: 0.94 },
    },
  ],
  tablet: [
    // Camera sits on +X looking at origin, so -Z shifts screen-right into the open canvas space
    {
      camera: { position: [3.6, 1.6, 0.3], target: [0, 0, 0] },
      monolith: { position: [0.1, 0.22, -0.52], rotation: [0, -Math.PI / 4, 0], scale: 0.7 },
    },
    {
      camera: { position: [0, 4.3, 8.2], target: [0, 0, 0] },
      monolith: { position: [1.7, -0.05, 0], rotation: [-0.24, Math.PI * 0.2, 0.08], scale: 1.24 },
    },
    {
      camera: { position: [-0.8, 2.2, 6.8], target: [0, 0, 0] },
      monolith: { position: [-1.65, 0.05, -0.2], rotation: [0.2, Math.PI * 0.55, -0.08], scale: 1.05 },
    },
    {
      camera: { position: [0, 1.45, 5.9], target: [0, -0.1, 0] },
      monolith: { position: [0, 1.05, -0.8], rotation: [0.16, Math.PI * 0.85, 0], scale: 0.84 },
    },
  ],
  mobile: [
    // +Z shifts screen-left beside the bottom-right circular portrait, clearing the top About card
    {
      camera: { position: [3.6, 1.4, 0.3], target: [0, 0, 0] },
      monolith: { position: [0, -0.86, 0.45], rotation: [0, -Math.PI / 4, 0], scale: 0.46 },
    },
    {
      camera: { position: [0, 3.2, 8.4], target: [0, -0.35, 0] },
      monolith: { position: [0, -1.62, 0], rotation: [-0.24, Math.PI * 0.2, 0.08], scale: 0.78 },
    },
    {
      camera: { position: [0, 1.8, 6.8], target: [0, 0, 0] },
      monolith: { position: [0, 1.52, -1.3], rotation: [0.2, Math.PI * 0.55, -0.08], scale: 0.64 },
    },
    {
      camera: { position: [0, 1.4, 6.4], target: [0, 0, 0] },
      monolith: { position: [0, 1.42, -1.0], rotation: [0.16, Math.PI * 0.85, 0], scale: 0.68 },
    },
  ],
};

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function lerpTuple(
  a: [number, number, number],
  b: [number, number, number],
  alpha: number,
  out: THREE.Vector3 | THREE.Euler,
): void {
  out.set(
    THREE.MathUtils.lerp(a[0], b[0], alpha),
    THREE.MathUtils.lerp(a[1], b[1], alpha),
    THREE.MathUtils.lerp(a[2], b[2], alpha),
  );
}

export interface SampledStageTargets {
  cameraPosition: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  monolithPosition: THREE.Vector3;
  monolithRotation: THREE.Euler;
  monolithScale: number;
}

export function createSampledStageTargets(): SampledStageTargets {
  return {
    cameraPosition: new THREE.Vector3(3.5, 1.55, 0.25),
    cameraTarget: new THREE.Vector3(0, 0, 0),
    monolithPosition: new THREE.Vector3(0, 0, 0),
    monolithRotation: new THREE.Euler(0, -Math.PI / 4, 0),
    monolithScale: 1,
  };
}

/**
 * Samples smoothly interpolated camera & monolith targets across the normalized [0, 1] scroll span.
 * Writes directly into pre-allocated THREE objects to avoid per-frame GC allocations.
 */
export function sampleStagePose(
  progress: number,
  viewport: ViewportProfile,
  out: SampledStageTargets,
): void {
  const poses = POSE_BY_VIEWPORT[viewport];
  const clamped = THREE.MathUtils.clamp(progress, 0, 1);
  const scaled = clamped * (poses.length - 1);
  const index = Math.min(Math.floor(scaled), poses.length - 2);
  const localT = smoothstep(0, 1, scaled - index);

  const from = poses[index];
  const to = poses[index + 1];

  lerpTuple(from.camera.position, to.camera.position, localT, out.cameraPosition);
  lerpTuple(from.camera.target, to.camera.target, localT, out.cameraTarget);
  lerpTuple(from.monolith.position, to.monolith.position, localT, out.monolithPosition);
  lerpTuple(from.monolith.rotation, to.monolith.rotation, localT, out.monolithRotation);
  out.monolithScale = THREE.MathUtils.lerp(from.monolith.scale, to.monolith.scale, localT);
}
