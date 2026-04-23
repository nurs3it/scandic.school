'use client';

import { useState, useCallback, useRef } from 'react';

const SESSION_KEY = 'paperAirplane';

export interface FlightPath {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type FlightPhase = 'idle' | 'phase1' | 'phase2';

export function usePaperAirplane() {
  const [phase, setPhase] = useState<FlightPhase>('idle');
  const [flightPath, setFlightPath] = useState<FlightPath | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);

  const triggerFlight = useCallback((startRect: DOMRect, onComplete: () => void) => {
    const headerBtn = document.querySelector('[data-apply-button]');
    if (!headerBtn) {
      onComplete();
      return;
    }

    const endRect = headerBtn.getBoundingClientRect();

    setFlightPath({
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.left + endRect.width / 2,
      endY: endRect.top + endRect.height / 2,
    });
    onCompleteRef.current = onComplete;
    setPhase('phase1');
  }, []);

  const triggerLanding = useCallback(() => {
    const headerBtn = document.querySelector('[data-apply-button]');
    const formCard = document.querySelector('[data-application-card]');
    if (!headerBtn || !formCard) return;

    const startRect = headerBtn.getBoundingClientRect();
    const endRect = formCard.getBoundingClientRect();

    setFlightPath({
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.right - 24,
      endY: endRect.top + 24,
    });
    setPhase('phase2');
  }, []);

  const onAnimationComplete = useCallback(() => {
    if (phase === 'phase1') {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setPhase('idle');
      setFlightPath(null);
      onCompleteRef.current?.();
      onCompleteRef.current = null;
    } else if (phase === 'phase2') {
      sessionStorage.removeItem(SESSION_KEY);
      setPhase('idle');
      setFlightPath(null);
    }
  }, [phase]);

  const shouldLand = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  }, []);

  return {
    phase,
    flightPath,
    triggerFlight,
    triggerLanding,
    onAnimationComplete,
    shouldLand,
  };
}
