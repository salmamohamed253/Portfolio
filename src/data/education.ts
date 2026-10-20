export const degree = {
  title: 'BSc (Hons) Computer Science with Artificial Intelligence',
  institution: 'University of Nottingham',
  location: 'Semenyih, Malaysia',
  period: 'Sept 2022 – Jul 2024',
  modules: [
    'Artificial Intelligence Methods',
    'Designing Intelligent Agents',
    'Image Processing',
    'Databases & Interfaces',
    'Software Engineering',
    'Computer Security',
    'Algorithm Correctness & Efficiency',
  ],
  finalYearProjectSlug: 'breast-cancer-tissue-registration',
  groupProject: 'Unity-based game development across a full software engineering lifecycle.',
} as const;

export const foundation = {
  title: 'Foundation in Science',
  institution: 'University of Nottingham',
  location: 'Semenyih, Malaysia',
  period: 'Sept 2020 – Jul 2021',
} as const;

export const achievements: readonly { title: string; issuer: string }[] = [
  { title: 'First Place, Best Presentation Award', issuer: 'University of Nottingham Malaysia' },
  { title: 'CS50: Introduction to Computer Science', issuer: 'Harvard University' },
  { title: 'International Mathematics Competition', issuer: 'Texas A&M University' },
  { title: 'IELTS 7.5 overall', issuer: 'English language proficiency' },
];
