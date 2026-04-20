'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, Target, Users, Lightbulb, Globe, ShieldCheck } from 'lucide-react';

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

const ICON_MAP = {
  heart: Heart,
  target: Target,
  users: Users,
  lightbulb: Lightbulb,
  globe: Globe,
  shield: ShieldCheck,
} as const;

const ICON_COLORS: Record<IconName, { bg: string; text: string; activeBg: string }> = {
  heart: { bg: 'bg-rose-50', text: 'text-rose-500', activeBg: 'bg-rose-100' },
  target: { bg: 'bg-amber-50', text: 'text-amber-500', activeBg: 'bg-amber-100' },
  users: { bg: 'bg-emerald-50', text: 'text-emerald-500', activeBg: 'bg-emerald-100' },
  lightbulb: { bg: 'bg-violet-50', text: 'text-violet-500', activeBg: 'bg-violet-100' },
  globe: { bg: 'bg-sky-50', text: 'text-sky-500', activeBg: 'bg-sky-100' },
  shield: { bg: 'bg-teal-50', text: 'text-teal-500', activeBg: 'bg-teal-100' },
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

  // Mobile: scroll-based highlight — activate the card closest to viewport center
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const isActive = index === activeIndex;
            const isLarge = LARGE_INDICES.has(index);
            const IconComponent = ICON_MAP[feature.icon];
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
                {/* Mobile: always flex-col; Desktop: flex-row for large cards */}
                <div className={`flex flex-col gap-3 ${isLarge ? 'md:flex-row md:items-center md:gap-5' : ''}`}>
                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 rounded-xl flex items-center justify-center
                    transition-all duration-500
                    w-12 h-12 md:w-14 md:h-14
                    ${isLarge ? 'md:w-16 md:h-16' : ''}
                    ${isActive ? colors.activeBg : colors.bg}
                  `}>
                    <IconComponent
                      className={`
                        transition-all duration-500
                        w-6 h-6 md:w-7 md:h-7
                        ${isLarge ? 'md:w-8 md:h-8' : ''}
                        ${colors.text}
                        ${isActive ? 'animate-icon-pop' : ''}
                      `}
                      strokeWidth={isActive ? 2.2 : 1.8}
                    />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`
                      font-bold mb-1 transition-colors duration-500
                      text-base md:text-lg
                      ${isLarge ? 'md:text-xl' : ''}
                      ${isActive ? 'text-secondary' : 'text-secondary/70'}
                    `}>
                      {feature.title}
                    </h3>
                    <p className={`
                      leading-snug transition-colors duration-500
                      text-sm
                      ${isLarge ? 'md:text-base' : ''}
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
                  ${isActive ? `${colors.text.replace('text-', 'bg-')} opacity-100 scale-100` : 'bg-transparent opacity-0 scale-0'}
                `} />
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}
