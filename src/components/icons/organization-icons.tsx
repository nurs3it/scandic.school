import { IconProps } from './icon-types';

/* ─── CrownIcon — Royal crown with 3 peaks and gems. Gold/amber gradient. ─── */
export function CrownIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cr-${id}`} x1="8" y1="14" x2="56" y2="52">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id={`cr2-${id}`} x1="16" y1="44" x2="48" y2="56">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Glow behind crown on active */}
      <ellipse cx="32" cy="38" rx="24" ry="10" fill="#ffb400"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 38px' }}
      />

      {/* Crown body — main shape with 3 peaks */}
      <path
        d="M10 46 L12 28 L22 38 L32 14 L42 38 L52 28 L54 46 Z"
        fill={`url(#cr-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Base band */}
      <rect x="10" y="46" width="44" height="7" rx="3"
        fill={`url(#cr2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Crown shine — top-left highlight */}
      <path d="M14 44 C14 36 18 29 22 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />

      {/* Gem on left peak */}
      <circle cx="22" cy="38" r="3" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      {/* Gem on center peak */}
      <circle cx="32" cy="18" r="3.5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-55 scale-110' : 'opacity-25 scale-100'}`}
        style={{ transformOrigin: '32px 18px' }}
      />
      {/* Gem on right peak */}
      <circle cx="42" cy="38" r="3" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />

      {/* Small gems on base band */}
      <circle cx="20" cy="49.5" r="1.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      <circle cx="32" cy="49.5" r="1.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      <circle cx="44" cy="49.5" r="1.5" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />

      {/* Sparkle stars on active */}
      <path d="M8 18l1.2-2.4 1.2 2.4-2.4-1.2h2.4z" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '9.2px 18px' }}
      />
      <path d="M54 16l1-2 1 2-2-1h2z" fill="#d97706"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '55px 16px' }}
      />
      <path d="M58 30l1.5-3 1.5 3-3-1.5h3z" fill="#ffb400"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-40 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '59.5px 30px' }}
      />
    </svg>
  );
}

