import Image from "next/image";
import { getLocale, getTranslations } from "@/lib/server-locale";
import { ScrollReveal } from "@/components/scroll-reveal";

export async function FounderSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = translations.founder;

  return (
    <section className="relative overflow-hidden">
      {/* Section title — full width above the split */}
      <div className="bg-white pt-16 md:pt-20 pb-10 md:pb-14">
        <ScrollReveal>
          <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-secondary uppercase tracking-wide px-4">
            {t.title}
          </h2>
        </ScrollReveal>
      </div>

      {/* Split background */}
      <div className="relative">
        {/* Left bg = primary, right bg = muted gray-green */}
        <div className="absolute inset-0 hidden lg:flex">
          <div className="w-1/2 bg-primary" />
          <div className="w-1/2 bg-secondary/[0.04]" />
        </div>
        {/* Mobile: stacked backgrounds */}
        <div className="lg:hidden">
          <div className="absolute inset-0 bg-secondary/[0.04]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              {/* Photo + info column */}
              <ScrollReveal direction="left" className="flex flex-col items-center text-center">
                {/* Circular photo with border */}
                <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-6">
                  <div className="absolute inset-0 rounded-full border-[3px] border-secondary lg:border-primary-foreground" />
                  <div className="absolute inset-[3px] rounded-full overflow-hidden">
                    <Image
                      src="/images/founder.jpeg"
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="320px"
                    />
                  </div>
                </div>

                {/* Name and role */}
                <h3 className="text-xl md:text-2xl font-bold text-secondary lg:text-primary-foreground leading-tight mb-2">
                  {t.name}
                </h3>
                <p className="text-secondary/80 lg:text-primary-foreground/80 text-sm font-medium leading-relaxed mb-0.5">
                  {t.role}
                </p>
                <p className="text-secondary/80 lg:text-primary-foreground/80 text-sm font-medium leading-relaxed uppercase">
                  Scandic International School
                </p>
                <div className="w-10 h-[2px] bg-secondary/20 lg:bg-primary-foreground/20 my-4" />
                <p className="text-secondary/60 lg:text-primary-foreground/60 text-xs leading-relaxed italic">
                  {t.company}
                </p>
              </ScrollReveal>

              {/* Quote column */}
              <ScrollReveal direction="right" delay={0.15}>
                <div className="relative">
                  {/* Large quote mark */}
                  <span className="block text-secondary text-6xl md:text-7xl font-serif leading-none mb-3 select-none">&ldquo;</span>

                  <p className="text-gray-900 text-base md:text-[17px] leading-[1.85] mb-5 font-medium">
                    {t.quote1}
                  </p>
                  <p className="text-gray-900 text-base md:text-[17px] leading-[1.85] font-medium">
                    {t.quote2}
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
