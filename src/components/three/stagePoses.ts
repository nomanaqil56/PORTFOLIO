import * as THREE from 'three';
import type { StagePose, ViewportProfile } from '@/types/portfolio';

const POSE_BY_VIEWPORT: Record<ViewportProfile, StagePose[]> = {
  desktop: [
    // 01 INTRO — honors Slide1.html iconic profile angle
    {
      camera: { position: [3.5, 1.55, 0.25], target: [0, 0, 0] },
      monolith: {
        position: [0.05, 0, 0],
        rotation: [0, -Math.PI / 4, 0],
        scale: 1.0,
        accentHex: '#d6b384',
      },
    },
    // 02 ABOUT — evolves Slide2.html right-shifted elevated stage
    {
      camera: { position: [0, 4.0, 7.8], target: [0, 0, 0] },
      monolith: {
        position: [2.25, 0.05, 0],
        rotation: [-0.26, Math.PI * 0.2, 0.08],
        scale: 1.52,
        accentHex: '#d6b384',
      },
    },
    // 03 CAPABILITIES — counter-balanced left showcase
    {
      camera: { position: [-1.1, 2.2, 6.5], target: [0, 0, 0] },
      monolith: {
        position: [-2.25, 0.0, 0],
        rotation: [0.22, Math.PI * 0.55, -0.1],
        scale: 1.32,
        accentHex: '#79c8e8',
      },
    },
    // 04 PROJECTS — elevated architectural beacon behind interactive case-study grid
    {
      camera: { position: [0.6, 2.5, 7.6], target: [0, 0, 0] },
      monolith: {
        position: [2.7, 1.35, -2.2],
        rotation: [0.28, Math.PI * 0.85, 0.14],
        scale: 0.92,
        accentHex: '#79c8e8',
      },
    },
    // 05 EXPERIMENTS — dramatic interactive close-up on left beside shader/experiment cards
    {
      camera: { position: [-1.2, 2.1, 6.2], target: [0, 0, 0] },
      monolith: {
        position: [-2.1, 0.18, -0.4],
        rotation: [-0.18, Math.PI * 1.15, 0.12],
        scale: 1.3,
        accentHex: '#c4b5fd',
      },
    },
    // 06 JOURNEY — poised right companion to chronological spine
    {
      camera: { position: [0.9, 2.3, 6.9], target: [0, 0, 0] },
      monolith: {
        position: [2.35, 0.1, -0.8],
        rotation: [0.2, Math.PI * 1.45, -0.08],
        scale: 1.12,
        accentHex: '#d6b384',
      },
    },
    // 07 CONTACT — centered emblem crowning contact stage
    {
      camera: { position: [0, 1.4, 5.7], target: [0, -0.1, 0] },
      monolith: {
        position: [0, 1.16, -0.95],
        rotation: [0.16, Math.PI * 1.75, 0],
        scale: 0.9,
        accentHex: '#d6b384',
      },
    },
  ],
  tablet: [
    {
      camera: { position: [3.6, 1.6, 0.3], target: [0, 0, 0] },
      monolith: {
        position: [0.1, 0.22, -0.52],
        rotation: [0, -Math.PI / 4, 0],
        scale: 0.7,
        accentHex: '#d6b384',
      },
    },
    {
      camera: { position: [0, 4.2, 8.2], target: [0, 0, 0] },
      monolith: {
        position: [1.7, -0.05, 0],
        rotation: [-0.24, Math.PI * 0.2, 0.08],
        scale: 1.2,
        accentHex: '#d6b384',
      },
    },
    {
      camera: { position: [-0.8, 2.2, 6.8], target: [0, 0, 0] },
      monolith: {
        position: [-1.75, 0.15, -0.4],
        rotation: [0.2, Math.PI * 0.55, -0.08],
        scale: 1.0,
        accentHex: '#79c8e8',
      },
    },
    {
      camera: { position: [0.4, 2.3, 7.6], target: [0, 0, 0] },
      monolith: {
        position: [2.0, 1.4, -2.0],
        rotation: [0.28, Math.PI * 0.85, 0.12],
        scale: 0.78,
        accentHex: '#79c8e8',
      },
    },
    {
      camera: { position: [-0.9, 2.1, 6.6], target: [0, 0, 0] },
      monolith: {
        position: [-1.65, 0.3, -0.7],
        rotation: [-0.18, Math.PI * 1.15, 0.1],
        scale: 0.96,
        accentHex: '#c4b5fd',
      },
    },
    {
      camera: { position: [0.8, 2.2, 7.0], target: [0, 0, 0] },
      monolith: {
        position: [1.8, 0.2, -0.9],
        rotation: [0.2, Math.PI * 1.45, -0.08],
        scale: 0.9,
        accentHex: '#d6b384',
      },
    },
    {
      camera: { position: [0, 1.45, 5.9], target: [0, -0.1, 0] },
      monolith: {
        position: [0, 1.12, -0.85],
        rotation: [0.16, Math.PI * 1.75, 0],
        scale: 0.82,
        accentHex: '#d6b384',
      },
    },
  ],
  mobile: [
    {
      camera: { position: [3.6, 1.4, 0.3], target: [0, 0, 0] },
      monolith: {
        position: [0, -0.86, 0.45],
        rotation: [0, -Math.PI / 4, 0],
        scale: 0.46,
        accentHex: '#d6b384',
      },
    },
    {
      camera: { position: [0, 3.2, 8.4], target: [0, -0.35, 0] },
      monolith: {
        position: [0, -1.65, -0.4],
        rotation: [-0.24, Math.PI * 0.2, 0.08],
        scale: 0.74,
        accentHex: '#d6b384',
      },
    },
    {
      camera: { position: [0, 2.0, 7.2], target: [0, 0, 0] },
      monolith: {
        position: [0, 1.55, -1.7],
        rotation: [0.2, Math.PI * 0.55, -0.08],
        scale: 0.58,
        accentHex: '#79c8e8',
      },
    },
    {
      camera: { position: [0, 2.2, 7.6], target: [0, 0, 0] },
      monolith: {
        position: [1.05, 2.25, -3.2],
        rotation: [0.25, Math.PI * 0.85, 0.1],
        scale: 0.42,
        accentHex: '#79c8e8',
      },
    },
    {
      camera: { position: [0, 2.0, 7.0], target: [0, 0, 0] },
      monolith: {
        position: [-0.85, 1.65, -1.9],
        rotation: [-0.18, Math.PI * 1.15, 0.1],
        scale: 0.56,
        accentHex: '#c4b5fd',
      },
    },
    {
      camera: { position: [0, 2.0, 7.2], target: [0, 0, 0] },
      monolith: {
        position: [0.9, 1.65, -2.0],
        rotation: [0.2, Math.PI * 1.45, -0.08],
        scale: 0.54,
        accentHex: '#d6b384',
      },
    },
    {
      camera: { position: [0, 1.4, 6.4], target: [0, 0, 0] },
      monolith: {
        position: [0, 1.42, -1.0],
        rotation: [0.16, Math.PI * 1.75, 0],
        scale: 0.68,
        accentHex: '#d6b384',
      },
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
  accentColor: THREE.Color;
}

const TEMP_COLOR_A = new THREE.Color();
const TEMP_COLOR_B = new THREE.Color();

export function createSampledStageTargets(): SampledStageTargets {
  return {
    cameraPosition: new THREE.Vector3(3.5, 1.55, 0.25),
    cameraTarget: new THREE.Vector3(0, 0, 0),
    monolithPosition: new THREE.Vector3(0, 0, 0),
    monolithRotation: new THREE.Euler(0, -Math.PI / 4, 0),
    monolithScale: 1,
    accentColor: new THREE.Color('#d6b384'),
  };
}

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

  TEMP_COLOR_A.set(from.monolith.accentHex);
  TEMP_COLOR_B.set(to.monolith.accentHex);
  out.accentColor.copy(TEMP_COLOR_A).lerp(TEMP_COLOR_B, localT);
}
