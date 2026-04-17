'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import type { NewsItem } from '@/types/news';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });

export function NewsCard({ item, index = 0 }: { item: NewsItem; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.05 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100"
    >
      <Link href={`/news/${item.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image
            src={item.bannerUrl}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5 space-y-3">
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 2).map(t => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                #{t}
              </span>
            ))}
          </div>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
            <span>{fmtDate(item.publishedAt)}</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {item.readingMinutes} мин
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
