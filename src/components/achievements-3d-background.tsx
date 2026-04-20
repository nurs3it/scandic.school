'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from 'framer-motion';

const AchievementsScene = dynamic(
  () => import('./achievements-3d-scene').then((m) => m.AchievementsScene),
  { ssr: false, loading: () => null },
);

export function Achievements3DBackground() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;
  return (
    <div className="absolute inset-0 pointer-events-none">
      <AchievementsScene />
    </div>
  );
}
