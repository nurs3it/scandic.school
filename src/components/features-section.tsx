import { getLocale, getTranslations } from '@/lib/server-locale';
import { FeaturesBentoGrid } from './features-bento-grid';

export async function FeaturesSection() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  const features = [
    {
      title: translations.features.items.respect.title,
      description: translations.features.items.respect.description,
      icon: 'heart' as const,
    },
    {
      title: translations.features.items.excellence.title,
      description: translations.features.items.excellence.description,
      icon: 'target' as const,
    },
    {
      title: translations.features.items.community.title,
      description: translations.features.items.community.description,
      icon: 'users' as const,
    },
    {
      title: translations.features.items.knowledge.title,
      description: translations.features.items.knowledge.description,
      icon: 'lightbulb' as const,
    },
    {
      title: translations.features.items.international.title,
      description: translations.features.items.international.description,
      icon: 'globe' as const,
    },
    {
      title: translations.features.items.safety.title,
      description: translations.features.items.safety.description,
      icon: 'shield' as const,
    },
  ];

  return (
    <FeaturesBentoGrid
      features={features}
      sectionTitle={translations.features.title}
      sectionSubtitle={translations.features.subtitle}
    />
  );
}
