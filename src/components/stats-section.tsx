import { Users, Globe, BookOpen, Award } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function StatsSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const stats = [
    {
      icon: Users,
      value: "150+",
      label: translations.stats.students,
      description: "Активно обучающихся в нашей школе"
    },
    {
      icon: BookOpen,
      value: "1:8",
      label: translations.stats.teachers,
      description: "Оптимальное соотношение учитель/ученик"
    },
    {
      icon: Award,
      value: "5+",
      label: translations.stats.years,
      description: "Успешной работы в сфере образования"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.stats.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.stats.subtitle}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <IconComponent className="h-10 w-10 text-primary" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-600 text-sm">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}