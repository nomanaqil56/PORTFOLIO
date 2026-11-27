import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Cpu, Disc3, LayoutGrid, Navigation, Network } from 'lucide-react';
import type { ProjectCaseStudy, WorkflowStageNode } from '@/types/portfolio';

interface ProjectVisualStageProps {
  project: ProjectCaseStudy;
  reducedMotion: boolean;
  compact?: boolean;
}

/**
 * Generates exact 60 vertices and 90 edges of a Truncated Icosahedron
 * (12 pentagons + 20 hexagons) for Blender AI Studio's live procedural wireframe preview.
 */
function buildTruncatedIcosahedron() {
  const phi = (1 + Math.sqrt(5)) / 2;
  const raw: [number, number, number][] = [];

  const evenPerms = (a: number, b: number, c: number) => {
    raw.push([a, b, c], [b, c, a], [c, a, b]);
  };

  for (const s1 of [-1, 1]) {
    for (const s2 of [-1, 1]) {
      evenPerms(0, s1 * 1, s2 * 3 * phi);
      for (const s3 of [-1, 1]) {
        evenPerms(s1 * 1, s2 * (2 + phi), s3 * 2 * phi);
        evenPerms(s1 * phi, s2 * 2, s3 * (2 * phi + 1));
      }
    }
  }

  // Deduplicate exact coordinates
  const vertices: [number, number, number][] = [];
  const seen = new Set<string>();
  for (const [x, y, z] of raw) {
    const key = `${x.toFixed(3)},${y.toFixed(3)},${z.toFixed(3)}`;
    if (!seen.has(key)) {
      seen.add(key);
      vertices.push([x, y, z]);
    }
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const dx = vertices[i][0] - vertices[j][0];
      const dy = vertices[i][1] - vertices[j][1];
      const dz = vertices[i][2] - vertices[j][2];
      const dSq = dx * dx + dy * dy + dz * dz;
      if (Math.abs(dSq - 4) < 0.08) {
        edges.push([i, j]);
      }
    }
  }

  return { vertices, edges };
}

function BlenderWireframeCanvas({
  reducedMotion,
  compact,
}: {
  reducedMotion: boolean;
  compact?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const geometry = useMemo(() => buildTruncatedIcosahedron(), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let angleY = 0.4;
    let angleX = 0.32;

    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth || 320;
      const height = canvas.clientHeight || 180;
      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const scale = Math.min(width, height) * 0.072;

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      const projected = geometry.vertices.map(([vx, vy, vz]) => {
        const x1 = vx * cosY - vz * sinY;
        const z1 = vx * sinY + vz * cosY;
        const y2 = vy * cosX - z1 * sinX;
        const z2 = vy * sinX + z1 * cosX;
        const perspective = 16 / (16 - z2);
        return {
          x: cx + x1 * scale * perspective,
          y: cy + y2 * scale * perspective,
          z: z2,
        };
      });

      // Draw edges sorted gently by average depth
      for (const [a, b] of geometry.edges) {
        const p1 = projected[a];
        const p2 = projected[b];
        const avgZ = (p1.z + p2.z) * 0.5;
        const alpha = Math.max(0.12, Math.min(0.88, 0.48 + avgZ * 0.08));
        ctx.strokeStyle = avgZ > 1.5 ? `rgba(214, 179, 132, ${alpha})` : `rgba(211, 211, 211, ${alpha * 0.68})`;
        ctx.lineWidth = avgZ > 1.5 ? 1.25 : 0.8;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }

      if (!reducedMotion) {
        angleY += 0.0065;
        angleX = 0.32 + Math.sin(angleY * 0.6) * 0.14;
        rafId = window.requestAnimationFrame(render);
      }
    };

    render();
    return () => window.cancelAnimationFrame(rafId);
  }, [geometry, reducedMotion]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[#d6b384]/25 bg-[#070709] ${
        compact ? 'h-44' : 'h-56'
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(214,179,132,0.14) 0%, transparent 65%)',
        }}
      />
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-neutral-400">
        <span>Truncated Icosahedron · 12 Pentagons / 20 Hexagons</span>
        <span className="text-[#d6b384]">IPC 127.0.0.1:9855</span>
      </div>
    </div>
  );
}

