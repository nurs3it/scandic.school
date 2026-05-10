'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const BANNERS = ['/banners/1.png', '/banners/2.png', '/banners/3.png', '/banners/4.png', '/banners/5.png', '/banners/6.png'];
const INTERVAL_MS = 5000;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % BANNERS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 z-0" aria-hidden>
      {BANNERS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={`object-cover transition-opacity duration-[1500ms] ease-in-out ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}
