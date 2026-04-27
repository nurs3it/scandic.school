'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Users } from 'lucide-react';
import type { Club } from '@/lib/types/clubs';

export function ClubCard({ club, index }: { club: Club; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all"
    >
      <Link href={`/clubs/${club.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden bg-gray-100">
          <Image src={club.image} alt={club.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
          {club.ageRange && (
            <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur text-xs font-semibold text-secondary rounded-full">
              {club.ageRange}
            </span>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-secondary group-hover:text-primary transition-colors mb-2">{club.name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">{club.shortDescription}</p>
          <div className="flex flex-wrap gap-3 text-xs text-gray-500">
            {club.schedule && <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" />{club.schedule}</span>}
            {club.teacher && <span className="inline-flex items-center gap-1"><Users className="w-3 h-3" />{club.teacher}</span>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
