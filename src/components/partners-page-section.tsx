import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ExternalLink, Instagram, Facebook, Linkedin, Youtube, ArrowRight, Handshake, type LucideIcon } from 'lucide-react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9a6.33 6.33 0 00-.79-.05A6.34 6.34 0 003.15 15.3a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.37a8.16 8.16 0 004.76 1.52V7.44a4.85 4.85 0 01-1-.75z" />
    </svg>
  );
}

interface SocialLink {
  platform: 'instagram' | 'facebook' | 'linkedin' | 'x' | 'youtube' | 'tiktok';
  url: string;
}

interface Partner {
  id: string;
  name: Record<string, string>;
  logo: string;
  website: string;
  description: Record<string, string>;
  socials: SocialLink[];
}

const partners: Partner[] = [
  {
    id: 'colegios-del-mundo',
    name: {
      ru: 'Colegios del Mundo Unido',
      en: 'Colegios del Mundo Unido',
      kk: 'Colegios del Mundo Unido',
    },
    logo: '/partners/colegio-del-mundo.png',
    website: 'https://ibo.org/es',
    description: {
      ru: 'Международная сеть школ, объединённых общими ценностями и стремлением к образованию мирового уровня. Партнёрство направлено на обмен опытом и методологиями преподавания.',
      en: 'An international network of schools united by shared values and a commitment to world-class education. Our partnership focuses on exchanging teaching experience and methodologies.',
      kk: 'Ортақ құндылықтар мен әлемдік деңгейдегі білім беруге ұмтылыспен біріккен мектептердің халықаралық желісі. Серіктестік оқыту тәжірибесі мен әдістемелерін алмасуға бағытталған.',
    },
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/iborganization/' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/school/ibo/' },
      { platform: 'youtube', url: 'https://www.youtube.com/user/ibcommunications' },
      { platform: 'x', url: 'https://x.com/iborganization' },
      { platform: 'facebook', url: 'https://www.facebook.com/IBO.org' },
    ],
  },
  {
    id: 'esbjerg-int-school',
    name: {
      ru: 'Esbjerg International School',
      en: 'Esbjerg International School',
      kk: 'Esbjerg International School',
    },
    logo: '/partners/esbjerg-int-school.png',
    website: 'https://eis.school/',
    description: {
      ru: 'Международная школа в Дании, предлагающая IB-программу. Наше сотрудничество включает обмен студентами, совместные проекты и профессиональное развитие педагогов.',
      en: 'An international school in Denmark offering the IB programme. Our collaboration includes student exchanges, joint projects, and professional development for teachers.',
      kk: 'Данияда IB бағдарламасын ұсынатын халықаралық мектеп. Біздің ынтымақтастығымыз студенттер алмасуын, бірлескен жобаларды және педагогтардың кәсіби дамуын қамтиды.',
    },
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/esbjergintschool/' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/company/esbjerg-international-school/' },
      { platform: 'facebook', url: 'https://www.facebook.com/Esbjerg.International.School/' },
    ],
  },
  {
    id: 'lab22',
    name: {
      ru: 'The Lab22',
      en: 'The Lab22',
      kk: 'The Lab22',
    },
    logo: '/partners/lab22.png',
    website: 'https://lab22.kz',
    description: {
      ru: 'Инновационная лаборатория, специализирующаяся на STEM-образовании и технологическом развитии. Совместно проводим мастер-классы, хакатоны и технологические воркшопы для учеников.',
      en: 'An innovation lab specializing in STEM education and technological development. Together we organize masterclasses, hackathons, and tech workshops for students.',
      kk: 'STEM білімі мен технологиялық дамуға маманданған инновациялық зертхана. Бірге шеберлік сыныптарын, хакатондар мен технологиялық воркшоптарды ұйымдастырамыз.',
    },
    socials: [
      { platform: 'instagram', url: 'https://www.instagram.com/thelab22stem' },
      { platform: 'facebook', url: 'https://www.facebook.com/TheLab22STEM/' },
      { platform: 'youtube', url: 'https://www.youtube.com/@thelab22' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@thelab22stem' },
      { platform: 'x', url: 'https://x.com/TheLab22STEM' },
      { platform: 'linkedin', url: 'https://www.linkedin.com/company/the-lab22/' },
    ],
  },
  {
    id: 'byteall-energy',
    name: {
      ru: 'Byteall Energy',
      en: 'Byteall Energy',
      kk: 'Byteall Energy',
    },
    logo: '/partners/byteall-energy.png',
    website: 'https://www.byteallenergy.com/',
    description: {
      ru: 'Технологическая компания, специализирующаяся на энергетических и IT-решениях. Партнёрство направлено на внедрение цифровых технологий в образовательный процесс и развитие технических навыков учеников.',
      en: 'A technology company specializing in energy and IT solutions. Our partnership focuses on integrating digital technologies into education and developing students\' technical skills.',
      kk: 'Энергетикалық және IT шешімдеріне маманданған технологиялық компания. Серіктестігіміз білім беру процесіне цифрлық технологияларды енгізуге және оқушылардың техникалық дағдыларын дамытуға бағытталған.',
    },
    socials: [
      { platform: 'linkedin', url: 'https://www.linkedin.com/company/byteallenergy/' },
    ],
  },
];

const socialIcons: Record<string, LucideIcon | (({ className }: { className?: string }) => React.JSX.Element)> = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  x: XIcon,
  tiktok: TikTokIcon,
};

const accentColors = [
  { bg: 'from-secondary to-secondary-800', border: 'border-secondary/20', hover: 'hover:border-secondary/40', accent: 'bg-secondary' },
  { bg: 'from-blue-600 to-blue-800', border: 'border-blue-200', hover: 'hover:border-blue-400', accent: 'bg-blue-600' },
  { bg: 'from-violet-600 to-violet-800', border: 'border-violet-200', hover: 'hover:border-violet-400', accent: 'bg-violet-600' },
  { bg: 'from-amber-600 to-amber-800', border: 'border-amber-200', hover: 'hover:border-amber-400', accent: 'bg-amber-600' },
];

