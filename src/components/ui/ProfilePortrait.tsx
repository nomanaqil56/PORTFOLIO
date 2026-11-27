import { motion } from 'framer-motion';
import profileImage from '@/assets/profile.jpeg';
import { OWNER_PROFILE } from '@/data/portfolio';

interface ProfilePortraitProps {
  reducedMotion: boolean;
  className?: string;
}

export function ProfilePortrait({ reducedMotion, className = '' }: ProfilePortraitProps) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
      whileHover={reducedMotion ? undefined : { scale: 1.025 }}
      className={`group relative rounded-full p-[3px] shadow-[0_24px_64px_rgba(0,0,0,0.8)] ${className}`}
      style={{
        background:
          'linear-gradient(140deg, rgba(214,179,132,0.52) 0%, rgba(74,74,74,0.92) 42%, rgba(255,255,255,0.14) 100%)',
      }}
    >
      {/* Subtle atmospheric amber/titanium glow behind portrait frame */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 -z-10 rounded-full opacity-55 blur-2xl transition-opacity duration-500 group-hover:opacity-85"
        style={{
          background:
            'radial-gradient(circle, rgba(214,179,132,0.22) 0%, rgba(255,255,255,0.06) 45%, transparent 72%)',
        }}
      />

      {/* Inner circular aperture */}
      <div className="relative h-full w-full overflow-hidden rounded-full bg-[#111] ring-1 ring-inset ring-black/60">
        <img
          src={profileImage}
          alt={`${OWNER_PROFILE.name} portrait`}
          loading="eager"
          decoding="async"
          className="h-[145%] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        {/* Subtle studio edge vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(circle at 38% 35%, transparent 56%, rgba(5,5,5,0.48) 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}
