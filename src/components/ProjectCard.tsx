import { ArrowUpRight } from 'lucide-react';
import { href } from '../lib/router';
import type { Project } from '../types/content';
import { ProjectMeta } from './ProjectMeta';
import { TagList } from './TagList';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
  /** `feature` is a full-width row used on the homepage; `tile` is used in the catalogue grid. */
  variant?: 'feature' | 'tile';
  index?: number;
  headingLevel?: 'h3' | 'h2';
}

/**
 * The whole card is clickable through the title link's stretched ::after,
 * so there is a single, descriptive link per card for screen readers.
 */
export function ProjectCard({ project, variant = 'tile', index, headingLevel = 'h3' }: ProjectCardProps) {
  const Heading = headingLevel;
  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      {variant === 'feature' && index !== undefined ? (
        <span className={styles.index} aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>
      ) : null}
      <div className={styles.body}>
        <ProjectMeta project={project} />
        <Heading className={styles.title}>
          <a href={href.project(project.slug)} className={styles.link}>
            {project.title}
          </a>
        </Heading>
        {project.context ? <p className={styles.context}>{project.context}</p> : null}
        <p className={styles.summary}>{project.summary}</p>
        <TagList tags={project.stack} limit={variant === 'feature' ? 6 : 4} />
      </div>
      <span className={styles.cta} aria-hidden="true">
        Case study <ArrowUpRight size={16} />
      </span>
    </article>
  );
}
