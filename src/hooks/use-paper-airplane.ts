'use client';

import { useState, useCallback, useRef } from 'react';

const SESSION_KEY = 'paperAirplane';

export interface FlightPath {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

export type FlightPhase = 'idle' | 'phase1' | 'phase2' | 'landed';

export function usePaperAirplane() {
  const [phase, setPhase] = useState<FlightPhase>('idle');
  const [flightPath, setFlightPath] = useState<FlightPath | null>(null);
  const onCompleteRef = useRef<(() => void) | null>(null);
  const phaseRef = useRef<FlightPhase>('idle');

  const triggerFlight = useCallback((startRect: DOMRect, onComplete: () => void) => {
    sessionStorage.setItem(SESSION_KEY, 'true');

    const headerBtn = document.querySelector('[data-apply-button]');
    let endX: number;
    let endY: number;

    if (headerBtn) {
      // Desktop: fly to header button
      const endRect = headerBtn.getBoundingClientRect();
      endX = endRect.left + endRect.width / 2;
      endY = endRect.top + endRect.height / 2;
    } else {
      // Mobile: fly to top-center of screen
      endX = window.innerWidth / 2;
      endY = 30;
    }

    setFlightPath({
      startX: startRect.left + startRect.width / 2,
      startY: startRect.top + startRect.height / 2,
      endX,
      endY,
    });
    onCompleteRef.current = onComplete;
    phaseRef.current = 'phase1';
    setPhase('phase1');
  }, []);

  const triggerLanding = useCallback(() => {
    const formCard = document.querySelector('[data-application-card]');
    if (!formCard) return;

    const headerBtn = document.querySelector('[data-apply-button]');
    const endRect = formCard.getBoundingClientRect();
    let startX: number;
    let startY: number;

    if (headerBtn) {
      const startRect = headerBtn.getBoundingClientRect();
      startX = startRect.left + startRect.width / 2;
      startY = startRect.top + startRect.height / 2;
    } else {
      // Mobile: start from top-center
      startX = window.innerWidth / 2;
      startY = 30;
    }

    setFlightPath({
      startX,
      startY,
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
      phaseRef.current = 'landed';
      setPhase('landed');
      // Keep flightPath so airplane stays visible at landing position
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