function NovaMapDiagram({
  reducedMotion,
  compact,
}: {
  reducedMotion: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[#79c8e8]/25 bg-[#07090c] ${
        compact ? 'h-44' : 'h-56'
      }`}
    >
      <svg viewBox="0 0 420 200" className="h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="novaPathGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.15" />
            <stop offset="55%" stopColor="#00d2ff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d6b384" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        {/* Topographic coordinate contours & automotive grid */}
        <path
          d="M0 40H420 M0 80H420 M0 120H420 M0 160H420 M70 0V200 M140 0V200 M210 0V200 M280 0V200 M350 0V200"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="1"
        />
        <path
          d="M25 160 Q110 130 190 145 T395 75"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="1"
          strokeDasharray="3 4"
        />
        <path
          d="M10 115 Q120 75 240 105 T410 42"
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
        {/* Stylised route spline */}
        <path
          d="M52 168 C135 152, 162 112, 210 98 C258 84, 298 46, 368 32"
          fill="none"
          stroke="rgba(0,210,255,0.2)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <motion.path
          d="M52 168 C135 152, 162 112, 210 98 C258 84, 298 46, 368 32"
          fill="none"
          stroke="url(#novaPathGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="10 6"
          animate={reducedMotion ? undefined : { strokeDashoffset: [0, -64] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Geometric vehicle wireframe silhouette aligned to route tangent */}
        <g transform="translate(210 98) rotate(-17)">
          <polygon
            points="-28,-11 16,-11 32,-5 32,5 16,11 -28,11"
            fill="rgba(121,200,232,0.12)"
            stroke="#9ca3af"
            strokeWidth="1.2"
          />
          <polygon
            points="-12,-8 8,-8 14,-3 14,3 8,8 -12,8"
            fill="rgba(17,24,39,0.9)"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth="0.8"
          />
          <line x1="-28" y1="-7" x2="-28" y2="7" stroke="#c62e3a" strokeWidth="2.2" />
        </g>

        <circle cx="52" cy="168" r="3.5" fill="#79c8e8" />
        <circle cx="368" cy="32" r="3.5" fill="#d6b384" />
      </svg>

      <div className="pointer-events-none absolute left-3 right-3 top-2.5 flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em] text-[#79c8e8]">
        <span className="inline-flex items-center gap-1.5">
          <Navigation className="h-3 w-3" aria-hidden="true" />
          MapLibre + 3D GLB Coordinate Study
        </span>
        <span className="text-neutral-500">Visualisation Only</span>
      </div>
      <div className="pointer-events-none absolute bottom-2.5 left-3 right-3 flex items-center justify-between font-mono text-[9.5px] text-neutral-400">
        <span>+X East · +Y North · +Z Up</span>
        <span>OpenFreeMap Liberty / Custom Style</span>
      </div>
    </div>
  );
}

function MineHostNetworkDiagram({
  nodes,
  activeIdx,
  onSelect,
  reducedMotion,
  compact,
}: {
  nodes: WorkflowStageNode[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl border border-[#5eead4]/25 bg-[#070b0a] p-3.5 ${
        compact ? 'min-h-[11rem]' : 'min-h-[14rem]'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]">
        <span className="inline-flex items-center gap-1.5 text-[#5eead4]">
          <Network className="h-3 w-3" aria-hidden="true" />
          Interactive Server &amp; Tunnel Topology
        </span>
        <span className="text-neutral-500">64 JVM Tests · Relay In Progress</span>
      </div>

      {/* Interactive 5-stage horizontal / responsive network path */}
      <div className="my-3 grid grid-cols-1 gap-2 sm:grid-cols-5">
        {nodes.map((node, i) => {
          const selected = i === activeIdx;
          return (
            <button
              key={node.id}
              type="button"
              data-cursor="explore"
              onClick={() => onSelect(i)}
              className={`relative flex cursor-pointer flex-col justify-between rounded-lg border p-2.5 text-left transition-all ${
                selected
                  ? 'border-[#5eead4]/60 bg-[#5eead4]/12 text-white'
                  : 'border-white/10 bg-black/40 text-neutral-300 hover:border-white/25'
              }`}
            >
              <div className="flex items-center justify-between gap-1 font-mono text-[9px] uppercase">
                <span className="text-neutral-500">0{i + 1}</span>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    node.implemented
                      ? 'bg-[#5eead4]'
                      : !reducedMotion
                        ? 'animate-pulse border border-amber-300'
                        : 'border border-amber-300'
                  }`}
                />
              </div>
              <div className="mt-2 font-mono text-[10.5px] font-medium leading-tight">
                {node.label}
              </div>
              <div className="mt-1 font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">
                {node.implemented ? 'Local Active' : 'Ongoing'}
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-black/50 px-3 py-2 font-mono text-[11px] text-neutral-300">
        <span className="mr-2 text-[#5eead4]">{nodes[activeIdx]?.label}:</span>
        {nodes[activeIdx]?.detail}
      </div>
    </div>
  );
}

