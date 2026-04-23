import { IconProps } from './icon-types';

/* ─── GraduationCapIcon — Graduation cap with tassel. Dark green to gold. ─── */
export function GraduationCapIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`gc-${id}`} x1="8" y1="14" x2="56" y2="52">
          <stop offset="0%" stopColor="#153b24" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
        <linearGradient id={`gc2-${id}`} x1="20" y1="34" x2="44" y2="46">
          <stop offset="0%" stopColor="#1d6b4e" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>

      {/* Glow behind cap on active */}
      <ellipse cx="32" cy="30" rx="26" ry="12" fill="#ffb400"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 30px' }}
      />

      {/* Diamond-shaped cap top */}
      <path
        d="M32 12 L58 26 L32 34 L6 26 Z"
        fill={`url(#gc-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Cap brim shadow below — darker trapezoid */}
      <path
        d="M18 30 L18 40 Q32 44 46 40 L46 30 Q32 34 18 30 Z"
        fill={`url(#gc2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Tassel string from right side */}
      <path d="M58 26 L58 38" stroke="#ffb400" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-40'}`}
      />

      {/* Tassel end ball */}
      <circle cx="58" cy="40" r="3" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-100 scale-110' : 'opacity-60 scale-100'}`}
        style={{ transformOrigin: '58px 40px' }}
      />

      {/* Tassel fringe */}
      <path d="M55 40 L54 46 M58 41 L58 47 M61 40 L62 46"
        stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-30'}`}
      />

      {/* Shine line on cap top */}
      <path d="M14 24 L28 20" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />

      {/* Active sparkle dots */}
      <circle cx="10" cy="18" r="1.5" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '10px 18px' }}
      />
      <circle cx="54" cy="14" r="1" fill="#d97706"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '54px 14px' }}
      />
      <path d="M8 34l1.5-3 1.5 3-3-1.5h3z" fill="#ffb400"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '9.5px 34px' }}
      />
    </svg>
  );
}

/* ─── BookOpenIcon — Open book with spine and text lines. Amber gradient. ─── */
export function BookOpenIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`bo-${id}`} x1="8" y1="14" x2="56" y2="56">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id={`bo2-${id}`} x1="8" y1="14" x2="32" y2="56">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
      </defs>

      {/* Glow on active */}
      <ellipse cx="32" cy="38" rx="28" ry="14" fill="#ffb400"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 38px' }}
      />

      {/* Left page — curved path from spine */}
      <path
        d="M32 18 C28 16 14 16 8 20 L8 52 C14 48 28 48 32 50 Z"
        fill={`url(#bo2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Right page — curved path from spine */}
      <path
        d="M32 18 C36 16 50 16 56 20 L56 52 C50 48 36 48 32 50 Z"
        fill={`url(#bo-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Spine center line */}
      <line x1="32" y1="18" x2="32" y2="50"
        stroke="white" strokeWidth="2" strokeLinecap="round"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-25'}`}
      />

      {/* Text lines on left page */}
      <path d="M14 26 L28 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-45' : 'opacity-20'}`}
      />
      <path d="M12 32 L29 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      <path d="M12 38 L28 37" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      <path d="M14 44 L26 43" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-10'}`}
      />

      {/* Text lines on right page */}
      <path d="M36 26 L50 25" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-10'}`}
      />
      <path d="M35 32 L52 31" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Shine highlight on left page */}
      <path d="M10 22 C12 20 16 18 20 18" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Active sparkles above book */}
      <path d="M20 12l1.5-3 1.5 3-3-1.5h3z" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '21.5px 12px' }}
      />
      <path d="M42 10l1-2 1 2-2-1h2z" fill="#d97706"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '43px 10px' }}
      />
      <circle cx="32" cy="10" r="1.5" fill="#ffb400"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '32px 10px' }}
      />
    </svg>
  );
}

