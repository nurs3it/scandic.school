'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ParticleBackground } from '@/components/particle-background';
import { CompassIcon } from '@/components/icons/community-icons';
import { useLocale } from '@/components/locale-provider';

const t = {
  en: {
    label: 'Page Not Found',
    title: 'Oops!',
    subtitle: 'The page you are looking for does not exist or has been moved.',
    home: 'Go Home',
    back: 'Go Back',
    hint: 'Perhaps you were looking for one of these:',
    about: 'About Us',
    programs: 'Programs',
    contact: 'Contact',
    news: 'News',
  },
  ru: {
    label: 'Страница не найдена',
    title: 'Упс!',
    subtitle: 'Страница, которую вы ищете, не существует или была перемещена.',
    home: 'На главную',
    back: 'Назад',
    hint: 'Возможно, вы искали одну из этих страниц:',
    about: 'О нас',
    programs: 'Программы',
    contact: 'Контакты',
    news: 'Новости',
  },
  kk: {
    label: 'Бет табылмады',
    title: 'Қап!',
    subtitle: 'Сіз іздеген бет жоқ немесе жылжытылған.',
    home: 'Басты бетке',
    back: 'Артқа',
    hint: 'Мүмкін сіз осы беттердің бірін іздеп жүрсіз:',
    about: 'Біз туралы',
    programs: 'Бағдарламалар',
    contact: 'Байланыс',
    news: 'Жаңалықтар',
  },
};

const floatingVariants = {
  animate: (i: number) => ({
    y: [0, -15, 0],
    x: [0, i % 2 === 0 ? 8 : -8, 0],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
    },
  }),
};

const links = [
  { href: '/about', key: 'about' as const },
  { href: '/programs', key: 'programs' as const },
  { href: '/news', key: 'news' as const },
  { href: '/contact', key: 'contact' as const },
];

export function NotFoundContent() {
  const { locale } = useLocale();
  const i = t[locale as keyof typeof t] || t.ru;

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900 flex-1">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-secondary/40" />

      {/* Floating orbs */}
      {[
        'top-20 right-[15%] w-24 h-24 bg-primary/15',
        'top-[30%] left-[8%] w-16 h-16 bg-primary/20',
        'bottom-[20%] right-[10%] w-12 h-12 bg-accent/15',
        'top-[60%] left-[20%] w-20 h-20 bg-primary/10',
        'bottom-[40%] right-[25%] w-14 h-14 bg-accent/10',
      ].map((cls, idx) => (
        <motion.div
          key={idx}
          custom={idx}
          animate="animate"
          variants={floatingVariants}
          className={`absolute ${cls} rounded-full blur-xl`}
        />
      ))}

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center">
        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        >
          <span className="text-[10rem] md:text-[14rem] lg:text-[18rem] font-bold leading-none select-none bg-gradient-to-b from-white/20 to-white/[0.03] bg-clip-text text-transparent">
            404
          </span>
        </motion.div>

        {/* Compass icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="-mt-16 md:-mt-24 mb-6"
        >
          <div className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center p-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-full"
            >
              <CompassIcon active id="not-found-compass" />
            </motion.div>
          </div>
        </motion.div>

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{i.label}</span>
            <span className="w-8 h-[2px] bg-primary rounded-full" />
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
        >
          {i.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-white/60 text-lg md:text-xl max-w-lg mx-auto leading-relaxed mb-10"
        >
          {i.subtitle}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-14"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
          >
            {i.home}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-sm border border-white/20 text-white px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
          >
            <svg className="h-4 w-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            {i.back}
          </button>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4">{i.hint}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-primary px-4 py-2 rounded-full border border-white/10 hover:border-primary/30 hover:bg-white/5 transition-all duration-200"
              >
                {i[link.key]}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
  );
}
