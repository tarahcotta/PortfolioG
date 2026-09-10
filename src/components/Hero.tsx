import React from 'react';
import { ArrowDown, FileText } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onExploreWork: () => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenResume }) => {
  const { t } = useLanguage();

  return (
    <section id="hero" className="pt-28 pb-20 md:pt-40 md:pb-32 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col items-start max-w-4xl text-start">
        {/* Top Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-100/80 dark:bg-zinc-800/80 text-xs font-semibold tracking-wide whitespace-nowrap">
            {t.hero.pills.seniorDesigner}
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-100/80 dark:bg-zinc-800/80 text-xs font-semibold tracking-wide whitespace-nowrap">
            {t.hero.pills.designSystems}
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-100/80 dark:bg-zinc-800/80 text-xs font-semibold tracking-wide whitespace-nowrap">
            {t.hero.pills.enterpriseUx}
          </span>
          <span className="px-3.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 bg-zinc-100/80 dark:bg-zinc-800/80 text-xs font-semibold tracking-wide whitespace-nowrap">
            {t.hero.pills.aiWorkflows}
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-[1.14] sm:leading-[1.08] mb-8">
          {t.hero.headline}
        </h1>

        {/* Status Indicator */}
        <div className="flex items-center gap-2.5 mb-8 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none shrink-0" aria-hidden="true" />
          <span>{t.hero.statusRole}</span>
        </div>

        {/* Subtitle Paragraph */}
        <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed mb-10 max-w-3xl">
          {t.hero.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreWork}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-semibold text-sm hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-sm hover:shadow focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
          >
            <span>{t.hero.exploreWork}</span>
            <ArrowDown className="w-4 h-4" aria-hidden="true" />
          </button>

          {onOpenResume && (
            <button
              onClick={onOpenResume}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-full border border-zinc-300 dark:border-zinc-700 font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:border-zinc-900 dark:hover:border-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-all focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:outline-none"
            >
              <FileText className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />
              <span>{t.nav.resume}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
