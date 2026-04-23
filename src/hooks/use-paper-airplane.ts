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
  const phaseRef = useRef<FlightPhase>('idle');

  const triggerFlight = useCallback((startRect: DOMRect, onComplete: () => void) => {
    const headerBtn = document.querySelector('[data-apply-button]');
    if (!headerBtn) {
      onComplete();
      return;
    }

    const endRect = headerBtn.getBoundingClientRect();

    // Set sessionStorage BEFORE animation starts so it's ready when navigation happens
    sessionStorage.setItem(SESSION_KEY, 'true');

    setFlightPath({
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX: endRect.left + endRect.width / 2,
      endY: endRect.top + endRect.height / 2,
    });
    onCompleteRef.current = onComplete;
    phaseRef.current = 'phase1';
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
    phaseRef.current = 'phase2';
    setPhase('phase2');
  }, []);

  const onAnimationComplete = useCallback(() => {
    const currentPhase = phaseRef.current;
    if (currentPhase === 'phase1') {
      // sessionStorage already set in triggerFlight
      phaseRef.current = 'idle';
      setPhase('idle');
      setFlightPath(null);
      onCompleteRef.current?.();
      onCompleteRef.current = null;
    } else if (currentPhase === 'phase2') {
      sessionStorage.removeItem(SESSION_KEY);
      phaseRef.current = 'idle';
      setPhase('idle');
      setFlightPath(null);
    }
  }, []);

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
