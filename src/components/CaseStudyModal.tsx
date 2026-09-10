import React, { useEffect, useState, useRef } from 'react';
import { CaseStudy } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Moon,
  Sun,
  User,
  Calendar,
  Building2,
  Sparkles,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Target,
  Wrench,
  Award,
  Share2,
  Check,
  ZoomIn,
  X
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onNavigate?: (study: CaseStudy) => void;
  allStudies?: CaseStudy[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  study,
  onClose,
  onNavigate,
  allStudies = []
}) => {
  const { t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  const currentIndex = study && allStudies.length > 0
    ? allStudies.findIndex((s) => s.id === study.id)
    : -1;

  const prevStudy = allStudies && allStudies.length > 1 && currentIndex >= 0
    ? allStudies[(currentIndex - 1 + allStudies.length) % allStudies.length]
    : null;

  const nextStudy = allStudies && allStudies.length > 1 && currentIndex >= 0
    ? allStudies[(currentIndex + 1) % allStudies.length]
    : null;

  const allGalleryImages = study
    ? Array.from(new Set([study.image || study.imageUrl, ...(study.images || [])].filter(Boolean))) as string[]
    : [];

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
    setLightboxIndex(null);
  }, [study]);

  useEffect(() => {
    if (study) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      // Move focus inside modal
      requestAnimationFrame(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            focusable[0].focus();
          } else {
            modalRef.current.focus();
          }
        }
      });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!study) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
        return;
      }

      // If Lightbox is active, arrow keys navigate lightbox gallery
      if (lightboxIndex !== null && allGalleryImages.length > 1) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allGalleryImages.length - 1));
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setLightboxIndex((prev) => (prev !== null && prev < allGalleryImages.length - 1 ? prev + 1 : 0));
          return;
        }
      }

      // Linear keyboard navigation between projects when lightbox is closed
      if (lightboxIndex === null && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const isInputField = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName);
        if (!isInputField && onNavigate) {
          if (e.key === 'ArrowLeft' && prevStudy) {
            e.preventDefault();
            onNavigate(prevStudy);
            return;
          }
          if (e.key === 'ArrowRight' && nextStudy) {
            e.preventDefault();
            onNavigate(nextStudy);
            return;
          }
        }
      }

      // Focus trap within modal
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    };
  }, [study, onClose, onNavigate, prevStudy, nextStudy, lightboxIndex, allGalleryImages]);

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

  const handleShareLink = () => {
    if (!study) return;
    const url = `${window.location.origin}${window.location.pathname}#${study.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  if (!study) return null;

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      tabIndex={-1}
      className={`fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-zinc-950 transition-colors duration-300 outline-none ${darkMode ? 'dark' : ''}`}
    >
      {/* Top Sticky Header Bar with Section Anchor Rail (Finding 1) */}
      <div className="sticky top-0 z-30 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="px-4 sm:px-6 py-3 flex items-center justify-between">
          <button
            onClick={onClose}
            aria-label={`${t.modal.back} - ${t.modal.selectedWorks}`}
            className="group inline-flex items-center gap-3 text-zinc-900 dark:text-zinc-100 text-xs font-semibold tracking-wider hover:opacity-85 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-lg p-1"
          >
            <span className="p-2 rounded-full bg-indigo-600 text-white shadow-sm flex items-center justify-center">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
            </span>
            <div className="flex flex-col text-start">
              <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">{t.modal.back}</span>
              <span className="text-sm font-bold tracking-tight">{t.modal.selectedWorks}</span>
            </div>
          </button>

          {/* Center/Right: Linear Project Navigator, Share Link, & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Direct Share / Permalink Button (Item 1) */}
            <button
              onClick={handleShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 print:hidden"
              title="Copy shareable direct link to case study"
              aria-label="Copy link to case study"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

            {/* Linear Project Navigator */}
            {allStudies.length > 1 && onNavigate && (
              <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full px-2 py-1">
                <button
                  onClick={() => prevStudy && onNavigate(prevStudy)}
                  disabled={!prevStudy}
                  aria-label={`${t.modal.prevProject} (Press Left Arrow)`}
                  title="Previous project (←)"
                  className="p-1 sm:p-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <ChevronLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </button>
                <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 px-1.5 whitespace-nowrap">
                  {currentIndex + 1} / {allStudies.length}
                </span>
                <button
                  onClick={() => nextStudy && onNavigate(nextStudy)}
                  disabled={!nextStudy}
                  aria-label={`${t.modal.nextProject} (Press Right Arrow)`}
                  title="Next project (→)"
                  className="p-1 sm:p-1.5 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                >
                  <ChevronRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                </button>
              </div>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
              aria-label={darkMode ? t.modal.lightMode : t.modal.darkMode}
            >
              {darkMode ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </button>
          </div>
        </div>


      </div>

      {/* Main Content Body */}
      <div className="px-6 sm:px-12 py-10 max-w-5xl mx-auto text-start">
        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {study.tags.map(tag => (
            <span
              key={tag}
              className="px-3.5 py-1 rounded-full border border-indigo-200 dark:border-indigo-900/60 text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/40 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 id="case-study-title" className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 mb-4">
          {study.title}
        </h1>

        {/* Short Description */}
        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 font-normal leading-relaxed mb-8 max-w-4xl">
          {study.shortDescription}
        </p>

        {/* EXECUTIVE SUMMARY BANNER (Item 1 & Recommendation 1) */}
        {study.executiveTakeaways && (
          <div className="mb-10 rounded-3xl p-6 sm:p-8 bg-zinc-50 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
            <div className="pb-6 mb-6 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <span className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-4 h-4" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                    {t.modal.executiveSummary}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {t.modal.keyTakeaways}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
              {/* Challenge */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  <Target className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.modal.takeawayProblem}</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {study.executiveTakeaways.problem}
                </p>
              </div>

              {/* Intervention */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  <Wrench className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.modal.takeawayIntervention}</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {study.executiveTakeaways.intervention}
                </p>
              </div>

              {/* Outcome */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <Award className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{t.modal.takeawayOutcome}</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {study.executiveTakeaways.outcome}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* QUANTIFIABLE BUSINESS IMPACT BANNER (Item 2) */}
        {study.metrics && study.metrics.length > 0 && (
          <div className="mb-12 rounded-3xl p-6 sm:p-8 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/80 dark:border-indigo-900/40">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                {t.modal.keyMetrics}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {study.metrics.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between"
                >
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-indigo-600 dark:text-indigo-400 mb-2">
                    {metric.value}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-1">
                      {metric.label}
                    </div>
                    {metric.description && (
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        {metric.description}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PRIMARY PLATFORM SCREEN HERO SHOWCASE (Item 1 & Lightbox Trigger) */}
        {(study.image || study.imageUrl) && (
          <div
            role="button"
            tabIndex={0}
            aria-haspopup="dialog"
            aria-label={`Expand image artifact: ${study.title}`}
            onClick={() => setLightboxIndex(0)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setLightboxIndex(0);
              }
            }}
            className="group relative aspect-[16/10] rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-10 border border-zinc-200/80 dark:border-zinc-800 shadow-2xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
          >
            <img
              src={study.image || study.imageUrl}
              alt={study.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-all flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/80 backdrop-blur-md text-white border border-white/20 text-xs font-bold shadow-xl">
                <ZoomIn className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                <span>Expand Image</span>
              </span>
            </div>
          </div>
        )}

        {/* Additional Images / Gallery with Lightbox Triggers */}
        {study.images && study.images.length > 1 && (
          <div className="mb-16">
            <div className="text-xs font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400 mb-4">
              {t.modal.platformScreens(study.images.length)}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {study.images.map((imgUrl, imgIdx) => {
                const globalImgIndex = allGalleryImages.indexOf(imgUrl);
                const targetIdx = globalImgIndex >= 0 ? globalImgIndex : imgIdx;

                return (
                  <div
                    key={imgIdx}
                    role="button"
                    tabIndex={0}
                    aria-haspopup="dialog"
                    aria-label={`Expand image artifact: ${study.title} screen ${imgIdx + 1}`}
                    onClick={() => setLightboxIndex(targetIdx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightboxIndex(targetIdx);
                      }
                    }}
                    className="group relative aspect-[16/10] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
                  >
                    <img
                      src={imgUrl}
                      alt={`${study.title} screen ${imgIdx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-white border border-white/20 text-xs font-bold shadow-xl">
                        <ZoomIn className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                        <span>Expand</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-300/80 dark:border-zinc-700 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-medium mb-1">
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.modal.role}</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {study.role}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-medium mb-1">
              <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{t.modal.year}</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {study.year}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-medium mb-1">
              <Building2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{t.modal.employer}</span>
            </div>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate block">
              {study.employer}
            </span>
          </div>
        </div>

        {/* Scope Box */}
        <div className="p-8 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/50 mb-16">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 block mb-2">
            {t.modal.projectScope}
          </span>
          <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
            {study.scope}
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="max-w-3xl space-y-16">
          <div id="cs-overview" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              {t.modal.overview}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              {study.overview}
            </p>
          </div>

          <div id="cs-challenge" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              {t.modal.challenge}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              {study.challenge}
            </p>
          </div>

          <div id="cs-solution" className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              {t.modal.solution}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              {study.solution}
            </p>
          </div>

          <div className="scroll-mt-24">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              {t.modal.process}
            </h2>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-lg">
              {study.process}
            </p>
          </div>


        </div>

        {/* Footer Navigation Component */}
        <div className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-8">
          {/* Previous / Next Case Study Tiles */}
          {allStudies.length > 1 && onNavigate && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevStudy && (
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onNavigate(prevStudy);
                  }}
                  className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-400 bg-zinc-50/80 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 text-start transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 min-h-[110px]"
                >
                  <div className="flex items-center justify-start w-full mb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                      <span>{t.modal.prevProject}</span>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors break-words line-clamp-1">
                      {prevStudy.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
                      {prevStudy.employer} • {prevStudy.role}
                    </p>
                  </div>
                </button>
              )}

              {nextStudy && (
                <button
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onNavigate(nextStudy);
                  }}
                  className="group flex flex-col justify-between p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-indigo-600 dark:hover:border-indigo-400 bg-zinc-50/80 dark:bg-zinc-900/60 hover:bg-white dark:hover:bg-zinc-900 text-end transition-all shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 min-h-[110px]"
                >
                  <div className="flex items-center justify-end w-full mb-3">
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      <span>{t.modal.nextProject}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors break-words line-clamp-1">
                      {nextStudy.title}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate mt-0.5">
                      {nextStudy.employer} • {nextStudy.role}
                    </p>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* Bottom Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
            <button
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-950 text-sm font-semibold transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" aria-hidden="true" />
              <span>{t.modal.backToSelectedWorks}</span>
            </button>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 rounded-full px-4 py-2 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
            >
              <span>{t.modal.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* FULLSCREEN LIGHTBOX IMAGE VIEWER (Recommendation P2) */}
      {lightboxIndex !== null && allGalleryImages[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Expanded Image Viewer: ${study.title}`}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between z-10" onClick={(e) => e.stopPropagation()}>
            <div className="text-white text-xs sm:text-sm font-bold tracking-wide flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-zinc-800/80 border border-zinc-700 text-zinc-300 font-mono text-xs">
                {lightboxIndex + 1} / {allGalleryImages.length}
              </span>
              <span className="truncate max-w-xs sm:max-w-md">{study.title}</span>
            </div>

            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close expanded image viewer (Press Escape)"
              title="Close viewer (Esc)"
              className="p-2.5 rounded-full bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 border border-zinc-700/80 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Lightbox Main Image & Navigation Arrows */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
            {allGalleryImages.length > 1 && (
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allGalleryImages.length - 1))}
                aria-label="Previous artifact image (Left Arrow)"
                title="Previous image (←)"
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white border border-zinc-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <ChevronLeft className="w-6 h-6 rtl:rotate-180" aria-hidden="true" />
              </button>
            )}

            <img
              src={allGalleryImages[lightboxIndex]}
              alt={`${study.title} artifact ${lightboxIndex + 1}`}
              className="max-h-[82vh] max-w-full object-contain rounded-xl shadow-2xl select-none"
            />

            {allGalleryImages.length > 1 && (
              <button
                onClick={() => setLightboxIndex((prev) => (prev !== null && prev < allGalleryImages.length - 1 ? prev + 1 : 0))}
                aria-label="Next artifact image (Right Arrow)"
                title="Next image (→)"
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-900 text-white border border-zinc-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <ChevronRight className="w-6 h-6 rtl:rotate-180" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Lightbox Footer Caption */}
          <div className="text-center text-xs text-zinc-400 font-medium z-10" onClick={(e) => e.stopPropagation()}>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-zinc-300">Esc</kbd> to exit lightbox or <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-zinc-300">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 font-mono text-zinc-300">→</kbd> to browse artifacts</span>
          </div>
        </div>
      )}
    </div>
  );
};

