import { useCallback, useEffect, useRef, useState } from 'react';

interface AudioNodes {
  ctx: AudioContext;
  droneGain: GainNode;
  oscLow: OscillatorNode;
  oscHarmonic: OscillatorNode;
}

/**
 * Opt-in procedural Web Audio feedback controller.
 * Muted by default; activates cleanly only on explicit user action without external media files.
 */
export function useAudioFeedback(reducedMotion: boolean) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const nodesRef = useRef<AudioNodes | null>(null);

  const stopEngine = useCallback(() => {
    const nodes = nodesRef.current;
    if (!nodes) return;
    try {
      const now = nodes.ctx.currentTime;
      nodes.droneGain.gain.cancelScheduledValues(now);
      nodes.droneGain.gain.setTargetAtTime(0, now, 0.08);
      window.setTimeout(() => {
        try {
          nodes.oscLow.stop();
          nodes.oscHarmonic.stop();
          void nodes.ctx.close();
        } catch {
          // Ignore already closed audio context
        }
      }, 240);
    } catch {
      // Ignore cleanup errors
    }
    nodesRef.current = null;
  }, []);

  const toggleSound = useCallback(() => {
    if (soundEnabled) {
      stopEngine();
      setSoundEnabled(false);
      return;
    }

    if (typeof window === 'undefined') return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;

    try {
      const ctx = new AudioCtx();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 180;

      const droneGain = ctx.createGain();
      droneGain.gain.value = 0;

      const oscLow = ctx.createOscillator();
      oscLow.type = 'sine';
      oscLow.frequency.value = 55;

      const oscHarmonic = ctx.createOscillator();
      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.value = 110;

      oscLow.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(droneGain);
      droneGain.connect(ctx.destination);

      oscLow.start();
      oscHarmonic.start();

      if (!reducedMotion) {
        droneGain.gain.setTargetAtTime(0.012, ctx.currentTime, 0.45);
      }

      nodesRef.current = { ctx, droneGain, oscLow, oscHarmonic };
      setSoundEnabled(true);
    } catch {
      setSoundEnabled(false);
    }
  }, [reducedMotion, soundEnabled, stopEngine]);

  const playCue = useCallback(
    (pitch = 620) => {
      const nodes = nodesRef.current;
      if (!soundEnabled || !nodes || reducedMotion) return;

      try {
        const { ctx } = nodes;
        const now = ctx.currentTime;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.exponentialRampToValueAtTime(pitch * 1.28, now + 0.05);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.022, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 0.1);
      } catch {
        // Ignore transient scheduling errors
      }
    },
    [reducedMotion, soundEnabled],
  );

  useEffect(() => {
    return () => stopEngine();
  }, [stopEngine]);

  return { soundEnabled, toggleSound, playCue };
}