/* ─── FlaskConicalIcon — Erlenmeyer flask with bubbles. Emerald to teal. ─── */
export function FlaskConicalIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`fl-${id}`} x1="20" y1="10" x2="50" y2="58">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Glow at bottom on active */}
      <ellipse cx="32" cy="52" rx="22" ry="8" fill="#34d399"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 52px' }}
      />

      {/* Flask conical body widening downward */}
      <path
        d="M24 28 L10 54 Q10 58 14 58 L50 58 Q54 58 54 54 L40 28 Z"
        fill={`url(#fl-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Narrow neck */}
      <rect x="24" y="10" width="16" height="20" rx="2"
        fill={`url(#fl-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Flask rim on top */}
      <rect x="22" y="8" width="20" height="5" rx="2.5"
        fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-65'}`}
      />

      {/* Liquid level fill — white, low opacity */}
      <path
        d="M12 50 L18 38 L46 38 L52 50 Z"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-10'}`}
      />

      {/* Shine on neck */}
      <path d="M27 12 L27 26" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />

      {/* Shine on body */}
      <path d="M16 50 L22 36" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />

      {/* Bubbles — translate up on active */}
      <circle cx="28" cy="48" r="2.5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-35 -translate-y-2' : 'opacity-10 translate-y-0'}`}
      />
      <circle cx="36" cy="44" r="2" fill="white"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-30 -translate-y-3' : 'opacity-10 translate-y-0'}`}
      />
      <circle cx="32" cy="52" r="1.5" fill="white"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-25 -translate-y-1' : 'opacity-10 translate-y-0'}`}
      />

      {/* Active sparkle */}
      <path d="M8 30l1.5-3 1.5 3-3-1.5h3z" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '9.5px 30px' }}
      />
      <path d="M54 26l1-2 1 2-2-1h2z" fill="#0d9488"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-45 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '55px 26px' }}
      />
    </svg>
  );
}

/* ─── BeakerIcon — Lab beaker with measurement lines. Emerald gradient. ─── */
export function BeakerIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`bk-${id}`} x1="14" y1="10" x2="50" y2="58">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>

      {/* Glow at bottom on active */}
      <ellipse cx="34" cy="54" rx="18" ry="6" fill="#34d399"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '34px 54px' }}
      />

      {/* Beaker body — tall rectangle with rounded bottom */}
      <path
        d="M20 12 L20 52 Q20 58 26 58 L44 58 Q50 58 50 52 L50 12 Z"
        fill={`url(#bk-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Spout on left top */}
      <path d="M20 16 L10 12 L12 20 L20 20 Z"
        fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />

      {/* Rim on top */}
      <rect x="18" y="8" width="34" height="6" rx="3"
        fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Liquid fill at bottom */}
      <path d="M20 46 L20 52 Q20 58 26 58 L44 58 Q50 58 50 52 L50 46 Z"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />

      {/* Measurement marks — 3 horizontal white lines */}
      <path d="M46 36 L50 36" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-55' : 'opacity-25'}`}
      />
      <path d="M46 28 L50 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      <path d="M46 44 L50 44" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />

      {/* Shine line on body */}
      <path d="M26 14 L26 50" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Active bubbles */}
      <circle cx="34" cy="44" r="2" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-35 -translate-y-2' : 'opacity-0 translate-y-0'}`}
      />
      <circle cx="40" cy="38" r="1.5" fill="white"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-30 -translate-y-2' : 'opacity-0 translate-y-0'}`}
      />
      <circle cx="28" cy="40" r="1.5" fill="white"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-25 -translate-y-1' : 'opacity-0 translate-y-0'}`}
      />

      {/* Sparkle dots on active */}
      <circle cx="14" cy="22" r="1.5" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-65 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '14px 22px' }}
      />
      <path d="M54 18l1.5-3 1.5 3-3-1.5h3z" fill="#059669"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '55.5px 18px' }}
      />
    </svg>
  );
}

