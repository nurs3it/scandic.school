"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "secondary" | "outline";
}

export function GlowButton({ 
  children, 
  className = "",
  onClick,
  href,
  variant = "primary"
}: GlowButtonProps) {
  const baseClasses = "relative px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-primary text-secondary hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-secondary"
  };

  const content = (
    <motion.button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(255, 180, 0, 0.2), rgba(255, 107, 53, 0.2))",
            "linear-gradient(45deg, rgba(255, 107, 53, 0.2), rgba(255, 180, 0, 0.2))",
            "linear-gradient(45deg, rgba(255, 180, 0, 0.2), rgba(255, 107, 53, 0.2))",
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        className={cn(baseClasses, variantClasses[variant], className)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(255, 180, 0, 0.2), rgba(255, 107, 53, 0.2))",
              "linear-gradient(45deg, rgba(255, 107, 53, 0.2), rgba(255, 180, 0, 0.2))",
              "linear-gradient(45deg, rgba(255, 180, 0, 0.2), rgba(255, 107, 53, 0.2))",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Content */}
        <span className="relative z-10 flex items-center justify-center">
          {children}
        </span>
      </motion.a>
    );
  }

  return content;
}
