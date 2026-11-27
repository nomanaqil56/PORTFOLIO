import * as THREE from 'three';
import type { FrustumStagePose, ViewportProfile } from '@/types/portfolio';

/**
 * Explicit position states per viewport profile:
 * Index 0..6 correspond 1:1 with SECTIONS (Intro -> Contact), plus Index 7 = Exit Pose.
 * Coordinates use normalized camera-frustum screenAnchor [u, v] in [-1, 1] rather than
 * hardcoded world guesses, guaranteeing accurate framing across all screen aspect ratios.
 */
const FRUSTUM_POSES: Record<ViewportProfile, FrustumStagePose[]> = {
  desktop: [
    // 0: Intro / Hero Designated Pose (preserves Slide1.html iconic profile view)
    {
      cameraPosition: [3.5, 1.55, 0.25],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.06, 0.0],
      depthOffset: 0,
      scale: 1.0,
      rotation: [0, -Math.PI / 4, 0],
      accentHex: '#d6b384',
    },
    // 1: About & Philosophy (right stage beside vertical narrative)
    {
      cameraPosition: [0, 3.6, 7.8],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.46, -0.02],
      depthOffset: 0,
      scale: 1.46,
      rotation: [-0.24, Math.PI * 0.2, 0.08],
      accentHex: '#d6b384',
    },
    // 2: Capabilities (left counter-balance opposite 6-domain tabs)
    {
      cameraPosition: [-0.9, 2.2, 6.6],
      cameraTarget: [0, 0, 0],
      screenAnchor: [-0.46, 0.02],
      depthOffset: 0,
      scale: 1.28,
      rotation: [0.22, Math.PI * 0.55, -0.1],
      accentHex: '#79c8e8',
    },
    // 3: Projects (elevated upper-right architectural beacon clearing case-study cards)
    {
      cameraPosition: [0.4, 2.3, 7.8],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.64, 0.56],
      depthOffset: 3.2,
      scale: 0.72,
      rotation: [0.26, Math.PI * 0.85, 0.14],
      accentHex: '#79c8e8',
    },
    // 4: Experiments / Playground (interactive left stage beside 4 live sandboxes)
    {
      cameraPosition: [-1.0, 2.1, 6.2],
      cameraTarget: [0, 0, 0],
      screenAnchor: [-0.46, 0.04],
      depthOffset: 0.2,
      scale: 1.28,
      rotation: [-0.18, Math.PI * 1.15, 0.12],
      accentHex: '#c4b5fd',
    },
    // 5: Journey (right companion beside chronological spine)
    {
      cameraPosition: [0.8, 2.2, 6.9],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.48, 0.02],
      depthOffset: 0.4,
      scale: 1.14,
      rotation: [0.2, Math.PI * 1.45, -0.08],
      accentHex: '#d6b384',
    },
    // 6: Contact (poised centered emblem crowning Contact glass panel)
    {
      cameraPosition: [0, 1.45, 5.8],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.0, 0.42],
      depthOffset: 0.6,
      scale: 0.9,
      rotation: [0.16, Math.PI * 1.75, 0],
      accentHex: '#d6b384',
    },
    // 7: Exit Pose (calm subtle ascent at page footer)
    {
      cameraPosition: [0, 1.55, 6.1],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.0, 0.5],
      depthOffset: 0.9,
      scale: 0.84,
      rotation: [0.18, Math.PI * 1.9, 0],
      accentHex: '#d6b384',
    },
  ],
  tablet: [
    {
      cameraPosition: [3.6, 1.6, 0.3],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.36, 0.04],
      depthOffset: 0,
      scale: 0.74,
      rotation: [0, -Math.PI / 4, 0],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [0, 3.8, 8.2],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.36, -0.02],
      depthOffset: 0.2,
      scale: 1.04,
      rotation: [-0.24, Math.PI * 0.2, 0.08],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [-0.8, 2.2, 6.8],
      cameraTarget: [0, 0, 0],
      screenAnchor: [-0.46, 0.05],
      depthOffset: 0.3,
      scale: 0.96,
      rotation: [0.2, Math.PI * 0.55, -0.08],
      accentHex: '#79c8e8',
    },
    {
      cameraPosition: [0.3, 2.3, 7.6],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.54, 0.46],
      depthOffset: 2.0,
      scale: 0.76,
      rotation: [0.26, Math.PI * 0.85, 0.12],
      accentHex: '#79c8e8',
    },
    {
      cameraPosition: [-0.9, 2.1, 6.6],
      cameraTarget: [0, 0, 0],
      screenAnchor: [-0.46, 0.08],
      depthOffset: 0.6,
      scale: 0.94,
      rotation: [-0.18, Math.PI * 1.15, 0.1],
      accentHex: '#c4b5fd',
    },
    {
      cameraPosition: [0.8, 2.2, 7.0],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.46, 0.06],
      depthOffset: 0.6,
      scale: 0.88,
      rotation: [0.2, Math.PI * 1.45, -0.08],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [0, 1.45, 5.9],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.0, 0.44],
      depthOffset: 0.7,
      scale: 0.8,
      rotation: [0.16, Math.PI * 1.75, 0],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [0, 1.55, 6.2],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.0, 0.52],
      depthOffset: 1.0,
      scale: 0.75,
      rotation: [0.18, Math.PI * 1.9, 0],
      accentHex: '#d6b384',
    },
  ],
  mobile: [
    // Lower-left open aperture beside the bottom-right portrait, clear of the top Intro card
    {
      cameraPosition: [3.6, 1.4, 0.3],
      cameraTarget: [0, 0, 0],
      screenAnchor: [-0.42, -0.52],
      depthOffset: 0,
      scale: 0.48,
      rotation: [0, -Math.PI / 4, 0],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [0, 3.2, 8.4],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.38, -0.78],
      depthOffset: 1.4,
      scale: 0.52,
      rotation: [-0.24, Math.PI * 0.2, 0.08],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [0, 2.0, 7.2],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.0, 0.48],
      depthOffset: 1.4,
      scale: 0.56,
      rotation: [0.2, Math.PI * 0.55, -0.08],
      accentHex: '#79c8e8',
    },
    {
      cameraPosition: [0, 2.2, 7.6],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.44, 0.56],
      depthOffset: 2.6,
      scale: 0.42,
      rotation: [0.25, Math.PI * 0.85, 0.1],
      accentHex: '#79c8e8',
    },
    {
      cameraPosition: [0, 2.0, 7.0],
      cameraTarget: [0, 0, 0],
      screenAnchor: [-0.36, 0.5],
      depthOffset: 1.6,
      scale: 0.54,
      rotation: [-0.18, Math.PI * 1.15, 0.1],
      accentHex: '#c4b5fd',
    },
    {
      cameraPosition: [0, 2.0, 7.2],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.36, 0.5],
      depthOffset: 1.7,
      scale: 0.52,
      rotation: [0.2, Math.PI * 1.45, -0.08],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [0, 1.45, 6.4],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.0, 0.48],
      depthOffset: 0.8,
      scale: 0.66,
      rotation: [0.16, Math.PI * 1.75, 0],
      accentHex: '#d6b384',
    },
    {
      cameraPosition: [0, 1.55, 6.7],
      cameraTarget: [0, 0, 0],
      screenAnchor: [0.0, 0.54],
      depthOffset: 1.1,
      scale: 0.6,
      rotation: [0.18, Math.PI * 1.9, 0],
      accentHex: '#d6b384',
    },
  ],
};

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

