"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, Instagram, Globe } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Адрес",
    details: "ул. Кайрата Жумагалиева 18, 3 этаж",
    description: "Алматы, Казахстан"
  },
  {
    icon: Phone,
    title: "Телефон",
    details: "8 706 610 57 81",
    description: "Пн-Пт: 9:00 - 18:00"
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@scandic.school",
    description: "Ответим в течение 24 часов"
  },
  {
    icon: Instagram,
    title: "Instagram",
    details: "@scandic.school",
    description: "Следите за нашими новостями",
    link: "https://www.instagram.com/scandic.school/"
  },
  {
    icon: Clock,
    title: "Часы работы",
    details: "Пн-Пт: 8:00 - 18:00",
    description: "Сб: 9:00 - 15:00"
  },
  {
    icon: Globe,
    title: "Лицензия",
    details: "KZ96LAA00035527",
    description: "0–4 классы | IB PYP"
  }
];

export function ContactInfo() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-secondary mb-4">
          Контактная информация
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Мы всегда рады ответить на ваши вопросы и помочь с поступлением в нашу школу
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => (
          <Card 
            key={info.title}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
          >
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <info.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-secondary mb-2">
                {info.title}
              </h3>
              {info.link ? (
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 font-medium block mb-1"
                >
                  {info.details}
                </a>
              ) : (
                <p className="text-primary font-medium mb-1">
                  {info.details}
                </p>
              )}
              <p className="text-sm text-gray-600">
                {info.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Map Placeholder */}
      <div className="mt-12">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">Карта будет добавлена позже</p>
                <p className="text-sm text-gray-500">ул. Кайрата Жумагалиева 18, 3 этаж</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
