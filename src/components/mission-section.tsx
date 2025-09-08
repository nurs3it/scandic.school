"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Globe, BookOpen, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Уважение",
    description: "Уважение является основной ценностью в нашей школе. Мы воспитываем уважение к себе, к другим и к окружающему миру.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Target,
    title: "Совершенство",
    description: "Мы стремимся предоставлять высочайший уровень образования для наших учеников, следуя эффективным методикам обучения.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Мы создали атмосферу заботы и взаимопонимания, где каждый ученик может чувствовать себя частью большой и дружной семьи.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: BookOpen,
    title: "Знания и навыки",
    description: "Мы предоставляем не только знания, но и навыки, необходимые для успешного развития в современном мире.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Globe,
    title: "Международность",
    description: "Подготовка детей к жизни в глобальном мире с пониманием разных культур и традиций.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Обеспечиваем безопасную образовательную среду, где каждый ребенок может развиваться и учиться.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];

export function MissionSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Миссия нашей школы
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
              <span className="text-primary font-semibold">Предоставить высочайший уровень образования</span> для детей разных стран, 
              национальностей и культурных традиций.
            </p>
            <p className="text-lg text-gray-600">
              А знаете ли вы наши ценности?
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value) => (
            <Card 
              key={value.title} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg"
            >
              <CardContent className="p-8">
                <div className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <value.icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-secondary to-secondary-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Присоединяйтесь к нашей школе!
            </h3>
            <p className="text-lg text-gray-200 mb-6">
              В центре всех наших усилий стоит стремление к успеху. 
              Мы предоставляем не только знания, но и навыки, необходимые для успешного развития в современном мире.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/application"
                className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
              >
                Подать заявку
              </a>
              <a 
                href="/contact"
                className="border border-white text-white hover:bg-white hover:text-secondary font-semibold px-8 py-4 rounded-lg transition-colors inline-block"
              >
                Связаться с нами
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
