'use client';

import { motion, useScroll, useTransform, useReducedMotion, useAnimation, useMotionValueEvent, useSpring, MotionValue } from 'framer-motion';
import { RefObject, useRef } from 'react';

export function SmallRocketSVG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ filter: 'drop-shadow(0 8px 16px rgba(45,106,36,0.25))' }}
    >
      <defs>
        <linearGradient id="fr-bodyGrad" x1="60" y1="0" x2="140" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#d4d8e0" />
          <stop offset="40%" stopColor="#f0f2f5" />
          <stop offset="70%" stopColor="#e2e6eb" />
          <stop offset="100%" stopColor="#c8cdd6" />
        </linearGradient>
        <linearGradient id="fr-noseGrad" x1="80" y1="60" x2="120" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#b8bdc6" />
          <stop offset="50%" stopColor="#dde2e8" />
          <stop offset="100%" stopColor="#b0b5be" />
        </linearGradient>
        <linearGradient id="fr-finGrad" x1="0" y1="0" x2="1" y2="0" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#1a4a24" />
          <stop offset="100%" stopColor="#2d6a2d" />
        </linearGradient>
        <radialGradient id="fr-windowGrad" cx="40%" cy="35%" r="60%" fx="30%" fy="30%" gradientUnits="objectBoundingBox">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#166534" />
        </radialGradient>
        <radialGradient id="fr-flameOuter" cx="50%" cy="0%" r="70%">
          <stop offset="0%" stopColor="#ffb400" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#f97316" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fr-flameInner" cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#fff7ed" stopOpacity="1" />
          <stop offset="40%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      <motion.ellipse
        cx="100" cy="390" rx="28" ry="60"
        fill="url(#fr-flameOuter)"
        animate={{ ry: [60, 75, 52, 70, 58], opacity: [0.7, 1, 0.6, 0.9, 0.7] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.ellipse
        cx="100" cy="385" rx="14" ry="35"
        fill="url(#fr-flameInner)"
        animate={{ ry: [35, 45, 28, 42, 32], opacity: [0.9, 1, 0.8, 1, 0.85] }}
        transition={{ duration: 0.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.ellipse
        cx="100" cy="378" rx="6" ry="16"
        fill="white"
        opacity={0.9}
        animate={{ ry: [16, 22, 12, 20, 15] }}
        transition={{ duration: 0.3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <path d="M82 290 L48 360 L82 345 Z" fill="url(#fr-finGrad)" opacity="0.95" />
      <path d="M118 290 L152 360 L118 345 Z" fill="url(#fr-finGrad)" opacity="0.95" />

      <path d="M86 340 Q82 360 82 368 L118 368 Q118 360 114 340 Z" fill="#9ca3af" />
      <path d="M88 368 L112 368 L114 375 L86 375 Z" fill="#6b7280" />

      <rect x="72" y="140" width="56" height="205" rx="6" fill="url(#fr-bodyGrad)" />
      <rect x="76" y="145" width="10" height="195" rx="3" fill="white" opacity="0.25" />
      <rect x="118" y="145" width="8" height="195" rx="3" fill="#9ca3af" opacity="0.3" />

      <rect x="72" y="275" width="56" height="12" rx="2" fill="#ffb400" opacity="0.9" />
      <rect x="72" y="295" width="56" height="5" rx="1" fill="#ffb400" opacity="0.4" />

      <path d="M72 140 Q72 80 100 60 Q128 80 128 140 Z" fill="url(#fr-noseGrad)" />
      <path d="M76 138 Q76 90 98 72" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.3" />

      <circle cx="100" cy="210" r="22" fill="#1a4a24" opacity="0.15" />
      <circle cx="100" cy="210" r="18" stroke="#2d6a2d" strokeWidth="3" fill="none" />
      <circle cx="100" cy="210" r="15" fill="#0f4c1e" />
      <circle cx="100" cy="210" r="15" fill="url(#fr-windowGrad)" opacity="0.8" />
      <ellipse cx="95" cy="204" rx="5" ry="4" fill="white" opacity="0.45" transform="rotate(-20 95 204)" />

      <line x1="100" y1="60" x2="100" y2="42" stroke="#9ca3af" strokeWidth="2" />
      <circle cx="100" cy="40" r="4" fill="#ffb400" />
      <circle cx="100" cy="40" r="2" fill="white" />
    </svg>
  );
}

interface TrailDotProps {
  x: MotionValue<string>;
  y: MotionValue<string>;
  opacity: MotionValue<number>;
  size: number;
  alpha: number;
  stiffness: number;
}

function TrailDot({ x, y, opacity, size, alpha, stiffness }: TrailDotProps) {
  const springX = useSpring(x, { stiffness, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness, damping: 18, mass: 0.6 });
  const composedOpacity = useTransform(opacity, (v) => v * alpha);

  return (
    <motion.div
      className="absolute top-0 left-0 rounded-full bg-[#ffb400]"
      style={{
        x: springX,
        y: springY,
        opacity: composedOpacity,
        width: size,
        height: size,
        translateX: '-50%',
        translateY: '-50%',
        filter: 'blur(1px)',
      }}
    />
  );
}

interface FlyingRocketProps {
  sectionRef: RefObject<HTMLElement | null>;
}

export function FlyingRocket({ sectionRef }: FlyingRocketProps) {
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0.15, 0.95], ['5%', '95%']);

  const x = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.92],
    ['80%', '45%', '65%', '30%', '70%', '40%', '75%', '88%']
  );

  const rotate = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.92],
    [0, -20, 15, -25, 20, -15, 22, 0]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.92, 1],
    [0, 1, 1, 0]
  );

  const rollControls = useAnimation();
  const triggered = useRef<Set<number>>(new Set());
  const rollPoints = [0.3, 0.55, 0.8];

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    for (const p of rollPoints) {
      const isPast = latest >= p;
      if (isPast && !triggered.current.has(p)) {
        triggered.current.add(p);
        rollControls
          .start({ rotate: 360, transition: { duration: 0.8, ease: 'easeInOut' } })
          .then(() => rollControls.set({ rotate: 0 }));
      } else if (!isPast && triggered.current.has(p)) {
        triggered.current.delete(p);
      }
    }
  });

  if (prefersReducedMotion) return null;

  const trailDots = [
    { size: 10, alpha: 0.5, stiffness: 180 },
    { size: 8, alpha: 0.35, stiffness: 130 },
    { size: 6, alpha: 0.22, stiffness: 90 },
    { size: 4, alpha: 0.12, stiffness: 60 },
  ];

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-20"
      style={{ willChange: 'transform' }}
    >
      {trailDots.map((dot, i) => (
        <TrailDot key={i} x={x} y={y} opacity={opacity} {...dot} />
      ))}
      <motion.div
        className="absolute top-0 left-0"
        style={{ x, y, rotate, opacity, willChange: 'transform, opacity' }}
      >
        <motion.div animate={rollControls}>
          <SmallRocketSVG className="w-[80px] md:w-[100px] -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
