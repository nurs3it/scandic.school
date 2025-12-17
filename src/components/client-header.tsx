'use client';

import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, Users, FileText, MessageCircle, UserPlus, Info, GraduationCap, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { LanguageSwitcher } from './language-switcher';
import { SchoolDropdown } from './school-dropdown';

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
      contactSection: string;
    };
    header: {
      schoolName: string;
      phone: string;
      applyButton: string;
      descriptions: {
        staff: string;
        testimonials: string;
        documents: string;
      };
    };
  };
}

export function ClientHeader({ translations }: ClientHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Группируем навигацию для лучшего UX
  const mainNavigation = [
    { name: translations.navigation.about, href: "/about", icon: Info },
    { name: translations.navigation.merch || "Мерч", href: "/merch", icon: ShoppingBag },
  ];

  const schoolNavigation = [
    { 
      name: translations.navigation.staff, 
      href: "/staff", 
      icon: Users,
      description: translations.header.descriptions.staff
    },
    { 
      name: translations.navigation.testimonials, 
      href: "/testimonials", 
      icon: MessageCircle,
      description: translations.header.descriptions.testimonials
    },
    { 
      name: translations.navigation.documents, 
      href: "/documents", 
      icon: FileText,
      description: translations.header.descriptions.documents
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <Image
                src="/logo.svg"
                alt="Scandic School Logo"
                width={32}
                height={32}
                className="h-8 w-8 group-hover:scale-110 transition-transform duration-200"
              />
            </div>
            <span className="text-xl font-bold text-secondary hidden md:block group-hover:text-primary transition-colors">
              {translations.header.schoolName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Main Navigation */}
            {mainNavigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200"
                >
                  <IconComponent className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* School Dropdown */}
            <SchoolDropdown
              title={translations.navigation.school}
              items={schoolNavigation}
              icon={GraduationCap}
            />

            {/* Contact */}
            <Link
              href="/contact"
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{translations.navigation.contact}</span>
            </Link>
          </nav>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Phone */}
            <div className="hidden xl:flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
              <Phone className="h-4 w-4" />
              <span>{translations.header.phone}</span>
            </div>
            
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {/* Apply Button */}
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
              <Link href="/application" className="flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>{translations.header.applyButton}</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <Button
              onClick={toggleMobileMenu}
              variant="ghost"
              size="sm"
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-white/95 backdrop-blur animate-in slide-in-from-top-2 duration-300">
            <div className="py-4 space-y-1">
              {/* Main Navigation */}
              <div className="space-y-1">
                {mainNavigation.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg mx-2 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* School Section */}
              <div className="px-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2 flex items-center">
                  <GraduationCap className="h-3 w-3 mr-2" />
                  {translations.navigation.school}
                </div>
                {schoolNavigation.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg group"
                      style={{ animationDelay: `${(index + 2) * 50}ms` }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Contact Section */}
              <div className="px-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 py-2 flex items-center">
                  <MessageCircle className="h-3 w-3 mr-2" />
                  {translations.navigation.contactSection}
                </div>
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200 rounded-lg group"
                  style={{ animationDelay: '250ms' }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <MessageCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <span className="font-medium">{translations.navigation.contact}</span>
                  </div>
                </Link>
              </div>

              {/* Phone & Apply Button */}
              <div className="px-4 pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="font-medium">{translations.header.phone}</span>
                </div>
                <Button asChild className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-200">
                  <Link href="/application" onClick={closeMobileMenu} className="flex items-center justify-center space-x-2">
                    <UserPlus className="h-4 w-4" />
                    <span className="font-semibold">{translations.header.applyButton}</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
