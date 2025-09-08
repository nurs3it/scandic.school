"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, BookOpen, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Heart,
    title: "Уважение",
    description: "Воспитываем уважение к себе, другим и окружающему миру",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Target,
    title: "Совершенство",
    description: "Стремимся предоставлять высочайший уровень образования",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    title: "Сообщество",
    description: "Создаем атмосферу заботы и взаимопонимания",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
  {
    icon: BookOpen,
    title: "Знания и навыки",
    description: "Развиваем креативность и уверенность в себе",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Globe,
    title: "Международность",
    description: "Подготовка к жизни в глобальном мире",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Обеспечиваем безопасную образовательную среду",
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Наши ценности
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            В центре всех наших усилий стоит стремление к успеху. 
            Мы предоставляем не только знания, но и навыки, необходимые для успешного развития в современном мире.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-2 border-0 shadow-md"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
