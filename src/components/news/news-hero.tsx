'use client';

import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function NewsHero({ title, subtitle }: { title: string; subtitle: string }) {
  const [animation, setAnimation] = useState<unknown>(null);

  useEffect(() => {
    fetch('/lottie/news-hero.json').then(r => r.json()).then(setAnimation).catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-blue-50 border-b">
      <div className="container mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-8 items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900">{title}</h1>
          <p className="text-base md:text-lg text-gray-600 max-w-xl">{subtitle}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="hidden md:block">
          {animation ? <Lottie animationData={animation} loop className="max-w-md mx-auto" /> : <div className="aspect-square" />}
        </motion.div>
      </div>
    </section>
  );
}
