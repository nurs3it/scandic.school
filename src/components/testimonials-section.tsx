import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function TestimonialsSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const testimonials = [
    {
      name: "Елена Смирнова",
      child: "Анна, 2 класс",
      text: "Scandic School превзошла все наши ожидания. Анна с радостью идет в школу каждый день. Учителя очень внимательные и профессиональные. Программа IB PYP помогает развивать критическое мышление и творческие способности.",
      rating: 5,
      date: "2024"
    },
    {
      name: "Ахмет Касымов",
      child: "Данияр, 1 класс",
      text: "Мы очень довольны выбором школы. Данияр за год значительно улучшил свои знания английского языка. Многонациональная среда помогает детям развивать толерантность и понимание разных культур.",
      rating: 5,
      date: "2024"
    },
    {
      name: "Sarah Johnson",
      child: "Emma, Grade 0",
      text: "As an expat family, we were looking for a school that would provide our daughter with quality international education. Scandic School has exceeded our expectations. The teachers are highly qualified and the IB PYP program is excellent.",
      rating: 5,
      date: "2024"
    },
    {
      name: "Мария Петрова",
      child: "Иван, 3 класс",
      text: "Школа создает прекрасную атмосферу для обучения. Иван стал более уверенным в себе и любознательным. Учителя находят индивидуальный подход к каждому ребенку. Рекомендую всем родителям!",
      rating: 5,
      date: "2023"
    },
    {
      name: "Айгуль Нурланова",
      child: "Амина, 1 класс",
      text: "Очень благодарны школе за качественное образование. Амина с удовольствием изучает новые предметы и активно участвует в школьной жизни. Программа развития личности помогает формировать правильные ценности.",
      rating: 5,
      date: "2024"
    },
    {
      name: "David Brown",
      child: "Oliver, Grade 2",
      text: "The school provides excellent preparation for international education. Oliver has developed strong critical thinking skills and is confident in English. The multicultural environment is perfect for our family's needs.",
      rating: 5,
      date: "2023"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.testimonials.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.testimonials.subtitle}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <Quote className="h-8 w-8 text-primary/30" />
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-700 text-center mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author Info */}
                <div className="text-center">
                  <h4 className="font-semibold text-secondary mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {translations.testimonials.parentOf} {testimonial.child}
                  </p>
                  <p className="text-xs text-gray-500">
                    {testimonial.date}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            {translations.testimonials.ctaTitle}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {translations.testimonials.ctaSubtitle}
          </p>
          <button className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
            {translations.testimonials.shareButton}
          </button>
        </div>
      </div>
    </section>
  );
}
