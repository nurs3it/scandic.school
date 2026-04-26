"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TargetIcon, CompassIcon, PaletteIcon } from "@/components/icons/community-icons";
import { BookOpenIcon } from "@/components/icons/education-icons";
import { ShieldIcon } from "@/components/icons/organization-icons";
import type { IconProps } from "@/components/icons/icon-types";

const iconMap: Record<string, React.FC<IconProps>> = {
  target: TargetIcon,
  compass: CompassIcon,
  "book-open": BookOpenIcon,
  shield: ShieldIcon,
};

interface ValueItem {
  iconName: string;
  title: string;
  description: string;
}

interface ValuesGridProps {
  items: ValueItem[];
}

const accentColors = [
  { bg: "from-primary to-primary-600", border: "border-primary/30", text: "text-primary" },
  { bg: "from-secondary to-secondary-800", border: "border-secondary/30", text: "text-secondary" },
  { bg: "from-accent to-accent-700", border: "border-accent/30", text: "text-accent" },
  { bg: "from-primary to-primary-600", border: "border-primary/30", text: "text-primary" },
];

export function ValuesGrid({ items }: ValuesGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div ref={ref} className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      {items.map((item, index) => {
        const Icon = iconMap[item.iconName] || TargetIcon;
        const accent = accentColors[index % accentColors.length];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 0.15 + index * 0.1, duration: 0.5, ease: "easeOut" as const }}
            className="group relative"
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`relative flex items-start gap-5 p-6 md:p-7 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm hover:${accent.border} hover:shadow-xl hover:shadow-gray-200/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden`}>
              {/* Left accent bar */}
              <motion.div
                className={`absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b ${accent.bg}`}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6, ease: "easeOut" as const }}
                style={{ transformOrigin: "top" }}
              />

              {/* Step number background */}
              <span className="absolute top-2 right-4 text-secondary/[0.04] text-5xl font-bold select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Icon */}
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/10 flex items-center justify-center group-hover:border-primary/30 group-hover:shadow-lg group-hover:shadow-primary/15 group-hover:scale-105 transition-all duration-300 p-2">
                <Icon active={hoveredCard === index} id={`val-${index}`} />
              </div>

              <div className="flex-1 min-w-0 relative z-10">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300 mb-1.5">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
