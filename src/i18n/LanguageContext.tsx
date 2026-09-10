import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, LocaleConfig, Translations } from './types';
import { en } from './locales/en';
import { es } from './locales/es';
import { de } from './locales/de';
import { ar } from './locales/ar';

export const SUPPORTED_LOCALES: LocaleConfig[] = [
  { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', dir: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
];

const TRANSLATIONS: Record<Locale, Translations> = {
  en,
  es,
  de,
  ar,
};

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  dir: 'ltr' | 'rtl';
  isRTL: boolean;
  t: Translations;
  formatYear: (date?: Date) => string;
  formatList: (items: string[]) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('en');

  const currentConfig = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];
  const dir = currentConfig.dir;
  const isRTL = dir === 'rtl';

  useEffect(() => {
    // Synchronize HTML root attributes for accessibility, fonts, and CSS RTL support
    document.documentElement.lang = 'en';
    document.documentElement.dir = 'ltr';
    try {
      localStorage.removeItem('portfolio-locale');
    } catch {
      // Ignore
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    if (TRANSLATIONS[newLocale]) {
      setLocaleState(newLocale);
    }
  };

  const formatYear = (date: Date = new Date()) => {
    try {
      return new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(date);
    } catch {
      return date.getFullYear().toString();
    }
  };

  const formatList = (items: string[]) => {
    try {
      // Intl.ListFormat handles localized conjunctions ("and", "y", "und", "و")
      return new (Intl as any).ListFormat(locale, { style: 'long', type: 'conjunction' }).format(items);
    } catch {
      return items.join(', ');
    }
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    dir,
    isRTL,
    t: TRANSLATIONS[locale] || en,
    formatYear,
    formatList,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
