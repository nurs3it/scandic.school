import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import {
  FlaskConical,
  Sigma,
  Palette,
  Languages,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';

export async function ProgramsPageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).academicPrograms as Record<string, unknown>;
  const nav = translations.navigation as unknown as Record<string, string>;

  const subjects = [
    {
      icon: FlaskConical,
      data: t.science as Record<string, unknown>,
      accentBg: 'from-emerald-600 to-emerald-800',
      accentBorder: 'border-emerald-200',
      accentHover: 'hover:border-emerald-400',
      accent: 'bg-emerald-600',
    },
    {
      icon: Sigma,
      data: t.math as Record<string, unknown>,
      accentBg: 'from-amber-700 to-amber-900',
      accentBorder: 'border-amber-200',
      accentHover: 'hover:border-amber-400',
      accent: 'bg-amber-700',
    },
    {
      icon: Palette,
      data: t.arts as Record<string, unknown>,
      accentBg: 'from-teal-600 to-teal-800',
      accentBorder: 'border-teal-200',
      accentHover: 'hover:border-teal-400',
      accent: 'bg-teal-600',
    },
    {
      icon: Languages,
      data: t.languages as Record<string, unknown>,
      accentBg: 'from-primary to-primary-600',
      accentBorder: 'border-primary/30',
      accentHover: 'hover:border-primary/60',
      accent: 'bg-primary',
    },
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] md:min-h-[65vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-24 right-[12%] w-20 h-20 bg-primary/15 rounded-full blur-xl animate-float" />
        <div
          className="absolute top-[50%] left-[8%] w-14 h-14 bg-primary/20 rounded-full blur-lg animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div
          className="absolute bottom-[35%] right-[20%] w-10 h-10 bg-accent/15 rounded-full blur-lg animate-float"
          style={{ animationDelay: '2s' }}
        />

        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                {t.heroLabel as string}
              </span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {t.title as string}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t.subtitle as string}
            </p>
          </ScrollReveal>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== SUBJECTS ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.subjectsTitle as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent mb-5">
                {t.subjectsTitle as string}
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                {t.subjectsSubtitle as string}
              </p>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {subjects.map((subject, index) => {
              const isReversed = index % 2 !== 0;
              const Icon = subject.icon;
              const data = subject.data;
              const tags = (data.tags as string[]) || [];

              return (
                <ScrollReveal
                  key={index}
                  direction={isReversed ? 'right' : 'left'}
                  delay={0.1}
                >
                  <div
                    className={`group relative grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border ${subject.accentBorder} ${subject.accentHover} bg-white hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300`}
                  >
                    {/* Icon side */}
                    <div
                      className={`lg:col-span-2 relative bg-gradient-to-br ${subject.accentBg} p-8 md:p-12 flex items-center justify-center min-h-[200px] ${isReversed ? 'lg:order-2' : ''}`}
                    >
                      {/* Decorative circles */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
                      <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/[0.07] rounded-full" />

                      <Icon className="h-20 w-20 md:h-24 md:w-24 text-white/90 relative z-10" />
                    </div>

                    {/* Content side */}
                    <div
                      className={`lg:col-span-3 p-8 md:p-10 lg:p-12 flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}
                    >
                      {/* Top accent */}
                      <div className={`w-10 h-1 ${subject.accent} rounded-full mb-5 opacity-60`} />

                      <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3">
                        {data.title as string}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                        {data.description as string}
                      </p>

                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== STRUCTURE TEASER ===== */}
      <section className="relative py-16 md:py-20 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%), linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%)',
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 15px 15px',
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <Building2 className="h-10 w-10 text-secondary/60 mx-auto mb-5" />
              <p className="text-secondary text-lg md:text-xl leading-relaxed mb-8 font-medium">
                {t.structureTeaserText as string}
              </p>
              <Link
                href="/structure"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t.structureTeaserButton as string}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== STEM FOCUS ===== */}
      <section className="relative py-20 md:py-28 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-20 right-[20%] w-32 h-32 bg-primary/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[15%] w-40 h-40 bg-primary/[0.04] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                  {t.stemSubtitle as string}
                </span>
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                {t.stemTitle as string}
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {t.stemDescription as string}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg whitespace-nowrap">
              {t.navLabel as string}
            </span>
            <div className="w-px h-6 bg-gray-300" />
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap"
            >
              {nav.about}
            </Link>
            <Link
              href="/structure"
              className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap"
            >
              {nav.structure ?? 'Structure'}
            </Link>
            <Link
              href="/staff"
              className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap"
            >
              {nav.staff}
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">
                {t.ctaTitle as string}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/application"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">
                    {t.ctaAdmissions as string}
                  </span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/about"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">
                    {t.ctaAbout as string}
                  </span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">
                    {t.ctaContact as string}
                  </span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
