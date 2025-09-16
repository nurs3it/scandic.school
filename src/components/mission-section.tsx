import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Globe, BookOpen, Shield } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function MissionSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const values = [
    {
      icon: Heart,
      title: translations.mission.values.excellence,
      description: "Мы стремимся предоставлять высочайший уровень образования для наших учеников, следуя эффективным методикам обучения.",
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      icon: Target,
      title: translations.mission.values.diversity,
      description: "Мы создаем инклюзивную среду, где каждый ребенок чувствует себя принятым и ценным, независимо от своего происхождения.",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: Users,
      title: translations.mission.values.innovation,
      description: "Мы используем современные технологии и инновационные методы обучения, чтобы сделать образование более эффективным и интересным.",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Globe,
      title: translations.mission.values.community,
      description: "Мы строим сильное сообщество, где родители, учителя и ученики работают вместе для достижения общих целей.",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.mission.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
            {translations.mission.subtitle}
          </p>
          <p className="text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed">
            {translations.mission.description}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                <CardContent className="p-8">
                  <div className="space-y-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${value.color}`} />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>

                    {/* Gradient Line */}
                    <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${value.color.replace('text-', 'from-')} to-${value.color.replace('text-', '')}-600 transition-all duration-500 rounded-full`}></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}