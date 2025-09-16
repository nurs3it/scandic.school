import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Heart, Award, Globe } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function StaffSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const staff = [
    {
      name: "Анна Петровна Иванова",
      position: "Директор школы",
      education: "Магистр педагогики, Кембриджский университет",
      experience: "15 лет опыта в международном образовании",
      languages: ["Английский", "Русский", "Французский"],
      icon: Award,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Майкл Джонсон",
      position: "Координатор IB PYP",
      education: "Магистр образования, Гарвардский университет",
      experience: "12 лет работы с программой IB PYP",
      languages: ["Английский", "Испанский"],
      icon: GraduationCap,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      name: "Айгуль Касымова",
      position: "Учитель начальных классов",
      education: "Бакалавр педагогики, КазНУ им. аль-Фараби",
      experience: "8 лет опыта преподавания",
      languages: ["Казахский", "Русский", "Английский"],
      icon: BookOpen,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      name: "Сара Уильямс",
      position: "Учитель английского языка",
      education: "Магистр лингвистики, Оксфордский университет",
      experience: "10 лет преподавания ESL",
      languages: ["Английский", "Немецкий"],
      icon: Globe,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      name: "Дмитрий Сергеевич Козлов",
      position: "Психолог школы",
      education: "Кандидат психологических наук, МГУ",
      experience: "12 лет работы с детьми",
      languages: ["Русский", "Английский"],
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      name: "Мария Гонсалес",
      position: "Координатор по внеклассной деятельности",
      education: "Магистр социальной работы, Сорбонна",
      experience: "7 лет организации детских программ",
      languages: ["Испанский", "Английский", "Французский"],
      icon: Users,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.staff.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.staff.subtitle}
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {staff.map((member, index) => {
            const IconComponent = member.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${member.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-8 w-8 ${member.color}`} />
                    </div>

                    {/* Name and Position */}
                    <h3 className="text-xl font-bold text-secondary mb-2">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold mb-4">
                      {member.position}
                    </p>

                    {/* Education */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 font-medium mb-1">{translations.staff.education}</p>
                      <p className="text-sm text-gray-700">{member.education}</p>
                    </div>

                    {/* Experience */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 font-medium mb-1">{translations.staff.experience}</p>
                      <p className="text-sm text-gray-700">{member.experience}</p>
                    </div>

                    {/* Languages */}
                    <div>
                      <p className="text-sm text-gray-600 font-medium mb-2">{translations.staff.languages}</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.languages.map((language, langIndex) => (
                          <span
                            key={langIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            {translations.staff.cta}
          </p>
          <button className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
            {translations.staff.applyButton}
          </button>
        </div>
      </div>
    </section>
  );
}
