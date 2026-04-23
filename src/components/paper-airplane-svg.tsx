'use client';

interface PaperAirplaneSvgProps {
  size?: number;
  className?: string;
}

export function PaperAirplaneSvg({ size = 32, className = '' }: PaperAirplaneSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main body */}
      <path
        d="M2 16L28 4L20 28L16 18L2 16Z"
        fill="#2d6a2d"
        stroke="#1a4a24"
        strokeWidth="0.5"
      />
      {/* Inner fold line */}
      <path
        d="M28 4L16 18"
        stroke="#1a4a24"
        strokeWidth="0.8"
      />
      {/* Top wing highlight */}
      <path
        d="M2 16L28 4L16 18Z"
        fill="#4ade80"
        opacity="0.35"
      />
      {/* Bottom wing shadow */}
      <path
        d="M2 16L16 18L20 28Z"
        fill="#1a4a24"
        opacity="0.15"
      />
    </svg>
  );
}
