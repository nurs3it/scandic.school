import { getLocale, getTranslations } from '@/lib/server-locale';

export async function MissionSection() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
            {translations.mission.title}
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
            {translations.mission.description}
          </p>
        </div>
      </div>
    </section>
  );
}