"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface CurriculumItem {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accentColor: string;
  dotColor: string;
}

interface CurriculumTimelineProps {
  items: CurriculumItem[];
}

export function CurriculumTimeline({ items }: CurriculumTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="max-w-4xl mx-auto relative">
      {/* Vertical connecting line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
        <motion.div
          className="w-full h-full bg-gradient-to-b from-primary via-secondary to-accent"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ transformOrigin: "top" }}
        />
      </div>

      <div className="space-y-12 md:space-y-16 relative">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -40 : 40, y: 20 }}
              animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.25, duration: 0.6, ease: "easeOut" }}
              className={`relative flex items-start gap-6 md:gap-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3 + index * 0.25, duration: 0.4, type: "spring", stiffness: 200 }}
                  className={`w-4 h-4 rounded-full ${item.dotColor} ring-4 ring-white shadow-lg`}
                />
              </div>

              {/* Spacer for the dot area (mobile) */}
              <div className="w-12 flex-shrink-0 md:hidden" />

              {/* Content card */}
              <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-12" : "md:pl-12"}`}>
                <div className={`group relative rounded-2xl border border-gray-100 bg-white overflow-hidden hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300`}>
                  {/* Top accent bar */}
                  <div className={`h-1 ${item.accentColor}`} />

                  <div className="p-6 md:p-8">
                    {/* Step number */}
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span className={`text-xs font-bold uppercase tracking-widest ${
                        index === 0 ? "text-primary" : index === 1 ? "text-secondary" : "text-accent"
                      }`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="w-6 h-px bg-gray-300" />
                    </div>

                    <h3 className="text-xl font-bold text-secondary mb-1">{item.title}</h3>
                    <p className="text-primary text-sm font-semibold mb-3">{item.subtitle}</p>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{item.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary/[0.06] text-secondary/80 hover:bg-secondary/10 transition-colors cursor-default"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
