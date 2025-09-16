import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'ru', 'kk'];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as 'en' | 'ru' | 'kk')) notFound();

  return {
    locale: locale as 'en' | 'ru' | 'kk',
    messages: (await import(`../../messages/${locale}.json`)).default as Record<string, unknown>
  };
});
