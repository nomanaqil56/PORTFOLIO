import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FlaskConical, RotateCcw, Sparkles } from 'lucide-react';
import { KineticText } from '@/components/animations/KineticText';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { MONOLITH_FINISHES, OWNER_PROFILE } from '@/data/portfolio';
import type { MonolithFinish } from '@/types/portfolio';

interface ExperimentsSectionProps {
  finish: MonolithFinish;
  onFinishChange: (finish: MonolithFinish) => void;
  spinMultiplier: number;
  onSpinMultiplierChange: (val: number) => void;
  accentOverrideHex: string | null;
  onAccentOverrideChange: (hex: string | null) => void;
  onResetDrag: () => void;
  reducedMotion: boolean;
  onAudioCue: (pitch?: number) => void;
}

const LIGHT_SWATCHES: { label: string; hex: string | null }[] = [
  { label: 'Auto', hex: null },
  { label: 'Amber', hex: '#d6b384' },
  { label: 'Cyan', hex: '#79c8e8' },
  { label: 'Violet', hex: '#c4b5fd' },
];

/**
 * EXP-02: Lightweight interactive HTML5 particle & proximity network playground.
 */
function InteractiveParticlePlayground({ reducedMotion }: { reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: -999, y: -999, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nodes = Array.from({ length: 24 }, (_, i) => ({
      x: ((i * 53) % 280) + 20,
      y: ((i * 37) % 120) + 15,
      vx: ((i % 2 === 0 ? 1 : -1) * (0.32 + (i % 5) * 0.08)),
      vy: ((i % 3 === 0 ? 1 : -1) * (0.25 + (i % 4) * 0.07)),
    }));

    let rafId = 0;

    const draw = () => {
      const w = canvas.clientWidth || 300;
      const h = canvas.clientHeight || 140;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      ctx.clearRect(0, 0, w, h);

      for (const n of nodes) {
        if (!reducedMotion) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 8 || n.x > w - 8) n.vx *= -1;
          if (n.y < 8 || n.y > h - 8) n.vy *= -1;
        }

        if (pointerRef.current.active) {
          const dx = n.x - pointerRef.current.x;
          const dy = n.y - pointerRef.current.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 1 && dist < 72) {
            const push = ((72 - dist) / 72) * 2.4;
            n.x += (dx / dist) * push;
            n.y += (dy / dist) * push;
          }
        }
      }

      // Draw proximity links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 68) {
            ctx.strokeStyle = `rgba(121, 200, 232, ${(1 - d / 68) * 0.45})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = '#e5e5e5';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    draw();
    return () => window.cancelAnimationFrame(rafId);
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      data-cursor="explore"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current.active = false;
      }}
      className="h-36 w-full rounded-xl border border-white/[0.08] bg-black/55"
      aria-label="Interactive particle network canvas"
    />
  );
}

/**
 * EXP-03: Interactive Kinetic Typography Distortion Playground.
 */
function TypographyPlayground({ reducedMotion }: { reducedMotion: boolean }) {
  const [spread, setSpread] = useState<-1 | 0 | 1>(0);
  const [slant, setSlant] = useState(false);

  const trackingClass =
    spread === -1 ? 'tracking-[-0.08em]' : spread === 1 ? 'tracking-[0.14em]' : 'tracking-[0.01em]';

  return (
    <div className="space-y-3 rounded-xl border border-white/[0.08] bg-black/55 p-3.5">
      <div
        className={`flex h-20 items-center justify-center overflow-hidden whitespace-nowrap font-display text-2xl font-bold uppercase text-white transition-all duration-300 sm:text-[1.6rem] ${trackingClass} ${
          slant ? '-skew-x-12 text-[#d6b384]' : ''
        } ${reducedMotion ? 'transition-none' : ''}`}
      >
        WEB // DEV // 3D
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex gap-1">
          {([
            [-1, 'Tight'],
            [0, 'Neutral'],
            [1, 'Wide'],
          ] as const).map(([val, label]) => (
            <button
              key={label}
              type="button"
              onClick={() => setSpread(val)}
              className={`cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[9.5px] uppercase transition-colors ${
                spread === val
                  ? 'border-white/40 bg-white/10 text-white'
                  : 'border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setSlant((prev) => !prev)}
          className={`cursor-pointer rounded-md border px-2.5 py-0.5 font-mono text-[9.5px] uppercase transition-colors ${
            slant
              ? 'border-[#d6b384]/50 bg-[#d6b384]/15 text-[#d6b384]'
              : 'border-white/10 text-neutral-400 hover:text-white'
          }`}
        >
          {slant ? 'Shear On' : 'Shear Off'}
        </button>
      </div>
    </div>
  );
}

