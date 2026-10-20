import type { ReactNode } from 'react';
import { SectionHeading } from './SectionHeading';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  /** Quieter styling for secondary sections such as Education. */
  tone?: 'default' | 'muted';
}

export function Section({ id, index, label, title, intro, children, tone = 'default' }: SectionProps) {
  const headingId = `${id}-heading`;
  return (
    <section id={id} aria-labelledby={headingId} className={`${styles.section} ${styles[tone]}`}>
      <div className="container">
        <SectionHeading id={headingId} index={index} label={label} title={title} intro={intro} />
        {children}
      </div>
    </section>
  );
}