/* ─── SigmaIcon — Mathematical sigma and formula elements. Amber. ─── */
export function SigmaIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`si-${id}`} x1="8" y1="8" x2="56" y2="56">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ffb400" />
        </linearGradient>
      </defs>

      {/* Glow on active */}
      <ellipse cx="32" cy="34" rx="22" ry="22" fill="#fbbf24"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 34px' }}
      />

      {/* Large sigma symbol — zigzag stroke path */}
      <path
        d="M44 12 L16 12 L34 32 L16 52 L44 52"
        stroke={`url(#si-${id})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Small "x" notation to upper right */}
      <path d="M48 16 L54 10 M54 16 L48 10"
        stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-30'}`}
      />

      {/* Superscript "2" — small arc path to upper right */}
      <path d="M56 8 C58 8 59 9 59 10.5 C59 12 57 13 56 14 L59 14"
        stroke="#ffb400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-25'}`}
      />

      {/* Equals sign below — two short lines */}
      <path d="M48 44 L58 44" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-65' : 'opacity-30'}`}
      />
      <path d="M48 49 L58 49" stroke="#d97706" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-65' : 'opacity-30'}`}
      />

      {/* Active sparkles */}
      <path d="M10 8l1.5-3 1.5 3-3-1.5h3z" fill="#fbbf24"
        className={`transition-all duration-500 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '11.5px 8px' }}
      />
      <path d="M54 56l1-2 1 2-2-1h2z" fill="#ffb400"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '55px 56px' }}
      />
      <circle cx="8" cy="52" r="1.5" fill="#fbbf24"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '8px 52px' }}
      />
    </svg>
  );
}

/* ─── LanguagesIcon — Letters A and Asian-style characters. Primary to teal. ─── */
export function LanguagesIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`la-${id}`} x1="6" y1="10" x2="58" y2="58">
          <stop offset="0%" stopColor="#ffb400" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id={`la2-${id}`} x1="34" y1="14" x2="58" y2="44">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>

      {/* Glow on active */}
      <ellipse cx="28" cy="38" rx="24" ry="20" fill="#ffb400"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '28px 38px' }}
      />

      {/* Large "A" letter — left strokes */}
      <path
        d="M10 54 L26 16 L42 54"
        stroke={`url(#la-${id})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* "A" crossbar */}
      <path d="M16 40 L36 40"
        stroke={`url(#la-${id})`} strokeWidth="3.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-65'}`}
      />

      {/* Chinese-like character strokes to upper right */}
      {/* Horizontal top stroke */}
      <path d="M46 18 L58 18"
        stroke={`url(#la2-${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-85' : 'opacity-45'}`}
      />
      {/* Vertical stroke */}
      <path d="M52 18 L52 28"
        stroke={`url(#la2-${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-40'}`}
      />
      {/* Horizontal middle */}
      <path d="M45 24 L59 24"
        stroke={`url(#la2-${id})`} strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-65' : 'opacity-30'}`}
      />

      {/* Curved script character below right */}
      <path d="M46 38 C44 36 44 34 46 34 C50 34 52 38 50 42 C48 46 44 46 44 44"
        stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-35'}`}
      />
      <path d="M54 32 C56 30 58 32 56 36 C54 40 52 40 54 44"
        stroke="#0d9488" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-25'}`}
      />

      {/* Active sparkle dots */}
      <circle cx="8" cy="16" r="1.5" fill="#ffb400"
        className={`transition-all duration-500 ${active ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '8px 16px' }}
      />
      <circle cx="60" cy="50" r="1.5" fill="#0d9488"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '60px 50px' }}
      />
      <path d="M44 54l1.5-3 1.5 3-3-1.5h3z" fill="#0d9488"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '45.5px 54px' }}
      />
    </svg>
  );
}

/* ─── MicroscopeIcon — Laboratory microscope. Teal to dark green. ─── */
export function MicroscopeIcon({ active, id }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`mi-${id}`} x1="14" y1="6" x2="50" y2="58">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#153b24" />
        </linearGradient>
        <linearGradient id={`mi2-${id}`} x1="14" y1="46" x2="50" y2="58">
          <stop offset="0%" stopColor="#1d6b4e" />
          <stop offset="100%" stopColor="#153b24" />
        </linearGradient>
      </defs>

      {/* Light glow under lens on active */}
      <ellipse cx="28" cy="42" rx="10" ry="5" fill="#2dd4bf"
        className={`transition-all duration-700 ${active ? 'opacity-25 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '28px 42px' }}
      />

      {/* Eyepiece rectangle on top */}
      <rect x="24" y="6" width="12" height="6" rx="2"
        fill={`url(#mi-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Tube — vertical rectangle */}
      <rect x="26" y="12" width="8" height="22" rx="2"
        fill={`url(#mi-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Curved arm connecting tube to stage */}
      <path d="M26 32 Q20 34 20 40 L28 40"
        stroke={`url(#mi-${id})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-65'}`}
      />

      {/* Objective lens — circle with inner circle */}
      <circle cx="30" cy="36" r="5" fill={`url(#mi-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-80'}`}
      />
      <circle cx="30" cy="36" r="2.5" fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />

      {/* Stage — horizontal rectangle */}
      <rect x="16" y="40" width="28" height="5" rx="2"
        fill={`url(#mi-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-75'}`}
      />

      {/* Stage slide — thin white rect on top of stage */}
      <rect x="20" y="38" width="20" height="3" rx="1"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />

      {/* Stand connecting stage to base — vertical rectangle */}
      <rect x="26" y="45" width="8" height="8" rx="1"
        fill={`url(#mi2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />

      {/* Heavy base */}
      <rect x="14" y="52" width="36" height="8" rx="3"
        fill={`url(#mi2-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-80'}`}
      />

      {/* Shine on tube */}
      <path d="M27 14 L27 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-10'}`}
      />

      {/* Shine on base */}
      <path d="M18 54 L46 54" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-10'}`}
      />

      {/* Active sparkle dots */}
      <circle cx="54" cy="14" r="1.5" fill="#0d9488"
        className={`transition-all duration-500 ${active ? 'opacity-65 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '54px 14px' }}
      />
      <path d="M10 26l1.5-3 1.5 3-3-1.5h3z" fill="#0d9488"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-55 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '11.5px 26px' }}
      />
      <circle cx="56" cy="40" r="1" fill="#153b24"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '56px 40px' }}
      />
    </svg>
  );
}
