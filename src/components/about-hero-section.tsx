import { getLocale, getTranslations } from '@/lib/server-locale';

export async function AboutHeroSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, string>>).about;

  return (
    <section className="relative bg-secondary min-h-[420px] md:min-h-[520px] flex items-end overflow-hidden">
      {/* Subtle gradient overlay only */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-secondary/40" />

      <div className="container mx-auto px-4 pb-12 md:pb-16 relative z-10">
        <p className="text-primary italic text-base md:text-lg mb-2">
          {t.heroLabel}
        </p>
        <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-white tracking-tight leading-[1.05]">
          {t.title}
        </h1>
      </div>
    </section>
  );
}
