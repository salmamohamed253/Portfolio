import type { SkillGroup } from '../types/content';

/**
 * Grouped from the CV's Core Skills section, plus technologies named in the
 * author's project descriptions (React, Flutter, Dart, Go, R). No proficiency
 * levels are implied — each group lists where the skills were applied instead.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    title: 'Programming and web development',
    rows: [
      {
        label: 'Languages',
        items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'PHP', 'C#', 'Java', 'C', 'C++', 'Dart', 'HTML', 'CSS'],
      },
      { label: 'Frameworks and platforms', items: ['Django', 'Angular', 'React', 'Flutter', 'WordPress'] },
      {
        label: 'Practices',
        items: ['MVC architecture', 'Relational database design', 'Backend–frontend integration'],
      },
    ],
    evidence:
      'Django platforms at Mazzraty, an MVC content management system and WordPress maintenance at Al Jazeera, and a React interface for my final-year project.',
  },
  {
    title: 'AI, data and analytics',
    rows: [
      {
        label: 'AI and ML',
        items: ['Machine learning fundamentals', 'NLP (rule-based and generative)', 'Image processing', 'Retrieval-augmented generation'],
      },
      { label: 'Data and BI', items: ['Data analysis and pipelines', 'R', 'Power BI', 'Minitab', 'Snowflake'] },
    ],
    evidence:
      'A hybrid customer-service chatbot, breast cancer tissue image research, and monthly sales reporting pipelines and dashboards.',
  },
  {
    title: 'Enterprise systems and business analysis',
    rows: [
      { label: 'ERP', items: ['SAP S/4HANA implementation support'] },
      {
        label: 'Analysis',
        items: [
          'Requirements gathering',
          'Functional specifications',
          'Process mapping',
          'UAT coordination',
          'Change management',
          'Workflow automation',
        ],
      },
    ],
    evidence: 'Discovery sessions across 18 operational departments for the SAP S/4HANA implementation at Mazzraty and AQCDP.',
  },
  {
    title: 'Security and systems',
    rows: [
      {
        label: 'Controls',
        items: [
          'Endpoint DLP tooling',
          'Role-based access control',
          'Row-level security design',
          'SharePoint records governance',
          'Biometric API integration',
        ],
      },
    ],
    evidence: 'A self-built Windows DLP agent, a five-tier HR permission model, and a governed SharePoint archive.',
  },
];
