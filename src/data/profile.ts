/**
 * Personal details shown on the site. Source of truth: the CV in
 * public/Salma_Mohamed_Salem_CV.pdf. The phone number and home address on the
 * CV are intentionally not repeated here.
 */
export const profile = {
  name: 'Salma Mohamed Salem',
  shortName: 'Salma Salem',
  roles: ['Application Support Engineer', 'Full-Stack Developer', 'Applied AI Engineer'],
  location: 'Qatar',
  email: 'salma253salem@gmail.com',
  linkedin: 'https://www.linkedin.com/in/salmamsalem',
  github: 'https://github.com/salmamohamed253',
  /** File name inside public/. */
  cvFile: 'Salma_Mohamed_Salem_CV.pdf',
  languages: ['Arabic (native)', 'English (fluent)', 'French (intermediate)'],
} as const;
