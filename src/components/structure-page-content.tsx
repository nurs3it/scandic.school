import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ArrowRight, School, Coffee, FlaskConical, Microscope } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';
import { OrgChart } from '@/components/org-chart';
import { CurriculumTimeline } from '@/components/curriculum-timeline';

export async function StructurePageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).structure;
  const nav = translations.navigation as unknown as Record<string, string>;

  const topNodes = [
    { iconName: "crown", title: (t.ceo as Record<string, string>).title, description: (t.ceo as Record<string, string>).description },
    { iconName: "briefcase", title: (t.management as Record<string, string>).title, description: (t.management as Record<string, string>).description },
    { iconName: "shield", title: (t.board as Record<string, string>).title, description: (t.board as Record<string, string>).description },
  ];

  const bottomNode = {
    iconName: "users",
    title: (t.pta as Record<string, string>).title,
    description: (t.pta as Record<string, string>).description,
  };

  const curriculumItems = [
    {
      ...(t.primary as Record<string, unknown>) as { title: string; subtitle: string; description: string },
      tags: (t.primary as Record<string, unknown>).tags as string[],
      accentColor: 'bg-gradient-to-r from-primary to-primary-600',
      dotColor: 'bg-primary',
    },
    {
      ...(t.secondary as Record<string, unknown>) as { title: string; subtitle: string; description: string },
      tags: (t.secondary as Record<string, unknown>).tags as string[],
      accentColor: 'bg-gradient-to-r from-secondary to-secondary-800',
      dotColor: 'bg-secondary',
    },
    {
      ...(t.extracurricular as Record<string, unknown>) as { title: string; subtitle: string; description: string },
      tags: (t.extracurricular as Record<string, unknown>).tags as string[],
      accentColor: 'bg-gradient-to-r from-accent to-accent-700',
      dotColor: 'bg-accent',
    },
  ];

  const infrastructureCards = [
    { icon: School, ...(t.classrooms as Record<string, string>) },
    { icon: Coffee, ...(t.parentHub as Record<string, string>) },
    { icon: FlaskConical, ...(t.stemLab as Record<string, string>) },
    { icon: Microscope, ...(t.physicsLab as Record<string, string>) },
  ] as Array<{ icon: LucideIcon; title: string; description: string }>;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />
        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />
        <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">{t.heroLabel as string}</span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">{t.title as string}</h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">{t.subtitle as string}</p>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== MANAGEMENT — INTERACTIVE ORG CHART ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.managementLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-5">{t.managementTitle as string}</h2>
            </div>
          </ScrollReveal>

          <OrgChart
            topNodes={topNodes}
            bottomNode={bottomNode}
            topLabel={t.operationalLevel as string}
            bottomLabel={t.coordinationLevel as string}
          />
        </div>
      </section>

      {/* ===== CURRICULUM — VISUAL TIMELINE ===== */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.curriculumLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-5">{t.curriculumTitle as string}</h2>
            </div>
          </ScrollReveal>

          <CurriculumTimeline items={curriculumItems} />
        </div>
      </section>

      {/* ===== INFRASTRUCTURE — IMMERSIVE BENTO GRID ===== */}
      <section className="relative py-20 md:py-28 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-20 right-[20%] w-32 h-32 bg-primary/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[15%] w-40 h-40 bg-primary/[0.04] rounded-full blur-3xl" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.infrastructureLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">{t.infrastructureTitle as string}</h2>
            </div>
          </ScrollReveal>

          {/* Bento-style grid: 2 large + 2 small */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {infrastructureCards.map((card, index) => {
              const Icon = card.icon;
              const isLarge = index < 2;
              return (
                <ScrollReveal key={index} delay={0.1 + index * 0.08}>
                  <div className={`group relative rounded-2xl overflow-hidden cursor-default ${isLarge ? 'lg:col-span-2 min-h-[220px]' : 'min-h-[180px]'}`}>
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] to-white/[0.02] group-hover:from-white/[0.14] group-hover:to-white/[0.06] transition-all duration-500" />
                    <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-primary/30 transition-colors duration-300" />

                    {/* Decorative corner glow */}
                    <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary/[0.08] rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 p-6 md:p-8 flex flex-col justify-end h-full">
                      <div className="w-14 h-14 mb-5 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:scale-110 transition-all duration-300">
                        <Icon className="h-6 w-6 text-white/70 group-hover:text-primary transition-colors duration-300" />
                      </div>
                      <h3 className="text-white font-bold text-lg mb-2">{card.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">{card.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">{t.heroLabel as string}</span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.about}</Link>
            <Link href="/programs" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.programs ?? 'Programs'}</Link>
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.staff}</Link>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-white py-16 md:py-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/[0.06] rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary italic mb-8">{t.ctaTitle as string}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/programs" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaPrograms as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/about" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaAbout as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/application" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaApplication as string}</span>
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
