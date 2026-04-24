import { IconProps } from './icon-types';

/* ─── HeartIcon — Classic heart shape. Accent orange to coral gradient. ─── */
export function HeartIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`ht-${id}`} x1="8" y1="12" x2="56" y2="56">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>

      {/* Glow behind heart on active */}
      <ellipse cx="32" cy="38" rx="26" ry="18" fill="#ff6b35"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 38px' }}
      />

      {/* Pulse outline ring on active */}
      <path
        d="M32 54 C32 54 8 40 8 24 C8 16 14 10 22 10 C27 10 31 13 32 15 C33 13 37 10 42 10 C50 10 56 16 56 24 C56 40 32 54 32 54Z"
        stroke="#ff6b35" strokeWidth="2" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-30 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />

      {/* Main heart path */}
      <path
        d="M32 52 C32 52 9 39 9 24 C9 16.5 15 11 22 11 C27 11 31 14 32 16 C33 14 37 11 42 11 C49 11 55 16.5 55 24 C55 39 32 52 32 52Z"
        fill={`url(#ht-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Shine ellipse on upper-left of heart */}
      <ellipse cx="22" cy="22" rx="6" ry="4" fill="white" transform="rotate(-30 22 22)"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />

      {/* Smaller shine highlight */}
      <path d="M18 18 C18 15 22 13 25 14" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />

      {/* Sparkle dot — top right */}
      <circle cx="50" cy="12" r="2" fill="#ff6b35"
        className={`transition-all duration-500 ${active ? 'opacity-65 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '50px 12px' }}
      />
      {/* Sparkle dot — top left */}
      <circle cx="12" cy="14" r="1.5" fill="#e11d48"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '12px 14px' }}
      />
      {/* Sparkle star — upper right */}
      <path d="M54 20l1.2-2.4 1.2 2.4-2.4-1.2h2.4z" fill="#ff6b35"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '55.2px 20px' }}
      />
    </svg>
  );
}

/* ─── HomeIcon — House with window, door, chimney. Warm amber gradient. ─── */
export function HomeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`hm-${id}`} x1="10" y1="14" x2="54" y2="58">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id={`hm2-${id}`} x1="10" y1="32" x2="54" y2="58">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Glow on active */}
      <ellipse cx="32" cy="46" rx="24" ry="12" fill="#fbbf24"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 46px' }}
      />

      {/* Chimney — sits behind roof */}
      <rect x="42" y="18" width="6" height="14" rx="1"
        fill={`url(#hm-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Triangular roof */}
      <path d="M10 34 L32 14 L54 34 Z"
        fill={`url(#hm-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Main building rectangle */}
      <rect x="14" y="34" width="36" height="24" rx="2"
        fill={`url(#hm2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Door with handle */}
      <rect x="26" y="46" width="12" height="12" rx="2" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      {/* Door handle */}
      <circle cx="35" cy="52.5" r="1.5" fill="#d97706"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-30'}`}
      />

      {/* Window */}
      <rect x="17" y="38" width="9" height="8" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      {/* Window cross dividers */}
      <line x1="21.5" y1="38" x2="21.5" y2="46" stroke="#d97706" strokeWidth="1"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />
      <line x1="17" y1="42" x2="26" y2="42" stroke="#d97706" strokeWidth="1"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Roof shine line */}
      <path d="M14 33 L32 16" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Smoke circles from chimney — visible on active */}
      <circle cx="45" cy="14" r="2.5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-30 -translate-y-1' : 'opacity-0 translate-y-0'}`}
      />
      <circle cx="47" cy="9" r="2" fill="white"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-20 -translate-y-1' : 'opacity-0 translate-y-0'}`}
      />
      <circle cx="44" cy="5" r="1.5" fill="white"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-15 -translate-y-1' : 'opacity-0 translate-y-0'}`}
      />
    </svg>
  );
}

