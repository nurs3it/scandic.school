import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, Globe, Star } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function ProgramsSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  // Helper function to safely get program data
  const getProgramData = (key: string) => {
    const programs = translations.programs as unknown as Record<string, unknown>;
    if (key in programs && typeof programs[key] === 'object' && programs[key] !== null) {
      const program = programs[key] as Record<string, unknown>;
      return {
        title: (program.title as string) || '',
        subtitle: (program.subtitle as string) || '',
        description: (program.description as string) || '',
        features: (program.features as string[]) || []
      };
    }
    return null;
  };

  const earlyYears = translations.programs.earlyYears as unknown as Record<string, unknown>;
  const primary = translations.programs.primary as unknown as Record<string, unknown>;

  const programs = [
    {
      title: translations.programs.earlyYears.title,
      subtitle: (earlyYears.subtitle as string) || '',
      description: translations.programs.earlyYears.description,
      features: (earlyYears.features as string[]) || [],
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      buttonText: translations.navigation.application
    },
    {
      title: translations.programs.primary.title,
      subtitle: (primary.subtitle as string) || '',
      description: translations.programs.primary.description,
      features: (primary.features as string[]) || [],
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-50",
      buttonText: translations.navigation.application
    },
    ...(getProgramData('ibpyp') ? [{
      ...getProgramData('ibpyp')!,
      icon: Globe,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      buttonText: translations.navigation.application
    }] : []),
    ...(getProgramData('english') ? [{
      ...getProgramData('english')!,
      icon: Star,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      buttonText: translations.navigation.application
    }] : [])
  ];

  return (
    <section id="programs" className="py-20 bg-white scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.programs.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.programs.subtitle}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((program, index) => {
            const IconComponent = program.icon;
            const isIBProgram = program.title === translations.programs.primary.title;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`w-12 h-12 ${program.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-6 w-6 ${program.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {program.title}
                      </CardTitle>
                      <p className="text-sm text-gray-500">{program.subtitle}</p>
                      {isIBProgram && 'ibCandidate' in translations.hero.features && (
                        <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded-md bg-yellow-100 border border-yellow-300">
                          <span className="text-xs text-yellow-800 font-medium">{(translations.hero.features as Record<string, string>).ibCandidate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Язык:</span> {program.language}
                  </div> */}
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {program.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {program.features.map((feature: string, featureIndex: number) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/application">{program.buttonText}</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* IB Candidate Note */}
        {'ibCandidateNote' in translations.programs && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg">
              <p className="text-sm text-gray-700 leading-relaxed">
                {(translations.programs as Record<string, unknown>).ibCandidateNote as string}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}