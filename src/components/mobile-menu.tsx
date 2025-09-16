"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";

interface MobileMenuProps {
  navigation: Array<{ name: string; href: string }>;
  phone: string;
}

export function MobileMenu({ navigation, phone }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t bg-white absolute top-full left-0 right-0 z-50 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t">
              <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
