'use client';

import { createContext, useContext, ReactNode } from 'react';
import { usePaperAirplane } from '@/hooks/use-paper-airplane';
import { PaperAirplaneAnimation } from '@/components/paper-airplane-overlay';

interface PaperAirplaneContextType {
  triggerFlight: (startRect: DOMRect, onComplete: () => void) => void;
  triggerLanding: () => void;
  shouldLand: () => boolean;
}

const PaperAirplaneContext = createContext<PaperAirplaneContextType | null>(null);

export function PaperAirplaneProvider({ children }: { children: ReactNode }) {
  const { phase, flightPath, triggerFlight, triggerLanding, onAnimationComplete, shouldLand } =
    usePaperAirplane();

  return (
    <PaperAirplaneContext.Provider value={{ triggerFlight, triggerLanding, shouldLand }}>
      {children}
      <PaperAirplaneAnimation
        phase={phase}
        flightPath={flightPath}
        onAnimationComplete={onAnimationComplete}
      />
    </PaperAirplaneContext.Provider>
  );
}

export function usePaperAirplaneContext() {
  const ctx = useContext(PaperAirplaneContext);
  if (!ctx) throw new Error('usePaperAirplaneContext must be used within PaperAirplaneProvider');
  return ctx;
}
