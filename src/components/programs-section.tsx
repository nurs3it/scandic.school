import { getLocale, getTranslations } from '@/lib/server-locale';
import { ProgramsCards, type ProgramCardData } from '@/components/programs-cards';

export async function ProgramsSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  const getProgramData = (key: string) => {
    const programs = translations.programs as unknown as Record<string, unknown>;
    if (key in programs && typeof programs[key] === 'object' && programs[key] !== null) {
      const program = programs[key] as Record<string, unknown>;
      return {
        title: (program.title as string) || '',
        subtitle: (program.subtitle as string) || '',
        description: (program.description as string) || '',
        features: (program.features as string[]) || [],
      };
    }
    return null;
  };

  const earlyYears = translations.programs.earlyYears as unknown as Record<string, unknown>;
  const primary = translations.programs.primary as unknown as Record<string, unknown>;

  const ibLabel =
    'ibCandidate' in translations.hero.features
      ? (translations.hero.features as Record<string, string>).ibCandidate
      : undefined;

  const buttonText = translations.navigation.application;

  const programs: ProgramCardData[] = [
    {
      title: translations.programs.earlyYears.title,
      subtitle: (earlyYears.subtitle as string) || '',
      description: translations.programs.earlyYears.description,
      features: (earlyYears.features as string[]) || [],
      iconName: 'Users',
      colorScheme: 'blue',
      buttonText,
      applicationUrl: `/application?grade=0&program=earlyYears&programTitle=${encodeURIComponent(translations.programs.earlyYears.title)}`,
    },
    {
      title: translations.programs.primary.title,
      subtitle: (primary.subtitle as string) || '',
      description: translations.programs.primary.description,
      features: (primary.features as string[]) || [],
      iconName: 'BookOpen',
      colorScheme: 'green',
      buttonText,
      applicationUrl: `/application?program=primary&programTitle=${encodeURIComponent(translations.programs.primary.title)}`,
      badge: ibLabel,
    },
    ...(getProgramData('ibpyp')
      ? [
          {
            ...getProgramData('ibpyp')!,
            iconName: 'Globe' as const,
            colorScheme: 'purple' as const,
            buttonText,
            applicationUrl: `/application?program=ibpyp&programTitle=${encodeURIComponent(getProgramData('ibpyp')!.title)}`,
          },
        ]
      : []),
    ...(getProgramData('english')
      ? [
          {
            ...getProgramData('english')!,
            iconName: 'Star' as const,
            colorScheme: 'amber' as const,
            buttonText,
            applicationUrl: `/application?program=english&programTitle=${encodeURIComponent(getProgramData('english')!.title)}`,
          },
        ]
      : []),
  ];

  const ibNote =
    'ibCandidateNote' in translations.programs
      ? ((translations.programs as Record<string, unknown>).ibCandidateNote as string)
      : undefined;

  return (
    <section id="programs" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.programs.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.programs.subtitle}
          </p>
        </div>

        <ProgramsCards programs={programs} ibNote={ibNote} />
      </div>
    </section>
  );
}
