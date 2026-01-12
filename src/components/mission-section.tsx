import { getLocale, getTranslations } from '@/lib/server-locale';
import { Info } from 'lucide-react';

export async function MissionSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto space-y-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-secondary-800 bg-clip-text text-transparent">
              {translations.mission.title}
            </h2>
            <p className="text-xl text-gray-700 leading-relaxed whitespace-pre-line">
              {translations.mission.description}
            </p>
          </div>
          
          {/* IB Candidate Status Section */}
          {'ibStatus' in translations.mission && (() => {
            const mission = translations.mission as unknown as Record<string, unknown>;
            const ibStatus = mission.ibStatus as Record<string, string> | undefined;
            if (!ibStatus) return null;
            
            return (
              <div className="mt-12 bg-white rounded-lg shadow-md p-8 border-l-4 border-yellow-400">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Info className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {ibStatus.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {ibStatus.description}
                    </p>
                    {ibStatus.disclaimer && (
                      <p className="text-sm text-gray-600 leading-relaxed italic mt-4 pt-4 border-t border-gray-200">
                        {ibStatus.disclaimer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}