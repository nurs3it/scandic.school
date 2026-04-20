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

// Bento grid layout: which cards span 2 columns
const LARGE_INDICES = new Set([0, 3, 4]);
const CYCLE_INTERVAL = 2500;

export function FeaturesBentoGrid({ features, sectionTitle, sectionSubtitle }: FeaturesBentoGridProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // IntersectionObserver
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

  // Auto-cycle
  useEffect(() => {
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
  }, [isInView, isPaused, features.length]);

  const handleMouseEnter = useCallback((index: number) => {
    setIsPaused(true);
    setActiveIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
  }, []);

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
                <div className={`flex ${isLarge ? 'flex-row items-center gap-5' : 'flex-col gap-3'}`}>
                  {/* Icon */}
                  <div className={`
                    flex-shrink-0 rounded-xl flex items-center justify-center
                    transition-all duration-500
                    ${isLarge ? 'w-14 h-14 md:w-16 md:h-16' : 'w-12 h-12 md:w-14 md:h-14'}
                    ${isActive ? colors.activeBg : colors.bg}
                  `}>
                    <IconComponent
                      className={`
                        transition-all duration-500
                        ${isLarge ? 'w-7 h-7 md:w-8 md:h-8' : 'w-6 h-6 md:w-7 md:h-7'}
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
                      ${isLarge ? 'text-lg md:text-xl' : 'text-base md:text-lg'}
                      ${isActive ? 'text-secondary' : 'text-secondary/70'}
                    `}>
                      {feature.title}
                    </h3>
                    <p className={`
                      leading-snug transition-colors duration-500
                      ${isLarge ? 'text-sm md:text-base' : 'text-sm'}
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
