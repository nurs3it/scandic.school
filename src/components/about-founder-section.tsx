import Image from 'next/image';
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function AboutFounderSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
  const t = translations.founder;

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
            {/* Photo — left column */}
            <div className="relative">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/founder.jpeg"
                  alt={t.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Text — right column */}
            <div className="flex flex-col justify-center">
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                {t.quote1}
              </p>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                {t.quote2}
              </p>

              {/* Attribution */}
              <div className="border-t border-gray-200 pt-6">
                <p className="font-bold text-secondary text-lg">
                  {t.name}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {t.signatureRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
