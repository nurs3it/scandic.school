import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { GraduationCap, Heart, Home, Camera, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';

export async function CommunityPageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).community;
  const nav = translations.navigation as unknown as Record<string, string>;

  const teachers = t.teachers as Record<string, string>;
  const children = t.children as Record<string, string>;
  const parents = t.parents as Record<string, string>;

  const sides = [
    {
      icon: GraduationCap,
      borderColor: 'border-t-secondary',
      iconBg: 'from-secondary/10 to-secondary/5',
      iconBorder: 'border-secondary/10',
      iconColor: 'text-secondary',
      title: teachers.title,
      description: teachers.description,
    },
    {
      icon: Heart,
      borderColor: 'border-t-primary',
      iconBg: 'from-primary/10 to-primary/5',
      iconBorder: 'border-primary/10',
      iconColor: 'text-primary-foreground',
      title: children.title,
      description: children.description,
    },
    {
      icon: Home,
      borderColor: 'border-t-accent',
      iconBg: 'from-accent/10 to-accent/5',
      iconBorder: 'border-accent/10',
      iconColor: 'text-accent-foreground',
      title: parents.title,
      description: parents.description,
    },
  ];

  let hasTeamPhoto = false;
  try {
    const fs = await import('fs');
    hasTeamPhoto = fs.existsSync(process.cwd() + '/public/images/team-photo.jpg');
  } catch {
    hasTeamPhoto = false;
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[55vh] md:min-h-[70vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

        {/* Floating orbs */}
        <div className="absolute top-20 right-[15%] w-24 h-24 bg-primary/15 rounded-full blur-xl animate-float" />
        <div className="absolute top-[40%] left-[10%] w-16 h-16 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-[30%] right-[8%] w-12 h-12 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2.5s' }} />

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

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== PHILOSOPHY QUOTE ===== */}
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        {/* Diamond pattern overlay */}
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
            <div className="max-w-4xl mx-auto text-center">
              {/* Quote mark SVG */}
              <svg
                className="w-12 h-12 md:w-16 md:h-16 text-secondary/20 mx-auto mb-6"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <path d="M20 65c0-16.6 13.4-30 30-30V20C27.9 20 10 37.9 10 60v30h40V60H20v5zm50 0c0-16.6 13.4-30 30-30V20C77.9 20 60 37.9 60 60v30h40V60H70v5z" />
              </svg>
              <blockquote className="text-secondary text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed italic mb-6">
                {t.philosophy as string}
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== THREE SIDES ===== */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02] overflow-hidden">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.sidesLabel as string}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent mb-5">
                {t.sidesTitle as string}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {sides.map((side, index) => {
              const Icon = side.icon;
              return (
                <ScrollReveal key={index} delay={0.1 + index * 0.1}>
                  <div
                    className={`group text-center p-8 rounded-2xl border-t-4 ${side.borderColor} border border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/60 hover:-translate-y-1 transition-all duration-300`}
                  >
                    <div
                      className={`w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${side.iconBg} border ${side.iconBorder} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                    >
                      <Icon className={`h-7 w-7 ${side.iconColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-secondary mb-3">
                      {side.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {side.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== TEAM PHOTO ===== */}
      <section className="py-16 md:py-20">
        {hasTeamPhoto ? (
          <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
            <Image
              src="/images/team-photo.jpg"
              alt={t.teamPhotoCaption as string}
              fill
              className="object-cover"
              sizes="100vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-secondary/60" />
            <div className="absolute inset-0 flex items-end justify-center pb-12">
              <ScrollReveal>
                <p className="text-white text-2xl md:text-3xl font-bold text-center px-4">
                  {t.teamPhotoCaption as string}
                </p>
              </ScrollReveal>
            </div>
          </div>
        ) : (
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto rounded-2xl bg-secondary/[0.06] border border-secondary/10 flex flex-col items-center justify-center py-20 text-center gap-4">
                <Camera className="h-12 w-12 text-secondary/30" />
                <p className="text-secondary/50 text-lg font-medium">
                  {t.teamPhotoPlaceholder as string}
                </p>
              </div>
            </ScrollReveal>
          </div>
        )}
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">
              {t.heroLabel as string}
            </span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link
              href="/about"
              className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0"
            >
              {nav.about ?? 'About'}
            </Link>
            <Link
              href="/staff"
              className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0"
            >
              {nav.staff ?? 'Staff'}
            </Link>
            <Link
              href="/structure"
              className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0"
            >
              {nav.structure ?? 'Structure'}
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/application"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold text-[15px]">
                    {t.ctaApplication as string}
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
