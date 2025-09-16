import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocale, getTranslations } from '@/lib/server-locale';
import { ServerLanguageSwitcher } from './server-language-switcher';
import { MobileMenu } from './mobile-menu';

export async function Header() {
  const locale = await getLocale();
  const translations = getTranslations(locale);

  const navigation = [
    { name: translations.navigation.home, href: "/" },
    { name: translations.navigation.about, href: "/about" },
    { name: translations.navigation.staff, href: "/staff" },
    { name: translations.navigation.testimonials, href: "/testimonials" },
    { name: translations.navigation.contact, href: "/contact" },
    { name: translations.navigation.application, href: "/application" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Scandic School Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-secondary hidden md:block">
              {translations.header.schoolName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="h-4 w-4" />
              <span>{translations.header.phone}</span>
            </div>
            <ServerLanguageSwitcher />
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/application">{translations.header.applyButton}</Link>
            </Button>
          </div>

          {/* Mobile CTA & Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <ServerLanguageSwitcher />
            <Button asChild size="sm" className="bg-primary hover:bg-primary/90">
              <Link href="/application">{translations.header.applyButton}</Link>
            </Button>
            <MobileMenu 
              navigation={navigation}
              phone={translations.header.phone}
            />
          </div>
        </div>
      </div>
    </header>
  );
}