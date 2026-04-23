'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { PaperAirplaneSvg } from './paper-airplane-svg';
import { FlightPath, FlightPhase } from '@/hooks/use-paper-airplane';

interface PaperAirplaneOverlayProps {
  phase: FlightPhase;
  flightPath: FlightPath | null;
  onAnimationComplete: () => void;
}

function cubicBezier(t: number, p0: number, p1: number, p2: number, p3: number) {
  const u = 1 - t;
  return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
}

function getControlPoints(phase: FlightPhase, path: FlightPath) {
  const { startX, startY, endX, endY } = path;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const s = isMobile ? 0.5 : 1; // scale factor for control point offsets

  return phase === 'phase1'
    ? { cp1x: startX - 60 * s, cp1y: startY - 100 * s, cp2x: endX - 100 * s, cp2y: endY - 40 * s }
    : { cp1x: startX + 80 * s, cp1y: startY + 80 * s, cp2x: endX + 60 * s, cp2y: endY - 40 * s };
}

function getAngle(t: number, phase: FlightPhase, path: FlightPath) {
  const { startX, startY, endX, endY } = path;
  const dt = 0.01;
  const t2 = Math.min(t + dt, 1);
  const cp = getControlPoints(phase, path);

  const x1 = cubicBezier(t, startX, cp.cp1x, cp.cp2x, endX);
  const y1 = cubicBezier(t, startY, cp.cp1y, cp.cp2y, endY);
  const x2 = cubicBezier(t2, startX, cp.cp1x, cp.cp2x, endX);
  const y2 = cubicBezier(t2, startY, cp.cp1y, cp.cp2y, endY);

  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

function buildSvgPath(phase: FlightPhase, path: FlightPath) {
  const { startX, startY, endX, endY } = path;
  const cp = getControlPoints(phase, path);
  return `M ${startX} ${startY} C ${cp.cp1x} ${cp.cp1y}, ${cp.cp2x} ${cp.cp2y}, ${endX} ${endY}`;
}

function AirplaneFlight({ phase, flightPath, onAnimationComplete }: PaperAirplaneOverlayProps) {
  const { startX, startY, endX, endY } = flightPath!;
  const isPhase1 = phase === 'phase1';
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const planeSize = isMobile ? 36 : 48;
  const planeOffset = planeSize / 2;

  const progress = useMotionValue(0);
  const overlayOpacity = useMotionValue(0);
  const trailProgress = useMotionValue(0);

  const cp = getControlPoints(phase, flightPath!);

  const x = useTransform(progress, (t) =>
    cubicBezier(t, startX, cp.cp1x, cp.cp2x, endX)
  );
  const y = useTransform(progress, (t) =>
    cubicBezier(t, startY, cp.cp1y, cp.cp2y, endY)
  );
  const rotate = useTransform(progress, (t) => {
    const pathAngle = getAngle(t, phase, flightPath!);
    const wobble = Math.sin(t * Math.PI * 6) * 5;
    return pathAngle + wobble;
  });
  const scale = useTransform(progress, [0, 0.1, 0.5, 0.9, 1], [0.5, 1.2, 1.3, 1.2, isPhase1 ? 0.8 : 1]);
  const airplaneOpacity = useTransform(progress, [0, 0.05, 0.85, 1], isPhase1 ? [0, 1, 1, 0] : [0, 1, 1, 1]);

  // SVG path for trajectory trail
  const svgPath = buildSvgPath(phase, flightPath!);
  const trailDashOffset = useTransform(trailProgress, [0, 1], [1000, 0]);

  useEffect(() => {
    animate(overlayOpacity, 1, { duration: 0.3 });
    const duration = isPhase1 ? (isMobile ? 0.9 : 1.2) : (isMobile ? 0.7 : 0.9);
    animate(trailProgress, 1, { duration, ease: [0.25, 0.1, 0.25, 1] });
    const controls = animate(progress, 1, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        animate(overlayOpacity, 0, { duration: 0.3 });

        const targetSelector = isPhase1 ? '[data-apply-button]' : '[data-application-card]';
        const target = document.querySelector(targetSelector) as HTMLElement | null;
        if (target) {
          target.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
          target.style.transform = 'scale(1.06)';
          target.style.boxShadow = '0 0 24px rgba(45, 106, 45, 0.4)';
          setTimeout(() => {
            target.style.transform = 'scale(1)';
            target.style.boxShadow = '';
            setTimeout(() => {
              target.style.transition = '';
              target.style.transform = '';
              onAnimationComplete();
            }, 150);
          }, 150);
        } else {
          onAnimationComplete();
        }
      },
    });
    return () => controls.stop();
  }, []);

  return (
    <>
      {/* Dimming overlay — z-index 9998 so airplane can be above it */}
      <motion.div
        className="fixed inset-0 bg-black/30 pointer-events-none"
        style={{ zIndex: 9998, opacity: overlayOpacity }}
      />

      {/* Flight layer — z-index 9999, above overlay */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
        {/* Trajectory trail as SVG path */}
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
          {/* Glow behind trail */}
          <motion.path
            d={svgPath}
            fill="none"
            stroke="#4ade80"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.15"
            strokeDasharray="1000"
            style={{ strokeDashoffset: trailDashOffset }}
          />
          {/* Main trail */}
          <motion.path
            d={svgPath}
            fill="none"
            stroke="url(#trail-gradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 6"
            opacity="0.6"
            style={{ strokeDashoffset: trailDashOffset }}
          />
          <defs>
            <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Trail sparkle dots */}
        {[0.08, 0.16, 0.24].map((offset, i) => {
          const trailX = useTransform(progress, (t) => {
            const tt = Math.max(0, t - offset);
            return cubicBezier(tt, startX, cp.cp1x, cp.cp2x, endX);
          });
          const trailY = useTransform(progress, (t) => {
            const tt = Math.max(0, t - offset);
            return cubicBezier(tt, startY, cp.cp1y, cp.cp2y, endY);
          });
          const dotOpacity = useTransform(progress, (t) => {
            if (t < offset + 0.05) return 0;
            if (t > 0.9) return 0;
            return 0.5 - i * 0.12;
          });
          const dotScale = useTransform(progress, (t) => {
            if (t < offset + 0.05) return 0;
            return 1 - i * 0.2;
          });
          return (
            <motion.div
              key={i}
              className="absolute w-2.5 h-2.5 rounded-full"
              style={{
                x: trailX,
                y: trailY,
                opacity: dotOpacity,
                scale: dotScale,
                marginLeft: -5,
                marginTop: -5,
                background: 'radial-gradient(circle, #4ade80 0%, transparent 70%)',
                boxShadow: '0 0 6px #4ade80',
              }}
            />
          );
        })}

        {/* Airplane */}
        <motion.div
          className="absolute"
          style={{
            x,
            y,
            rotate,
            scale,
            opacity: airplaneOpacity,
            marginLeft: -planeOffset,
            marginTop: -planeOffset,
            filter: 'drop-shadow(0 2px 8px rgba(74, 222, 128, 0.5))',
          }}
        >
          <PaperAirplaneSvg size={planeSize} />
        </motion.div>
      </div>
    </>
  );
}

export function PaperAirplaneAnimation({ phase, flightPath, onAnimationComplete }: PaperAirplaneOverlayProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (phase === 'phase1' || phase === 'phase2') {
      setKey((k) => k + 1);
    }
  }, [phase]);

  if (phase === 'idle' || phase === 'landed' || !flightPath) return null;

  return (
    <AirplaneFlight
      key={key}
      phase={phase}
      flightPath={flightPath}
      onAnimationComplete={onAnimationComplete}
    />
  );
}
