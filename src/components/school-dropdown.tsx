'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { IconProps } from '@/components/icons';

export interface DropdownItem {
  name: string;
  href: string;
  icon: LucideIcon | React.ComponentType<IconProps>;
  description: string;
  isCustomIcon?: boolean;
}

interface SchoolDropdownProps {
  title: string;
  items: DropdownItem[];
  icon: LucideIcon;
}

export function SchoolDropdown({ title, items, icon: Icon }: SchoolDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200"
        >
          <Icon className="h-4 w-4" />
          <span>{title}</span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" align="start">
        <div className="space-y-1">
          {items.map((item) => {
            const isHovered = hoveredItem === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-start space-x-3 px-3 py-3 text-sm text-gray-700 hover:text-primary hover:bg-primary/5 transition-colors rounded-lg group"
                onClick={() => setIsOpen(false)}
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  {item.isCustomIcon ? (
                    <div className="w-6 h-6">
                      {(() => {
                        const CustomIcon = item.icon as React.ComponentType<IconProps>;
                        return <CustomIcon active={isHovered} id={`nav-${item.href}`} />;
                      })()}
                    </div>
                  ) : (
                    (() => {
                      const LucideIconComp = item.icon as LucideIcon;
                      return <LucideIconComp className="h-4 w-4 text-primary" />;
                    })()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 group-hover:text-primary transition-colors">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}
