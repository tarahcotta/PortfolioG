import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CaseStudy } from '../types';
import {
  ArrowUpRight,
  Building2,
  Award,
  Clock,
  Share2,
  Check,
  Sparkles,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CaseStudiesProps {
  cases: CaseStudy[];
  onSelectCase: (study: CaseStudy) => void;
  isLoading?: boolean;
}

export const CaseStudiesSkeleton: React.FC = () => {
  return (
    <section id="work" className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto text-start">
      {/* Header Skeleton */}
      <div className="mb-10 animate-pulse">
        <div className="h-3.5 w-32 bg-indigo-200/70 dark:bg-indigo-950/70 rounded-full mb-3" />
        <div className="h-9 sm:h-11 w-64 sm:w-96 bg-zinc-200 dark:bg-zinc-800 rounded-xl" />
      </div>

      <div className="space-y-8">
        {/* Featured Hero Card Skeleton */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-sm animate-pulse">
          {/* Hero Image Box Skeleton */}
          <div className="lg:col-span-7 bg-zinc-200 dark:bg-zinc-800 min-h-[280px] lg:min-h-[440px] relative">
            <div className="absolute top-4 start-4 w-36 h-7 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="absolute bottom-4 end-4 w-28 h-7 rounded-lg bg-zinc-300 dark:bg-zinc-700" />
          </div>

          {/* Hero Content Skeleton */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-zinc-50/40 dark:bg-zinc-900/40">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-4 rounded bg-zinc-300 dark:bg-zinc-700" />
                <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>
              <div className="h-8 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded-lg mb-4" />
              <div className="space-y-2 mb-6">
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>

              {/* Metrics Skeleton Grid */}
              <div className="mb-6 grid grid-cols-3 gap-3 py-4 border-y border-zinc-200 dark:border-zinc-800">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-7 w-12 bg-zinc-300 dark:bg-zinc-700 rounded" />
                    <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              {/* Scope Tags Skeleton */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-7 w-20 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                ))}
              </div>

              {/* Action Footer Skeleton */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="h-4 w-28 bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="w-9 h-9 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm animate-pulse">
              <div className="aspect-[16/10] bg-zinc-200 dark:bg-zinc-800 relative">
                <div className="absolute top-3 start-3 w-28 h-6 rounded-full bg-zinc-300 dark:bg-zinc-700" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 bg-zinc-50/40 dark:bg-zinc-900/40">
                <div>
                  <div className="h-4 w-36 bg-zinc-300 dark:bg-zinc-700 rounded mb-3" />
                  <div className="h-7 w-4/5 bg-zinc-300 dark:bg-zinc-700 rounded-lg mb-3" />
                  <div className="space-y-2 mb-6">
                    <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                    <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 mb-6">
                    {[1, 2, 3].map((t) => (
                      <div key={t} className="h-6 w-16 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    ))}
                  </div>
                  <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                    <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
                    <div className="w-8 h-8 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Sub-component to safely load image or display an abstract UI fallback frame
const CardHeroImage: React.FC<{ study: CaseStudy; isFeatured?: boolean }> = ({ study, isFeatured }) => {
  const [imgError, setImgError] = useState(false);
  const imgSrc = study.image || study.imageUrl;

  if (imgError || !imgSrc) {
    const accentClass = study.accentColor || 'from-indigo-900 via-zinc-950 to-zinc-900';

    return (
      <div className={`w-full h-full p-6 bg-gradient-to-br ${accentClass} text-white flex flex-col justify-between relative overflow-hidden select-none min-h-[220px]`}>
        {/* Abstract background grid decoration */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold tracking-wider uppercase text-white/90">
            {study.tags[0] || 'Enterprise UX'}
          </span>
          <span className="text-[10px] font-mono font-bold text-zinc-300">
            {study.timeline || study.year}
          </span>
        </div>

        <div className="relative z-10 my-auto py-2">
          <div className="text-lg sm:text-xl font-extrabold tracking-tight text-white mb-1 drop-shadow-sm break-words">
            {study.title}
          </div>
          <div className="text-xs text-white/80 font-medium line-clamp-1">
            {study.employer}
          </div>
        </div>

        {/* Wireframe UI bar decoration */}
        <div className="relative z-10 flex items-center gap-2 pt-2 border-t border-white/15">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-[10px] font-mono text-zinc-200">System Architecture Active</div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={study.imageAlt || study.title}
      onError={() => setImgError(true)}
      className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
        isFeatured ? 'min-h-[260px] lg:min-h-[380px]' : 'min-h-[200px]'
      }`}
      loading="lazy"
    />
  );
};

// Sub-component for consistent card info layout across all case studies
const StudyCardContent: React.FC<{ study: CaseStudy; readText: string }> = ({ study, readText }) => {
  return (
    <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-start flex-1 bg-zinc-50/40 dark:bg-zinc-900/40">
      <div>
        {/* Meta Header */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold text-zinc-600 dark:text-zinc-300 mb-3">
          <div className="inline-flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{study.role}</span>
          </div>
          <span className="text-zinc-400 dark:text-zinc-600 font-bold">•</span>
          <span className="text-zinc-600 dark:text-zinc-400 font-medium">{study.employer}</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight mb-3 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors break-words">
          {study.title}
        </h3>

        {/* Short Description */}
        <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
          {study.shortDescription}
        </p>

        {/* Metrics Grid */}
        {study.metrics && study.metrics.length > 0 && (
          <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4 py-4 border-y border-zinc-200/90 dark:border-zinc-800">
            {study.metrics.slice(0, 3).map((metric, idx) => (
              <div key={idx} className="flex flex-col text-start">
                <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                  {metric.value}
                </span>
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 leading-snug line-clamp-2 mt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {/* Scope Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {study.tags.map((tag) => (
            <span
              key={tag}
              title={tag}
              className="px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300 text-xs font-semibold shadow-2xs max-w-full overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-zinc-200/90 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
            {readText}
          </span>
          <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md group-hover:bg-indigo-700 transition-all group-hover:scale-105">
            <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const CaseStudies: React.FC<CaseStudiesProps> = ({ cases, onSelectCase, isLoading }) => {
  const { t } = useLanguage();
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  if (isLoading) {
    return <CaseStudiesSkeleton />;
  }

  const handleCopyLink = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    const url = `${window.location.origin}${window.location.pathname}#${slug}`;
    navigator.clipboard.writeText(url);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2500);
  };

  const featuredStudy = cases && cases.length > 0 ? cases[0] : null;
  const gridCases = cases && cases.length > 1 ? cases.slice(1) : [];

  // EDGE CASE: Data load failure or empty cases prop
  if (hasError || !cases || cases.length === 0) {
    return (
      <section id="work" className="py-20 px-6 max-w-7xl mx-auto text-start">
        <div className="p-8 rounded-3xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 flex flex-col items-center text-center max-w-xl mx-auto">
          <AlertCircle className="w-10 h-10 text-rose-600 dark:text-rose-400 mb-3" aria-hidden="true" />
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-1">
            Unable to Load Selected Works
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-md">
            An error occurred while rendering project data. Please try refreshing the page.
          </p>
          <button
            onClick={() => setHasError(false)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>Retry</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-16 sm:py-24 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto text-start">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col justify-between gap-4"
      >
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 block mb-2">
            {t.caseStudies.eyebrow}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {t.caseStudies.heading}
          </h2>
        </div>
      </motion.div>

      <div className="space-y-8">
        {/* FEATURED HERO CARD */}
        {featuredStudy && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4 }}
            role="button"
            tabIndex={0}
            aria-label={`${t.caseStudies.readCaseStudy}: ${featuredStudy.title}`}
            onClick={() => onSelectCase(featuredStudy)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectCase(featuredStudy);
              }
            }}
            className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-400 grid grid-cols-1 lg:grid-cols-12 relative"
          >
            {/* Featured Ribbon Badge */}
            <div className="absolute top-4 start-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-bold tracking-wide uppercase shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" aria-hidden="true" />
              <span>Featured Flagship Work</span>
            </div>

            {/* Hero Image Container (7 cols on lg) */}
            <div className="lg:col-span-7 relative overflow-hidden bg-zinc-100 dark:bg-zinc-800 min-h-[280px] lg:min-h-[440px]">
              <CardHeroImage study={featuredStudy} isFeatured />

              {/* Direct Link Share Button */}
              <button
                onClick={(e) => handleCopyLink(e, featuredStudy.slug)}
                title={`Copy direct link to ${featuredStudy.title}`}
                aria-label={`Copy direct link to ${featuredStudy.title}`}
                className="absolute top-4 end-4 p-2.5 rounded-full bg-zinc-950/75 hover:bg-zinc-950 backdrop-blur-md text-white border border-white/20 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 z-20"
              >
                {copiedSlug === featuredStudy.slug ? (
                  <div className="flex items-center gap-1.5 px-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    <span className="text-[10px] font-bold text-emerald-400">Copied!</span>
                  </div>
                ) : (
                  <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                )}
              </button>

              {/* Timeline Pill */}
              <div className="absolute bottom-4 end-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/15 text-zinc-200 text-xs font-semibold shadow-md z-20">
                <Clock className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                <span>{featuredStudy.timeline || featuredStudy.year}</span>
              </div>
            </div>

            {/* Hero Content Container (5 cols on lg) */}
            <div className="lg:col-span-5 flex">
              <StudyCardContent study={featuredStudy} readText={t.caseStudies.readCaseStudy} />
            </div>
          </motion.div>
        )}

        {/* SECONDARY GRID OF SELECTED WORKS */}
        {gridCases.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
            {gridCases.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                role="button"
                tabIndex={0}
                aria-label={`${t.caseStudies.readCaseStudy}: ${study.title}`}
                onClick={() => onSelectCase(study)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectCase(study);
                  }
                }}
                className="group cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-indigo-500 dark:hover:border-indigo-400 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <CardHeroImage study={study} />

                  {/* Award Ribbon */}
                  {study.award && (
                    <div className="absolute top-3 start-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/80 backdrop-blur-md border border-amber-500/50 text-amber-300 text-xs font-bold shadow-md z-10">
                      <Award className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                      <span>{study.award}</span>
                    </div>
                  )}

                  {/* Direct Link Share Button */}
                  <button
                    onClick={(e) => handleCopyLink(e, study.slug)}
                    title={`Copy direct link to ${study.title}`}
                    aria-label={`Copy direct link to ${study.title}`}
                    className="absolute top-3 end-3 p-2 rounded-full bg-zinc-950/75 hover:bg-zinc-950 backdrop-blur-md text-white border border-white/20 transition-all shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 z-10"
                  >
                    {copiedSlug === study.slug ? (
                      <div className="flex items-center gap-1.5 px-1">
                        <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                        <span className="text-[10px] font-bold text-emerald-400">Copied!</span>
                      </div>
                    ) : (
                      <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
                    )}
                  </button>

                  {/* Timeline overlay pill */}
                  <div className="absolute bottom-3 end-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-950/80 backdrop-blur-md border border-white/15 text-zinc-300 text-xs font-semibold shadow-md z-10">
                    <Clock className="w-3 h-3 text-indigo-400" aria-hidden="true" />
                    <span>{study.timeline || study.year}</span>
                  </div>
                </div>

                {/* Content Container */}
                <StudyCardContent study={study} readText={t.caseStudies.readCaseStudy} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
