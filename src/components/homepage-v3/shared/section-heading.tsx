import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "text-sm uppercase tracking-wider font-medium mb-3",
            variant === "dark" ? "text-mint-accent" : "text-secondary-700",
          )}
        >
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "font-display font-bold text-3xl md:text-4xl !leading-[1.3]",
          variant === "dark" ? "text-white" : "text-brand-navy-900",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-4 text-base md:text-lg leading-relaxed",
            variant === "dark" ? "text-white/80" : "text-brand-navy-700",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
