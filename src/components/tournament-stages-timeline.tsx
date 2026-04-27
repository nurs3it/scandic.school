'use client';
import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import type { TournamentStage } from '@/lib/types/tournaments';

export function TournamentStagesTimeline({ stages }: { stages: TournamentStage[] }) {
  if (!stages?.length) return null;
  const now = new Date();
  return (
    <div className="relative md:flex md:gap-4 md:overflow-x-auto md:pb-4">
      {stages.map((s, i) => {
        const date = new Date(s.date);
        const past = date < now;
        const next = !past && stages.slice(0, i).every((p) => new Date(p.date) < now);
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: past ? 0.5 : 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`relative flex md:flex-col md:min-w-[240px] gap-3 mb-6 md:mb-0 p-4 rounded-2xl border ${next ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}
          >
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${past ? 'bg-gray-200 text-gray-500' : next ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
              {past ? <Check className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">{date.toLocaleString('ru-RU', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
              <h4 className="font-semibold text-secondary">{s.title}</h4>
              {s.description && <p className="text-sm text-gray-600 mt-1">{s.description}</p>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
