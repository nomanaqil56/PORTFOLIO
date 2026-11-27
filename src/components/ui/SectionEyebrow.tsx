interface SectionEyebrowProps {
  text: string;
  className?: string;
}

export function SectionEyebrow({ text, className = '' }: SectionEyebrowProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-400 ${className}`}
    >
      <span className="h-px w-4 bg-white/30" aria-hidden="true" />
      {text}
    </span>
  );
}
