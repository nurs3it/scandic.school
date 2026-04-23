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

function getAngle(t: number, phase: FlightPhase, path: FlightPath) {
  const { startX, startY, endX, endY } = path;
  const dt = 0.01;
  const t2 = Math.min(t + dt, 1);

  const cp = phase === 'phase1'
    ? { cp1x: startX - 60, cp1y: startY - 100, cp2x: endX - 100, cp2y: endY - 40 }
    : { cp1x: startX + 80, cp1y: startY + 80, cp2x: endX + 60, cp2y: endY - 40 };

  const x1 = cubicBezier(t, startX, cp.cp1x, cp.cp2x, endX);
  const y1 = cubicBezier(t, startY, cp.cp1y, cp.cp2y, endY);
  const x2 = cubicBezier(t2, startX, cp.cp1x, cp.cp2x, endX);
  const y2 = cubicBezier(t2, startY, cp.cp1y, cp.cp2y, endY);

  return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
}

function AirplaneFlight({ phase, flightPath, onAnimationComplete }: PaperAirplaneOverlayProps) {
  const { startX, startY, endX, endY } = flightPath!;
  const isPhase1 = phase === 'phase1';

  const progress = useMotionValue(0);

  // Control points for smooth cubic bezier
  const cp = isPhase1
    ? { cp1x: startX - 60, cp1y: startY - 100, cp2x: endX - 100, cp2y: endY - 40 }
    : { cp1x: startX + 80, cp1y: startY + 80, cp2x: endX + 60, cp2y: endY - 40 };

  const x = useTransform(progress, (t) =>
    cubicBezier(t, startX, cp.cp1x, cp.cp2x, endX)
  );
  const y = useTransform(progress, (t) =>
    cubicBezier(t, startY, cp.cp1y, cp.cp2y, endY)
  );
  const rotate = useTransform(progress, (t) => {
    const pathAngle = getAngle(t, phase, flightPath!);
    const wobble = Math.sin(t * Math.PI * 6) * 8;
    return pathAngle + wobble;
  });
  const scale = useTransform(progress, [0, 0.1, 0.5, 0.9, 1], [0.4, 1, 1.1, 1, 0.6]);
  const opacity = useTransform(progress, [0, 0.05, 0.85, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const duration = isPhase1 ? 1.2 : 0.9;
    const controls = animate(progress, 1, {
      duration,
      ease: [0.25, 0.1, 0.25, 1],
      onComplete: () => {
        // Pulse the target
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
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 9999 }}>
      {/* Trail dots */}
      {[0.06, 0.12, 0.18, 0.24, 0.30].map((offset, i) => {
        const trailX = useTransform(progress, (t) => {
          const tt = Math.max(0, t - offset);
          return cubicBezier(tt, startX, cp.cp1x, cp.cp2x, endX);
        });
        const trailY = useTransform(progress, (t) => {
          const tt = Math.max(0, t - offset);
          return cubicBezier(tt, startY, cp.cp1y, cp.cp2y, endY);
        });
        const trailOpacity = useTransform(progress, (t) => {
          if (t < offset + 0.05) return 0;
          if (t > 0.9) return 0;
          return 0.3 - i * 0.05;
        });
        const trailScale = useTransform(progress, (t) => {
          if (t < offset + 0.05) return 0;
          return 1 - i * 0.15;
        });
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-[#4ade80]"
            style={{
              x: trailX,
              y: trailY,
              opacity: trailOpacity,
              scale: trailScale,
              marginLeft: -4,
              marginTop: -4,
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
          opacity,
          marginLeft: -16,
          marginTop: -16,
        }}
      >
        <PaperAirplaneSvg size={32} />
      </motion.div>
    </div>
  );
}

export function PaperAirplaneAnimation({ phase, flightPath, onAnimationComplete }: PaperAirplaneOverlayProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (phase !== 'idle') {
      setKey((k) => k + 1);
    }
  }, [phase]);

  if (phase === 'idle' || !flightPath) return null;

  return (
    <AirplaneFlight
      key={key}
      phase={phase}
      flightPath={flightPath}
      onAnimationComplete={onAnimationComplete}
    />
  );
}