function AssistantConceptDiagram({
  nodes,
  activeIdx,
  onSelect,
  reducedMotion,
  compact,
}: {
  nodes: WorkflowStageNode[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  reducedMotion: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl border border-[#60a5fa]/25 bg-[#07090f] p-3.5 ${
        compact ? 'min-h-[11rem]' : 'min-h-[14rem]'
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em]">
        <span className="inline-flex items-center gap-1.5 text-[#60a5fa]">
          <Cpu className="h-3 w-3" aria-hidden="true" />
          Local-First Intelligent System Architecture
        </span>
        <span className="text-neutral-500">Concept / Ongoing</span>
      </div>

      <div className="my-3 flex flex-col items-center gap-4 sm:flex-row">
        {/* Abstract calm geometric intelligence core */}
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          {!reducedMotion && (
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.65, 0.35] }}
              transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-2 rounded-full border border-[#60a5fa]/40"
            />
          )}
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#60a5fa]/50 bg-[#60a5fa]/10">
            <Activity className="h-5 w-5 text-[#60a5fa]" aria-hidden="true" />
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2">
          {nodes.map((node, i) => {
            const selected = i === activeIdx;
            return (
              <button
                key={node.id}
                type="button"
                data-cursor="explore"
                onClick={() => onSelect(i)}
                className={`cursor-pointer rounded-lg border px-3 py-2 text-left transition-colors ${
                  selected
                    ? 'border-[#60a5fa]/60 bg-[#60a5fa]/12 text-white'
                    : 'border-white/10 bg-black/40 text-neutral-300 hover:border-white/25'
                }`}
              >
                <div className="font-mono text-[10px] font-medium">{node.label}</div>
                <div className="mt-0.5 font-mono text-[8.5px] uppercase text-neutral-500">
                  {node.implemented ? 'Foundational' : 'Vision Scope'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-black/50 px-3 py-2 font-mono text-[11px] text-neutral-300">
        {nodes[activeIdx]?.detail}
      </div>
    </div>
  );
}

const CUE_BARS = [
  0.28, 0.42, 0.65, 0.52, 0.84, 0.94, 0.7, 0.88, 0.96, 0.74, 0.58, 0.82, 0.66, 0.48, 0.78, 0.91,
  0.62, 0.44, 0.72, 0.54, 0.36, 0.5, 0.38, 0.25,
];

function CueDropWaveformStage({
  reducedMotion,
  compact,
}: {
  reducedMotion: boolean;
  compact?: boolean;
}) {
  const [cueIndex, setCueIndex] = useState(8);
  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateCueFromClientX = (clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / Math.max(1, rect.width)));
    const nextIdx = Math.min(CUE_BARS.length - 1, Math.round(ratio * (CUE_BARS.length - 1)));
    setCueIndex(nextIdx);
  };

  return (
    <div
      className={`flex flex-col justify-between rounded-xl border border-[#f472b6]/25 bg-gradient-to-br from-[#190f18] via-[#09080c] to-[#060609] p-4 ${
        compact ? 'min-h-[11rem]' : 'min-h-[14rem]'
      }`}
    >
      <div className="flex items-center justify-between gap-2 font-mono text-[9.5px] uppercase tracking-[0.14em]">
        <span className="inline-flex items-center gap-1.5 text-[#f472b6]">
          <Disc3 className="h-3.5 w-3.5" aria-hidden="true" />
          Minimal Waveform Widget Concept
        </span>
        <span className="text-neutral-500">Drag across bars</span>
      </div>

      {/* Draggable / clickable harmonic waveform bars */}
      <div
        ref={trackRef}
        data-cursor="drag"
        role="slider"
        tabIndex={0}
        aria-label="Cue moment position"
        aria-valuemin={0}
        aria-valuemax={CUE_BARS.length - 1}
        aria-valuenow={cueIndex}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') setCueIndex((p) => Math.min(CUE_BARS.length - 1, p + 1));
          if (e.key === 'ArrowLeft') setCueIndex((p) => Math.max(0, p - 1));
        }}
        onPointerDown={(e) => {
          draggingRef.current = true;
          updateCueFromClientX(e.clientX);
        }}
        onPointerMove={(e) => {
          if (draggingRef.current) updateCueFromClientX(e.clientX);
        }}
        onPointerUp={() => {
          draggingRef.current = false;
        }}
        onPointerLeave={() => {
          draggingRef.current = false;
        }}
        className="my-4 flex h-20 cursor-ew-resize select-none items-center justify-between gap-1 rounded-lg border border-white/[0.06] bg-black/35 px-3 py-2"
      >
        {CUE_BARS.map((amp, idx) => {
          const inWindow = idx >= cueIndex - 2 && idx <= cueIndex + 2;
          return (
            <motion.div
              key={idx}
              animate={
                reducedMotion
                  ? undefined
                  : { scaleY: inWindow ? [1, 1.15, 1] : 1 }
              }
              transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.04 }}
              className={`w-1.5 rounded-full transition-colors duration-200 ${
                inWindow ? 'bg-[#f472b6]' : 'bg-white/20'
              }`}
              style={{ height: `${Math.round(amp * 100)}%` }}
            />
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10.5px] text-neutral-300">
        <span>Saved Moment Window: Index {cueIndex + 1} / {CUE_BARS.length}</span>
        <span className="text-neutral-500">Adaptive Home-Screen Wallpaper Concept</span>
      </div>
    </div>
  );
}

function DuaenEditorialDiagram({
  nodes,
  activeIdx,
  onSelect,
  compact,
}: {
  nodes: WorkflowStageNode[];
  activeIdx: number;
  onSelect: (idx: number) => void;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl border border-[#e07a5f]/25 bg-[#090808] p-4 ${
        compact ? 'min-h-[11rem]' : 'min-h-[14rem]'
      }`}
    >
      <div className="flex items-center justify-between font-mono text-[9.5px] uppercase tracking-[0.14em]">
        <span className="inline-flex items-center gap-1.5 text-[#e07a5f]">
          <LayoutGrid className="h-3 w-3" aria-hidden="true" />
          Editorial Architecture &amp; Content Structure
        </span>
        <span className="text-neutral-500">Regd. GHA/00572/2020-21</span>
      </div>

      <div className="my-3 grid grid-cols-2 gap-2">
        {nodes.map((node, i) => {
          const selected = i === activeIdx;
          return (
            <button
              key={node.id}
              type="button"
              data-cursor="explore"
              onClick={() => onSelect(i)}
              className={`cursor-pointer rounded-lg border p-2.5 text-left transition-colors ${
                selected
                  ? 'border-[#e07a5f]/55 bg-[#e07a5f]/12 text-white'
                  : 'border-white/[0.08] bg-black/35 text-neutral-300 hover:border-white/20'
              }`}
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#e07a5f]">
                Module 0{i + 1}
              </div>
              <div className="mt-1 text-xs font-medium">{node.label}</div>
            </button>
          );
        })}
      </div>

      <div className="rounded-lg border border-white/[0.07] bg-black/45 px-3 py-2 font-mono text-[11px] text-neutral-300">
        {nodes[activeIdx]?.detail}
      </div>
    </div>
  );
}

export function ProjectVisualStage({
  project,
  reducedMotion,
  compact = false,
}: ProjectVisualStageProps) {
  const [activeNodeIdx, setActiveNodeIdx] = useState(0);

  if (project.visualTheme === 'nova-grid') {
    return <NovaMapDiagram reducedMotion={reducedMotion} compact={compact} />;
  }

  if (project.visualTheme === 'minehost-network') {
    return (
      <MineHostNetworkDiagram
        nodes={project.workflowNodes}
        activeIdx={activeNodeIdx}
        onSelect={setActiveNodeIdx}
        reducedMotion={reducedMotion}
        compact={compact}
      />
    );
  }

  if (project.visualTheme === 'blender-icosahedron') {
    return (
      <div className="space-y-3">
        <BlenderWireframeCanvas reducedMotion={reducedMotion} compact={compact} />
        {!compact && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-6">
              {project.workflowNodes.map((node, idx) => (
                <button
                  key={node.id}
                  type="button"
                  data-cursor="explore"
                  onClick={() => setActiveNodeIdx(idx)}
                  className={`cursor-pointer rounded-lg border px-2 py-1.5 text-left font-mono text-[9.5px] transition-colors ${
                    idx === activeNodeIdx
                      ? 'border-[#d6b384]/60 bg-[#d6b384]/15 text-white'
                      : 'border-white/10 bg-black/40 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="text-[8px] text-[#d6b384]">0{idx + 1}</div>
                  <div className="truncate">{node.label}</div>
                </button>
              ))}
            </div>
            <div className="rounded-lg border border-white/[0.07] bg-black/50 px-3 py-2 font-mono text-[11px] text-neutral-300">
              {project.workflowNodes[activeNodeIdx]?.detail}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (project.visualTheme === 'assistant-nodes') {
    return (
      <AssistantConceptDiagram
        nodes={project.workflowNodes}
        activeIdx={activeNodeIdx}
        onSelect={setActiveNodeIdx}
        reducedMotion={reducedMotion}
        compact={compact}
      />
    );
  }

  if (project.visualTheme === 'cuedrop-wave') {
    return <CueDropWaveformStage reducedMotion={reducedMotion} compact={compact} />;
  }

  return (
    <DuaenEditorialDiagram
      nodes={project.workflowNodes}
      activeIdx={activeNodeIdx}
      onSelect={setActiveNodeIdx}
      compact={compact}
    />
  );
}
