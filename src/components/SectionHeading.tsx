import type { ReactNode } from 'react';
import styles from './SectionHeading.module.css';

interface SectionHeadingProps {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
}

/** Numbered section heading. The heading is focusable so navigation can move focus to it. */
export function SectionHeading({ id, index, label, title, intro }: SectionHeadingProps) {
  return (
    <div className={styles.heading}>
      <p className={styles.eyebrow} aria-hidden="true">
        <span className={styles.index}>{index}</span>
        <span className={styles.rule} />
        <span>{label}</span>
      </p>
      <h2 id={id} tabIndex={-1} className={styles.title}>
        {title}
      </h2>
      {intro ? <p className={styles.intro}>{intro}</p> : null}
    </div>
  );
}
