import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { getReviews } from '@/lib/api/actions';
import { ReviewFormDialog } from './review-form-dialog';

export async function TestimonialsSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const result = await getReviews();
  const testimonials = result.success && result.data ? result.data : [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

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
        {testimonials.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {locale === 'en' ? 'No reviews yet. Be the first to share your experience!' : 
               locale === 'kk' ? 'Әзірге пікірлер жоқ. Тәжірибеңізбен бірінші болып бөлісіңіз!' : 
               'Пока нет отзывов. Будьте первым, кто поделится своим опытом!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-4">
                    <Quote className="h-8 w-8 text-primary/30" />
                  </div>

                  {/* Rating */}
                  {testimonial.rating && (
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-center mb-6 leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author Info */}
                  <div className="text-center">
                    {testimonial.name && (
                      <h4 className="font-semibold text-secondary mb-1">
                        {testimonial.name}
                      </h4>
                    )}
                    <p className="text-xs text-gray-500">
                      {formatDate(testimonial.created_at)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-secondary mb-4">
            {translations.testimonials.ctaTitle}
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            {translations.testimonials.ctaSubtitle}
          </p>
          <ReviewFormDialog 
            buttonText={translations.testimonials.shareButton}
            locale={locale}
          />
        </div>
      </div>
    </section>
  );
}
