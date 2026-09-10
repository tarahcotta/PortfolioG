import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const Footer: React.FC = () => {
  const { t, formatYear } = useLanguage();
  const currentYear = formatYear(new Date());

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 px-6 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-zinc-600 dark:text-zinc-300">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-xs shrink-0">
          TC
        </div>
        <span>{t.footer.copyright(currentYear)}</span>
      </div>

      <div className="flex items-center gap-6">
        <a
          href="https://www.linkedin.com/in/tarah-cotta/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
          aria-label={t.footer.linkedInAria}
        >
          <span>{t.footer.linkedIn}</span>
          <ArrowUpRight className="w-3 h-3 rtl:-scale-x-100" aria-hidden="true" />
        </a>
        <a
          href="https://github.com/tarahcotta"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
          aria-label={t.footer.githubAria}
        >
          <span>{t.footer.github}</span>
          <ArrowUpRight className="w-3 h-3 rtl:-scale-x-100" aria-hidden="true" />
        </a>
        <a
          href="mailto:tarahcotta@gmail.com"
          className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded px-1"
          aria-label={t.footer.emailAria}
        >
          <span>{t.footer.email}</span>
          <ArrowUpRight className="w-3 h-3 rtl:-scale-x-100" aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
};
