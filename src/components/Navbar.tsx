import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, FileText } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResume }) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Sync initial state
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);

    // Listen to system preference changes if user hasn't explicitly set localStorage
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        if (e.matches) {
          document.documentElement.classList.add('dark');
          setDarkMode(true);
        } else {
          document.documentElement.classList.remove('dark');
          setDarkMode(false);
        }
      }
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:start-4 z-[100] px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold tracking-wide shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform"
      >
        {t.nav.skipToContent}
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-4 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="text-lg font-bold text-zinc-900 dark:text-zinc-100 tracking-tight hover:opacity-80 transition-opacity focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-md"
          >
            {t.nav.brand}
          </button>

          {/* Desktop Nav Items */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <button
              onClick={() => scrollToSection('work')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
            >
              {t.nav.work}
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
            >
              {t.nav.methods}
            </button>
            <button
              onClick={() => scrollToSection('leadership')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
            >
              {t.nav.leadership}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
            >
              {t.nav.about}
            </button>
          </nav>

          {/* Right side: Resume & Dark Mode Toggle */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Desktop Resume Button */}
            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-indigo-600 dark:hover:text-indigo-400 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 active:scale-[0.98]"
              aria-label="Open resume dialog"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <span>{t.nav.resume}</span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label={darkMode ? t.nav.toggleThemeLight : t.nav.toggleThemeDark}
            >
              {darkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-1.5">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300"
            aria-label={darkMode ? t.nav.toggleThemeLight : t.nav.toggleThemeDark}
          >
            {darkMode ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-menu"
          className="absolute top-full inset-x-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 py-6 px-6 shadow-xl flex flex-col gap-4 md:hidden animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <button
            onClick={() => scrollToSection('work')}
            className="text-start py-2 text-base font-medium text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900"
          >
            {t.nav.work}
          </button>
          <button
            onClick={() => scrollToSection('process')}
            className="text-start py-2 text-base font-medium text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900"
          >
            {t.nav.methods}
          </button>
          <button
            onClick={() => scrollToSection('leadership')}
            className="text-start py-2 text-base font-medium text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900"
          >
            {t.nav.leadership}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-start py-2 text-base font-medium text-zinc-800 dark:text-zinc-200 border-b border-zinc-100 dark:border-zinc-900"
          >
            {t.nav.about}
          </button>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={toggleDarkMode}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-zinc-400 dark:border-zinc-600 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              aria-label={darkMode ? t.nav.toggleThemeLight : t.nav.toggleThemeDark}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" aria-hidden="true" /> : <Moon className="w-4 h-4 text-indigo-500" aria-hidden="true" />}
              <span>{darkMode ? t.nav.toggleThemeLight : t.nav.toggleThemeDark}</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg border border-zinc-400 dark:border-zinc-600 text-sm font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label="Open resume dialog"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              {t.nav.resume}
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
};

