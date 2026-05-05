import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";
import { getLocale, getTranslations } from '@/lib/server-locale';

export async function Footer() {
  const locale = await getLocale();
  const translations = await getTranslations(locale);
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
              Больше чем знания, Больше чем школа.
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
                <Link href="/about" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.navigation.about}
                </Link>
              </li>
              <li>
                <Link href="/#programs" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.programs.title}
                </Link>
              </li>
              <li>
                <Link href="/application" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.navigation.application}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.navigation.contact}
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {(translations.navigation as unknown as Record<string, string>).programs ?? 'Programs'}
                </Link>
              </li>
              <li>
                <Link href="/structure" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {(translations.navigation as unknown as Record<string, string>).structure ?? 'Structure'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{translations.programs.title}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/application?program=earlyYears" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.programs.earlyYears.title}
                </Link>
              </li>
              <li>
                <Link href="/application?program=primary" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.programs.primary.title}
                </Link>
              </li>
              <li>
                <Link href="/application?program=ibpyp" className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.hero.features.ibProgram}
                </Link>
              </li>
              {('english' in translations.programs) && (
                <li>
                  <Link href="/application?program=english" className="text-sm text-gray-300 hover:text-white transition-colors">
                    {(translations.programs as unknown as Record<string, { title: string }>).english?.title || 'English Language'}
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{translations.footer.contact}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300">
                  {translations.footer.address}
                </span>
              </div>
              <a href={`tel:${translations.header.phone.replace(/\s/g, '')}`} className="flex items-center space-x-3 hover:text-white transition-colors">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300 hover:text-white transition-colors">{translations.header.phone}</span>
              </a>
              <a href={`mailto:${translations.contact.details.emailAddress}`} className="flex items-center space-x-3 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300 hover:text-white transition-colors">
                  {translations.contact.details.emailAddress}
                </span>
              </a>
              <a
                href="https://www.instagram.com/scandic.school/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-gray-300 hover:text-white transition-colors">
                  {(translations.footer as Record<string, string>).instagramHandle ?? '@scandic.school'}
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {translations.header.schoolName}. {translations.footer.rights}.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
