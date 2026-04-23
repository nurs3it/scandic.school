'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

type IconName = 'heart' | 'target' | 'users' | 'lightbulb' | 'globe' | 'shield';

interface FeatureItem {
  title: string;
  description: string;
  icon: IconName;
}

interface FeaturesBentoGridProps {
  features: FeatureItem[];
  sectionTitle: string;
  sectionSubtitle: string;
}

const ICON_COLORS: Record<IconName, { bg: string; activeBg: string; gradient: [string, string] }> = {
  heart:     { bg: 'bg-rose-50',    activeBg: 'bg-rose-100',    gradient: ['#fb7185', '#e11d48'] },
  target:    { bg: 'bg-amber-50',   activeBg: 'bg-amber-100',   gradient: ['#fbbf24', '#d97706'] },
  users:     { bg: 'bg-emerald-50', activeBg: 'bg-emerald-100', gradient: ['#34d399', '#059669'] },
  lightbulb: { bg: 'bg-violet-50',  activeBg: 'bg-violet-100',  gradient: ['#a78bfa', '#7c3aed'] },
  globe:     { bg: 'bg-sky-50',     activeBg: 'bg-sky-100',     gradient: ['#38bdf8', '#0284c7'] },
  shield:    { bg: 'bg-teal-50',    activeBg: 'bg-teal-100',    gradient: ['#2dd4bf', '#0d9488'] },
};

/* ─── SVG Icon Components ─── */

