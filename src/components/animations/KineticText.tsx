import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface KineticTextProps {
  text: string;
  mode?: 'words' | 'chars';
  reducedMotion: boolean;
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}

/**
 * Masked staggered typography reveal.
 * Observes the outer unclipped wrapper (not translated child spans) so reveals
 * trigger reliably across programmatic jumps, short sections, and tall viewports.
 */
export function KineticText({
  text,
  mode = 'words',
  reducedMotion,
  className = '',
  delay = 0,
  stagger,
  immediate = false,
}: KineticTextProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.05 });
  const [shown, setShown] = useState(immediate || reducedMotion);

  useEffect(() => {
    if (inView || immediate || reducedMotion) {
      setShown(true);
    }
  }, [immediate, inView, reducedMotion]);

  if (reducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const tokens = mode === 'chars' ? Array.from(text) : text.split(' ');
  const step = stagger ?? (mode === 'chars' ? 0.022 : 0.045);

  return (
    <span ref={wrapperRef} className={`inline-block ${className}`} aria-label={text}>
      {tokens.map((token, idx) => (
        <span
          key={`${token}-${idx}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            initial={{ y: '105%', opacity: 0 }}
            animate={shown ? { y: '0%', opacity: 1 } : { y: '105%', opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + idx * step,
            }}
            className="inline-block"
          >
            {token === ' ' ? '\u00A0' : token}
          </motion.span>
          {mode === 'words' && idx < tokens.length - 1 ? '\u00A0' : null}
        </span>
      ))}
    </span>
  );
}
