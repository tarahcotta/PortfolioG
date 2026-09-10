import React, { useState, useEffect, useRef } from 'react';
import { Settings, Users, LayoutTemplate, BookOpen, Sparkles, CheckCircle2, X, Building2, Layers, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface LeadershipProps {
  isLoading?: boolean;
}

interface LeadershipDetail {
  id: string;
  category: string;
  subtitle: string;
  strategicValue: string;
  initiatives: string[];
  caseStudyTitle: string;
  caseStudyText: string;
}

export const LeadershipSkeleton: React.FC = () => {
  return (
    <section
      id="leadership"
      aria-label="Leadership loading state"
      className="py-20 sm:py-28 bg-zinc-50/70 dark:bg-zinc-900/30 border-t border-b border-zinc-200/80 dark:border-zinc-800 text-start animate-pulse"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column Skeleton */}
          <div>
            <div className="h-3.5 w-28 bg-indigo-200/70 dark:bg-indigo-950/70 rounded-full mb-3" />
            <div className="h-9 sm:h-11 w-60 sm:w-80 bg-zinc-200 dark:bg-zinc-800 rounded-xl mb-4" />
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-11/12 bg-zinc-200 dark:bg-zinc-800 rounded" />
              <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-800 rounded" />
            </div>
          </div>

          {/* Right Column 2x2 Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-zinc-300/80 dark:border-zinc-700 rounded-2xl p-6 sm:p-7 flex flex-col gap-3.5 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                <div className="space-y-2">
                  <div className="h-5 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded" />
                  <div className="h-3.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="h-3.5 w-5/6 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Leadership: React.FC<LeadershipProps> = ({ isLoading }) => {
  const { t } = useLanguage();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (selectedCardIndex === null) {
      if (triggerRef.current) {
        triggerRef.current.focus();
        triggerRef.current = null;
      }
      return;
    }

    triggerRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      if (modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length > 0) {
          focusables[0].focus();
        }
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCardIndex(null);
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

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
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCardIndex]);

  if (isLoading) {
    return <LeadershipSkeleton />;
  }

  const icons = [
    <Settings className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
    <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
    <LayoutTemplate className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
    <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
  ];

  const leadershipDetails: LeadershipDetail[] = [
    {
      id: 'figma-admin',
      category: 'Governance & Security',
      subtitle: 'Figma Enterprise & Government Administration',
      strategicValue: 'Consolidated 4 disparate team spaces into a unified Figma Enterprise organization, establishing seat tiering, automated SSO, and strict library publishing controls.',
      initiatives: [
        'Administered Figma for Government security constraints and SSO integration for 100+ accounts',
        'Established component library publishing workflows with mandatory branch review protocols',
        'Audited organization seats quarterly, reducing idle seat licensing overhead by 40%',
      ],
      caseStudyTitle: 'National Laboratories of the Rockies',
      caseStudyText: 'Governed enterprise Figma environments across 15 scientific applications, establishing shared UI kits, design token deprecation schedules, and DesignOps governance.',
    },
    {
      id: 'mentorship',
      category: 'Team Enablement',
      subtitle: 'Career Progression & Critique Culture',
      strategicValue: 'Established 1:1 coaching frameworks and structured critique principles that reduced time-to-independence for junior designers from 6 months to 2 months.',
      initiatives: [
        'Designed structured IC competency matrices for senior and staff design career tracks',
        'Instituted weekly safe-space critique frameworks focusing on user intent and engineering trade-offs',
        'Mentored 5+ junior and mid-level designers in React/TypeScript code-fidelity prototyping',
      ],
      caseStudyTitle: 'UX Community of Practice',
      caseStudyText: 'Founded and chaired an organization-wide design chapter, hosting bi-weekly knowledge-sharing sessions, Figma office hours, and WCAG accessibility workshops.',
    },
    {
      id: 'design-system',
      category: 'System Architecture',
      subtitle: 'Multi-Theme Token Architecture',
      strategicValue: 'Architected and maintained a single source of truth design system serving 15+ complex laboratory products, achieving 92% component adoption across React codebases.',
      initiatives: [
        'Authored W3C-compliant semantic design tokens for light/dark mode and high-contrast themes',
        'Published automated Figma-to-Code token sync pipelines with production npm packages',
        'Built WCAG 2.2 AA accessibility audit checklists for custom web components',
      ],
      caseStudyTitle: 'Laboratory Enterprise Ecosystem',
      caseStudyText: 'Reduced developer handoff friction by 60% by co-authoring production React component interfaces alongside senior front-end software engineers.',
    },
    {
      id: 'documentation',
      category: 'Operational Scalability',
      subtitle: 'DesignOps Playbooks & Process Docs',
      strategicValue: 'Built comprehensive DesignOps playbooks and decision logs that reduced onboarding time for new cross-functional hires by 50%.',
      initiatives: [
        'Authored step-by-step UX discovery, prototyping, and accessibility audit playbooks',
        'Created standardized RFC templates for major design system component additions',
        'Documented cross-functional handoff protocols between product management, UX, and QA engineering',
      ],
      caseStudyTitle: 'Federal & Enterprise Compliance',
      caseStudyText: 'Established reusable documentation frameworks for Section 508 and WCAG compliance audits across mission-critical laboratory software platforms.',
    },
  ];

  const selectedDetail = selectedCardIndex !== null ? leadershipDetails[selectedCardIndex] : null;

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-heading"
      className="py-20 sm:py-28 bg-zinc-50/70 dark:bg-zinc-900/30 border-t border-b border-zinc-200/80 dark:border-zinc-800 text-start"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
          {/* Left Column: Title & Description */}
          <div className="lg:sticky lg:top-28">
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 block mb-2">
              {t.leadership.eyebrow}
            </span>
            <h2
              id="leadership-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 pt-1 leading-[1.15]"
            >
              {t.leadership.heading}
            </h2>
            <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 pt-6 max-w-prose">
              {t.leadership.description}
            </p>
          </div>

          {/* Right Column: 2x2 Grid of Interactive Cards matching AI cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="region" aria-label="Leadership Pillars">
            {t.leadership.cards.map((card, index) => {
              const detail = leadershipDetails[index];
              return (
                <div
                  key={index}
                  tabIndex={0}
                  role="button"
                  aria-haspopup="dialog"
                  aria-label={`${card.title} - Click to view detail`}
                  onClick={() => setSelectedCardIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedCardIndex(index);
                    }
                  }}
                  className="group relative bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800/90 rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 shadow-xs hover:shadow-xl hover:-translate-y-0.5 hover:border-indigo-500/50 dark:hover:border-indigo-400/50 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 text-start"
                >
                  <div className="flex flex-col gap-3.5">
                    <div className="flex items-center justify-between">
                      <div
                        aria-hidden="true"
                        className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/60 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                      >
                        {React.cloneElement(icons[index % icons.length], {
                          className: 'w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:text-white transition-colors',
                        })}
                      </div>
                      <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-full flex items-center gap-1 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <span>{detail ? detail.category : 'Leadership'}</span>
                        <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300 pt-2">
                        {card.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs font-semibold text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    <span>{detail ? detail.subtitle : ''}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leadership Detail Modal Overlay matching AI Methods modal */}
      {selectedDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCardIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="leadership-modal-title"
        >
          <div
            ref={modalRef}
            tabIndex={-1}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-3xl w-full p-5 sm:p-6 shadow-2xl relative text-start overflow-hidden flex flex-col gap-4 focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  {React.cloneElement(icons[selectedCardIndex! % icons.length], {
                    className: 'w-4 h-4 text-white',
                  })}
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block truncate">
                    {selectedDetail.category} • {selectedDetail.subtitle}
                  </span>
                  <h3 id="leadership-modal-title" className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                    {t.leadership.cards[selectedCardIndex!].title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setSelectedCardIndex(null)}
                aria-label="Close detail modal"
                className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Compact 2-Column Grid for Strategic Impact & Case Study */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Strategic Value Banner */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>Organizational Impact</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-indigo-200/80 dark:bg-indigo-900/60 text-indigo-950 dark:text-indigo-200 uppercase tracking-wider shrink-0">
                      Outcome
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {selectedDetail.strategicValue}
                  </p>
                </div>
              </div>

              {/* Enterprise Case Study Reference */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Case Study Context</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 uppercase tracking-wider shrink-0">
                      Proven
                    </span>
                  </div>
                  <p className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-0.5">
                    {selectedDetail.caseStudyTitle}
                  </p>
                  <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {selectedDetail.caseStudyText}
                  </p>
                </div>
              </div>
            </div>

            {/* Key Leadership Initiatives Section */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span>Key Leadership Initiatives</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedDetail.initiatives.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 text-xs font-medium leading-snug flex items-start gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 mt-1 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setSelectedCardIndex(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

