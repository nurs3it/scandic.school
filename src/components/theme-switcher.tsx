'use client';

import { Palette } from 'lucide-react';
import { useTheme, themes, type Theme } from '@/components/theme-provider';
import { useLocale } from '@/components/locale-provider';
import { useState, useRef, useEffect } from 'react';

const themeColors: Record<Theme, { primary: string; secondary: string }> = {
  classic: { primary: '#ffb400', secondary: '#153b24' },
  mountain: { primary: '#C96B3C', secondary: '#3D7A8A' },
  v3: { primary: '#f97316', secondary: '#0a6f57' },
};

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary/5 transition-all duration-200"
        title="Theme"
      >
        <Palette className="h-4 w-4" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border border-gray-100 py-2 min-w-[160px] z-50 animate-in slide-in-from-top-2 duration-200">
          {(Object.keys(themes) as Theme[]).map((key) => {
            const isActive = theme === key;
            const colors = themeColors[key];
            return (
              <button
                key={key}
                onClick={() => {
                  setTheme(key);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {/* Color preview dots */}
                <div className="flex items-center gap-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-gray-200"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-gray-200"
                    style={{ backgroundColor: colors.secondary }}
                  />
                </div>
                <span>{themes[key].label[locale] || themes[key].label.en}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
