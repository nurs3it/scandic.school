import { getLocale } from '@/lib/server-locale';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'kk', name: 'Қазақша', flag: '🇰🇿' },
];

export async function ServerLanguageSwitcher() {
  const currentLocale = await getLocale();
  const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[1]; // Default to Russian

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2 text-gray-700 hover:text-primary"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{currentLanguage.flag}</span>
        <span className="hidden md:inline">{currentLanguage.name}</span>
      </Button>

      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <div className="py-1">
          {languages.map((language) => (
            <form key={language.code} action="/api/set-locale" method="POST" className="w-full">
              <input type="hidden" name="locale" value={language.code} />
              <button
                type="submit"
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-3 ${
                  currentLocale === language.code ? 'bg-primary/10 text-primary' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
                {currentLocale === language.code && (
                  <span className="ml-auto text-primary">✓</span>
                )}
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
