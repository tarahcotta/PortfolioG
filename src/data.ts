import { CaseStudy, ExperienceItem, SkillCategory } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 3,
    slug: 'opportunity-marketplace',
    title: "Opportunity Marketplace",
    shortDescription: "A simple internal place for contributors to find short-term opportunities and for project leads to find the people they need. The product stays lightweight and evolves through user feedback.",
    tags: ["People Strategy", "Skills Matching", "Opportunity Discovery"],
    employer: "National Laboratories of the Rockies",
    employerContext: "National Laboratories of the Rockies · Internal Platform",
    role: "Lead Design & Strategy",
    year: "2026",
    timeline: "2024 – Present",
    scope: "Opportunity posting + skills discovery + delegation + lightweight networking + feedback-led iteration",
    overview: "Opportunity Marketplace is a lightweight internal networking tool for short-term project work and skill-building opportunities across the lab. Contributors can share their skills and find work that supports their growth; project leads can find and connect with internal talent. Built as an MVP for NREL's People Strategy, it supports equitable access to opportunities and sustainable workloads. It is deliberately separate from planning and financial systems: a connection hub, not a system of record or matching service.",
    challenge: "Staff had no single place to find or share short-term opportunities. Project leads relied on word of mouth, while contributors could not see work that matched their skills or availability. Early beta testing also exposed inconsistent profile data, unclear filters, gaps in remote and in-person metadata, and a need for delegate posting. Together, these issues made equitable discovery difficult at scale.",
    solution: "Opportunity Marketplace gives contributors, project leads, and delegates one place to post, browse, and respond to short-term opportunities. Delegate posting, richer profile data, and clearer filters addressed the problems found in beta. Weekly updates, office hours, idea voting, forms, and interviews kept the work tied to feedback as the tool grew.",
    executiveTakeaways: {
      problem: "Staff lacked a centralized discovery engine for short-term opportunities, forcing reliance on word of mouth and blocking equitable cross-laboratory skill matching.",
      intervention: "Designed an agile internal marketplace with role-based delegate posting, transparent skill filtering, and weekly co-design feedback loops.",
      outcome: "Engaged 350+ staff across 12 laboratory directorates in beta cycle and established the platform as the laboratory's benchmark model for People Strategy."
    },
    metrics: [
      { value: "350+", label: "Active Staff in Beta", description: "Voluntary cross-lab adoption" },
      { value: "85%", label: "In-Platform Discovery", description: "Shifted talent search from word-of-mouth" },
      { value: "12", label: "Directorates Onboarded", description: "Cross-functional pilot participation" }
    ],
    prototypeUrl: "mailto:tarahcotta@gmail.com?subject=Walkthrough%20Request:%20Opportunity%20Marketplace%20Prototype",
    impact: [
      "Adopted by 350+ staff across 12 directorates within the first beta cycle",
      "Shifted 85% of short-term opportunity discovery from word-of-mouth to a searchable, governed platform",
      "Recognized in the laboratory People Strategy review as a model for equitable access to short-term work"
    ],
    process: "I mapped the existing process across contributors, project leads, and delegates to find where it broke down. Beta feedback through office hours, idea-voting forms, and 1:1 interviews surfaced issues with filters, profile completeness, and delegation. Weekly updates turned that feedback into targeted improvements. I kept the scope lightweight and separate from financial and planning systems to avoid unnecessary dependencies.",
    accentColor: "blue",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    id: 2,
    slug: 'pricing-tool',
    title: "Pricing Tool",
    shortDescription: "A centralized pricing tool for cost modeling, governed pricing logic, and more consistent commercial decisions across the enterprise.",
    tags: ["Cost Modeling", "Workflow Design", "Enterprise UX"],
    employer: "National Laboratories of the Rockies",
    employerContext: "National Laboratories of the Rockies · Enterprise Tool",
    role: "Lead Design & Strategy",
    year: "2023",
    timeline: "2022 – 2023",
    scope: "Estimate builder + role-based approvals + rates/burdens engine + sharing and delegation + EPM integration + summaries and exports",
    overview: "Pricing Tool is a technical pricing engine for modeling complex pricing structures and applying governed business logic across commercial workflows. It brings more accuracy, operational efficiency, and control to the process.",
    challenge: "Estimation was split across disconnected systems. Project managers built estimates in spreadsheets, financial analysts worked elsewhere, and contributors had no single place to follow approvals. Inconsistent category handling, fragile date changes, limited role testing, and overloaded email notifications made a confident estimate hard to validate, especially when EPM and OMS were involved.",
    solution: "Pricing Tool replaces scattered spreadsheets and inconsistent estimating with one guided workspace. Teams can build structured estimates, apply rates and burdens, share work for review, and route approvals with grid-based filtering, role-aware actions, and delegate signatures. Once approved, the work moves to EPM, so project managers and financial analysts can move from scoping to financial tracking without re-entering information.",
    executiveTakeaways: {
      problem: "Enterprise cost modeling fragmented across spreadsheets and financial tools created data mismatch, brittle formulas, and multi-week approval delays.",
      intervention: "Architected a unified pricing workbench featuring role-aware grid filtering, automatic rate & burden calculations, and native EPM handoffs.",
      outcome: "Reduced scoping-to-EPM data entry errors by 95% and accelerated estimate validation turnaround by 60%."
    },
    metrics: [
      { value: "95%", label: "Fewer Data Entry Errors", description: "Automated scoping-to-EPM synchronization" },
      { value: "80%", label: "Spreadsheet Work Unified", description: "Consolidated onto single pricing engine" },
      { value: "60%", label: "Faster Approval Turnaround", description: "Role-aware delegation and routing" }
    ],
    prototypeUrl: "mailto:tarahcotta@gmail.com?subject=Walkthrough%20Request:%20Pricing%20Tool%20Prototype",
    impact: [
      "Brought project managers, financial analysts, and contributors into one governed estimate-building workflow",
      "Replaced parallel spreadsheet work across two disconnected systems and reduced manual re-entry errors by 95%",
      "Role-aware design reduced system switching and accelerated estimate validation turnaround by 60%"
    ],
    process: "I mapped role-based workflows across three user types to see where estimation fragmented. A competitive review of enterprise pricing tools helped set expectations for feature density. From there, I designed a role-aware grid with inline approval routing and delegate signatures. QA feedback from financial analysts shaped iterations on category handling and date logic, including edge cases the spreadsheet process had hidden.",
    accentColor: "indigo",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
  },
  {
    id: 1,
    slug: 'work-planning-control',
    title: "Work Planning Control",
    shortDescription: "A workplace control platform for planning, authorizing, and tracking work, site access, and critical systems in industrial settings.",
    tags: ["Workplace Safety", "Work Auth", "Industrial UX"],
    employer: "National Laboratories of the Rockies",
    employerContext: "National Laboratories of the Rockies · Safety-Critical Platform",
    role: "Lead Design & Strategy",
    year: "2019",
    timeline: "2019 – 2021",
    scope: "Unified authorization engines + integrated apps + role-based access + governed workflows + asset and data backbone + embedded safety",
    overview: "Work Planning Control is the lab's formal system for making sure work is planned, authorized, and performed safely. It gives teams one digital process for evaluating, approving, and monitoring activities, workers, and lab assets.",
    challenge: "Planning was inconsistent and hazards were often missed. Each team kept its own spreadsheets and email records for work and equipment, which created gaps when equipment status changed. Authorization was also fragmented: training and qualification checks were not centralized, so staff could begin work without a full view of the hazards or required controls.",
    solution: "Work Planning Control replaced scattered tools with one guided digital experience. Users can see their work, the hazards that apply, and the actions required of them. Standardized workflows, clearer roles, and training and qualification checks built into the interface as mandatory gates made the process more consistent and auditable.",
    executiveTakeaways: {
      problem: "Inconsistent team spreadsheets and decentralized qualification tracking led to hazard blindspots and unverified staff conducting hazardous lab procedures.",
      intervention: "Engineered a mandatory safety qualification gate architecture, standardizing authorization flows, equipment status alerts, and role-based access.",
      outcome: "Unified lab-wide safety authorization across 15+ facilities, enforcing 100% compliance gate verification and reducing hazard onboarding time by 50%."
    },
    metrics: [
      { value: "100%", label: "Mandatory Safety Gates", description: "Enforced compliance verification" },
      { value: "15+", label: "Facilities Covered", description: "Single governed platform replacing spreadsheets" },
      { value: "50%", label: "Faster Onboarding", description: "Streamlined qualification verification" }
    ],
    prototypeUrl: "mailto:tarahcotta@gmail.com?subject=Walkthrough%20Request:%20Work%20Planning%20Control%20Prototype",
    impact: [
      "Replaced fragmented spreadsheet and email authorization with one governed digital workflow across 15+ lab facilities",
      "Made safety qualification checks mandatory authorization gates, addressing a compliance gap found in pre-project field research",
      "Reduced onboarding time by 50% by bringing training requirements, hazard documentation, and equipment status into one interface"
    ],
    process: "I began with field research into how researchers, technicians, and safety officers used the paper and spreadsheet process. Three failures surfaced: missing hazard data when work began, unauthorized work caused by decentralized qualification tracking, and equipment-status gaps between team spreadsheets. I designed a step-by-step authorization flow with mandatory safety checks and role-based visibility, so each person saw the actions and information relevant to their authorization level.",
    accentColor: "purple",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Staff Product Designer (ITS Professional III)',
    company: 'National Laboratories of the Rockies',
    period: 'October 2021 – Present',
    location: 'Denver, CO',
    description: "Architected and governed the laboratory's first enterprise design system, establishing reusable components, design tokens, accessibility standards, and governance practices across 15 enterprise applications.",
    highlights: [
      "Architected and governed the laboratory's first enterprise design system across 15 enterprise applications.",
      "Administered Figma Enterprise and Figma for Government environments, establishing DesignOps workflows for 100+ users.",
      "Led enterprise-wide WCAG 2.2 AA accessibility initiatives and embedded compliance into the software lifecycle.",
      "Partnered with engineering to align Figma UI kits with React and Tailwind CSS, reducing front-end dev effort by 40%.",
      "Directed end-to-end UX strategy for 6 scientific and regulatory applications, translating complex requirements.",
      "Founded and led the internal UX Community of Practice to elevate design maturity across leadership and product teams."
    ],
    skills: ['Enterprise Design Systems', 'Accessibility (WCAG 2.2 AA)', 'UX Strategy', 'Product Leadership', 'Figma Enterprise', 'React & Tailwind']
  },
  {
    id: 'exp-2',
    role: 'Developer & Product Designer (ITS Professional II)',
    company: 'National Laboratories of the Rockies',
    period: 'April 2019 – October 2021',
    location: 'Denver, CO',
    description: 'Transitioned from software engineering into product design to lead the modernization of internal legacy tools and enterprise web applications.',
    highlights: [
      'Led the modernization of internal legacy tools and enterprise applications through user-centered product design.',
      'Conducted comprehensive UX and accessibility audits, presenting strategic frameworks to executive leadership.',
      'Shifted organizational strategy away from mandatory staff training toward intuitive, self-service user interfaces.',
      'Leveraged full-stack development expertise to bridge design and engineering for seamless component handoffs.'
    ],
    skills: ['Product Design', 'UX & Accessibility Audits', 'Full-Stack Development', 'Design-to-Engineering Bridge']
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Developer (ITS Professional I)',
    company: 'National Laboratories of the Rockies',
    period: 'October 2018 – April 2019',
    location: 'Denver, CO',
    description: 'Developed and maintained enterprise software supporting critical laboratory operations while collaborating closely with cross-functional engineering teams.',
    highlights: [
      'Engineered and maintained internal web applications supporting mission-critical laboratory operations using React and JavaScript.',
      'Implemented accessible front-end interfaces, establishing a technical foundation that strengthens cross-functional design leadership.'
    ],
    skills: ['Front-End Engineering', 'Enterprise Software', 'Accessibility', 'Cross-Functional Leadership']
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'UX Research & Strategy',
    iconName: 'Compass',
    description: 'Uncovering deep user needs and aligning product direction with organizational goals.',
    skills: ['User Interviews', 'Contextual Inquiry', 'Process Mapping', 'Usability Testing', 'Information Architecture', 'Feedback Loops']
  },
  {
    title: 'Product & Interaction Design',
    iconName: 'Sparkles',
    description: 'Crafting intuitive enterprise workflows, form architectures, and role-based experiences.',
    skills: ['Enterprise SaaS UX', 'Complex Workflows', 'Grid & Dashboard Design', 'Wireframing & Prototyping', 'Design Systems', 'Accessibility']
  },
  {
    title: 'Design Ops & Governance',
    iconName: 'Layers',
    description: 'Building scalable component libraries, token structures, and team collaboration frameworks.',
    skills: ['Design Systems', 'Token Architecture', 'Cross-functional Handoff', 'Component Governance', 'Documentation', 'Design Operations']
  },
  {
    title: 'Strategic Innovation',
    iconName: 'Cpu',
    description: 'Translating internal strategy into lightweight, adoption-focused digital products.',
    skills: ['MVP Strategy', 'People Strategy Alignment', 'Safety-Critical UX', 'Cost Modeling UX', 'Stakeholder Alignment', 'Iterative Rollouts']
  }
];
