"use client";

import { Users, Globe, BookOpen, Award } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "150+",
    label: "Учеников",
    description: "Активно обучающихся в нашей школе"
  },
  {
    icon: Globe,
    value: "25+",
    label: "Национальностей",
    description: "Разнообразная многонациональная среда"
  },
  {
    icon: BookOpen,
    value: "1:8",
    label: "Соотношение учитель/ученик",
    description: "Индивидуальный подход к каждому ребенку"
  },
  {
    icon: Award,
    value: "IB PYP",
    label: "Международная программа",
    description: "Признанная во всем мире система образования"
  }
];

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">
            Scandic International School в цифрах
          </h2>
          <p className="text-xl text-secondary/90 max-w-3xl mx-auto">
            Мы гордимся нашими достижениями и постоянно работаем над улучшением качества образования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-white mb-2">
                  {stat.label}
                </div>
                <div className="text-sm text-white/80">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              Лицензия и аккредитация
            </h3>
            <p className="text-white/90 text-lg mb-4">
              Лицензия: KZ96LAA00035527
            </p>
            <p className="text-white/80">
              Программы: 0–4 классы | IB PYP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
