import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ArrowRight, GraduationCap, Heart, Home, Camera, Users, Sparkles } from 'lucide-react';
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
      title: teachers.title,
      description: teachers.description,
      gradient: 'from-secondary via-secondary-800 to-secondary-900',
      iconBg: 'bg-white/15',
      number: '01',
      dotPattern: true,
    },
    {
      icon: Heart,
      title: children.title,
      description: children.description,
      gradient: 'from-primary via-primary-600 to-primary-800',
      iconBg: 'bg-secondary/20',
      number: '02',
      dotPattern: false,
    },
    {
      icon: Home,
      title: parents.title,
      description: parents.description,
      gradient: 'from-accent via-accent-700 to-accent-900',
      iconBg: 'bg-white/15',
      number: '03',
      dotPattern: true,
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

          {/* Community badge */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-white/90 text-sm font-medium">
                <span className="text-primary font-bold mr-1">3</span>
                {locale === 'en' ? 'pillars of our community' : locale === 'kk' ? 'қоғамдастығымыздың тірегі' : 'столпа нашего сообщества'}
              </span>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== PHILOSOPHY QUOTE ===== */}
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
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
              <svg className="w-12 h-12 md:w-16 md:h-16 text-secondary/20 mx-auto mb-6" viewBox="0 0 100 100" fill="currentColor">
                <path d="M20 65c0-16.6 13.4-30 30-30V20C27.9 20 10 37.9 10 60v30h40V60H20v5zm50 0c0-16.6 13.4-30 30-30V20C77.9 20 60 37.9 60 60v30h40V60H70v5z" />
              </svg>
              <blockquote className="text-secondary text-xl md:text-2xl lg:text-3xl font-bold leading-relaxed italic mb-6">
                {t.philosophy as string}
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== THREE PILLARS — IMMERSIVE FULL-WIDTH SECTIONS ===== */}
      <section className="relative overflow-hidden">
        <ScrollReveal>
          <div className="text-center py-16 md:py-20 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
            <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              {t.sidesLabel as string}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text">
              {t.sidesTitle as string}
            </h2>
          </div>
        </ScrollReveal>

        {sides.map((side, index) => {
          const Icon = side.icon;
          const isReversed = index % 2 !== 0;

          return (
            <ScrollReveal key={index} direction={isReversed ? 'right' : 'left'}>
              <div className={`relative grid grid-cols-1 lg:grid-cols-2 min-h-[400px] md:min-h-[450px]`}>
                {/* Gradient side */}
                <div className={`relative bg-gradient-to-br ${side.gradient} flex items-center justify-center py-16 md:py-20 overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}>
                  {/* Decorative elements */}
                  <div className="absolute top-8 right-8 w-32 h-32 bg-white/[0.05] rounded-full" />
                  <div className="absolute bottom-12 left-12 w-20 h-20 bg-white/[0.04] rounded-full" />
                  {side.dotPattern && (
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                      backgroundSize: '20px 20px',
                    }} />
                  )}

                  <div className="relative z-10 text-center px-8">
                    {/* Number */}
                    <span className="text-white/10 text-[8rem] md:text-[10rem] font-bold absolute -top-8 left-1/2 -translate-x-1/2 select-none leading-none">
                      {side.number}
                    </span>
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-3xl ${side.iconBg} backdrop-blur-sm flex items-center justify-center`}>
                      <Icon className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">
                      {side.title}
                    </h3>
                  </div>
                </div>

                {/* Content side */}
                <div className={`flex items-center bg-white py-12 md:py-16 ${isReversed ? 'lg:order-1' : ''}`}>
                  <div className="px-8 md:px-12 lg:px-16 max-w-xl">
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`text-xs font-bold uppercase tracking-widest ${
                        index === 0 ? 'text-secondary' : index === 1 ? 'text-primary' : 'text-accent'
                      }`}>
                        {side.number}
                      </span>
                      <span className={`w-8 h-[2px] rounded-full ${
                        index === 0 ? 'bg-secondary' : index === 1 ? 'bg-primary' : 'bg-accent'
                      }`} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 leading-tight">
                      {side.title}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      {side.description}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-secondary/60">
                      <Sparkles className="h-4 w-4" />
                      <span>Scandic International School</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </section>

      {/* ===== TEAM PHOTO ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        {hasTeamPhoto ? (
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="/images/team-photo.jpg"
                  alt={t.teamPhotoCaption as string}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/20 to-transparent" />
                <div className="absolute inset-0 flex items-end justify-center pb-12">
                  <p className="text-white text-2xl md:text-3xl font-bold text-center px-4">
                    {t.teamPhotoCaption as string}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        ) : (
          <div className="container mx-auto px-4 md:px-8">
            <ScrollReveal>
              <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-secondary/[0.04] to-primary/[0.04] border border-secondary/10 flex flex-col items-center justify-center py-20 text-center gap-4">
                <div className="w-20 h-20 rounded-2xl bg-secondary/[0.08] flex items-center justify-center">
                  <Camera className="h-10 w-10 text-secondary/40" />
                </div>
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
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">{t.heroLabel as string}</span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.about ?? 'About'}</Link>
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.staff ?? 'Staff'}</Link>
            <Link href="/structure" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.structure ?? 'Structure'}</Link>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/application" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaApplication as string}</span>
                  <ArrowRight className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link href="/contact" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaContact as string}</span>
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
