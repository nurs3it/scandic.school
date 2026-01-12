import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, Globe, Star } from "lucide-react";
import Link from "next/link";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function ProgramsSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const programs = [
    {
      title: translations.programs.earlyYears.title,
      subtitle: "0-1 классы",
      language: "Казахский язык",
      description: translations.programs.earlyYears.description,
      features: [
        "Игровое обучение",
        "Развитие социальных навыков", 
        "Подготовка к школе",
        "Творческое развитие",
        "Многоязычная среда"
      ],
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      buttonText: translations.navigation.application
    },
    {
      title: translations.programs.primary.title,
      subtitle: "1-4 классы",
      language: "Английский язык",
      description: translations.programs.primary.description,
      features: [
        "IB PYP программа",
        "Международные стандарты",
        "Исследовательское обучение",
        "Развитие критического мышления",
        "Подготовка к средней школе"
      ],
      icon: BookOpen,
      color: "text-green-500",
      bgColor: "bg-green-50",
      buttonText: translations.navigation.application
    },
    {
      title: translations.programs.ibpyp.title,
      subtitle: "Международная программа",
      language: "Английский язык",
      description: translations.programs.ibpyp.description,
      features: [
        "Международный бакалавриат",
        "Исследовательское обучение",
        "Развитие профиля учащегося",
        "Междисциплинарный подход",
        "Глобальная перспектива"
      ],
      icon: Globe,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      buttonText: translations.navigation.application
    },
    {
      title: translations.programs.english.title,
      subtitle: "Языковая программа",
      language: "Английский язык",
      description: translations.programs.english.description,
      features: [
        "Коммуникативный подход",
        "Развитие всех навыков",
        "Индивидуальный подход"
      ],
      icon: Star,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      buttonText: translations.navigation.application
    }
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
                    {program.features.map((feature, featureIndex) => (
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
      </div>
    </section>
  );
}