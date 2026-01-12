import { getLocale, getTranslations } from '@/lib/server-locale';
import { ClientHeader } from './client-header';

export async function Header() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);

  return <ClientHeader translations={translations} />;
}