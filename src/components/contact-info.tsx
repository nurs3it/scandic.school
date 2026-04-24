import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';
import type { LucideIcon } from "lucide-react";

interface ContactCard {
  icon: LucideIcon;
  title: string;
  details: string;
  description: string;
  action?: {
    href: string;
    label: string;
    external?: boolean;
  };
}

export async function ContactInfo() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  const phoneRaw = translations.contact.details.phoneNumber.replace(/\s/g, '');

  const contactInfo: ContactCard[] = [
    {
      icon: MapPin,
      title: translations.contact.info.address,
      details: translations.contact.details.address,
      description: translations.contact.details.city,
      action: {
        href: 'https://2gis.kz/uralsk/search/Scandic%20School',
        label: locale === 'kk' ? '2GIS картасында' : locale === 'en' ? 'Open in 2GIS' : 'Открыть в 2GIS',
        external: true,
      },
    },
    {
      icon: Phone,
      title: translations.contact.info.phone,
      details: translations.contact.details.phoneNumber,
      description: translations.contact.details.phoneHours,
      action: {
        href: `tel:${phoneRaw}`,
        label: locale === 'kk' ? 'Қоңырау шалу' : locale === 'en' ? 'Call' : 'Позвонить',
      },
    },
    {
      icon: Mail,
      title: translations.contact.info.email,
      details: translations.contact.details.emailAddress,
      description: translations.contact.details.emailResponse,
      action: {
        href: `mailto:${translations.contact.details.emailAddress}`,
        label: locale === 'kk' ? 'Хат жазу' : locale === 'en' ? 'Write' : 'Написать',
      },
    },
    {
      icon: Clock,
      title: translations.contact.info.hours,
      details: translations.contact.details.workingHours,
      description: translations.contact.details.saturdayHours
    }
  ];

  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
        {translations.contact.title}
      </h2>
      <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
        {translations.contact.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contactInfo.map((info, index) => {
          const IconComponent = info.icon;
          return (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
              <CardContent className="p-8 text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h3>
                    <p className="text-primary font-medium mb-1">
                      {info.details}
                    </p>
                    {info.description && (
                      <p className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    )}
                  </div>
                  {info.action && (
                    <a
                      href={info.action.href}
                      {...(info.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors"
                    >
                      {info.action.label}
                      {info.action.external && <ExternalLink className="h-3.5 w-3.5" />}
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}