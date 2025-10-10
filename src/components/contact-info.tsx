import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function ContactInfo() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const contactInfo = [
    {
      icon: MapPin,
      title: translations.contact.info.address,
      details: translations.contact.details.address,
      description: translations.contact.details.city
    },
    {
      icon: Phone,
      title: translations.contact.info.phone,
      details: translations.contact.details.phoneNumber,
      description: translations.contact.details.phoneHours
    },
    {
      icon: Mail,
      title: translations.contact.info.email,
      details: translations.contact.details.emailAddress,
      description: translations.contact.details.emailResponse
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
                    <p className="text-gray-600 text-sm">
                      {info.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}