export type Locale = 'en' | 'es' | 'de' | 'ar';

export interface LocaleConfig {
  code: Locale;
  name: string;
  nativeName: string;
  dir: 'ltr' | 'rtl';
}

export interface Translations {
  nav: {
    brand: string;
    work: string;
    methods: string;
    leadership: string;
    about: string;
    toggleThemeDark: string;
    toggleThemeLight: string;
    openMenu: string;
    closeMenu: string;
    switchLanguage: string;
    skipToContent: string;
    resume: string;
  };
  hero: {
    pills: {
      seniorDesigner: string;
      designSystems: string;
      enterpriseUx: string;
      aiWorkflows: string;
    };
    headline: string;
    statusRole: string;
    subtitle: string;
    exploreWork: string;
    contactMe: string;
  };
  caseStudies: {
    eyebrow: string;
    heading: string;
    filters: {
      all: string;
      enterpriseUx: string;
      internalPlatforms: string;
      safetyWorkflow: string;
    };
    readCaseStudy: string;
  };
  aiMethods: {
    eyebrow: string;
    heading: string;
    description: string;
    quote: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  leadership: {
    eyebrow: string;
    heading: string;
    description: string;
    cards: Array<{
      title: string;
      description: string;
    }>;
  };
  about: {
    eyebrow: string;
    heading: string;
    bio: string;
    statusRole: string;
    statusLocation: string;
    copyEmail: string;
    emailCopied: string;
    visitLinkedIn: string;
    linkedInLabel: string;
    beyondEyebrow: string;
    beyondHeading: string;
    beyondDescription: string;
    glassArtAlt: string;
  };
  modal: {
    closeAria: string;
    back: string;
    selectedWorks: string;
    caseDetails: string;
    lightMode: string;
    darkMode: string;
    platformScreens: (count: number) => string;
    role: string;
    year: string;
    employer: string;
    projectScope: string;
    overview: string;
    challenge: string;
    solution: string;
    process: string;
    impact: string;
    backToSelectedWorks: string;
    backToTop: string;
    clientContext: string;
    timeframe: string;
    coreFocus: string;
    theProblem: string;
    roleAndProcess: string;
    keyOutcomes: string;
    executiveSummary: string;
    keyTakeaways: string;
    keyMetrics: string;
    businessImpact: string;
    prevProject: string;
    nextProject: string;
    prototypeWalkthrough: string;
    prototypeCopied: string;
    takeawayProblem: string;
    takeawayIntervention: string;
    takeawayOutcome: string;
  };
  footer: {
    copyright: (year: string) => string;
    allRightsReserved: string;
    linkedIn: string;
    github: string;
    email: string;
    linkedInAria: string;
    githubAria: string;
    emailAria: string;
  };
}
