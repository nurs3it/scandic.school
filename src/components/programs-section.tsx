"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, BookOpen, Users, Globe, Star } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    title: "Early Years",
    subtitle: "0-1 классы",
    language: "Казахский язык",
    description: "Программа раннего развития для детей 3-6 лет с акцентом на игровое обучение и развитие социальных навыков",
    features: [
      "Игровое обучение",
      "Развитие социальных навыков", 
      "Подготовка к школе",
      "Творческое развитие",
      "Многоязычная среда"
    ],
    color: "from-blue-500 to-blue-600",
    icon: BookOpen
  },
  {
    title: "Primary School",
    subtitle: "1-4 классы", 
    language: "Русский язык",
    description: "Начальная школа с международной программой IB PYP, развивающая критическое мышление и проектную деятельность",
    features: [
      "Международная программа IB PYP",
      "Изучение английского языка",
      "Развитие критического мышления",
      "Проектная деятельность",
      "Междисциплинарный подход"
    ],
    color: "from-primary to-primary-600",
    icon: Star
  }
];

export function ProgramsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Наши программы
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Образовательные программы, адаптированные под возрастные особенности детей 
            и направленные на всестороннее развитие личности
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programs.map((program) => (
            <Card 
              key={program.title}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
            >
              <CardHeader className={`bg-gradient-to-r ${program.color} text-white p-8`}>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <program.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">{program.title}</CardTitle>
                    <p className="text-white/90 text-lg">{program.subtitle}</p>
                    <p className="text-white/80 text-sm">{program.language}</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-8">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {program.description}
                </p>
                
                <div className="space-y-3 mb-8">
                  {program.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button asChild className="w-full bg-secondary hover:bg-secondary/90 text-white">
                  <Link href="/application">
                    Подать заявку
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-gradient-to-r from-secondary to-secondary-800 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Users className="h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">1:8</div>
              <div className="text-sm text-gray-300">Соотношение учитель/ученик</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Globe className="h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">25+</div>
              <div className="text-sm text-gray-300">Национальностей</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">IB PYP</div>
              <div className="text-sm text-gray-300">Международная программа</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
