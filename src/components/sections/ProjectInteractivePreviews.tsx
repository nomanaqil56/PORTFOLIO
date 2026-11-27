import { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc3, Navigation, Radio, Share2 } from 'lucide-react';

export function NovaHudPreview({ reducedMotion }: { reducedMotion: boolean }) {
  const [role, setRole] = useState<'DRIVER' | 'TECH' | 'ADMIN'>('DRIVER');

  const roleDetails = {
    DRIVER: { label: 'Route Vector + 3D Chassis', metric: 'MapLibre CustomLayer · MockProvider' },
    TECH: { label: 'Diagnostics & System Checks', metric: 'Subsystems Nominal · Simulated Telemetry' },
    ADMIN: { label: 'Fleet & Software Modules', metric: 'Role Routing · Context State' },
  }[role];

  return (
    <div className="relative overflow-hidden rounded-xl border border-[#79c8e8]/25 bg-[#080a0d] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-[#79c8e8]">
          <Navigation className="h-3 w-3" aria-hidden="true" />
          NOVA-UI Spatial HUD Preview
        </span>
        <div className="flex gap-1 rounded-lg bg-white/[0.04] p-0.5">
          {(['DRIVER', 'TECH', 'ADMIN'] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`cursor-pointer rounded-md px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors ${
                role === r ? 'bg-[#79c8e8]/20 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Vector route & procedural chassis schematic inspired by NovaVehicle3D.ts */}
      <div className="relative mt-3 flex h-40 items-center justify-center overflow-hidden rounded-lg border border-white/[0.06] bg-[#06080b]">
        <svg viewBox="0 0 360 150" className="h-full w-full" aria-hidden="true">
          <defs>
            <linearGradient id="novaRoute" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#00d2ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#79c8e8" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          {/* Dark vector grid lines */}
          <path d="M0 35H360 M0 75H360 M0 115H360 M60 0V150 M180 0V150 M300 0V150" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          {/* Glowing route vector */}
          <path
            d="M40 132 C110 120, 140 85, 180 75 C220 65, 255 32, 325 22"
            fill="none"
            stroke="rgba(0,210,255,0.22)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d="M40 132 C110 120, 140 85, 180 75 C220 65, 255 32, 325 22"
            fill="none"
            stroke="url(#novaRoute)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Procedural chassis footprint matching NovaVehicle3D coordinates */}
          <g transform={role === 'TECH' ? 'translate(180 75) rotate(-18) scale(1.12)' : 'translate(180 75) rotate(-18)'}>
            <ellipse cx="0" cy="0" rx="28" ry="15" fill="rgba(0,210,255,0.16)" />
            <rect x="-18" y="-9" width="36" height="18" rx="4" fill="#9ca3af" stroke="#e5e7eb" strokeWidth="0.8" />
            <rect x="-9" y="-7" width="16" height="14" rx="2" fill="#111827" />
            <line x1="-18" y1="-6" x2="-18" y2="6" stroke="#c62e3a" strokeWidth="2" />
          </g>
        </svg>

        {!reducedMotion && (
          <motion.div
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.4, repeat: Infinity }}
            className="pointer-events-none absolute right-3 top-2.5 flex items-center gap-1.5 font-mono text-[9.5px] text-[#79c8e8]"
          >
            <Radio className="h-3 w-3" aria-hidden="true" />
            {role} VIEW
          </motion.div>
        )}
      </div>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-neutral-400">
        <span>{roleDetails.label}</span>
        <span className="text-neutral-500">{roleDetails.metric}</span>
      </div>
    </div>
  );
}

const ORB_STATES = [
  { id: 'IDLE', color: '#3b82f6', prompt: 'Ready for local voice or text command.' },
  { id: 'PROCESSING', color: '#00e5ff', prompt: 'Input: "open spotify"' },
  { id: 'PLANNING', color: '#a855f7', prompt: 'CommandParser -> Intent.OpenApp("spotify")' },
  { id: 'EXECUTING', color: '#22c55e', prompt: 'ActionExecutor -> AppResolver.launchIntent()' },
  { id: 'SPEAKING', color: '#f472b6', prompt: 'TTS: "Opening Spotify..."' },
] as const;

export function AssistantOrbPreview({ reducedMotion }: { reducedMotion: boolean }) {
  const [idx, setIdx] = useState(0);
  const current = ORB_STATES[idx];

  return (
    <div className="rounded-xl border border-[#60a5fa]/25 bg-[#08090e] p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#60a5fa]">
          AssistantState &amp; Orb Pipeline
        </span>
        <span className="font-mono text-[10px] text-neutral-500">Tap state to simulate</span>
      </div>

      <div className="mt-3 flex flex-col items-center gap-4 rounded-lg border border-white/[0.06] bg-[#050609] p-4 sm:flex-row">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
          <motion.div
            animate={
              reducedMotion
                ? undefined
                : { scale: [1, 1.12, 1], rotate: [0, 180, 360] }
            }
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="h-20 w-20 rounded-full blur-md"
            style={{
              background: `radial-gradient(circle, ${current.color}88 0%, #1e88e544 55%, transparent 75%)`,
            }}
          />
          <div
            className="absolute h-12 w-12 rounded-full border border-white/30"
            style={{
              background: `radial-gradient(circle at 35% 35%, #ffffffaa, ${current.color} 60%, #090d16 100%)`,
            }}
          />
        </div>

        <div className="flex-1 space-y-2.5 text-center sm:text-left">
          <div className="font-mono text-xs text-white">{current.id}</div>
          <p className="font-mono text-[11px] leading-relaxed text-neutral-300">
            {current.prompt}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
            {ORB_STATES.map((st, sIdx) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setIdx(sIdx)}
                className={`cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[9.5px] uppercase tracking-wider transition-colors ${
                  idx === sIdx
                    ? 'border-white/40 bg-white/10 text-white'
                    : 'border-white/10 text-neutral-400 hover:text-white'
                }`}
              >
                {st.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CUE_MARKERS = [
  { time: '0:42', note: 'Opening synth swell' },
  { time: '1:18', note: 'Hook drop cue' },
  { time: '2:09', note: 'Bridge vocal moment' },
];

export function CueDropWidgetPreview() {
  const [markerIdx, setMarkerIdx] = useState(1);
  const active = CUE_MARKERS[markerIdx];

  return (
    <div className="rounded-xl border border-[#f472b6]/25 bg-[#0a080c] p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#f472b6]">
          CueDrop Android Widget Concept
        </span>
        <span className="font-mono text-[9.5px] text-neutral-500">Interaction Study</span>
      </div>

      <div className="mt-3 rounded-2xl border border-white/10 bg-gradient-to-br from-[#231424]/70 via-[#111015] to-[#08080b] p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#f472b6]/40 to-[#79c8e8]/25 ring-1 ring-white/15">
              <Disc3 className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <div>
              <div className="text-xs font-medium text-white">Captured Moment · {active.time}</div>
              <div className="font-mono text-[10.5px] text-neutral-300">{active.note}</div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-wider text-white">
            <Share2 className="h-3 w-3" aria-hidden="true" />
            Cue
          </span>
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#f472b6] to-[#d6b384] transition-all duration-300"
              style={{ width: `${(markerIdx + 1) * 30}%` }}
            />
          </div>
          <div className="flex justify-between gap-2">
            {CUE_MARKERS.map((m, i) => (
              <button
                key={m.time}
                type="button"
                onClick={() => setMarkerIdx(i)}
                className={`cursor-pointer rounded-md px-2 py-0.5 font-mono text-[10px] transition-colors ${
                  i === markerIdx
                    ? 'bg-[#f472b6]/25 text-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {m.time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
