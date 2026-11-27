import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { OWNER_PROFILE } from '@/data/portfolio';

interface IntroCurtainProps {
  reducedMotion: boolean;
}

export function IntroCurtain({ reducedMotion }: IntroCurtainProps) {
  const [visible, setVisible] = useState(() => !reducedMotion);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(() => setVisible(false), 880);
    return () => window.clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-[#050505] px-6"
        >
          <div className="w-full max-w-sm space-y-4">
            <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-neutral-400">
              <span>{OWNER_PROFILE.name}</span>
              <span className="text-[#d6b384]">PORTFOLIO</span>
            </div>

            <div className="h-px w-full overflow-hidden bg-white/10">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                className="h-full origin-left bg-gradient-to-r from-white/40 via-[#d6b384] to-white"
              />
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              Initializing WebGL Stage &amp; Digital Systems
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
