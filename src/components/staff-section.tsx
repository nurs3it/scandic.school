import {Card, CardContent} from "@/components/ui/card";
import {getLocale, getTranslations} from '@/lib/server-locale';
import {getTeachers} from '@/lib/api/actions';
import Image from 'next/image';
import {TeacherNoImg} from "@/components/teacher-no-img";

export async function StaffSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  const result = await getTeachers();
  const staff = result.success && result.data ? result.data : [];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {staff.map((member) => {
              return (
                <Card key={member.id}
                      className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-0">
                    <div className="text-center">
                      {/* Photo or Icon */}
                      <div className="h-[340px] mt-[-24px]">
                        {member.photo_url ? (
                          <div className="h-[340px] w-full">
                            <Image
                              src={member.photo_url}
                              alt={member.name}
                              width={96}
                              height={200}
                              draggable={false}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                        ) : (
                          <div className="h-[340px] flex justify-center items-center w-full">
                            <TeacherNoImg/>
                          </div>
                        )}
                      </div>

                      <div className="px-4">
                        {/* Name and Subject */}
                        <h3 className="text-xl font-bold text-secondary text-left mb-2 mt-4">
                          {member.name}
                        </h3>

                        {member.subject && (
                          <p className="text-primary text-left font-semibold mb-4">
                            {member.subject}
                          </p>
                        )}

                        {/* Bio */}
                        {member.bio && (
                          <div className="mb-4">
                            <p className="text-sm text-left text-gray-700 leading-relaxed">{member.bio}</p>
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
          <button
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-colors duration-300">
            {translations.staff.applyButton}
          </button>
        </div>
      </div>
    </section>
  );
}
