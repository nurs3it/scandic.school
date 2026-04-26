import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ApplicationForm } from "@/components/application-form";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { generateMetadata as genMeta } from '@/lib/metadata';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';
import Link from 'next/link';
import { ArrowRight, Shield, Clock, GraduationCap } from 'lucide-react';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  return genMeta(locale, 'application');
}

export default async function ApplicationPage() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const nav = translations.navigation as unknown as Record<string, string>;
  const app = translations.application as unknown as Record<string, string>;

  const features = [
    {
      icon: Clock,
      text: locale === 'en' ? 'Quick process — 2 minutes' : locale === 'kk' ? 'Жылдам процесс — 2 минут' : 'Быстрый процесс — 2 минуты',
    },
    {
      icon: Shield,
      text: locale === 'en' ? 'Your data is protected' : locale === 'kk' ? 'Деректеріңіз қорғалған' : 'Ваши данные защищены',
    },
    {
      icon: GraduationCap,
      text: locale === 'en' ? 'Grades 0-11, IB PYP' : locale === 'kk' ? '0-11 сыныптар, IB PYP' : 'Классы 0-11, IB PYP',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* ===== HERO ===== */}
        <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
          <ParticleBackground />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/60 to-transparent" />

          {/* Floating orbs */}
          <div className="absolute top-24 right-[12%] w-20 h-20 bg-primary/15 rounded-full blur-xl animate-float" />
          <div className="absolute top-[50%] left-[8%] w-14 h-14 bg-primary/20 rounded-full blur-lg animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-[35%] right-[20%] w-10 h-10 bg-accent/15 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />

          <div className="container mx-auto px-4 md:px-8 pb-12 md:pb-20 relative z-10">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                  {nav.application}
                </span>
              </span>
              <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
                {app.title || nav.application}
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
                {app.subtitle || ''}
              </p>
            </ScrollReveal>

            {/* Feature badges */}
            <ScrollReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                {features.map((feature, i) => {
                  const Icon = feature.icon;
                  return (
                    <div key={i} className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-white/80 text-sm font-medium">{feature.text}</span>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </section>

        {/* ===== FORM SECTION ===== */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02] overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/[0.03] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/[0.03] rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <ScrollReveal>
              <ApplicationForm />
            </ScrollReveal>
          </div>
        </section>

        {/* ===== SUB-NAVIGATION STRIP ===== */}
        <section className="border-y border-gray-200 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center gap-6 py-4 overflow-x-auto">
              <span className="text-secondary font-bold italic text-lg whitespace-nowrap">
                {nav.about}
              </span>
              <div className="w-px h-6 bg-gray-300" />
              <Link href="/programs" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
                {nav.programs}
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
                {nav.contact}
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
                  {locale === 'en' ? 'Learn more about us' : locale === 'kk' ? 'Біз туралы толығырақ' : 'Узнайте больше о нас'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link href="/programs" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                    <span className="text-secondary font-semibold">{nav.programs}</span>
                    <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/about" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                    <span className="text-secondary font-semibold">{nav.about}</span>
                    <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                  <Link href="/contact" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                    <span className="text-secondary font-semibold">{nav.contact}</span>
                    <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
