import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function CTASection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-600">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            {translations.cta.title}
          </h2>
          <p className="text-xl text-secondary/90 mb-8 max-w-3xl mx-auto">
            {translations.cta.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-primary font-semibold px-8 py-4 text-lg glow-effect-lg">
              <Link href="/application" className="flex items-center space-x-2">
                <span>{translations.cta.apply}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-secondary text-secondary hover:bg-secondary hover:text-primary px-8 py-4 text-lg">
              <Link href="/contact">{translations.cta.contact}</Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-secondary">
              <Phone className="h-5 w-5" />
              <span className="text-lg font-medium">8 706 610 57 81</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-secondary">
              <Mail className="h-5 w-5" />
              <span className="text-lg font-medium">info@scandic.school</span>
            </div>
          </div>

          {/* License Info */}
          <div className="mt-8 text-center">
            <p className="text-secondary/80 text-sm">
              Лицензия: KZ96LAA00035527 | 0–4 классы | IB PYP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
