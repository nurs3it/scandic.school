import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { Building2Icon } from '@/components/icons/organization-icons';
import { FlaskConicalIcon } from '@/components/icons/education-icons';
import { PaletteIcon } from '@/components/icons/community-icons';
import type { IconProps } from '@/components/icons/icon-types';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';
import { AnimatedStats } from '@/components/animated-stats';
import { ValuesGrid } from '@/components/values-grid';

export async function AboutPageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).about;
  const founder = translations.founder;
  const nav = translations.navigation as unknown as Record<string, string>;
  const aims = t.aims as Record<string, string>;
  const history = t.history as Record<string, string>;
  const facilities = t.facilities as Record<string, string>;

  const values = [
    {
      iconName: "target",
      title: { ru: 'Совершенство', en: 'Excellence', kk: 'Жетістік' },
      desc: { ru: 'Стремление к высочайшим стандартам во всём', en: 'Striving for the highest standards in everything', kk: 'Барлығында ең жоғары стандарттарға ұмтылу' },
    },
    {
      iconName: "compass",
      title: { ru: 'Глобальное мышление', en: 'Global Mindset', kk: 'Жаһандық ойлау' },
      desc: { ru: 'Подготовка к жизни в многокультурном мире', en: 'Preparation for life in a multicultural world', kk: 'Көпмәдениетті әлемдегі өмірге дайындық' },
    },
    {
      iconName: "book-open",
      title: { ru: 'Любознательность', en: 'Curiosity', kk: 'Қызығушылық' },
      desc: { ru: 'Разжигаем искру познания в каждом ребёнке', en: 'Igniting the spark of discovery in every child', kk: 'Әр баладағы таным ұшқынын тұтатамыз' },
    },
    {
      iconName: "shield",
      title: { ru: 'Уважение', en: 'Respect', kk: 'Құрмет' },
      desc: { ru: 'Ценим каждую личность и её уникальность', en: 'Valuing every individual and their uniqueness', kk: 'Әр тұлға мен оның бірегейлігін бағалаймыз' },
    },
  ];

  const valuesItems = values.map(v => ({
    iconName: v.iconName,
    title: v.title[locale as keyof typeof v.title] || v.title.en,
    description: v.desc[locale as keyof typeof v.desc] || v.desc.en,
  }));

  const facilityItems = [
    {
      icon: Building2Icon,
      title: { ru: 'Современные классы', en: 'Modern Classrooms', kk: 'Заманауи сыныптар' },
      desc: { ru: 'Оборудованные по международным стандартам', en: 'Equipped to international standards', kk: 'Халықаралық стандарттар бойынша жабдықталған' },
      gradient: 'from-secondary via-secondary-800 to-secondary-900',
    },
    {
      icon: FlaskConicalIcon,
      title: { ru: 'Лаборатории', en: 'Laboratories', kk: 'Зертханалар' },
      desc: { ru: 'Для естественных наук и STEM-проектов', en: 'For natural sciences and STEM projects', kk: 'Жаратылыстану ғылымдары мен STEM жобалары үшін' },
      gradient: 'from-primary via-primary-600 to-primary-800',
    },
    {
      icon: PaletteIcon,
      title: { ru: 'Творческие пространства', en: 'Creative Spaces', kk: 'Шығармашылық кеңістіктер' },
      desc: { ru: 'Для искусства, музыки и самовыражения', en: 'For art, music, and self-expression', kk: 'Өнер, музыка және өзін-өзі көрсету үшін' },
      gradient: 'from-accent via-accent-700 to-accent-900',
    },
  ];

  const stats = [
    { value: 150, suffix: '+', label: { ru: 'Учеников', en: 'Students', kk: 'Оқушылар' } },
    { value: 8, prefix: '1:', label: { ru: 'Учитель / ученик', en: 'Teacher / Student', kk: 'Мұғалім / оқушы' } },
    { value: 4, suffix: '+', label: { ru: 'Партнёрства', en: 'Partnerships', kk: 'Серіктестіктер' } },
    { value: 11, prefix: '0–', label: { ru: 'Классы', en: 'Grades', kk: 'Сыныптар' } },
  ];

  const statsForClient = stats.map(s => ({
    value: s.value,
    prefix: s.prefix,
    suffix: s.suffix,
    label: s.label[locale as keyof typeof s.label] || s.label.en,
  }));

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

          {/* Badge */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <span className="text-white/90 text-sm font-medium">
                {locale === 'en' ? 'International education since 2022' : locale === 'kk' ? '2022 жылдан бері халықаралық білім' : 'Международное образование с 2022 года'}
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== FOUNDER WELCOME ===== */}
      <section className="relative overflow-hidden">
        {/* Section title — full width above the split */}
        <div className="bg-white pt-16 md:pt-20 pb-10 md:pb-14">
          <ScrollReveal>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-secondary uppercase tracking-wide px-4">
              {founder.title}
            </h2>
          </ScrollReveal>
        </div>

        {/* Split background */}
        <div className="relative">
          <div className="absolute inset-0 hidden lg:flex">
            <div className="w-1/2 bg-primary" />
            <div className="w-1/2 bg-secondary/[0.04]" />
          </div>
          <div className="lg:hidden">
            <div className="absolute inset-0 bg-secondary/[0.04]" />
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10 py-12 md:py-16">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                {/* Photo + info column */}
                <ScrollReveal direction="left" className="flex flex-col items-center text-center">
                  <div className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-6">
                    <div className="absolute inset-0 rounded-full border-[3px] border-secondary lg:border-primary-foreground" />
                    <div className="absolute inset-[3px] rounded-full overflow-hidden">
                      <Image
                        src="/images/founder.jpeg"
                        alt={founder.name}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />
                    </div>
                    {/* Decorative ring */}
                    <div className="absolute -inset-3 rounded-full border border-secondary/10 lg:border-primary-foreground/10" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-secondary lg:text-primary-foreground leading-tight mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-secondary/80 lg:text-primary-foreground/80 text-sm font-medium leading-relaxed mb-0.5">
                    {founder.role}
                  </p>
                  <p className="text-secondary/80 lg:text-primary-foreground/80 text-sm font-medium leading-relaxed uppercase">
                    Scandic International School
                  </p>
                  <div className="w-10 h-[2px] bg-secondary/20 lg:bg-primary-foreground/20 my-4" />
                  <p className="text-secondary/60 lg:text-primary-foreground/60 text-xs leading-relaxed italic">
                    {founder.company}
                  </p>
                </ScrollReveal>

                {/* Quote column */}
                <ScrollReveal direction="right" delay={0.15}>
                  <div className="relative">
                    <span className="block text-secondary text-6xl md:text-7xl font-serif leading-none mb-3 select-none">&ldquo;</span>
                    <p className="text-gray-900 text-base md:text-[17px] leading-[1.85] mb-5 font-medium">
                      {founder.quote1}
                    </p>
                    <p className="text-gray-900 text-base md:text-[17px] leading-[1.85] font-medium">
                      {founder.quote2}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALUES SECTION ===== */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--secondary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--secondary)) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {aims.title}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-5">
                {aims.title}
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                {aims.description}
              </p>
            </div>
          </ScrollReveal>

          <ValuesGrid items={valuesItems} />
        </div>
      </section>

      {/* ===== QUOTE BAND ===== */}
      <section className="relative bg-primary py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%), linear-gradient(45deg, hsl(var(--secondary)) 25%, transparent 25%, transparent 75%, hsl(var(--secondary)) 75%)',
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
                {t.quote1Text as string}
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-[2px] bg-secondary/50" />
                <cite className="text-secondary text-base font-bold not-italic uppercase tracking-wider">
                  {t.quote1Source as string}
                </cite>
                <div className="w-8 h-[2px] bg-secondary/50" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== HISTORY + ANIMATED STATS ===== */}
      <section className="relative py-20 md:py-28 bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="absolute top-20 right-[20%] w-32 h-32 bg-primary/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[15%] w-40 h-40 bg-primary/[0.04] rounded-full blur-3xl" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: History */}
            <ScrollReveal direction="left">
              <div>
                <span className="inline-flex items-center gap-2 mb-4">
                  <span className="w-8 h-[2px] bg-primary rounded-full" />
                  <span className="text-primary text-sm font-semibold uppercase tracking-[0.2em]">
                    {history.title}
                  </span>
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  {history.title}
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8">
                  {history.description}
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-semibold transition-colors group"
                >
                  {history.link}
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </ScrollReveal>

            {/* Right: Animated Stats */}
            <AnimatedStats stats={statsForClient} />
          </div>
        </div>
      </section>

      {/* ===== SECOND QUOTE ===== */}
      <section className="py-14 md:py-20 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed italic">
                &ldquo;{t.quote2Text as string}&rdquo;
              </p>
              <p className="text-secondary font-semibold text-sm mt-4">
                &mdash; {t.quote2Source as string}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== FACILITIES — IMMERSIVE FULL-WIDTH SECTIONS ===== */}
      <section className="relative overflow-hidden">
        <ScrollReveal>
          <div className="text-center py-16 md:py-20 bg-white">
            <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
              <span className="w-8 h-[2px] bg-primary rounded-full" />
              {facilities.title}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold gradient-text mb-5">
              {facilities.title}
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-4">
              {facilities.description}
            </p>
          </div>
        </ScrollReveal>

        {facilityItems.map((item, index) => {
          const Icon = item.icon;
          const isReversed = index % 2 !== 0;

          return (
            <ScrollReveal key={index} direction={isReversed ? 'right' : 'left'}>
              <div className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[350px] md:min-h-[400px]">
                {/* Gradient side */}
                <div className={`relative bg-gradient-to-br ${item.gradient} flex items-center justify-center py-14 md:py-16 overflow-hidden ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="absolute top-8 right-8 w-32 h-32 bg-white/[0.05] rounded-full" />
                  <div className="absolute bottom-12 left-12 w-20 h-20 bg-white/[0.04] rounded-full" />
                  <div className="absolute inset-0 opacity-[0.04]" style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }} />

                  <div className="relative z-10 text-center px-8">
                    <span className="text-white/10 text-[8rem] md:text-[10rem] font-bold absolute -top-8 left-1/2 -translate-x-1/2 select-none leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center p-3">
                      <Icon active id={`facility-${index}`} />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white relative z-10">
                      {item.title[locale as keyof typeof item.title] || item.title.en}
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
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`w-8 h-[2px] rounded-full ${
                        index === 0 ? 'bg-secondary' : index === 1 ? 'bg-primary' : 'bg-accent'
                      }`} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-4 leading-tight">
                      {item.title[locale as keyof typeof item.title] || item.title.en}
                    </h3>
                    <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                      {item.desc[locale as keyof typeof item.desc] || item.desc.en}
                    </p>
                    <div className="mt-6 text-sm font-semibold text-secondary/60">
                      Scandic International School
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}

        <ScrollReveal delay={0.2}>
          <div className="text-center py-10 bg-white">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-secondary text-sm font-semibold hover:text-primary transition-colors group"
            >
              {facilities.link}
              <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== STRUCTURE TEASER ===== */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-secondary/[0.04] to-primary/[0.04] overflow-hidden">
        <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-secondary/[0.04] rounded-full blur-3xl -translate-x-1/3 -translate-y-1/3" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-secondary/[0.08] border border-secondary/10 flex items-center justify-center p-3">
                <Building2Icon active={false} id="about-structure" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3">
                {locale === 'kk' ? 'Мектеп құрылымы' : locale === 'en' ? 'School Structure' : 'Структура школы'}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
                {locale === 'kk' ? 'Мектебіміздің қалай құрылғанын біліңіз — басқарудан инфрақұрылымға дейін' : locale === 'en' ? 'Learn how our school is organized — from governance to infrastructure' : 'Узнайте, как устроена наша школа — от управления до инфраструктуры'}
              </p>
              <Link
                href="/structure"
                className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-secondary/20 group"
              >
                {locale === 'kk' ? 'Толығырақ' : locale === 'en' ? 'Learn more' : 'Подробнее'}
                <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-5 md:gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg flex-shrink-0">
              {t.heroLabel as string}
            </span>
            <div className="w-px h-5 bg-gray-300 flex-shrink-0" />
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.staff}</Link>
            <Link href="/partners" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.partners ?? 'Partners'}</Link>
            <Link href="/documents" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.documents}</Link>
            <Link href="/testimonials" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.testimonials}</Link>
            <Link href="/structure" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.structure ?? 'Structure'}</Link>
            <Link href="/community" className="text-sm text-gray-500 hover:text-secondary transition-colors flex-shrink-0">{nav.community ?? 'Community'}</Link>
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
                <Link href="/application" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaAdmissions as string}</span>
                  <svg className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/about" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaVisit as string}</span>
                  <svg className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
                <Link href="/contact" className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md">
                  <span className="text-secondary font-semibold text-[15px]">{t.ctaContact as string}</span>
                  <svg className="h-4 w-4 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
