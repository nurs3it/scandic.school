'use client';

import Link from "next/link";
import { Phone, Menu, X, Info, FileText, MessageCircle, GraduationCap, ShoppingBag, Newspaper, Handshake, Users, Building2, HeartHandshake, BookOpen, Trophy } from "lucide-react";
import { useState } from 'react';
import { LanguageSwitcher } from './language-switcher';
import { SchoolDropdown, type DropdownItem } from './school-dropdown';

interface ClientHeaderProps {
  translations: {
    navigation: {
      home: string;
      about: string;
      staff: string;
      testimonials: string;
      documents: string;
      contact: string;
      application: string;
      school: string;
      partners?: string;
      contactSection: string;
      merch?: string;
      news?: string;
      structure?: string;
      community?: string;
      programs?: string;
      clubs?: string;
      tournaments?: string;
    };
    header: {
      schoolName: string;
      phone: string;
      applyButton: string;
      descriptions: {
        staff: string;
        testimonials: string;
        documents: string;
        merch?: string;
        news?: string;
        about?: string;
        partners?: string;
        school?: string;
        structure?: string;
        community?: string;
        programs?: string;
        clubs?: string;
        tournaments?: string;
      };
    };
  };
}

export function ClientHeader({ translations }: ClientHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const aboutNavigation: DropdownItem[] = [
    {
      name: translations.navigation.about,
      href: "/about",
      icon: Info,
      description: translations.header.descriptions.about ?? "",
    },
    {
      name: translations.navigation.partners ?? "Партнеры",
      href: "/partners",
      icon: Handshake,
      description: translations.header.descriptions.partners ?? "",
    },
    {
      name: translations.navigation.staff,
      href: "/staff",
      icon: Users,
      description: translations.header.descriptions.staff,
    },
    {
      name: translations.navigation.structure ?? "Структура",
      href: "/structure",
      icon: Building2,
      description: translations.header.descriptions.structure ?? "",
    },
    {
      name: translations.navigation.community ?? "Сообщество",
      href: "/community",
      icon: HeartHandshake,
      description: translations.header.descriptions.community ?? "",
    },
    {
      name: translations.navigation.programs ?? "Программа",
      href: "/programs",
      icon: BookOpen,
      description: translations.header.descriptions.programs ?? "",
    },
  ];

  const schoolNavigation: DropdownItem[] = [
    {
      name: translations.navigation.news ?? "Новости",
      href: "/news",
      icon: Newspaper,
      description: translations.header.descriptions.news ?? "",
    },
    {
      name: translations.navigation.clubs ?? "Кружки",
      href: "/clubs",
      icon: BookOpen,
      description: translations.header.descriptions.clubs ?? "",
    },
    {
      name: translations.navigation.testimonials,
      href: "/testimonials",
      icon: MessageCircle,
      description: translations.header.descriptions.testimonials,
    },
    {
      name: translations.navigation.documents,
      href: "/documents",
      icon: FileText,
      description: translations.header.descriptions.documents,
    },
    {
      name: translations.navigation.merch || "Merchandise",
      href: "/merch",
      icon: ShoppingBag,
      description: translations.header.descriptions.merch || "",
    },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-brand-navy-100">
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-18 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Scandic International School"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="hidden md:inline-block text-brand-navy-900 font-display font-semibold group-hover:text-brand-teal-700 transition-colors">
              {translations.header.schoolName}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <SchoolDropdown
              title={translations.navigation.about}
              items={aboutNavigation}
              icon={Info}
            />
            <SchoolDropdown
              title={translations.navigation.school}
              items={schoolNavigation}
              icon={GraduationCap}
            />
            <Link
              href="/tournaments"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-brand-navy-900 hover:text-brand-teal-700 hover:bg-brand-teal-50 transition-colors"
            >
              <Trophy className="h-4 w-4" />
              <span>{translations.navigation.tournaments ?? "Турниры"}</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-brand-navy-900 hover:text-brand-teal-700 hover:bg-brand-teal-50 transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{translations.navigation.contact}</span>
            </Link>
          </nav>

          {/* Right cluster — desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${translations.header.phone.replace(/\s/g, '')}`}
              className="hidden xl:flex items-center gap-2 text-sm text-brand-navy-700 hover:text-brand-teal-700 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>{translations.header.phone}</span>
            </a>
            <LanguageSwitcher />
            <Link
              href="/application"
              data-apply-button
              className="inline-flex items-center px-5 py-2 rounded-lg bg-brand-orange-500 text-white font-medium hover:bg-brand-orange-600 transition-colors"
            >
              {translations.header.applyButton}
            </Link>
          </div>

          {/* Mobile right cluster */}
          <div className="lg:hidden flex items-center gap-1">
            <LanguageSwitcher />
            <button
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              className="p-2 text-brand-navy-900 hover:text-brand-teal-700 transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-brand-navy-100 bg-white animate-in slide-in-from-top-2 duration-300 max-h-[calc(100vh-4rem)] md:max-h-[calc(100vh-4.5rem)] overflow-y-auto overscroll-contain">
            <div className="py-4 space-y-1">
              {/* About Section */}
              <div className="px-2">
                <div className="text-xs font-semibold text-brand-navy-700/70 uppercase tracking-wider px-4 py-2 flex items-center">
                  <Info className="h-3 w-3 mr-2" />
                  {translations.navigation.about}
                </div>
                {aboutNavigation.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-navy-900 hover:text-brand-teal-700 hover:bg-brand-teal-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-teal-100 rounded-lg flex items-center justify-center group-hover:bg-brand-teal-200 transition-colors">
                        <IconComponent className="h-4 w-4 text-brand-teal-700" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <p className="!text-xs text-brand-navy-700/70 mt-0.5 leading-snug">{item.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* School Section */}
              <div className="px-2">
                <div className="text-xs font-semibold text-brand-navy-700/70 uppercase tracking-wider px-4 py-2 flex items-center">
                  <GraduationCap className="h-3 w-3 mr-2" />
                  {translations.navigation.school}
                </div>
                {schoolNavigation.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-navy-900 hover:text-brand-teal-700 hover:bg-brand-teal-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-brand-teal-100 rounded-lg flex items-center justify-center group-hover:bg-brand-teal-200 transition-colors">
                        <IconComponent className="h-4 w-4 text-brand-teal-700" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <p className="!text-xs text-brand-navy-700/70 mt-0.5 leading-snug">{item.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Tournaments — top-level */}
              <div className="px-2">
                <div className="text-xs font-semibold text-brand-navy-700/70 uppercase tracking-wider px-4 py-2 flex items-center">
                  <Trophy className="h-3 w-3 mr-2" />
                  {translations.navigation.tournaments ?? "Турниры"}
                </div>
                <Link
                  href="/tournaments"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-navy-900 hover:text-brand-teal-700 hover:bg-brand-teal-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-teal-100 rounded-lg flex items-center justify-center group-hover:bg-brand-teal-200 transition-colors">
                    <Trophy className="h-4 w-4 text-brand-teal-700" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{translations.navigation.tournaments ?? "Турниры"}</span>
                    <p className="!text-xs text-brand-navy-700/70 mt-0.5 leading-snug">{translations.header.descriptions.tournaments ?? ""}</p>
                  </div>
                </Link>
              </div>

              {/* Contact Section */}
              <div className="px-2">
                <div className="text-xs font-semibold text-brand-navy-700/70 uppercase tracking-wider px-4 py-2 flex items-center">
                  <MessageCircle className="h-3 w-3 mr-2" />
                  {translations.navigation.contactSection}
                </div>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-brand-navy-900 hover:text-brand-teal-700 hover:bg-brand-teal-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-brand-teal-100 rounded-lg flex items-center justify-center group-hover:bg-brand-teal-200 transition-colors">
                    <MessageCircle className="h-4 w-4 text-brand-teal-700" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{translations.navigation.contact}</span>
                  </div>
                </Link>
              </div>

              {/* Phone & Apply Button */}
              <div className="px-4 pt-4 border-t border-brand-navy-100">
                <a
                  href={`tel:${translations.header.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 text-sm text-brand-navy-700 mb-4 hover:text-brand-teal-700 transition-colors"
                >
                  <Phone className="h-4 w-4 text-brand-teal-700" />
                  <span className="font-medium">{translations.header.phone}</span>
                </a>
                <Link
                  href="/application"
                  onClick={closeMobileMenu}
                  data-apply-button
                  className="flex items-center justify-center w-full px-5 py-3 rounded-lg bg-brand-orange-500 text-white font-medium hover:bg-brand-orange-600 transition-colors"
                >
                  {translations.header.applyButton}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
