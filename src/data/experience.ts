import type { Role } from '../types/content';

export const experience: readonly Role[] = [
  {
    title: 'Application Support Engineer',
    organisation: 'Mazzraty (Al Mana Group)',
    location: 'Doha, Qatar',
    period: 'Apr 2025 – Present',
    summary:
      'Lead developer and de facto business analyst for internal platforms serving two group companies, Mazzraty (poultry) and AQCDP (dairy).',
    groups: [
      {
        heading: 'Internal platforms',
        points: [
          'Lead developer and technical architect for in-house Django platforms — a Horilla-based HRMS, contract lifecycle management, and a petty cash and reimbursement portal — automating manual Finance, HR and Supply Chain workflows.',
          'Built an HR portal covering leave workflows, document-expiry tracking, employee records and role-based access, replacing manual HR processes.',
          'Designed a five-tier permission system (Employee, Line Manager, GM, HR, Global Access) with badge-based identity resolution, serving both companies from a shared codebase.',
          'Integrated the company’s biometric API into the HR portal to automate attendance recording, replacing manual clock-in and clock-out logging.',
        ],
      },
      {
        heading: 'Applied AI and security automation',
        points: [
          'Built and deployed an e-commerce chatbot that combines rule-based decision trees with a generative AI layer.',
          'Built a Windows data-loss-prevention agent in Python, including a financial-data classification engine, as a self-initiated security project.',
        ],
      },
      {
        heading: 'Enterprise systems and data',
        points: [
          'Assistant Lead on the SAP S/4HANA ERP implementation: ran discovery sessions across 18 operational departments in both companies and produced standardised process documentation for the implementation partner.',
          'Built Power BI and Minitab dashboards for market share, sales performance and management reporting, backed by monthly pipelines that clean and consolidate multi-branch sales data.',
          'Leading the company’s Snowflake implementation for centralised data warehousing and reporting.',
          'Set up a SharePoint digital archive with a defined taxonomy, permission tiers and naming conventions.',
        ],
      },
      {
        heading: 'Coordination',
        points: [
          'Appointed by the CEO as technical lead and single point of communication for an e-commerce project between Mazzraty and Ollen Group, managing tasks and timelines and reviewing data exchanged between teams.',
        ],
      },
    ],
    relatedProjects: ['hybrid-llm-chatbot', 'hr-management-system', 'windows-dlp-agent'],
  },
  {
    title: 'Web Development Intern',
    organisation: 'Al Jazeera Media Network',
    location: 'Doha, Qatar',
    period: 'Oct 2024 – Dec 2024',
    groups: [
      {
        heading: 'Content management system (MVC)',
        points: [
          'Designed the full database architecture for a CMS: content metadata, comments, media, nested categories and users.',
          'Wrote the backend connecting the database to the frontend for creating, editing and deleting content, with recursive category retrieval so new subcategories need no code changes.',
          'Built the admin interface and the public article templates, structured so new content types can be added.',
        ],
      },
      {
        heading: 'WordPress maintenance and web support',
        points: [
          'Updated CSS and post layouts for the Al Jazeera HR website in its staging environment.',
          'Organised the file structure of the Policy and Procedure website while updating its CSS.',
          'Documented the plugins used across Al Jazeera’s websites.',
        ],
      },
    ],
  },
  {
    title: 'Computer Science Intern',
    organisation: 'Qatar Computing Research Institute (QCRI)',
    location: 'Doha, Qatar',
    period: 'Jun 2022 – Jul 2022',
    groups: [
      {
        points: [
          'Worked on a project combining Python software with Pozyx positioning hardware.',
          'Debugged and configured the project website’s frontend, cleaned up backend code, and connected the Python backend to the frontend.',
          'Added usability and accessibility features to the website and wrote technical support documentation for ongoing maintenance.',
        ],
      },
    ],
  },
];
