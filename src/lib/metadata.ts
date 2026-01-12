import { Metadata } from 'next';
import { getTranslations, Locale } from './server-locale';

export async function generateMetadata(locale: string, page: string): Promise<Metadata> {
  const translations = await getTranslations(locale as Locale);
  
  switch (page) {
    case 'contact':
      return {
        title: translations.contact?.title || "Contact | Scandic International School",
        description: translations.contact?.subtitle || "Contact us",
      };
    case 'about':
      return {
        title: "About Us | Scandic International School",
        description: "Learn more about our school",
      };
    case 'documents':
      return {
        title: translations.documentsPage?.title || "Documents | Scandic International School",
        description: translations.documentsPage?.subtitle || "School documents and policies",
      };
    case 'testimonials':
      return {
        title: translations.testimonials?.title || "Testimonials | Scandic International School",
        description: translations.testimonials?.subtitle || "Parent testimonials",
      };
    case 'staff':
      return {
        title: translations.staff?.title || "Staff | Scandic International School",
        description: translations.staff?.subtitle || "Meet our team",
      };
    case 'application':
      return {
        title: translations.application?.title || "Application | Scandic International School",
        description: translations.application?.subtitle || "Apply for admission",
      };
    case 'merch':
      const translationsRecord = translations as unknown as Record<string, unknown>;
      const metadata = translationsRecord.metadata as Record<string, Record<string, string>> | undefined;
      const merch = translationsRecord.merch as Record<string, string> | undefined;
      return {
        title: metadata?.merch?.title || merch?.title || "Merchandise | Scandic International School",
        description: metadata?.merch?.description || merch?.subtitle || "Official Scandic International School merchandise",
      };
    default:
      return {
        title: "Scandic International School",
        description: "International education in Uralsk",
      };
  }
}

