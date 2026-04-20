import Image from "next/image";
import { getLocale, getTranslations } from "@/lib/server-locale";
import { ScrollReveal } from "@/components/scroll-reveal";

export async function FounderSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = translations.founder;

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-white via-gray-50/80 to-secondary/[0.03]">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary mb-4">
              {t.label}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
              {t.title}
            </h2>
          </div>
        </ScrollReveal>

        {/* Main content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Photo column */}
            <ScrollReveal direction="left" className="lg:col-span-5">
              <div className="relative">
                {/* Decorative frame behind photo */}
                <div className="absolute -inset-3 bg-gradient-to-br from-secondary/10 via-primary/10 to-secondary/5 rounded-3xl -rotate-2" />
                <div className="absolute -inset-3 border-2 border-primary/20 rounded-3xl rotate-1" />

                {/* Photo container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-secondary/5">
                  <Image
                    src="/images/founder.jpeg"
                    alt={t.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  {/* Photo overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />

                  {/* Name overlay on photo */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-[2px] bg-primary" />
                      <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em]">
                        {t.role}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {t.name}
                    </h3>
                    <p className="text-white/70 text-sm mt-2 leading-relaxed">
                      {t.company}
                    </p>
                  </div>
                </div>

                {/* Accent vertical bar */}
                <div className="absolute -left-3 top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-primary/60 to-transparent rounded-full" />
              </div>
            </ScrollReveal>

            {/* Quote column */}
            <ScrollReveal direction="right" delay={0.15} className="lg:col-span-7">
              <div className="relative">
                {/* Large decorative quote mark */}
                <svg
                  className="absolute -top-8 -left-4 md:-left-8 w-24 h-24 md:w-32 md:h-32 text-primary/10"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <path d="M20 65c0-16.6 13.4-30 30-30V20C27.9 20 10 37.9 10 60v30h40V60H20v5zm50 0c0-16.6 13.4-30 30-30V20C77.9 20 60 37.9 60 60v30h40V60H70v5z" />
                </svg>

                {/* Quote text */}
                <blockquote className="relative z-10 pl-4 md:pl-8">
                  <p className="text-lg md:text-xl lg:text-[1.35rem] text-gray-700 leading-[1.85] font-medium">
                    {t.quote1}
                  </p>
                  <p className="text-lg md:text-xl lg:text-[1.35rem] text-gray-700 leading-[1.85] font-medium mt-6">
                    {t.quote2}
                  </p>

                  {/* Signature area */}
                  <footer className="mt-10 flex items-center gap-4">
                    <div className="w-16 h-[2px] bg-gradient-to-r from-primary to-primary/30" />
                    <div>
                      <cite className="not-italic font-bold text-secondary text-lg">
                        {t.name}
                      </cite>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {t.signatureRole}
                      </p>
                    </div>
                  </footer>
                </blockquote>

                {/* Closing decorative quote mark */}
                <svg
                  className="absolute -bottom-4 right-0 md:right-8 w-16 h-16 md:w-20 md:h-20 text-primary/[0.07] rotate-180"
                  viewBox="0 0 100 100"
                  fill="currentColor"
                >
                  <path d="M20 65c0-16.6 13.4-30 30-30V20C27.9 20 10 37.9 10 60v30h40V60H20v5zm50 0c0-16.6 13.4-30 30-30V20C77.9 20 60 37.9 60 60v30h40V60H70v5z" />
                </svg>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
    </section>
  );
}
