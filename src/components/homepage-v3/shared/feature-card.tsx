import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FeatureCardProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  variant?: "white" | "teal-50" | "teal-700";
  className?: string;
  children?: ReactNode;
};

export function FeatureCard({
  icon,
  title,
  description,
  variant = "white",
  className,
  children,
}: FeatureCardProps) {
  const surface = {
    white: "bg-white border border-secondary-100",
    "teal-50": "bg-secondary-50",
    "teal-700": "bg-secondary-700 text-white",
  }[variant];

  const iconBg = variant === "teal-700" ? "bg-white/15" : "bg-secondary-100";
  const iconColor = variant === "teal-700" ? "text-white" : "text-secondary-700";
  const titleColor = variant === "teal-700" ? "text-white" : "text-brand-navy-900";
  const descColor = variant === "teal-700" ? "text-white/80" : "text-brand-navy-700";

  return (
    <div className={cn("rounded-2xl p-6", surface, className)}>
      {icon && (
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center mb-4",
            iconBg,
            iconColor,
          )}
        >
          {icon}
        </div>
      )}
      <h3 className={cn("font-display font-semibold text-lg mb-2", titleColor)}>
        {title}
      </h3>
      {description && (
        <p className={cn("text-sm leading-relaxed", descColor)}>{description}</p>
      )}
      {children}
    </div>
  );
}
