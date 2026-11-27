export function FallbackSculpture() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 flex items-center justify-center overflow-hidden"
    >
      <div className="relative h-52 w-52 sm:h-64 sm:w-64">
        <div
          className="absolute inset-0 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(211,211,211,0.12) 0%, rgba(214,179,132,0.06) 45%, transparent 72%)',
          }}
        />
        <svg
          viewBox="0 0 240 240"
          className="h-full w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.8)]"
          fill="none"
        >
          <defs>
            <linearGradient id="cubeTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8e8e8" stopOpacity="0.92" />
              <stop offset="100%" stopColor="#9c9ea4" stopOpacity="0.82" />
            </linearGradient>
            <linearGradient id="cubeLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#84868e" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#3b3c42" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="cubeRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d6b384" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#565860" stopOpacity="0.88" />
            </linearGradient>
          </defs>
          <polygon points="120,34 196,76 120,118 44,76" fill="url(#cubeTop)" />
          <polygon points="44,76 120,118 120,204 44,162" fill="url(#cubeLeft)" />
          <polygon points="196,76 196,162 120,204 120,118" fill="url(#cubeRight)" />
          <path
            d="M120 34L196 76V162L120 204L44 162V76L120 34Z"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.2"
          />
          <circle
            cx="120"
            cy="120"
            r="98"
            stroke="rgba(214,179,132,0.22)"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
        </svg>
      </div>
    </div>
  );
}