export async function PartnersPageSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, string>>).partners;

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[50vh] md:min-h-[65vh] flex items-end overflow-hidden bg-gradient-to-br from-secondary via-secondary-800 to-secondary-900">
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
                {t.heroLabel}
              </span>
            </span>
            <h1 className="text-[2.5rem] md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-4">
              {t.title}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </ScrollReveal>

          {/* Partner count badge */}
          <ScrollReveal delay={0.3}>
            <div className="mt-8 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2.5">
              <Handshake className="h-5 w-5 text-primary" />
              <span className="text-white/90 text-sm font-medium">
                <span className="text-primary font-bold text-lg mr-1">{partners.length}</span>
                {t.ourPartners?.toLowerCase() || 'partners'}
              </span>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
      </section>

      {/* ===== INTRO ===== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-white via-gray-50/50 to-secondary/[0.02]">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-[2px] bg-primary mx-auto mb-6" />
              <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                {t.intro}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PARTNER LOGO STRIP ===== */}
      <section className="py-10 md:py-14 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto items-center">
              {partners.map((partner) => (
                <a
                  key={partner.id}
                  href={`#${partner.id}`}
                  className="flex items-center justify-center p-4 hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name[locale] || partner.name.en}
                    width={160}
                    height={80}
                    className="h-12 md:h-16 w-auto object-contain"
                  />
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== PARTNER DETAILS ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <ScrollReveal>
            <div className="text-center mb-14 md:mb-20">
              <span className="inline-flex items-center gap-2 text-secondary text-sm font-semibold uppercase tracking-widest mb-4">
                <span className="w-8 h-[2px] bg-primary rounded-full" />
                {t.ourPartners}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
                {t.ourPartners}
              </h2>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
            {partners.map((partner, index) => {
              const isReversed = index % 2 !== 0;
              const color = accentColors[index % accentColors.length];

              return (
                <ScrollReveal
                  key={partner.id}
                  direction={isReversed ? 'right' : 'left'}
                  delay={0.1}
                >
                  <div
                    id={partner.id}
                    className={`group relative grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden border ${color.border} ${color.hover} bg-white hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 scroll-mt-24`}
                  >
                    {/* Logo side */}
                    <div className={`lg:col-span-2 relative bg-gradient-to-br ${color.bg} p-8 md:p-12 flex items-center justify-center min-h-[200px] ${isReversed ? 'lg:order-2' : ''}`}>
                      {/* Decorative circles */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full" />
                      <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/[0.07] rounded-full" />

                      <Image
                        src={partner.logo}
                        alt={partner.name[locale] || partner.name.en}
                        width={320}
                        height={160}
                        className="max-h-28 md:max-h-36 w-auto object-contain relative z-10"
                      />
                    </div>

                    {/* Content side */}
                    <div className={`lg:col-span-3 p-8 md:p-10 lg:p-12 flex flex-col justify-center ${isReversed ? 'lg:order-1' : ''}`}>
                      {/* Top accent */}
                      <div className={`w-10 h-1 ${color.accent} rounded-full mb-5 opacity-60`} />

                      <h3 className="text-xl md:text-2xl font-bold text-secondary mb-3">
                        {partner.name[locale] || partner.name.en}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6 text-[15px]">
                        {partner.description[locale] || partner.description.en}
                      </p>

                      <div className="flex flex-wrap items-center gap-4">
                        {/* Website link */}
                        <a
                          href={partner.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-semibold transition-colors group/link"
                        >
                          {t.visitWebsite}
                          <ExternalLink className="h-3.5 w-3.5 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>

                        {/* Divider */}
                        <div className="w-px h-5 bg-gray-200" />

                        {/* Social links */}
                        <div className="flex items-center gap-1.5">
                          {partner.socials.map((social) => {
                            const SocialIcon = socialIcons[social.platform];
                            if (!SocialIcon) return null;
                            return (
                              <a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-8 h-8 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/10 flex items-center justify-center text-gray-400 hover:text-primary transition-all duration-200"
                              >
                                <SocialIcon className="h-3.5 w-3.5" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== COLLABORATION CTA ===== */}
      <section className="relative py-16 md:py-20 bg-secondary overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <Handshake className="h-10 w-10 mx-auto mb-5 text-white/80" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.ctaTitle}
              </h2>
              <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
                {t.ctaSubtitle}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-600 text-primary-foreground font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t.ctaContact}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SUB-NAVIGATION STRIP ===== */}
      <section className="border-y border-gray-200 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-6 py-4 overflow-x-auto">
            <span className="text-secondary font-bold italic text-lg whitespace-nowrap">
              {(translations.navigation as unknown as Record<string, string>).about}
            </span>
            <div className="w-px h-6 bg-gray-300" />
            <Link href="/about" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
              {(translations.navigation as unknown as Record<string, string>).about}
            </Link>
            <Link href="/staff" className="text-sm text-gray-500 hover:text-secondary transition-colors whitespace-nowrap">
              {(translations.navigation as unknown as Record<string, string>).staff}
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
                {t.ctaTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  href="/application"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold">{t.ctaAdmissions}</span>
                  <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/about"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold">{t.ctaVisit}</span>
                  <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
                <Link
                  href="/contact"
                  className="group flex items-center justify-between border border-secondary/15 hover:border-primary bg-white hover:bg-primary/5 px-6 py-5 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <span className="text-secondary font-semibold">{t.ctaContact}</span>
                  <ArrowRight className="h-5 w-5 text-secondary group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