function HeartIcon({ active, id }: { active: boolean; id: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`hg-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      {/* Hands holding heart */}
      <path
        d="M12 38c0 0 4-2 8-2s6 3 6 3"
        stroke={`url(#hg-${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`origin-center transition-all duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
      />
      <path
        d="M52 38c0 0-4-2-8-2s-6 3-6 3"
        stroke={`url(#hg-${id})`} strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`origin-center transition-all duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
      />
      {/* Main heart */}
      <path
        d="M32 52 C32 52 14 38 14 26 C14 20 18 16 24 16 C28 16 30.5 18.5 32 21 C33.5 18.5 36 16 40 16 C46 16 50 20 50 26 C50 38 32 52 32 52Z"
        fill={`url(#hg-${id})`}
        className={`origin-center transition-all duration-500 ${active ? 'scale-110 opacity-100' : 'scale-100 opacity-70'}`}
        style={{ transformOrigin: '32px 34px' }}
      />
      {/* Shine */}
      <ellipse cx="24" cy="24" rx="4" ry="5" fill="white" opacity={active ? 0.4 : 0.2}
        className="transition-opacity duration-500" transform="rotate(-20 24 24)" />
      {/* Pulse rings */}
      <circle cx="32" cy="34" r="20" stroke="#fb7185" strokeWidth="1.5" fill="none"
        className={`origin-center transition-all duration-700 ${active ? 'opacity-30 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 34px' }}
      />
      <circle cx="32" cy="34" r="26" stroke="#fb7185" strokeWidth="1" fill="none"
        className={`origin-center transition-all duration-1000 ${active ? 'opacity-15 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 34px' }}
      />
      {/* Small hearts floating up on active */}
      <path d="M20 14 C20 14 18 11 18 9.5 C18 8 19 7 20 7 C21 7 22 8 22 9.5 C22 11 20 14 20 14Z"
        fill="#fb7185"
        className={`transition-all duration-700 ${active ? 'opacity-50 -translate-y-1' : 'opacity-0 translate-y-1'}`}
      />
      <path d="M44 12 C44 12 42.5 10 42.5 9 C42.5 8 43 7.5 44 7.5 C45 7.5 45.5 8 45.5 9 C45.5 10 44 12 44 12Z"
        fill="#e11d48"
        className={`transition-all duration-500 delay-100 ${active ? 'opacity-40 -translate-y-2' : 'opacity-0 translate-y-1'}`}
      />
    </svg>
  );
}

function TargetIcon({ active, id }: { active: boolean; id: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`tg-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      {/* Trophy cup */}
      <path
        d="M22 18h20v6c0 8-4 14-10 16-6-2-10-8-10-16v-6z"
        fill={`url(#tg-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Cup shine */}
      <path d="M25 20v10c0 4 2 8 5 10" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-40' : 'opacity-15'}`}
      />
      {/* Left handle */}
      <path d="M22 22h-4c-2 0-4 2-4 4v2c0 3 2 5 5 5h3" stroke={`url(#tg-${id})`} strokeWidth="2.5" fill="none" strokeLinecap="round"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
      />
      {/* Right handle */}
      <path d="M42 22h4c2 0 4 2 4 4v2c0 3-2 5-5 5h-3" stroke={`url(#tg-${id})`} strokeWidth="2.5" fill="none" strokeLinecap="round"
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-50'}`}
      />
      {/* Base */}
      <rect x="28" y="40" width="8" height="4" rx="1" fill={`url(#tg-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      <rect x="24" y="44" width="16" height="4" rx="2" fill={`url(#tg-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-100' : 'opacity-60'}`}
      />
      {/* Star on trophy */}
      <path d="M32 24l1.8 3.6 4 .6-2.9 2.8.7 4L32 33l-3.6 2 .7-4-2.9-2.8 4-.6L32 24z"
        fill="white"
        className={`transition-all duration-500 ${active ? 'opacity-60 scale-110' : 'opacity-25 scale-100'}`}
        style={{ transformOrigin: '32px 30px' }}
      />
      {/* Sparkles on hover */}
      <circle cx="14" cy="14" r="1.5" fill="#fbbf24"
        className={`transition-all duration-500 ${active ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '14px 14px' }}
      />
      <circle cx="50" cy="12" r="1" fill="#d97706"
        className={`transition-all duration-700 delay-75 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '50px 12px' }}
      />
      <path d="M52 16l2-2M52 16l-2-2M52 16l2 2M52 16l-2 2" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round"
        className={`transition-all duration-500 delay-150 ${active ? 'opacity-60' : 'opacity-0'}`}
      />
    </svg>
  );
}

function UsersIcon({ active, id }: { active: boolean; id: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`ug-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* Center person */}
      <circle cx="32" cy="20" r="6" fill={`url(#ug-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      <path d="M22 42c0-6 4-10 10-10s10 4 10 10" fill={`url(#ug-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Left person */}
      <circle cx="14" cy="26" r="4.5" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-80 -translate-x-1' : 'opacity-40'}`}
      />
      <path d="M6 44c0-5 3-8 8-8s8 3 8 8" fill="#34d399"
        className={`transition-all duration-500 ${active ? 'opacity-60 -translate-x-1' : 'opacity-25'}`}
      />
      {/* Right person */}
      <circle cx="50" cy="26" r="4.5" fill="#059669"
        className={`transition-all duration-500 ${active ? 'opacity-80 translate-x-1' : 'opacity-40'}`}
      />
      <path d="M42 44c0-5 3-8 8-8s8 3 8 8" fill="#059669"
        className={`transition-all duration-500 ${active ? 'opacity-60 translate-x-1' : 'opacity-25'}`}
      />
      {/* Connection lines */}
      <path d="M22 30c-2 0-4-1-5-2" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2"
        className={`transition-all duration-700 ${active ? 'opacity-50' : 'opacity-0'}`}
      />
      <path d="M42 30c2 0 4-1 5-2" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="2 2"
        className={`transition-all duration-700 ${active ? 'opacity-50' : 'opacity-0'}`}
      />
      {/* Connection heart */}
      <path d="M32 48 C32 48 30 46 30 45 C30 44 31 43.5 32 43.5 C33 43.5 34 44 34 45 C34 46 32 48 32 48Z"
        fill={`url(#ug-${id})`}
        className={`transition-all duration-500 delay-200 ${active ? 'opacity-60 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '32px 46px' }}
      />
    </svg>
  );
}

function LightbulbIcon({ active, id }: { active: boolean; id: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`lg-${id}`} x1="20" y1="6" x2="44" y2="48">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <radialGradient id={`lgr-${id}`} cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#a78bfa" />
        </radialGradient>
      </defs>
      {/* Glow behind bulb */}
      <circle cx="32" cy="24" r="18" fill="#a78bfa"
        className={`transition-all duration-700 ${active ? 'opacity-15 scale-110' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 24px' }}
      />
      {/* Bulb body */}
      <path
        d="M32 8c-9 0-16 7-16 15 0 6 3 10 7 14 1.5 1.5 3 3 3 5h12c0-2 1.5-3.5 3-5 4-4 7-8 7-14 0-8-7-15-16-15z"
        fill={`url(#lgr-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Bulb shine */}
      <path d="M24 18c2-4 6-6 10-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-50' : 'opacity-20'}`}
      />
      {/* Filament */}
      <path d="M28 28c0 0 2-4 4-4s4 4 4 4" stroke={`url(#lg-${id})`} strokeWidth="2" strokeLinecap="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-80' : 'opacity-30'}`}
      />
      {/* Base ridges */}
      <rect x="26" y="42" width="12" height="3" rx="1.5" fill={`url(#lg-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-80' : 'opacity-50'}`}
      />
      <rect x="27" y="46" width="10" height="3" rx="1.5" fill={`url(#lg-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-70' : 'opacity-40'}`}
      />
      <rect x="28" y="50" width="8" height="3" rx="1.5" fill={`url(#lg-${id})`}
        className={`transition-opacity duration-500 ${active ? 'opacity-60' : 'opacity-30'}`}
      />
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 32 + Math.cos(rad) * 20;
        const y1 = 24 + Math.sin(rad) * 20;
        const x2 = 32 + Math.cos(rad) * 25;
        const y2 = 24 + Math.sin(rad) * 25;
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"
            className={`transition-all duration-500 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-50'}`}
            style={{ transformOrigin: '32px 24px', transitionDelay: `${i * 40}ms` }}
          />
        );
      })}
    </svg>
  );
}

function GlobeIcon({ active, id }: { active: boolean; id: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`gg-${id}`} x1="10" y1="10" x2="54" y2="54">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>
      {/* Globe sphere */}
      <circle cx="32" cy="32" r="20" fill={`url(#gg-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Sphere shine */}
      <ellipse cx="26" cy="22" rx="8" ry="10" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-20' : 'opacity-10'}`}
        transform="rotate(-20 26 22)"
      />
      {/* Latitude lines */}
      <ellipse cx="32" cy="22" rx="16" ry="4" stroke="white" strokeWidth="1.2" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      <ellipse cx="32" cy="32" rx="20" ry="5" stroke="white" strokeWidth="1.2" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      <ellipse cx="32" cy="42" rx="16" ry="4" stroke="white" strokeWidth="1.2" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Longitude line */}
      <ellipse cx="32" cy="32" rx="8" ry="20" stroke="white" strokeWidth="1.2" fill="none"
        className={`transition-all duration-700 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Continent blobs */}
      <path d="M24 22c2-1 5 0 6 2s0 4-2 5-4 0-5-2 0-4 1-5z" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-30' : 'opacity-10'}`}
      />
      <path d="M36 30c2 0 4 1 4 4s-2 5-5 4-3-3-2-5 1-3 3-3z" fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-25' : 'opacity-10'}`}
      />
      {/* Orbit ring */}
      <ellipse cx="32" cy="32" rx="28" ry="10" stroke="#38bdf8" strokeWidth="1.5" fill="none"
        transform="rotate(-25 32 32)"
        className={`transition-all duration-700 ${active ? 'opacity-40' : 'opacity-0'}`}
        strokeDasharray="4 3"
      />
      {/* Orbiting dot */}
      <circle cx="58" cy="26" r="2.5" fill="#38bdf8"
        className={`transition-all duration-500 ${active ? 'opacity-70 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '58px 26px' }}
      />
      {/* Location pins */}
      <g className={`transition-all duration-500 delay-100 ${active ? 'opacity-70 -translate-y-0.5' : 'opacity-0 translate-y-1'}`}>
        <circle cx="28" cy="28" r="1.5" fill="#fbbf24" />
        <path d="M28 26l0-3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      </g>
      <g className={`transition-all duration-500 delay-200 ${active ? 'opacity-60 -translate-y-0.5' : 'opacity-0 translate-y-1'}`}>
        <circle cx="38" cy="36" r="1.5" fill="#fbbf24" />
        <path d="M38 34l0-3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function ShieldIcon({ active, id }: { active: boolean; id: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id={`sg-${id}`} x1="16" y1="8" x2="48" y2="52">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      {/* Shield glow */}
      <path d="M32 6L12 16v14c0 14 8.5 22 20 28 11.5-6 20-14 20-28V16L32 6z"
        fill="#2dd4bf"
        className={`transition-all duration-700 ${active ? 'opacity-10 scale-105' : 'opacity-0 scale-100'}`}
        style={{ transformOrigin: '32px 32px' }}
      />
      {/* Shield body */}
      <path d="M32 8L14 17v13c0 13 7.5 20 18 26 10.5-6 18-13 18-26V17L32 8z"
        fill={`url(#sg-${id})`}
        className={`transition-all duration-500 ${active ? 'opacity-100' : 'opacity-70'}`}
      />
      {/* Shield inner */}
      <path d="M32 12L18 19v11c0 11 6 17 14 22 8-5 14-11 14-22V19L32 12z"
        fill="white"
        className={`transition-opacity duration-500 ${active ? 'opacity-15' : 'opacity-5'}`}
      />
      {/* Shine */}
      <path d="M22 18c0 0 4-4 10-6" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"
        className={`transition-opacity duration-500 ${active ? 'opacity-35' : 'opacity-15'}`}
      />
      {/* Checkmark */}
      <path d="M24 32l6 6 12-14"
        stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        className={`transition-all duration-500 ${active ? 'opacity-90' : 'opacity-50'}`}
        strokeDasharray={active ? '40' : '40'}
        strokeDashoffset={active ? '0' : '40'}
        style={{ transition: 'stroke-dashoffset 0.6s ease-out, opacity 0.5s' }}
      />
      {/* Sparkles */}
      <path d="M12 12l1.5-3 1.5 3-3-1.5h3z" fill="#2dd4bf"
        className={`transition-all duration-500 ${active ? 'opacity-50 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '13.5px 12px' }}
      />
      <path d="M50 10l1-2 1 2-2-1h2z" fill="#0d9488"
        className={`transition-all duration-700 delay-100 ${active ? 'opacity-40 scale-100' : 'opacity-0 scale-0'}`}
        style={{ transformOrigin: '51px 10px' }}
      />
    </svg>
  );
}

const SVG_ICON_MAP: Record<IconName, React.FC<{ active: boolean; id: string }>> = {
  heart: HeartIcon,
  target: TargetIcon,
  users: UsersIcon,
  lightbulb: LightbulbIcon,
  globe: GlobeIcon,
  shield: ShieldIcon,
};

// Bento grid layout: which cards span 2 columns (desktop only)
const LARGE_INDICES = new Set([0, 3, 4]);
const CYCLE_INTERVAL = 2500;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
}

export function FeaturesBentoGrid({ features, sectionTitle, sectionSubtitle }: FeaturesBentoGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isMobile = useIsMobile();

  // Section IntersectionObserver (desktop auto-cycle)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Mobile: scroll-based highlight
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Desktop: auto-cycle
  useEffect(() => {
    if (isMobile) return;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (isInView && !isPaused) {
      intervalRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % features.length);
      }, CYCLE_INTERVAL);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, isPaused, features.length, isMobile]);

  const handleMouseEnter = useCallback((index: number) => {
    if (isMobile) return;
    setIsPaused(true);
    setActiveIndex(index);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    setIsPaused(false);
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-secondary/[0.02]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3">
            {sectionTitle}
          </h2>
          <p className="text-lg text-secondary/60 max-w-2xl mx-auto">
            {sectionSubtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            const isLarge = LARGE_INDICES.has(index);
            const SvgIcon = SVG_ICON_MAP[feature.icon];
            const colors = ICON_COLORS[feature.icon];

            return (
              <div
                key={index}
                ref={(el) => { cardRefs.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`
                  relative rounded-2xl p-5 md:p-6 cursor-pointer
                  transition-all duration-500 ease-out
                  ${isLarge ? 'md:col-span-2' : 'md:col-span-1'}
                  ${isActive
                    ? 'bg-white ring-2 ring-primary/80 shadow-lg shadow-primary/10 scale-[1.02]'
                    : 'bg-white/60 ring-1 ring-secondary/10 shadow-sm hover:shadow-md scale-100'
                  }
                `}
              >
                <div className="flex flex-col gap-3">
                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 rounded-xl flex items-center justify-center
                    transition-all duration-500
                    w-14 h-14 md:w-16 md:h-16
                    ${isActive ? colors.activeBg : colors.bg}
                  `}>
                    <div className="w-10 h-10 md:w-11 md:h-11">
                      <SvgIcon active={isActive} id={`${feature.icon}-${index}`} />
                    </div>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      font-bold mb-1 transition-colors duration-500
                      text-base md:text-lg
                      ${isActive ? 'text-secondary' : 'text-secondary/70'}
                    `}>
                      {feature.title}
                    </h3>
                    <p className={`
                      leading-snug transition-colors duration-500
                      text-sm
                      ${isActive ? 'text-secondary/70' : 'text-secondary/40'}
                    `}>
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                <div className={`
                  absolute top-3 right-3 w-2 h-2 rounded-full
                  transition-all duration-500
                  ${isActive ? 'opacity-100 scale-100' : 'bg-transparent opacity-0 scale-0'}
                `}
                  style={isActive ? { backgroundColor: colors.gradient[0] } : undefined}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
