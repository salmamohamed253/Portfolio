import { CATEGORY_LABELS, STATUS_LABELS } from '../lib/content';
import type { Project } from '../types/content';
import styles from './ProjectMeta.module.css';

/** Category and status labels, e.g. "Professional · Completed". */
export function ProjectMeta({ project }: { project: Project }) {
  return (
    <p className={styles.meta}>
      <span className={styles.category}>{CATEGORY_LABELS[project.category]}</span>
      {project.status ? (
        <span className={`${styles.status} ${styles[project.status]}`}>
          <span className={styles.dot} aria-hidden="true" />
          {STATUS_LABELS[project.status]}
        </span>
      ) : null}
      {project.draft ? <span className={styles.draft}>Draft · dev only</span> : null}
    </p>
  );
}