export function ExperimentsSection({
  finish,
  onFinishChange,
  spinMultiplier,
  onSpinMultiplierChange,
  accentOverrideHex,
  onAccentOverrideChange,
  onResetDrag,
  reducedMotion,
  onAudioCue,
}: ExperimentsSectionProps) {
  return (
    <section
      id="experiments"
      data-section-id="experiments"
      aria-label="Experiments and Playground"
      className="relative z-20 flex min-h-[100svh] items-center px-4 py-24 sm:px-8 md:px-12 lg:px-16"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="h-36 sm:h-44 md:hidden" aria-hidden="true" />

        <div className="w-full space-y-6 md:ml-auto md:w-[60%] lg:w-[58%]">
          <div className="space-y-3">
            <SectionEyebrow text="05 / Digital Playground" />
            <h2 className="kinetic-headline font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-bold uppercase leading-[0.98] tracking-[-0.015em] text-white">
              <KineticText
                text="EXPERIMENTS & INTERACTIVE LABS"
                mode="words"
                reducedMotion={reducedMotion}
              />
            </h2>
            <p className="max-w-xl text-xs leading-relaxed text-neutral-400 sm:text-sm">
              Independently interactive sandboxes—manipulate the live 3D monolith, disturb the node field, deform display type, or inspect sandboxed browser agent work.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* EXP-01: Live 3D Stage & Lighting Controller */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[#08080c]/85 p-5 backdrop-blur-md">
              <div className="space-y-3">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="inline-flex items-center gap-1.5 text-[#c4b5fd]">
                    <Sparkles className="h-3 w-3" aria-hidden="true" />
                    EXP-01
                  </span>
                  <span className="text-neutral-500">Live 3D Rig</span>
                </div>
                <h3 className="font-display text-xl uppercase text-white">
                  3D Stage &amp; Lighting Sandbox
                </h3>

                {/* Finish controls */}
                <div className="grid grid-cols-3 gap-1 rounded-lg bg-black/55 p-1">
                  {MONOLITH_FINISHES.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      data-cursor="explore"
                      onClick={() => {
                        onAudioCue(700);
                        onFinishChange(opt.id);
                      }}
                      className={`cursor-pointer rounded-md py-1 font-mono text-[9.5px] uppercase transition-colors ${
                        finish === opt.id
                          ? 'bg-white/15 text-white'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Spin tempo + Accent light tint */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-1">
                    <span className="mr-1 font-mono text-[9.5px] uppercase text-neutral-500">
                      Spin
                    </span>
                    {[0.4, 1, 2.2].map((speed) => (
                      <button
                        key={speed}
                        type="button"
                        onClick={() => {
                          onAudioCue(660);
                          onSpinMultiplierChange(speed);
                        }}
                        className={`cursor-pointer rounded-md border px-2 py-0.5 font-mono text-[9.5px] transition-colors ${
                          spinMultiplier === speed
                            ? 'border-white/35 bg-white/10 text-white'
                            : 'border-white/10 text-neutral-400 hover:text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onResetDrag}
                    className="inline-flex cursor-pointer items-center gap-1 font-mono text-[9.5px] uppercase text-neutral-400 hover:text-white"
                  >
                    <RotateCcw className="h-3 w-3" aria-hidden="true" />
                    Reset Pose
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {LIGHT_SWATCHES.map((sw) => (
                    <button
                      key={sw.label}
                      type="button"
                      onClick={() => {
                        onAudioCue(740);
                        onAccentOverrideChange(sw.hex);
                      }}
                      className={`cursor-pointer rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] uppercase transition-colors ${
                        accentOverrideHex === sw.hex
                          ? 'border-white/40 bg-white/10 text-white'
                          : 'border-white/10 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {sw.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* EXP-02: Interactive Particle Node Field */}
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/[0.09] bg-[#08080c]/85 p-5 backdrop-blur-md sm:translate-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="inline-flex items-center gap-1.5 text-[#79c8e8]">
                    <FlaskConical className="h-3 w-3" aria-hidden="true" />
                    EXP-02
                  </span>
                  <span className="text-neutral-500">Pointer Physics</span>
                </div>
                <h3 className="font-display text-xl uppercase text-white">
                  Node Proximity Field
                </h3>
              </div>
              <InteractiveParticlePlayground reducedMotion={reducedMotion} />
              <p className="font-mono text-[10px] text-neutral-400">
                Move pointer across canvas to repel spatial nodes in real time.
              </p>
            </div>

            {/* EXP-03: Kinetic Typography Study */}
            <div className="flex flex-col justify-between gap-3 rounded-2xl border border-white/[0.09] bg-[#08080c]/85 p-5 backdrop-blur-md">
              <div className="space-y-2">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="inline-flex items-center gap-1.5 text-[#d6b384]">
                    <FlaskConical className="h-3 w-3" aria-hidden="true" />
                    EXP-03
                  </span>
                  <span className="text-neutral-500">Display Type</span>
                </div>
                <h3 className="font-display text-xl uppercase text-white">
                  Kinetic Type Study
                </h3>
              </div>
              <TypographyPlayground reducedMotion={reducedMotion} />
            </div>

            {/* EXP-04: Genuine Repo Sandbox & UI Studies */}
            <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[0.09] bg-[#08080c]/85 p-5 backdrop-blur-md sm:translate-y-3">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em]">
                  <span className="inline-flex items-center gap-1.5 text-emerald-400">
                    <FlaskConical className="h-3 w-3" aria-hidden="true" />
                    EXP-04
                  </span>
                  <span className="text-neutral-500">Open Repositories</span>
                </div>
                <h3 className="font-display text-xl uppercase text-white">
                  Agent Extension &amp; UI Lab
                </h3>
                <p className="text-[12.5px] leading-relaxed text-neutral-300">
                  Manifest V3 browser side panel + loopback Node.js sandbox (127.0.0.1:3721, DPAPI/AES-256 vault) alongside experimental UI studies (`NeuralBench`, `AXION FORGE`).
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] pt-3">
                <a
                  href={`${OWNER_PROFILE.githubUrl}/Agent-Extension`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-200 hover:text-white"
                >
                  <span>Agent-Extension</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                <a
                  href={`${OWNER_PROFILE.githubUrl}/NeuralBench`}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="open"
                  className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-400 hover:text-white"
                >
                  <span>NeuralBench</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
