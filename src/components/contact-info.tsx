import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';
import type { LucideIcon } from "lucide-react";
import { ScrollReveal } from '@/components/scroll-reveal';

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

  const cardAccents = [
    'from-blue-500 to-blue-600',
    'from-emerald-500 to-emerald-600',
    'from-violet-500 to-violet-600',
    'from-amber-500 to-amber-600',
  ];

  return (
    <div className="mb-16">
      <ScrollReveal>
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-primary rounded-full" />
            <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
              {translations.contact.title}
            </span>
          </span>
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.contact.title}
          </h2>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {contactInfo.map((info, index) => {
          const IconComponent = info.icon;
          return (
            <ScrollReveal key={index} delay={index * 0.1}>
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white shadow-md hover:-translate-y-1 overflow-hidden h-full">
                <div className={`h-1 bg-gradient-to-r ${cardAccents[index % cardAccents.length]}`} />
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${cardAccents[index % cardAccents.length]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {info.title}
                      </h3>
                      <p className="text-primary font-semibold mb-1">
                        {info.details}
                      </p>
                      {info.description && (
                        <p className="text-gray-500 text-sm">
                          {info.description}
                        </p>
                      )}
                    </div>
                    {info.action && (
                      <a
                        href={info.action.href}
                        {...(info.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-primary transition-colors cursor-pointer"
                      >
                        {info.action.label}
                        {info.action.external && <ExternalLink className="h-3.5 w-3.5" />}
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}