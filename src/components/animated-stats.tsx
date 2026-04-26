"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface StatItem {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface AnimatedStatsProps {
  stats: StatItem[];
}

function Counter({ end, prefix = "", suffix = "", duration = 2000 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let frame: number;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function AnimatedStats({ stats }: AnimatedStatsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-5">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ delay: 0.2 + i * 0.12, duration: 0.5, ease: "easeOut" as const }}
          className="relative bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-6 md:p-8 text-center hover:bg-white/15 hover:border-primary/30 transition-all duration-300 group overflow-hidden"
        >
          {/* Decorative corner glow */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/[0.08] rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Large background number */}
          <span className="absolute top-1 right-3 text-white/[0.04] text-6xl md:text-7xl font-bold select-none leading-none">
            {String(i + 1).padStart(2, "0")}
          </span>

          <div className="relative z-10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
              <Counter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
            </div>
            <div className="text-white/70 text-sm font-medium">{stat.label}</div>
          </div>

          {/* Bottom accent line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeOut" as const }}
          />
        </motion.div>
      ))}
    </div>
  );
}
