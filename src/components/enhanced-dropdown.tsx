'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, LucideIcon } from 'lucide-react';

interface DropdownItem {
  name: string;
  href: string;
  icon: LucideIcon;
  description?: string;
}

interface EnhancedDropdownProps {
  title: string;
  items: DropdownItem[];
  icon: LucideIcon;
  className?: string;
}

export function EnhancedDropdown({ title, items, icon: Icon, className = "" }: EnhancedDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon className="h-4 w-4" />
        <span>{title}</span>
        <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-2">
            {items.map((item) => {
              const ItemIcon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-start space-x-3 px-3 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors rounded-lg group"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <ItemIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                      {item.name}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
