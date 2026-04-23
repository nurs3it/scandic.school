'use client';

import { motion } from 'framer-motion';
import { PaperAirplaneSvg } from './paper-airplane-svg';
import { FlightPath, FlightPhase } from '@/hooks/use-paper-airplane';

interface PaperAirplaneOverlayProps {
  phase: FlightPhase;
  flightPath: FlightPath | null;
  onAnimationComplete: () => void;
}

function getControlPoints(path: FlightPath, phase: FlightPhase) {
  const { startX, startY, endX, endY } = path;
  const dx = endX - startX;
  const dy = endY - startY;

  if (phase === 'phase1') {
    return {
      loop1X: startX + 30,
      loop1Y: startY + 40,
      loop2X: startX - 20,
      loop2Y: startY - 30,
      cp1X: startX + dx * 0.2,
      cp1Y: startY + dy * 0.6,
      cp2X: startX + dx * 0.7,
      cp2Y: endY - 20,
    };
  }
  return {
    loop1X: startX,
    loop1Y: startY,
    loop2X: startX,
    loop2Y: startY,
    cp1X: startX + dx * 0.3,
    cp1Y: startY + 60,
    cp2X: endX + 40,
    cp2Y: endY - 30,
  };
}

export function PaperAirplaneAnimation({ phase, flightPath, onAnimationComplete }: PaperAirplaneOverlayProps) {
  if (phase === 'idle' || !flightPath) return null;

  const cp = getControlPoints(flightPath, phase);
  const { startX, startY, endX, endY } = flightPath;

  const isPhase1 = phase === 'phase1';
  const totalDuration = isPhase1 ? 1.2 : 1.0;

  const xKeyframes = isPhase1
    ? [startX, cp.loop1X, cp.loop2X, cp.cp1X, cp.cp2X, endX]
    : [startX, cp.cp1X, cp.cp2X, endX];

  const yKeyframes = isPhase1
    ? [startY, cp.loop1Y, cp.loop2Y, cp.cp1Y, cp.cp2Y, endY]
    : [startY, cp.cp1Y, cp.cp2Y, endY];

  const timeStops = isPhase1
    ? [0, 0.1, 0.2, 0.5, 0.8, 1]
    : [0, 0.35, 0.7, 1];

  const rotateKeyframes = isPhase1
    ? [0, 120, 360, -30, -15, 0]
    : [0, 25, 15, 0];

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
    >
      {/* Trail */}
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-[#2d6a2d]"
        initial={{ x: startX, y: startY, opacity: 0 }}
        animate={{
          x: xKeyframes,
          y: yKeyframes,
          opacity: [0, 0.3, 0.3, 0.2, 0.1, 0],
        }}
        transition={{
          duration: totalDuration,
          times: timeStops,
          ease: 'easeInOut',
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-[#4ade80]"
            style={{ top: 0, left: 0 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.4, 0], scale: [0, 1, 0.5] }}
            transition={{
              duration: 0.6,
              delay: (i * totalDuration) / 6,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>

      {/* Airplane */}
      <motion.div
        className="absolute"
        style={{ marginLeft: -16, marginTop: -16 }}
        initial={{
          x: startX,
          y: startY,
          rotate: 0,
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          x: xKeyframes,
          y: yKeyframes,
          rotate: rotateKeyframes,
          scale: [0.5, 1, 1, 1, 1, 0.7],
          opacity: [0, 1, 1, 1, 1, 0],
        }}
        transition={{
          duration: totalDuration,
          times: timeStops,
          ease: 'easeInOut',
        }}
        onAnimationComplete={() => {
          const targetSelector = phase === 'phase1' ? '[data-apply-button]' : '[data-application-card]';
          const target = document.querySelector(targetSelector) as HTMLElement | null;
          if (target) {
            target.style.transition = 'transform 0.15s ease-out, box-shadow 0.15s ease-out';
            target.style.transform = 'scale(1.08)';
            target.style.boxShadow = '0 0 20px rgba(45, 106, 45, 0.4)';
            setTimeout(() => {
              target.style.transform = 'scale(1)';
              target.style.boxShadow = '';
              setTimeout(() => {
                target.style.transition = '';
                target.style.transform = '';
                onAnimationComplete();
              }, 200);
            }, 200);
          } else {
            onAnimationComplete();
          }
        }}
      >
        <PaperAirplaneSvg size={32} />
      </motion.div>
    </div>
  );
}
