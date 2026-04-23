'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const partners = [
  { name: 'Colegios del Mundo Unido', logo: '/partners/colegio-del-mundo.png' },
  { name: 'Esbjerg International School', logo: '/partners/esbjerg-int-school.png' },
  { name: 'The Lab22', logo: '/partners/lab22.png' },
  { name: 'Byteall Energy', logo: '/partners/byteall-energy.png' },
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
        width={160}
        height={64}
        className="object-contain h-16 w-auto"
      />
    </motion.div>
  );
}

export function PartnersSection() {
  return (
    <section className="py-12 md:py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-400 mb-10 tracking-wide uppercase">
          Наши партнёры
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 max-w-3xl mx-auto">
          {partners.map((partner) => (
            <PartnerLogo key={partner.name} {...partner} />
          ))}
        </div>
      </div>
    </section>
  );
}
