"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ScrollFadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function ScrollFadeIn({ children, delay = 0, className }: ScrollFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
