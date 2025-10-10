import { Metadata } from 'next';
import { getTranslations } from './server-locale';

export async function generateMetadata(locale: string, page: string): Promise<Metadata> {
  const translations = getTranslations(locale);
  
  switch (page) {
    case 'contact':
      return {
        title: translations.metadata?.contact?.title || "Contact | Scandic International School",
        description: translations.metadata?.contact?.description || "Contact us",
      };
    case 'about':
      return {
        title: translations.about?.metadata?.title || "About Us | Scandic International School",
        description: translations.about?.metadata?.description || "Learn more about our school",
      };
    case 'documents':
      return {
        title: translations.metadata?.documents?.title || "Documents | Scandic International School",
        description: translations.metadata?.documents?.description || "School documents and policies",
      };
    case 'testimonials':
      return {
        title: translations.metadata?.testimonials?.title || "Testimonials | Scandic International School",
        description: translations.metadata?.testimonials?.description || "Parent testimonials",
      };
    case 'staff':
      return {
        title: translations.metadata?.staff?.title || "Staff | Scandic International School",
        description: translations.metadata?.staff?.description || "Meet our team",
      };
    case 'application':
      return {
        title: translations.metadata?.application?.title || "Application | Scandic International School",
        description: translations.metadata?.application?.description || "Apply for admission",
      };
    default:
      return {
        title: "Scandic International School",
        description: "International education in Uralsk",
      };
  }
}

