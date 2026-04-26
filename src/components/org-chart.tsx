"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Crown, Briefcase, Shield, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  crown: Crown,
  briefcase: Briefcase,
  shield: Shield,
  users: Users,
};

interface OrgNode {
  iconName: string;
  title: string;
  description: string;
}

interface OrgChartProps {
  topNodes: OrgNode[];
  bottomNode: OrgNode;
  topLabel: string;
  bottomLabel: string;
}

export function OrgChart({ topNodes, bottomNode, topLabel, bottomLabel }: OrgChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.15 + i * 0.12, duration: 0.5, ease: "easeOut" as const },
    }),
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: { delay: 0.6 + i * 0.15, duration: 0.8, ease: "easeOut" as const },
    }),
  };

  const BottomIcon = iconMap[bottomNode.iconName] || Users;

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto">
      {/* Level label - Top */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-secondary/20" />
        <span className="text-xs font-semibold text-secondary/60 uppercase tracking-widest px-2">{topLabel}</span>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-secondary/20" />
      </div>

      {/* Top-level nodes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-4">
        {topNodes.map((node, index) => {
          const Icon = iconMap[node.iconName] || Crown;
          return (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              className="group relative"
            >
              <div className="relative p-6 md:p-7 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/8 hover:-translate-y-1 transition-all duration-300 text-center cursor-default">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-secondary group-hover:to-secondary-800 group-hover:border-secondary group-hover:shadow-lg group-hover:shadow-secondary/20 transition-all duration-300">
                    <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300 mb-2">{node.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{node.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* SVG Connecting Lines */}
      <div className="hidden md:block relative h-20 w-full">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 80" preserveAspectRatio="none" fill="none">
          {[166, 500, 834].map((x, i) => (
            <motion.path
              key={i}
              custom={i}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={lineVariants}
              d={`M ${x} 0 Q ${x} 40, 500 80`}
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
            />
          ))}
          <motion.circle
            cx="500" cy="80" r="4"
            fill="hsl(var(--primary))"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.3 }}
          />
        </svg>
      </div>

      {/* Mobile connecting line */}
      <div className="md:hidden flex justify-center my-4">
        <motion.div
          className="w-[2px] h-12 bg-gradient-to-b from-primary/40 to-primary"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{ transformOrigin: "top" }}
        />
      </div>

      {/* Level label - Bottom */}
      <div className="flex items-center gap-3 mb-6 mt-2">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-primary/30" />
        <span className="text-xs font-semibold text-secondary/60 uppercase tracking-widest px-2">{bottomLabel}</span>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-primary/30" />
      </div>

      {/* Bottom node */}
      <motion.div
        custom={3}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={cardVariants}
        className="max-w-lg mx-auto"
      >
        <div className="group relative p-6 md:p-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] to-transparent hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 text-center cursor-default">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/15 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-600 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
              <BottomIcon className="h-7 w-7 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300 mb-2">{bottomNode.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">{bottomNode.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