const WORLD_UP = new THREE.Vector3(0, 1, 0);
const TEMP_FORWARD = new THREE.Vector3();
const TEMP_RIGHT = new THREE.Vector3();
const TEMP_UP = new THREE.Vector3();
const TEMP_ORIGIN = new THREE.Vector3();
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

/**
 * Evaluates the exact camera and frustum-projected monolith pose for a given layout stage coordinate.
 * Zero exponential chasing: output corresponds deterministically to the DOM scroll stage.
 */
export function sampleStagePose(
  stageFloat: number,
  viewport: ViewportProfile,
  fovDeg: number,
  aspect: number,
  out: SampledStageTargets,
): void {
  const poses = FRUSTUM_POSES[viewport];
  const maxIdx = poses.length - 1;
  const clamped = THREE.MathUtils.clamp(stageFloat, 0, maxIdx);
  const index = Math.min(Math.floor(clamped), maxIdx - 1);
  const t = clamped - index;

  const from = poses[index];
  const to = poses[index + 1];

  lerpTuple(from.cameraPosition, to.cameraPosition, t, out.cameraPosition);
  lerpTuple(from.cameraTarget, to.cameraTarget, t, out.cameraTarget);
  lerpTuple(from.rotation, to.rotation, t, out.monolithRotation);
  out.monolithScale = THREE.MathUtils.lerp(from.scale, to.scale, t);

  const screenX = THREE.MathUtils.lerp(from.screenAnchor[0], to.screenAnchor[0], t);
  const screenY = THREE.MathUtils.lerp(from.screenAnchor[1], to.screenAnchor[1], t);
  const depthOffset = THREE.MathUtils.lerp(from.depthOffset, to.depthOffset, t);

  // Project normalized viewport coordinates onto the exact camera frustum plane
  TEMP_FORWARD.subVectors(out.cameraTarget, out.cameraPosition).normalize();
  TEMP_RIGHT.crossVectors(TEMP_FORWARD, WORLD_UP);
  if (TEMP_RIGHT.lengthSq() < 1e-6) {
    TEMP_RIGHT.set(1, 0, 0);
  } else {
    TEMP_RIGHT.normalize();
  }
  TEMP_UP.crossVectors(TEMP_RIGHT, TEMP_FORWARD).normalize();

  TEMP_ORIGIN.copy(out.cameraTarget).addScaledVector(TEMP_FORWARD, depthOffset);
  const dist = out.cameraPosition.distanceTo(TEMP_ORIGIN);
  const halfHeight = dist * Math.tan(THREE.MathUtils.degToRad(fovDeg) * 0.5);
  const halfWidth = halfHeight * Math.max(0.4, aspect);

  out.monolithPosition
    .copy(TEMP_ORIGIN)
    .addScaledVector(TEMP_RIGHT, screenX * halfWidth)
    .addScaledVector(TEMP_UP, screenY * halfHeight);

  TEMP_COLOR_A.set(from.accentHex);
  TEMP_COLOR_B.set(to.accentHex);
  out.accentColor.copy(TEMP_COLOR_A).lerp(TEMP_COLOR_B, t);
}
