import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function CTASection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-600">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            {translations.cta.title}
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto">
            {translations.cta.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-5 text-lg shadow-lg hover:shadow-xl transition-all duration-200">
              <Link href="/application" className="flex items-center space-x-2">
                <span>{translations.cta.apply}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-primary-foreground/70 text-primary-foreground hover:bg-secondary hover:text-secondary-foreground px-10 py-5 text-lg font-medium">
              <Link href="/contact">{translations.cta.contact}</Link>
            </Button>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-3 text-primary-foreground">
              <Phone className="h-5 w-5" />
              <span className="text-lg font-medium">{translations.header.phone}</span>
            </div>
            <div className="flex items-center justify-center space-x-3 text-primary-foreground">
              <Mail className="h-5 w-5" />
              <a
                href={`mailto:${translations.contact.details.emailAddress}`}
                className="text-lg font-medium underline-offset-4 hover:underline"
              >
                {translations.contact.details.emailAddress}
              </a>
            </div>
          </div>

          {/* License Info */}
          <div className="mt-8 text-center">
            <p className="text-primary-foreground/80 text-sm">
              {('licenseInfo' in translations.cta ? (translations.cta as Record<string, string>).licenseInfo : null) || "License: KZ96LAA00035527 | Grades 0-11 | IB PYP"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
