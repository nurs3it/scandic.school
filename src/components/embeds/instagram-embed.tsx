'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const SCRIPT_SRC = 'https://www.instagram.com/embed.js';

function ensureScript(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.instgrm) return Promise.resolve();
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => existing.addEventListener('load', () => resolve(), { once: true }));
  }
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = SCRIPT_SRC;
    s.async = true;
    s.addEventListener('load', () => resolve(), { once: true });
    document.body.appendChild(s);
  });
}

export function InstagramEmbed({ url }: { url: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    while (host.firstChild) host.removeChild(host.firstChild);
    const bq = document.createElement('blockquote');
    bq.className = 'instagram-media';
    bq.setAttribute('data-instgrm-permalink', url);
    bq.setAttribute('data-instgrm-version', '14');
    bq.style.background = '#fff';
    bq.style.borderRadius = '12px';
    bq.style.margin = '0';
    bq.style.maxWidth = '540px';
    bq.style.width = '100%';
    host.appendChild(bq);
    let cancelled = false;
    ensureScript().then(() => {
      if (cancelled) return;
      window.instgrm?.Embeds.process();
    });
    return () => {
      cancelled = true;
      while (host.firstChild) host.removeChild(host.firstChild);
    };
  }, [url]);

  return <div ref={hostRef} className="w-full max-w-[540px] mx-auto" />;
}
