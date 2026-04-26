import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from '@/lib/server-locale';
import { CameraIcon } from '@/components/icons/community-icons';
import { ScrollReveal } from '@/components/scroll-reveal';
import { ParticleBackground } from '@/components/particle-background';
import { CommunityStoryScroll, type StoryChapter, type StoryFinale } from '@/components/community-story-scroll';

function splitBullets(description: string): string[] {
  return description
    .split(/[,،;]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

export async function CommunityPageContent() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = (translations as unknown as Record<string, Record<string, unknown>>).community;
  const nav = translations.navigation as unknown as Record<string, string>;

  const teachers = t.teachers as Record<string, string>;
  const children = t.children as Record<string, string>;
  const parents = t.parents as Record<string, string>;
  const finaleData = (t.finale as Record<string, string>) ?? {};
  const chapterEyebrow = (t.chapterEyebrow as string) ?? (locale === 'en' ? 'Chapter' : locale === 'kk' ? 'Тарау' : 'Глава');
  const storyTitle = (t.storyTitle as string) ?? (locale === 'en' ? 'Story of one community' : locale === 'kk' ? 'Бір қоғамдастық тарихы' : 'История одного сообщества');

  const chapters: StoryChapter[] = [
    {
      id: 'teachers',
      number: '01',
      eyebrow: chapterEyebrow,
      title: teachers.title,
      description: teachers.description,
      bullets: splitBullets(teachers.description),
    },
    {
      id: 'children',
      number: '02',
      eyebrow: chapterEyebrow,
      title: children.title,
      description: children.description,
      bullets: splitBullets(children.description),
    },
    {
      id: 'parents',
      number: '03',
      eyebrow: chapterEyebrow,
      title: parents.title,
      description: parents.description,
      bullets: splitBullets(parents.description),
    },
  ];

  const finale: StoryFinale = {
    label: finaleData.label ?? (locale === 'en' ? 'Trinity' : locale === 'kk' ? 'Үштұтас' : 'Триединство'),
    title: finaleData.title ?? (locale === 'en' ? 'One process — three voices' : locale === 'kk' ? 'Бір процесс — үш дауыс' : 'Один процесс — три голоса'),
    subtitle: finaleData.subtitle ?? (locale === 'en' ? 'When teachers, children, and parents move together, trust is born' : locale === 'kk' ? 'Мұғалімдер, балалар және ата-аналар бірге қозғалғанда, сенім туады' : 'Когда учителя, дети и родители движутся вместе, рождается доверие'),
    teachersLabel: teachers.title,
    childrenLabel: children.title,
    parentsLabel: parents.title,
  };

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

      {/* ===== THREE PILLARS — STORY SCROLL ===== */}
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

      <CommunityStoryScroll chapters={chapters} finale={finale} storyTitle={storyTitle} />

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
                <div className="w-24 h-24 rounded-2xl bg-secondary/[0.08] flex items-center justify-center p-3">
                  <CameraIcon active={false} id="community-photo" />
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
