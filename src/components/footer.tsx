import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function Footer() {
  const locale = await getLocale();
  const translations = getTranslations(locale);
  return (
    <footer className="bg-secondary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Image
                src="/logo.svg"
                alt="Scandic School Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">{translations.header.schoolName}</span>
            </div>
          <p className="text-sm text-gray-300">
            {translations.footer.description}
          </p>
          <p className="text-xs text-gray-400">
            {translations.footer.license}
          </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{translations.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  {translations.navigation.about}
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  {translations.programs.title}
                </Link>
              </li>
              <li>
                <Link href="/application" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  {translations.navigation.application}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-primary transition-colors">
                  {translations.navigation.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Programs</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">Early Years (0-1 классы)</li>
              <li className="text-sm text-gray-300">Primary School (1-4 классы)</li>
              <li className="text-sm text-gray-300">{translations.hero.features.ibProgram}</li>
              <li className="text-sm text-gray-300">English Language</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{translations.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">
                  {translations.footer.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">{translations.header.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary" />
                <a 
                  href={`mailto:${translations.contact.details.emailAddress}`} 
                  className="text-sm text-gray-300 hover:text-primary transition-colors"
                >
                  {translations.contact.details.emailAddress}
                </a>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-300">{(translations.footer as Record<string, string>).followUs}</p>
                <div className="flex items-center space-x-3">
                  <Instagram className="h-4 w-4 text-primary" />
                  <a 
                    href="https://www.instagram.com/scandic.school/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-300 hover:text-primary transition-colors"
                  >
                    {(translations.footer as Record<string, string>).instagramHandle}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2024 {translations.header.schoolName}. {translations.footer.rights}.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
