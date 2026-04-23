'use client';

import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { usePaperAirplane } from '@/hooks/use-paper-airplane';
import { PaperAirplaneAnimation } from '@/components/paper-airplane-overlay';

interface PaperAirplaneContextType {
  triggerFlight: (startRect: DOMRect, onComplete: () => void) => void;
  triggerLanding: () => void;
  shouldLand: () => boolean;
  isLanded: boolean;
}

const PaperAirplaneContext = createContext<PaperAirplaneContextType | null>(null);

export function PaperAirplaneProvider({ children }: { children: ReactNode }) {
  const { phase, flightPath, triggerFlight, triggerLanding, onAnimationComplete, shouldLand } =
    usePaperAirplane();
  const pathname = usePathname();
  const hasTriggeredLanding = useRef(false);

  // Trigger landing when navigating to /application with sessionStorage flag
  useEffect(() => {
    if (pathname?.includes('/application') && shouldLand() && !hasTriggeredLanding.current) {
      hasTriggeredLanding.current = true;
      const timer = setTimeout(() => {
        triggerLanding();
      }, 300);
      return () => clearTimeout(timer);
    }
    if (!pathname?.includes('/application')) {
      hasTriggeredLanding.current = false;
    }
  }, [pathname, triggerLanding, shouldLand]);

  return (
    <PaperAirplaneContext.Provider value={{ triggerFlight, triggerLanding, shouldLand, isLanded: phase === 'landed' }}>
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
