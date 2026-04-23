'use client';

interface PaperAirplaneSvgProps {
  size?: number;
  className?: string;
  landed?: boolean;
}

export function PaperAirplaneSvg({ size = 32, className = '', landed = false }: PaperAirplaneSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="plane-grad" x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
        <linearGradient id="plane-shadow" x1="8" y1="32" x2="56" y2="56">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>
      </defs>

      {/* Glow when landed */}
      {landed && (
        <>
          <circle cx="32" cy="32" r="28" fill="#4ade80" opacity="0.08" />
          <circle cx="32" cy="32" r="22" fill="#4ade80" opacity="0.12" />
        </>
      )}

      {/* Paper airplane body — nose points RIGHT (0°) */}
      {/* Top wing (lighter) */}
      <path
        d="M56 32L12 12L24 32Z"
        fill="url(#plane-grad)"
        opacity="0.95"
      />
      {/* Bottom wing (darker) */}
      <path
        d="M56 32L24 32L12 52Z"
        fill="url(#plane-shadow)"
        opacity="0.85"
      />
      {/* Fold crease */}
      <path
        d="M12 12L24 32"
        stroke="#166534"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Wing edge highlight */}
      <path
        d="M56 32L12 12"
        stroke="white"
        strokeWidth="0.8"
        opacity="0.3"
      />
      {/* Subtle shine on top wing */}
      <path
        d="M40 22L20 16L28 28Z"
        fill="white"
        opacity="0.15"
      />

      {/* Motion lines when not landed */}
      {!landed && (
        <>
          <line x1="6" y1="24" x2="14" y2="24" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="4" y1="32" x2="10" y2="32" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <line x1="6" y1="40" x2="14" y2="40" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </>
      )}

      {/* Sparkle when landed */}
      {landed && (
        <>
          <circle cx="48" cy="14" r="2" fill="#fbbf24" opacity="0.7" />
          <circle cx="52" cy="48" r="1.5" fill="#4ade80" opacity="0.6" />
          <path d="M10 18L12 14L14 18L12 22Z" fill="#fbbf24" opacity="0.5" />
        </>
      )}
    </svg>
  );
}
