import React, { useState, useEffect, useRef } from 'react';
import { Brain, Zap, Code2, ShieldCheck, Sparkles, ArrowUpRight, Copy, Check, X, Terminal, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface MethodDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  strategicValue: string;
  examplePrompt: string;
  humanCheckpoint: string;
  artifactTitle: string;
  artifactItems: string[];
}

export const AiMethods: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
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

  const icons = [
    <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
    <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
    <Code2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
    <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />,
  ];

  const methodDetails: MethodDetail[] = [
    {
      id: 'synthesis',
      title: 'Turn signals into shared understanding',
      subtitle: 'Research Synthesis & Signal Clustering',
      description: 'Use AI to transcribe and cluster research signals, then check the themes with the people closest to the customer and the work.',
      strategicValue: 'Reduces qualitative synthesis time across 20+ user interview transcripts from 3 days to 2 hours while preserving verbatim quote attribution.',
      examplePrompt: `Analyze these 20 user interview transcripts from the laboratory pricing tool discovery phase.
1. Group recurring friction points into 4 thematic clusters.
2. Extract 2 verbatim quotes per cluster with participant IDs.
3. Identify any dissenting opinions or edge cases that conflict with the majority feedback.`,
      humanCheckpoint: 'Cross-reference AI-generated theme clusters against raw session video recordings and validate findings with the lead user researcher.',
      artifactTitle: 'Synthesis Artifacts Produced',
      artifactItems: [
        'Qualitative Theme Matrix with signal counts',
        'Verbatim quote repository categorized by user role',
        'Outlier & edge-case log for follow-up testing',
      ],
    },
    {
      id: 'exploration',
      title: 'Explore more directions, sooner',
      subtitle: 'Rapid Concept Exploration & Variant Benchmarking',
      description: 'Generate early interface and content directions to give the team more to react to. Design judgment determines what moves forward.',
      strategicValue: 'Generates structural layout options and copy concepts in minutes, providing cross-functional teams immediate directions to critique.',
      examplePrompt: `Draft 3 visual layout options for an internal opportunity marketplace listing page.
- Option A: Dense table view optimized for power users and rapid sorting.
- Option B: Card grid highlighting skills matching and time commitments.
- Option C: Kanban board categorized by project urgency.
Ensure all options include clear WCAG 2.2 AA contrast ratios and primary CTA placements.`,
      humanCheckpoint: 'Benchmark candidate directions against technical feasibility, enterprise component library tokens, and user mental models.',
      artifactTitle: 'Exploration Artifacts Produced',
      artifactItems: [
        '3 wireframe layout options for design critique',
        'Copy tone-of-voice variations for key CTAs',
        'Spatial density comparison matrix for desktop & mobile',
      ],
    },
    {
      id: 'handoff',
      title: 'Make handoff more useful',
      subtitle: 'Automated Spec Drafting & Engineering Alignment',
      description: 'Use AI to draft annotations, documentation, and accessibility checks so product and engineering can focus on clarity and trade-offs.',
      strategicValue: 'Bridges design and development by drafting component prop tables, state interaction matrices, and ARIA accessibility specs automatically.',
      examplePrompt: `Inspect the Figma component tokens for the Enterprise Pricing Calculator.
Generate:
1. React TypeScript prop definitions (interface PricingCalculatorProps).
2. ARIA roles and keyboard interaction guidelines (Focus traps, Tab sequence).
3. Design token mappings for light and dark mode color variables.`,
      humanCheckpoint: 'Verify prop names and design token keys against the production component repository (@lab/design-tokens) with the lead front-end engineer.',
      artifactTitle: 'Handoff Artifacts Produced',
      artifactItems: [
        'React TypeScript interface specifications',
        'Keyboard navigation & ARIA landmark guidelines',
        'Design token mapping table for CSS variables',
      ],
    },
    {
      id: 'guardrails',
      title: 'Set guardrails before scale',
      subtitle: 'AI Safety, Governance & Bias Prevention',
      description: 'Put privacy, bias review, transparency, and human approval checkpoints in place before AI-assisted practices become team defaults.',
      strategicValue: 'Establishes mandatory review checkpoints, data privacy protocols, and verification logs before AI tools are deployed across the design team.',
      examplePrompt: `Perform a governance audit on this proposed AI-assisted workflow:
1. Verify no PII or laboratory internal confidential data is ingested into public models.
2. Check output copy for gender bias, non-inclusive terminology, or speculative claims.
3. Flag required human sign-off steps before final asset delivery.`,
      humanCheckpoint: 'Require explicit lead designer and legal/compliance sign-off prior to releasing AI-assisted outputs into production releases.',
      artifactTitle: 'Guardrail Artifacts Produced',
      artifactItems: [
        'Data privacy & PII scrubbing verification log',
        'Inclusive language and accessibility audit checklist',
        'Human sign-off audit trail for production deployments',
      ],
    },
  ];

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const selectedDetail = selectedCardIndex !== null ? methodDetails[selectedCardIndex] : null;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="px-6 py-20 sm:py-28 max-w-6xl mx-auto text-start"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading, intro & principle */}
        <div className="lg:sticky lg:top-28">
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-600 dark:text-indigo-400 block mb-2">
            {t.aiMethods.eyebrow}
          </span>
          <h2
            id="process-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 pt-1 leading-[1.15]"
          >
            {t.aiMethods.heading}
          </h2>
          <p className="text-base leading-relaxed text-zinc-700 dark:text-zinc-300 pt-6 max-w-prose">
            {t.aiMethods.description}
          </p>

          <div className="flex items-center gap-2.5 pt-8 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
            <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" aria-hidden="true" />
            <span>{t.aiMethods.quote}</span>
          </div>
        </div>

        {/* Right Column: Interactive 2x2 Grid of Method Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6" role="region" aria-label="AI Method Pillars">
          {t.aiMethods.cards.map((card, index) => {
            const detail = methodDetails[index];
            return (
              <div
                key={index}
                tabIndex={0}
                role="button"
                aria-haspopup="dialog"
                aria-label={`${card.title} - Click to view real-world workflow example`}
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
                      <span>Example</span>
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

      {/* Interactive Detail Modal for Selected Method */}
      {selectedDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedCardIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="method-modal-title"
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
                    {selectedDetail.subtitle}
                  </span>
                  <h3 id="method-modal-title" className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                    {selectedDetail.title}
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

            {/* Modal Body: Compact 2-Column Grid for Strategic Value & Human Checkpoint */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Strategic Value Banner */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span>Strategic Impact</span>
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

              {/* Human Checkpoint Box */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300/80 dark:border-amber-800/60 flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between gap-1.5 mb-1.5">
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span>Human Verification</span>
                    </div>
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 uppercase tracking-wider shrink-0">
                      Required
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-relaxed">
                    {selectedDetail.humanCheckpoint}
                  </p>
                </div>
              </div>
            </div>

            {/* Example AI Prompt Block */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Prompt Template</span>
                </div>
                <button
                  onClick={() => handleCopyPrompt(selectedDetail.examplePrompt)}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-zinc-900 text-zinc-100 text-xs font-mono leading-snug border border-zinc-800 whitespace-pre-wrap max-h-36 overflow-y-auto">
                {selectedDetail.examplePrompt}
              </pre>
            </div>

            {/* Produced Artifacts as Compact Chips */}
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2">
                <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Deliverables Produced</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedDetail.artifactItems.map((item, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700/80 text-zinc-800 dark:text-zinc-200 text-xs font-medium"
                  >
                    ✓ {item}
                  </span>
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