/* ─── CameraIcon — Camera body with lens. Gray to dark green gradient. ─── */
export function CameraIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cm-${id}`} x1="8" y1="18" x2="56" y2="56">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#153b24" />
        </linearGradient>
        <linearGradient id={`cm2-${id}`} x1="20" y1="24" x2="44" y2="48">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>
      </defs>

      {/* Glow on active */}
      <rect x="8" y="20" width="48" height="34" rx="8" fill="#6b7280"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 37px' }}
      />

      {/* Viewfinder bump on top */}
      <rect x="22" y="16" width="12" height="8" rx="3"
        fill={`url(#cm-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Camera body — rounded rectangle */}
      <rect x="8" y="22" width="48" height="32" rx="6"
        fill={`url(#cm-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Body shine — top highlight */}
      <path d="M12 26 C12 24 20 23 28 23" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Lens outer barrel */}
      <circle cx="32" cy="38" r="13" fill={`url(#cm2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-80'}`}
      />
      {/* Lens middle ring */}
      <circle cx="32" cy="38" r="9" fill="#1f2937"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Lens inner */}
      <circle cx="32" cy="38" r="6" fill="#111827"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Lens shine ellipse */}
      <ellipse cx="29" cy="35" rx="2.5" ry="2" fill="white" transform="rotate(-20 29 35)"
        className={`transition-opacity duration-500 ${active ? 'opacity-45' : 'opacity-20'}`}
      />

      {/* Flash circle — scales on active */}
      <circle cx="52" cy="28" r="3" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-55 scale-110' : 'opacity-20 scale-100'}`}
        style={{ transformOrigin: '52px 28px' }}
      />
      {/* Flash sparkle ray */}
      <path d="M52 22l1-2 1 2-2-1h2z" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '53px 22px' }}
      />

      {/* Strap lug left */}
      <rect x="8" y="26" width="4" height="6" rx="1" fill="#374151"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-30'}`}
      />
      {/* Strap lug right */}
      <rect x="52" y="26" width="4" height="6" rx="1" fill="#374151"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-30'}`}
      />
    </svg>
  );
}

