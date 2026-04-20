'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const partners = [
  { name: 'Colegio del Mundo', logo: '/partners/colegio-del-mundo.png' },
  { name: 'Esbjerg International School', logo: '/partners/esbjerg-int-school.png' },
  { name: 'Lab22', logo: '/partners/lab22.png' },
];

function PartnerLogo({ name, logo }: { name: string; logo: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Map scroll progress: 0 (entering) -> 0.5 (center) -> 1 (leaving)
  // Grayscale: 1 -> 0 -> 1 (full gray -> color -> full gray)
  const grayscale = useTransform(scrollYProgress, [0, 0.4, 0.5, 0.6, 1], [1, 0, 0, 0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.5, 1, 1, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center p-6"
      style={{
        filter: useTransform(grayscale, (v) => `grayscale(${v})`),
        opacity,
      }}
    >
      <Image
        src={logo}
        alt={name}
        width={180}
        height={80}
        className="object-contain max-h-20"
      />
    </motion.div>
  );
}

export function PartnersSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-400 mb-12 tracking-wide uppercase">
          Наши партнёры
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <PartnerLogo key={partner.name} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