/* ─── BriefcaseIcon — Leather briefcase with handle and clasp. Dark green to teal. ─── */
export function BriefcaseIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`br-${id}`} x1="10" y1="18" x2="54" y2="56">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id={`br2-${id}`} x1="10" y1="30" x2="54" y2="50">
          <stop offset="0%" stopColor="#1d6b4e" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Handle — arc on top, stroke only */}
      <path d="M24 22 C24 18 40 18 40 22"
        stroke={`url(#br-${id})`} strokeWidth="3" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />

      {/* Main briefcase body */}
      <rect x="10" y="24" width="44" height="30" rx="5"
        fill={`url(#br-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Center horizontal band */}
      <rect x="10" y="37" width="44" height="4"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-10'}`}
      />

      {/* Clasp — center rectangle */}
      <rect x="27" y="34.5" width="10" height="7" rx="2"
        fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-45' : 'opacity-20'}`}
      />
      {/* Clasp inner detail */}
      <rect x="29.5" y="37" width="5" height="2" rx="1"
        fill={`url(#br2-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-40'}`}
      />

      {/* Body shine — top-left highlight */}
      <path d="M14 28 C14 28 18 26 24 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Stitching detail on bottom */}
      <path d="M14 50 L50 50" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none"
        strokeDasharray="3 3"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />

      {/* Sparkle dots on active */}
      <circle cx="10" cy="20" r="1.5" fill="#0d9488"
        className={`transition-all duration-500 ${active ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '10px 20px' }}
      />
      <circle cx="54" cy="18" r="1" fill="#0d9488"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '54px 18px' }}
      />
      <circle cx="58" cy="36" r="1.5" fill="#153b24"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '58px 36px' }}
      />
    </svg>
  );
}

/* ─── ShieldIcon — Shield with animated checkmark. Teal gradient. ─── */
export function ShieldIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`sh-${id}`} x1="16" y1="8" x2="48" y2="52">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Shield glow on active */}
      <path d="M32 6L12 16v14c0 14 8.5 22 20 28 11.5-6 20-14 20-28V16L32 6z"
        fill="#2dd4bf"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />

      {/* Shield body */}
      <path d="M32 8L14 17v13c0 13 7.5 20 18 26 10.5-6 18-13 18-26V17L32 8z"
        fill={`url(#sh-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Inner highlight shield */}
      <path d="M32 12L18 19v11c0 11 6 17 14 22 8-5 14-11 14-22V19L32 12z"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-15' : 'opacity-5'}`}
      />

      {/* Shine on top-left */}
      <path d="M22 18c0 0 4-4 10-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />

      {/* Animated checkmark — strokeDashoffset trick */}
      <path d="M24 32l6 6 12-14"
        stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        strokeDasharray="40"
        strokeDashoffset={active ? '0' : '40'}
        className={active ? 'opacity-90' : 'opacity-50'}
        style={{ transition: 'stroke-dashoffset 0.6s ease-out, opacity 0.5s' }}
      />

      {/* Pulse rings on active */}
      <circle cx="32" cy="32" r="26" stroke="#2dd4bf" strokeWidth="1.5" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-20 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />

      {/* Sparkle stars */}
      <path d="M12 12l1.5-3 1.5 3-3-1.5h3z" fill="#2dd4bf"
        className={`transition-all duration-500 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '13.5px 12px' }}
      />
      <path d="M50 10l1-2 1 2-2-1h2z" fill="#0d9488"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-45 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '51px 10px' }}
      />
    </svg>
  );
}

/* ─── Building2Icon — Modern building with flag. Dark green to emerald. ─── */
export function Building2Icon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`bd-${id}`} x1="14" y1="10" x2="50" y2="58">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>

      {/* Building shadow/glow on active */}
      <rect x="16" y="20" width="32" height="40" rx="2" fill="#34d399"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 40px' }}
      />

      {/* Main building body */}
      <rect x="18" y="22" width="28" height="38" rx="2"
        fill={`url(#bd-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Roof line */}
      <rect x="16" y="20" width="32" height="4" rx="2"
        fill="#153b24"
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Flag pole */}
      <line x1="32" y1="8" x2="32" y2="22"
        stroke="white" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-30'}`}
      />
      {/* Flag — yellow on active, faded on inactive */}
      <path d="M32 8 L44 11 L32 14 Z"
        fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-90 scale-100' : 'opacity-40 scale-90'}`}
        style={{ transformOrigin: '32px 11px' }}
      />

      {/* Window grid — row 1 */}
      <rect x="22" y="27" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      <rect x="29.5" y="27" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-10'}`}
      />
      <rect x="37" y="27" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />

      {/* Window grid — row 2 */}
      <rect x="22" y="35" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-10'}`}
      />
      <rect x="29.5" y="35" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      <rect x="37" y="35" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-10'}`}
      />

      {/* Window grid — row 3 */}
      <rect x="22" y="43" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      <rect x="37" y="43" width="5" height="5" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />

      {/* Door */}
      <rect x="27.5" y="48" width="9" height="12" rx="2" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />

      {/* Horizontal rays from sides on active */}
      <path d="M14 34 L8 34 M14 38 L10 38" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-50' : 'opacity-0'}`}
      />
      <path d="M50 34 L56 34 M50 38 L54 38" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 delay-75 ${active ? 'opacity-50' : 'opacity-0'}`}
      />
    </svg>
  );
}

/* ─── UsersIcon — 3 person silhouettes. Emerald gradient. ─── */
export function UsersIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`us-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Center person — circle head */}
      <circle cx="32" cy="20" r="7" fill={`url(#us-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Center person — body arc */}
      <path d="M21 44c0-6 5-11 11-11s11 5 11 11" fill={`url(#us-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Left person — smaller, lighter */}
      <circle cx="14" cy="26" r="5" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-80 -translate-x-1' : 'opacity-40'}`}
      />
      <path d="M6 46c0-5 3.5-9 8-9s8 4 8 9" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-60 -translate-x-1' : 'opacity-25'}`}
      />

      {/* Right person — smaller, darker */}
      <circle cx="50" cy="26" r="5" fill="#059669"
        className={`transition-all duration-500 ${active ? 'opacity-80 translate-x-1' : 'opacity-40'}`}
      />
      <path d="M42 46c0-5 3.5-9 8-9s8 4 8 9" fill="#059669"
        className={`transition-all duration-500 ${active ? 'opacity-60 translate-x-1' : 'opacity-25'}`}
      />

      {/* Connection dashed lines on active */}
      <path d="M22 32 C18 31 16 30 14 30" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2"
        className={`transition-all duration-700 ${active ? 'opacity-55' : 'opacity-0'}`}
      />
      <path d="M42 32 C46 31 48 30 50 30" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2"
        className={`transition-all duration-700 ${active ? 'opacity-55' : 'opacity-0'}`}
      />

      {/* Small heart at bottom on active */}
      <path d="M32 52 C32 52 30 49.5 30 48 C30 46.5 31 45.5 32 45.5 C33 45.5 34 46.5 34 48 C34 49.5 32 52 32 52Z"
        fill={`url(#us-${id})`}
        className={`transition-all duration-500 delay-200 ${active ? 'opacity-65 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '32px 49px' }}
      />
    </svg>
  );
}

/* ─── SchoolIcon — Classical school building with pediment and bell. Dark green to amber. ─── */
export function SchoolIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`sc-${id}`} x1="10" y1="14" x2="54" y2="58">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
        <linearGradient id={`sc2-${id}`} x1="10" y1="30" x2="54" y2="58">
          <stop offset="0%" stopColor="#1d6b4e" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Bell on top — with scale animation on active */}
      <g className={`transition-all duration-500 ${active ? 'scale-110' : 'scale-100'}`}
        style={{ transformOrigin: '32px 14px' }}>
        <path d="M28 14 C28 10 36 10 36 14 L38 20 H26 Z" fill="#ffb400"
          className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
        />
        <circle cx="32" cy="20" r="1.5" fill="#d97706"
          className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
        />
      </g>

      {/* Bell ring wave arcs on active */}
      <path d="M24 12 C22 10 22 7 24 5" stroke="#ffb400" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-55' : 'opacity-0'}`}
      />
      <path d="M40 12 C42 10 42 7 40 5" stroke="#ffb400" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 delay-75 ${active ? 'opacity-50' : 'opacity-0'}`}
      />
      <path d="M20 14 C17 11 17 6 20 3" stroke="#ffb400" strokeWidth="1" strokeLinecap="round" fill="none"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-35' : 'opacity-0'}`}
      />

      {/* Triangular roof / pediment */}
      <path d="M10 30 L32 14 L54 30 Z"
        fill={`url(#sc-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Main building rectangle */}
      <rect x="12" y="30" width="40" height="28" rx="1"
        fill={`url(#sc2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Columns — white vertical rectangles */}
      <rect x="16" y="30" width="4" height="28" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />
      <rect x="24" y="30" width="4" height="28" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-5'}`}
      />
      <rect x="36" y="30" width="4" height="28" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-5'}`}
      />
      <rect x="44" y="30" width="4" height="28" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />

      {/* Arched door */}
      <path d="M27 58 L27 46 Q32 40 37 46 L37 58 Z"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />

      {/* Windows */}
      <rect x="16" y="34" width="6" height="7" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />
      <rect x="42" y="34" width="6" height="7" rx="1" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Roof shine */}
      <path d="M16 29 L32 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />
    </svg>
  );
}

/* ─── CoffeeIcon — Coffee cup with steam. Amber gradient. ─── */
export function CoffeeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`cf-${id}`} x1="10" y1="26" x2="50" y2="58">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id={`cf2-${id}`} x1="14" y1="52" x2="50" y2="58">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Steam lines — wavy paths that translate up on active */}
      <path d="M24 20 C24 18 26 16 26 14 C26 12 24 10 24 8"
        stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-55 -translate-y-2' : 'opacity-20 translate-y-0'}`}
      />
      <path d="M32 22 C32 20 34 17 34 15 C34 13 32 11 32 9"
        stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-50 -translate-y-2' : 'opacity-15 translate-y-0'}`}
      />
      <path d="M40 20 C40 18 42 16 42 14 C42 12 40 10 40 8"
        stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-700 delay-200 ${active ? 'opacity-45 -translate-y-2' : 'opacity-10 translate-y-0'}`}
      />

      {/* Saucer ellipse */}
      <ellipse cx="32" cy="54" rx="22" ry="5"
        fill={`url(#cf2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-65'}`}
      />

      {/* Cup body — trapezoid shape */}
      <path d="M14 28 L17 54 L47 54 L50 28 Z"
        fill={`url(#cf-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Cup rim */}
      <rect x="13" y="24" width="38" height="6" rx="3"
        fill={`url(#cf-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Cup shine line — diagonal highlight */}
      <path d="M20 28 L22 50" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Handle — stroke arc on right side */}
      <path d="M50 32 C56 32 58 36 58 40 C58 44 56 48 50 48"
        stroke={`url(#cf-${id})`} strokeWidth="3" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-55'}`}
      />

      {/* Coffee liquid inside cup */}
      <ellipse cx="32" cy="26" rx="16" ry="3"
        fill="#92400e"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Pulse glow on active */}
      <ellipse cx="32" cy="54" rx="26" ry="6" stroke="#fbbf24" strokeWidth="1" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-25 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 54px' }}
      />
    </svg>
  );
}
