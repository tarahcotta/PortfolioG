import React, { useState } from 'react';
import { Mail, Copy, Check, Linkedin, Github } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const About: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    const email = 'tarahcotta@gmail.com';
    navigator.clipboard.writeText(email).catch(() => {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {
        // Fallback catch
      }
      document.body.removeChild(textarea);
    }).finally(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="px-6 py-20 sm:py-28 max-w-6xl mx-auto text-start"
    >
      <div>
        {/* Top: About Tarah Cotta */}
        <div className="flex flex-col gap-8 pb-12">
          <div className="w-full">
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 block mb-2">
              {t.about.eyebrow}
            </span>
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 pt-1"
            >
              {t.about.heading}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed text-zinc-700 dark:text-zinc-300 pt-4 max-w-3xl">
              {t.about.bio}
            </p>
          </div>

          {/* Availability status line */}
          <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            <span
              className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none shrink-0"
              aria-hidden="true"
            />
            <span>{t.about.statusRole}</span>
            <span aria-hidden="true" className="mx-1 opacity-50">•</span>
            <span>{t.about.statusLocation}</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-row flex-wrap gap-3">
            {/* Screen reader live region for copy confirmation */}
            <div aria-live="polite" aria-atomic="true" className="sr-only">
              {copied ? t.about.emailCopied : ''}
            </div>

            {/* Email link with split copy button */}
            <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-full overflow-hidden min-h-[48px] bg-white dark:bg-zinc-900 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-sm focus-within:ring-2 focus-within:ring-indigo-600">
              <a
                href="mailto:tarahcotta@gmail.com"
                className="text-sm font-semibold flex items-center gap-2 px-5 py-2 text-zinc-900 dark:text-zinc-100 no-underline min-h-[48px] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 transition-colors focus-visible:outline-none focus-visible:bg-zinc-100 dark:focus-visible:bg-zinc-800"
              >
                <Mail size={16} aria-hidden="true" className="shrink-0 text-zinc-700 dark:text-zinc-300" />
                <span dir="ltr">tarahcotta@gmail.com</span>
              </a>
              <div className="w-[1px] self-stretch bg-zinc-300 dark:bg-zinc-700 shrink-0" aria-hidden="true" />
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? t.about.emailCopied : t.about.copyEmail}
                className={`flex items-center justify-center px-4 py-2 min-h-[48px] min-w-[44px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 ${
                  copied
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                }`}
              >
                {copied ? (
                  <Check size={16} aria-hidden="true" />
                ) : (
                  <Copy size={16} aria-hidden="true" />
                )}
              </button>
            </div>

            {/* LinkedIn Button */}
            <a
              href="https://www.linkedin.com/in/tarah-cotta/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.about.visitLinkedIn}
              className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full px-5 py-2 text-zinc-900 dark:text-zinc-100 text-sm font-semibold min-h-[48px] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <Linkedin size={16} aria-hidden="true" className="shrink-0 text-zinc-700 dark:text-zinc-300" />
              <span>{t.about.linkedInLabel}</span>
            </a>

            {/* GitHub Button */}
            <a
              href="https://github.com/tarahcotta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.githubAria}
              className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-full px-5 py-2 text-zinc-900 dark:text-zinc-100 text-sm font-semibold min-h-[48px] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <Github size={16} aria-hidden="true" className="shrink-0 text-zinc-700 dark:text-zinc-300" />
              <span>{t.footer.github}</span>
            </a>
          </div>
        </div>

        {/* Divider & Beyond the screen */}
        <div className="flex flex-col md:flex-row items-start md:items-center border-t border-zinc-200 dark:border-zinc-800 gap-10 pt-10 mt-2">
          <div className="flex-1 min-w-0 flex flex-col justify-center gap-3">
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 block mb-1">
              {t.about.beyondEyebrow}
            </span>
            <h3
              id="mindset-heading"
              className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100"
            >
              {t.about.beyondHeading}
            </h3>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 max-w-xl pt-2">
              {t.about.beyondDescription}
            </p>
          </div>

          {/* Stained glass artwork preview */}
          <div className="w-full md:w-[480px] max-w-full aspect-[3/2] rounded-2xl overflow-hidden relative shrink-0 shadow-md border border-zinc-300/80 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900">
            <img
              src="/stained-glass.png"
              alt={t.about.glassArtAlt}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
