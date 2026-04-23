import { IconProps } from './icon-types';

/* ─── InfoIcon — Circle with "i" letter inside. Yellow to orange gradient. ─── */
export function InfoIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`in-${id}`} x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#ff6b35" />
        </linearGradient>
      </defs>

      {/* Outer pulse ring 1 — animate-pulse on active */}
      <circle cx="32" cy="32" r="29" stroke="#ffb400" strokeWidth="1.5" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-20 animate-pulse' : 'opacity-0'}`}
      />

      {/* Outer pulse ring 2 */}
      <circle cx="32" cy="32" r="24" stroke="#ff6b35" strokeWidth="1" fill="none"
        className={`transition-all duration-700 delay-150 ${active ? 'opacity-15 animate-pulse' : 'opacity-0'}`}
      />

      {/* Main circle background */}
      <circle cx="32" cy="32" r="20"
        fill={`url(#in-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Circle shine — white ellipse top-left */}
      <ellipse cx="26" cy="24" rx="6" ry="4" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-10'}`}
        transform="rotate(-30 26 24)"
      />

      {/* "i" dot — white circle at top */}
      <circle cx="32" cy="24" r="2.5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-95' : 'opacity-80'}`}
      />

      {/* "i" body — white rounded rectangle below */}
      <rect x="29.5" y="29" width="5" height="13" rx="2.5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-95' : 'opacity-80'}`}
      />
    </svg>
  );
}

/* ─── HandshakeIcon — Two hands meeting in center. Orange to amber gradient. ─── */
export function HandshakeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`hs-${id}`} x1="6" y1="20" x2="58" y2="50">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id={`hs2-${id}`} x1="10" y1="44" x2="54" y2="56">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Left arm extending from left */}
      <path d="M6 38 C10 36 16 34 20 34"
        stroke={`url(#hs-${id})`} strokeWidth="4" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-65'}`}
      />

      {/* Right arm extending from right */}
      <path d="M58 38 C54 36 48 34 44 34"
        stroke={`url(#hs-${id})`} strokeWidth="4" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-65'}`}
      />

      {/* Left cuff rectangle */}
      <rect x="6" y="34" width="10" height="8" rx="2"
        fill={`url(#hs-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-25'}`}
      />

      {/* Right cuff rectangle */}
      <rect x="48" y="34" width="10" height="8" rx="2"
        fill={`url(#hs-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-25'}`}
      />

      {/* Left hand shape */}
      <path d="M20 28 C20 26 22 25 24 26 L32 30 C34 31 36 30 36 28 C36 26 38 25 40 27 L44 34 L32 38 L20 34 Z"
        fill={`url(#hs-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Right hand shape */}
      <path d="M44 28 C44 26 42 25 40 26 L32 30 C30 31 28 30 28 28 C28 26 26 25 24 27 L20 34 L32 38 L44 34 Z"
        fill={`url(#hs-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-55'}`}
      />

      {/* Clasped hands highlight — white stroke in center */}
      <path d="M26 32 C28 30 30 29 32 29 C34 29 36 30 38 32"
        stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-45' : 'opacity-20'}`}
      />

      {/* Handshake emphasis lines below */}
      <path d="M22 42 L42 42"
        stroke={`url(#hs2-${id})`} strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      <path d="M26 46 L38 46"
        stroke={`url(#hs2-${id})`} strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 delay-75 ${active ? 'opacity-35' : 'opacity-10'}`}
      />

      {/* Active sparkle star above the handshake */}
      <path d="M32 12 L33.5 15.5 L37 17 L33.5 18.5 L32 22 L30.5 18.5 L27 17 L30.5 15.5 Z" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-80 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '32px 17px' }}
      />

      {/* Active sparkle dot left */}
      <circle cx="18" cy="16" r="2" fill="#ff6b35"
        className={`transition-all duration-500 delay-75 ${active ? 'opacity-65 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '18px 16px' }}
      />

      {/* Active sparkle dot right */}
      <circle cx="46" cy="16" r="1.5" fill="#d97706"
        className={`transition-all duration-700 delay-150 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '46px 16px' }}
      />
    </svg>
  );
}

/* ─── HeartHandshakeIcon — Heart shape with two hands meeting inside. Orange to coral. ─── */
export function HeartHandshakeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`hh-${id}`} x1="8" y1="10" x2="56" y2="56">
          <stop offset="0%" stopColor="#ff6b35" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>

      {/* Pulse outline — larger heart stroke on active */}
      <path
        d="M32 56 C32 56 6 40 6 22 C6 14 12 8 20 8 C24 8 28 10 32 14 C36 10 40 8 44 8 C52 8 58 14 58 22 C58 40 32 56 32 56 Z"
        stroke="#ff6b35" strokeWidth="1.5" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-25 scale-110 animate-pulse' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />

      {/* Heart body */}
      <path
        d="M32 52 C32 52 8 37 8 22 C8 15 13 10 20 10 C24 10 28 12 32 16 C36 12 40 10 44 10 C51 10 56 15 56 22 C56 37 32 52 32 52 Z"
        fill={`url(#hh-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100 scale-105' : 'opacity-75 scale-100'}`}
        style={{ transformOrigin: '32px 31px' }}
      />

      {/* Shine ellipse on upper-left */}
      <ellipse cx="22" cy="18" rx="7" ry="4" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
        transform="rotate(-40 22 18)"
      />

      {/* Left hand inside heart — white stroke path from left */}
      <path d="M14 30 C18 28 22 27 26 28 L32 32"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-55' : 'opacity-30'}`}
      />

      {/* Right hand inside heart — white stroke path from right */}
      <path d="M50 30 C46 28 42 27 38 28 L32 32"
        stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-55' : 'opacity-30'}`}
      />

      {/* Clasped center point — white circle */}
      <circle cx="32" cy="32" r="3" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-80 scale-110' : 'opacity-50 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />

      {/* Active sparkle dot — top left */}
      <circle cx="10" cy="10" r="2" fill="#ff6b35"
        className={`transition-all duration-500 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '10px 10px' }}
      />

      {/* Active sparkle dot — top right */}
      <circle cx="54" cy="10" r="1.5" fill="#e11d48"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '54px 10px' }}
      />

      {/* Active sparkle dot — above center */}
      <circle cx="32" cy="6" r="1.5" fill="#ff6b35"
        className={`transition-all duration-500 delay-200 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '32px 6px' }}
      />
    </svg>
  );
}
