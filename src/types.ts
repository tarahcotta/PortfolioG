export interface CaseStudyMetric {
  value: string;
  label: string;
  description?: string;
}

export interface CaseStudy {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  tags: string[];
  employer: string;
  employerContext: string;
  role: string;
  year: string;
  timeline?: string;
  scope: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string[];
  process: string;
  accentColor: string;
  image?: string;
  imageUrl?: string;
  imageAlt?: string;
  images?: string[];
  award?: string;
  executiveTakeaways?: {
    problem: string;
    intervention: string;
    outcome: string;
  };
  metrics?: CaseStudyMetric[];
  prototypeUrl?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  skills: string[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: string[];
  description: string;
}
