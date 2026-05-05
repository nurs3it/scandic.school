import { cn } from "@/lib/utils";

type StatCardProps = {
  value: string;
  label: string;
  sublabel?: string;
  meta?: string;
  className?: string;
};

export function StatCard({ value, label, sublabel, meta, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6 bg-secondary-700/40 backdrop-blur-sm border border-white/10",
        className,
      )}
    >
      <div className="text-mint-accent font-display font-bold text-5xl md:text-6xl leading-none mb-3">
        {value}
      </div>
      <div className="text-white font-semibold text-lg leading-snug mb-1">{label}</div>
      {sublabel && <div className="text-white/80 text-sm leading-relaxed">{sublabel}</div>}
      {meta && (
        <div className="text-mint-accent/70 text-xs uppercase tracking-wider mt-2">{meta}</div>
      )}
    </div>
  );
}
