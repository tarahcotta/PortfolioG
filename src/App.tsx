/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CaseStudies } from './components/CaseStudies';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AiMethods } from './components/AiMethods';
import { Leadership } from './components/Leadership';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CASE_STUDIES } from './data';
import { CaseStudy } from './types';
import { LanguageProvider } from './i18n/LanguageContext';

export default function App() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initial page load hydration timer to demonstrate skeleton loaders & improve perceived performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Parse current URL hash and sync with state
  const syncStateFromHash = useCallback(() => {
    const rawHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
    
    if (rawHash === 'resume') {
      setResumeOpen(true);
      setSelectedStudy(null);
      return;
    }

    if (rawHash) {
      // Check for case study matching slug or id
      const matched = CASE_STUDIES.find((cs) => {
        const slug = cs.slug.toLowerCase();
        const idStr = String(cs.id);
        return (
          rawHash === slug ||
          rawHash === `case-study-${slug}` ||
          rawHash === `case-study-${idStr}` ||
          rawHash === idStr
        );
      });

      if (matched) {
        setSelectedStudy(matched);
        setResumeOpen(false);
        return;
      }
    }

    // If hash was cleared or doesn't match modals
    if (rawHash === '' || rawHash === 'work' || rawHash === 'leadership' || rawHash === 'process' || rawHash === 'about') {
      setSelectedStudy(null);
      setResumeOpen(false);
    }
  }, []);

  // Listen to hash changes (browser Back/Forward buttons and direct links)
  useEffect(() => {
    syncStateFromHash();
    window.addEventListener('hashchange', syncStateFromHash);
    return () => window.removeEventListener('hashchange', syncStateFromHash);
  }, [syncStateFromHash]);

  const handleOpenStudy = (study: CaseStudy) => {
    setSelectedStudy(study);
    const targetHash = `#${study.slug}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
  };

  const handleCloseStudy = useCallback(() => {
    setSelectedStudy(null);
    if (window.location.hash && window.location.hash !== '#work') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const handleOpenResume = useCallback(() => {
    setResumeOpen(true);
    if (window.location.hash !== '#resume') {
      window.history.pushState(null, '', '#resume');
    }
  }, []);

  const handleCloseResume = useCallback(() => {
    setResumeOpen(false);
    if (window.location.hash === '#resume') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  const handleExploreWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900 font-sans antialiased">
        <Navbar
          onOpenResume={handleOpenResume}
        />
        
        <main id="main-content" tabIndex={-1} className="outline-none">
          <Hero onExploreWork={handleExploreWork} onOpenResume={handleOpenResume} />
          <CaseStudies cases={CASE_STUDIES} onSelectCase={handleOpenStudy} isLoading={isLoading} />
          <AiMethods />
          <Leadership isLoading={isLoading} />
          <About />
        </main>

        <Footer />

        <CaseStudyModal
          study={selectedStudy}
          onClose={handleCloseStudy}
          onNavigate={handleOpenStudy}
          allStudies={CASE_STUDIES}
        />

        <ResumeModal
          isOpen={resumeOpen}
          onClose={handleCloseResume}
        />
      </div>
    </LanguageProvider>
  );
}

