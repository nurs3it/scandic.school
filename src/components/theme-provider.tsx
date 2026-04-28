'use client';

import { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'classic' | 'mountain' | 'v3';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes: Record<Theme, { label: Record<string, string> }> = {
  classic: {
    label: { ru: 'Классика', en: 'Classic', kk: 'Классика' },
  },
  mountain: {
    label: { ru: 'Горы', en: 'Mountain', kk: 'Таулар' },
  },
  v3: {
    label: { ru: 'Scandic v3', en: 'Scandic v3', kk: 'Scandic v3' },
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('classic');

  useEffect(() => {
    const saved = document.cookie
      .split('; ')
      .find((row) => row.startsWith('theme='))
      ?.split('=')[1] as Theme | undefined;

    if (saved && saved in themes) {
      setThemeState(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    document.cookie = `theme=${newTheme}; path=/; max-age=${365 * 24 * 60 * 60}`;
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
