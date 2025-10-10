import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Heart, Award, Globe, LucideIcon } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { getTeachers } from '@/lib/api/actions';
import Image from 'next/image';

const getIconForIndex = (index: number): LucideIcon => {
  const icons = [Award, GraduationCap, BookOpen, Globe, Heart, Users];
  return icons[index % icons.length];
};

const getColorForIndex = (index: number) => {
  const colors = [
    { text: "text-blue-500", bg: "bg-blue-50" },
    { text: "text-green-500", bg: "bg-green-50" },
    { text: "text-purple-500", bg: "bg-purple-50" },
    { text: "text-orange-500", bg: "bg-orange-50" },
    { text: "text-red-500", bg: "bg-red-50" },
    { text: "text-indigo-500", bg: "bg-indigo-50" },
  ];
  return colors[index % colors.length];
};

export async function StaffSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const result = await getTeachers();
  const staff = result.success && result.data ? result.data : [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.staff.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {translations.staff.subtitle}
          </p>
        </div>

        {/* Staff Grid */}
        {staff.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {locale === 'en' ? 'No teachers found' : locale === 'kk' ? 'Мұғалімдер табылмады' : 'Преподаватели не найдены'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staff.map((member, index) => {
              const IconComponent = getIconForIndex(index);
              const colors = getColorForIndex(index);
              return (
                <Card key={member.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                  <CardContent className="p-8">
                    <div className="text-center">
                      {/* Photo or Icon */}
                      {member.photo_url ? (
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Image 
                            src={member.photo_url} 
                            alt={member.name}
                            width={96}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className={`w-16 h-16 ${colors.bg} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`h-8 w-8 ${colors.text}`} />
                        </div>
                      )}

                      {/* Name and Subject */}
                      <h3 className="text-xl font-bold text-secondary mb-2">
                        {member.name}
                      </h3>
                      {member.subject && (
                        <p className="text-primary font-semibold mb-4">
                          {member.subject}
                        </p>
                      )}

                      {/* Bio */}
                      {member.bio && (
                        <div className="mb-4">
                          <p className="text-sm text-gray-700 leading-relaxed">{member.bio}</p>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="mt-4 space-y-2">
                        {member.email && (
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Email:</span> {member.email}
                          </p>
                        )}
                        {member.phone && (
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">
                              {locale === 'en' ? 'Phone' : locale === 'kk' ? 'Телефон' : 'Телефон'}:
                            </span> {member.phone}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            {translations.staff.cta}
          </p>
          <button className="bg-primary hover:bg-primary/90 text-secondary font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
            {translations.staff.applyButton}
          </button>
        </div>
      </div>
    </section>
  );
}
