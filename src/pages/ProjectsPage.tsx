import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';
import { CATEGORY_LABELS, publishedProjects } from '../lib/content';
import { href } from '../lib/router';
import type { Project, ProjectCategory } from '../types/content';
import styles from './ProjectsPage.module.css';

type Filter = 'all' | ProjectCategory | 'in-progress';

const FILTERS: { id: Filter; label: string; test: (p: Project) => boolean }[] = [
  { id: 'all', label: 'All', test: () => true },
  ...(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((category) => ({
    id: category,
    label: CATEGORY_LABELS[category],
    test: (p: Project) => p.category === category,
  })),
  { id: 'in-progress', label: 'In progress', test: (p: Project) => p.status === 'in-progress' },
];

export function ProjectsPage() {
  const [filter, setFilter] = useState<Filter>('all');
  const published = publishedProjects(projects);
  const active = FILTERS.find((f) => f.id === filter) ?? FILTERS[0];
  const shown = published.filter(active.test);

  return (
    <div className="container">
      <header className={styles.header}>
        <a href={href.section('work')} className={styles.back}>
          <ArrowLeft size={16} aria-hidden="true" /> Back to home
        </a>
        <h1 tabIndex={-1} className={styles.title}>
          Projects
        </h1>
        <p className={styles.intro}>
          Professional, academic and independent work. Employer projects are presented as architecture case studies
          without confidential code or data. Projects marked “In progress” list only planned scope until they are
          built.
        </p>
      </header>

      <div className={styles.filters} role="group" aria-label="Filter projects">
        {FILTERS.map((f) => {
          const count = published.filter(f.test).length;
          if (count === 0 && f.id !== 'all') return null;
          return (
            <button
              key={f.id}
              type="button"
              className={styles.filter}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label} <span className={styles.count}>{count}</span>
            </button>
          );
        })}
      </div>

      <p className="visually-hidden" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
      </p>

      <ul className={styles.grid}>
        {shown.map((project) => (
          <li key={project.slug}>
            <ProjectCard project={project} headingLevel="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
