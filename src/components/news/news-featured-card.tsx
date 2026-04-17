'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';
import type { NewsItem } from '@/types/news';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

export function NewsFeaturedCard({ item }: { item: NewsItem }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl shadow-2xl"
    >
      <Link href={`/news/${item.slug}`} className="block relative">
        <div className="relative aspect-[21/9] min-h-[360px]">
          <Image src={item.bannerUrl} alt={item.title} fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white space-y-3 max-w-4xl">
          <div className="flex flex-wrap gap-2">
            {item.tags.map(t => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/15 backdrop-blur">#{t}</span>
            ))}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold leading-tight">{item.title}</h2>
          <p className="text-sm md:text-base text-white/80 line-clamp-2 md:line-clamp-3">{item.description}</p>
          <div className="flex items-center gap-4 text-xs md:text-sm text-white/70 pt-2">
            <span className="inline-flex items-center gap-1"><User className="h-4 w-4" />{item.author}</span>
            <span>{fmtDate(item.publishedAt)}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{item.readingMinutes} мин</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
