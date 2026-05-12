'use client';

import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLocale } from './locale-provider';

const t = {
  ru: 'Подать заявку',
  en: 'Register',
  kk: 'Өтінім беру',
};

export function TournamentStickyApply() {
  const { locale } = useLocale();
  const label = t[locale as keyof typeof t] ?? t.ru;
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById('register');
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.intersectionRatio > 0.5),
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('register')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <a
      href="#register"
      onClick={handleClick}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className={`fixed z-[60] transition-all duration-300
        ${hidden ? 'opacity-0 translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}
        bottom-0 inset-x-0 md:inset-x-auto md:right-6 md:bottom-6
        md:rounded-2xl
        bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70
        text-white font-semibold shadow-2xl
        flex items-center justify-center gap-2
        px-5 md:px-7 pt-4 md:pt-4 md:pb-4
        text-base md:text-lg`}
    >
      {label}
      <ArrowDown className="w-5 h-5" />
    </a>
  );
}