/* ─── CompassIcon — Compass with needle and cardinal marks. Teal to emerald. ─── */
export function CompassIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <style>{`@keyframes compassSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
        <linearGradient id={`cp-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
        <linearGradient id={`cp2-${id}`} x1="28" y1="18" x2="36" y2="46">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#6ee7b7" />
        </linearGradient>
      </defs>

      {/* Rotating dashed ring on active */}
      <circle cx="32" cy="32" r="28" stroke="#34d399" strokeWidth="1.5" fill="none"
        strokeDasharray="6 4"
        className={`transition-all duration-700 ${active ? 'opacity-30' : 'opacity-0'}`}
        style={active ? { animation: 'compassSpin 4s linear infinite', transformOrigin: '32px 32px' } : {}}
      />

      {/* Outer ring */}
      <circle cx="32" cy="32" r="26" stroke={`url(#cp-${id})`} strokeWidth="3" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-65'}`}
      />

      {/* Inner ring (lighter) */}
      <circle cx="32" cy="32" r="22" stroke="#34d399" strokeWidth="1" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-20'}`}
      />

      {/* Cardinal tick marks — N, E, S, W */}
      <line x1="32" y1="8" x2="32" y2="14" stroke={`url(#cp-${id})`} strokeWidth="2.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      <line x1="56" y1="32" x2="50" y2="32" stroke={`url(#cp-${id})`} strokeWidth="2.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      <line x1="32" y1="56" x2="32" y2="50" stroke={`url(#cp-${id})`} strokeWidth="2.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      <line x1="8" y1="32" x2="14" y2="32" stroke={`url(#cp-${id})`} strokeWidth="2.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />

      {/* "N" letter above north tick */}
      <text x="32" y="7" textAnchor="middle" fontSize="6" fontWeight="bold" fontFamily="sans-serif" fill="#0d9488"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
      >N</text>

      {/* South needle (lighter opacity pointing down) */}
      <path d="M32 36 L28.5 46 L32 43 L35.5 46 Z"
        fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-50' : 'opacity-25'}`}
      />

      {/* North needle (gradient, pointing up) */}
      <path d="M32 28 L28.5 38 L32 35 L35.5 38 Z"
        fill={`url(#cp2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Center pivot dot — gradient outer */}
      <circle cx="32" cy="37" r="3.5" fill={`url(#cp-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Center pivot dot — white inner */}
      <circle cx="32" cy="37" r="1.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-30'}`}
      />
    </svg>
  );
}

/* ─── TargetIcon — Bullseye with diagonal arrow. Accent orange to yellow. ─── */
export function TargetIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`tgt-${id}`} x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
      </defs>

      {/* Outer pulse ring on active */}
      <circle cx="32" cy="32" r="30" stroke="#ff6b35" strokeWidth="1.5" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-20 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />

      {/* Outer ring */}
      <circle cx="32" cy="32" r="26" stroke={`url(#tgt-${id})`} strokeWidth="3" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-65'}`}
      />

      {/* Middle ring */}
      <circle cx="32" cy="32" r="18" stroke={`url(#tgt-${id})`} strokeWidth="3" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-55'}`}
      />

      {/* Inner fill ring */}
      <circle cx="32" cy="32" r="10" fill={`url(#tgt-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-45'}`}
      />

      {/* Bullseye center (white) */}
      <circle cx="32" cy="32" r="5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-60'}`}
      />

      {/* Arrow shaft — diagonal from upper right to center */}
      <line x1="52" y1="12" x2="35" y2="29" stroke="#ff6b35" strokeWidth="2.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />

      {/* Arrowhead */}
      <path d="M35 29 L41 16 L48 22 Z"
        fill="#ff6b35"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />

      {/* Arrow feathers */}
      <path d="M52 12 L56 8 M52 12 L58 14 M52 12 L50 18"
        stroke="#ffb400" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-30'}`}
      />

      {/* Sparkle dot — lower left on active */}
      <circle cx="10" cy="52" r="2" fill="#ffb400"
        className={`transition-all duration-500 delay-100 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '10px 52px' }}
      />
    </svg>
  );
}

/* ─── PaletteIcon — Artist palette with paint dots. Rainbow gradient. ─── */
export function PaletteIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`pl-${id}`} x1="8" y1="10" x2="56" y2="58">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="35%" stopColor="#ffb400" />
          <stop offset="65%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Glow on active */}
      <ellipse cx="32" cy="36" rx="28" ry="22" fill="#ffb400"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 36px' }}
      />

      {/* Palette bean shape */}
      <path
        d="M14 32 C10 20 16 10 28 8 C40 6 54 14 56 26 C58 36 52 46 42 50 C36 52 30 50 26 46 C20 42 18 40 16 38 C14 36 14 34 14 32 Z"
        fill={`url(#pl-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-70'}`}
      />

      {/* Palette shine — upper-left highlight */}
      <path d="M18 26 C18 20 24 14 30 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />

      {/* Thumb hole */}
      <circle cx="26" cy="40" r="5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />

      {/* Paint dot 1 — red */}
      <circle cx="34" cy="14" r="4"
        fill="#e11d48"
        className={`transition-all duration-500 ${active ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '34px 14px' }}
      />
      {/* Paint dot 2 — amber */}
      <circle cx="46" cy="18" r="4"
        fill="#ffb400"
        className={`transition-all duration-500 delay-75 ${active ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '46px 18px' }}
      />
      {/* Paint dot 3 — teal */}
      <circle cx="52" cy="30" r="4"
        fill="#34d399"
        className={`transition-all duration-500 delay-100 ${active ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '52px 30px' }}
      />
      {/* Paint dot 4 — blue */}
      <circle cx="48" cy="42" r="4"
        fill="#0284c7"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '48px 42px' }}
      />
      {/* Paint dot 5 — purple */}
      <circle cx="38" cy="50" r="4"
        fill="#a78bfa"
        className={`transition-all duration-500 delay-200 ${active ? 'opacity-100 scale-110' : 'opacity-70 scale-100'}`}
        style={{ transformOrigin: '38px 50px' }}
      />

      {/* Sparkle stars on active */}
      <path d="M8 14l1.2-2.4 1.2 2.4-2.4-1.2h2.4z" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '9.2px 14px' }}
      />
      <path d="M56 10l1-2 1 2-2-1h2z" fill="#34d399"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '57px 10px' }}
      />
      <path d="M58 50l1.5-3 1.5 3-3-1.5h3z" fill="#0284c7"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-40 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '59.5px 50px' }}
      />
    </svg>
  );
}
