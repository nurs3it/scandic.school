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
        <linearGradient id="plane-top" x1="10" y1="10" x2="55" y2="35">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#22c55e" />
        </linearGradient>
        <linearGradient id="plane-bottom" x1="15" y1="30" x2="50" y2="55">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
        <linearGradient id="plane-tail" x1="10" y1="25" x2="25" y2="50">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>

      {/* Glow when landed */}
      {landed && (
        <>
          <circle cx="32" cy="32" r="28" fill="#4ade80" opacity="0.08" />
          <circle cx="32" cy="32" r="22" fill="#4ade80" opacity="0.12" />
        </>
      )}

      {/*
        Paper airplane — nose points RIGHT
        Based on classic origami paper plane silhouette with 3D fold visible
        Shapes: top wing, bottom wing, tail fold, outlines
      */}

      {/* Top wing — main visible surface */}
      <path
        d="M58 28 L8 14 L22 30 Z"
        fill="url(#plane-top)"
      />

      {/* Bottom wing — darker, angled down */}
      <path
        d="M58 28 L22 30 L14 50 Z"
        fill="url(#plane-bottom)"
      />

      {/* Tail fold — the vertical crease at the back */}
      <path
        d="M8 14 L22 30 L14 50 Z"
        fill="url(#plane-tail)"
        opacity="0.9"
      />

      {/* Center fold line */}
      <path
        d="M58 28 L22 30"
        stroke="#166534"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.4"
      />

      {/* Outlines for paper look */}
      <path
        d="M58 28 L8 14 L22 30 L14 50 Z"
        stroke="#15803d"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 14 L22 30"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M22 30 L58 28"
        stroke="#15803d"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Top wing shine */}
      <path
        d="M50 26 L18 17 L24 28 Z"
        fill="white"
        opacity="0.18"
      />

      {/* Motion lines when flying */}
      {!landed && (
        <>
          <line x1="2" y1="22" x2="8" y2="22" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <line x1="0" y1="30" x2="6" y2="30" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <line x1="4" y1="38" x2="10" y2="38" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" opacity="0.45" />
        </>
      )}

      {/* Sparkles when landed */}
      {landed && (
        <>
          <circle cx="50" cy="14" r="2" fill="#fbbf24" opacity="0.7" />
          <circle cx="52" cy="50" r="1.5" fill="#4ade80" opacity="0.6" />
          <path d="M6 22L8 18L10 22L8 26Z" fill="#fbbf24" opacity="0.5" />
        </>
      )}
    </svg>
  );
}
